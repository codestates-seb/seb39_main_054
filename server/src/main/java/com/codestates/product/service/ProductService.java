package com.codestates.product.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.codestates.exception.CustomException;
import com.codestates.favorite.entity.Favorite;
import com.codestates.favorite.repository.FavoriteRepository;
import com.codestates.member.entity.Member;
import com.codestates.member.service.MemberService;
import com.codestates.pimage.entity.Pimage;
import com.codestates.pimage.repository.PimageRepository;
import com.codestates.product.entity.Product;
import com.codestates.product.mapper.ProductMapper;
import com.codestates.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@Service
@Transactional
@RequiredArgsConstructor
public class ProductService{

    private final MemberService memberService;
    private final ProductRepository productRepository;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;
    private final PimageRepository pimageRepository ;
    private final ProductMapper mapper;
    private final FavoriteRepository favoriteRepository;
    private final AmazonS3Client amazonS3Client;


    /**
     * ?????? ??????
     */
    public Product createProduct(Product product, Long memberId, List<Pimage> pimageList) {

        System.out.println("product.getPcategory()" + product.getPcategory());
        pimageList.stream().forEach(pimage -> {
            pimage.setProduct(product);
        });
        Member member = memberService.findVerifiedMember(memberId);
        product.setMember(member);
        return productRepository.save(product);
    }

    /**
     * ?????? ??????
     */
    public Product updateProduct(Product product, Long memberId) {

        Product certifiedProduct = verifyProduct(product.getProductId());
        memberService.findVerifiedMember(memberId);
        verifyAuthority(memberId, certifiedProduct);

        Optional.ofNullable(product.getTitle()).ifPresent(certifiedProduct::setTitle);
        Optional.ofNullable(product.getDescription()).ifPresent(certifiedProduct::setDescription);
        Optional.ofNullable(product.getProductStatus()).ifPresent(certifiedProduct::setProductStatus);
        Optional.ofNullable(product.getPcategory()).ifPresent(certifiedProduct::setPcategory);
        certifiedProduct.setLastEditDate(LocalDateTime.now());
        return productRepository.save(certifiedProduct);
    }

    // ?????? ?????? ?????? ??????
    public Product verifyProduct(Long productId) {
        return productRepository.findById(productId).orElseThrow(() -> new CustomException("Product not Found", HttpStatus.NOT_FOUND));
    }

    // ?????? ????????? ?????? && ADMIN??? ????????? ??????
    private void verifyAuthority(Long memberId, Product certifiedProduct) {
        Member member = memberService.findVerifiedMember(memberId);
        if (!certifiedProduct.getMember().getMemberId().equals(memberId) && !member.getRoles().equals("ROLE_ADMIN")) {
            throw new CustomException("You are not the member of this product Or You are not ADMIN", HttpStatus.FORBIDDEN);
        }
    }

//    // ADMIN??? ????????? ??????
//    private void verifyAdmin(Long memberId, Product certifiedProduct) {
//        memberService.findVerifiedMember(memberId);
//        if (!certifiedProduct.getMember().getMemberId().equals(memberId)) {
//            throw new CustomException("You are not the member of this product", HttpStatus.FORBIDDEN);
//        }
//    }

    /**
     * AWS ????????? ??????
     */
    public List<Pimage> uploadImage(List<MultipartFile> multipartFileList, List<String> imageUrlList) {

        List<Pimage> pimageList = multipartFileList.stream().map(file -> {
            Pimage pimage = new Pimage();
            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            System.out.println("fileName :" + fileName);
            System.out.println(bucket);

            String url = amazonS3Client.getUrl(bucket, fileName).toString();
//            String url = generateUrl(fileName, HttpMethod.GET);
            pimage.setImageUrl(url);
            imageUrlList.add(url);

            try(InputStream inputStream = file.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch(IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "????????? ???????????? ??????????????????.");
            }
            return pimage;
        }).collect(Collectors.toList());

        return pimageList;
    }

    /**
     * ????????? ????????????
     */
    public List<String> updateImage(long productId, List<String> updatedImageUrl) {

        Optional<List<Pimage>> optionalPimageList = pimageRepository.findByProductId(productId);
        List<Pimage> legacyPimageList = optionalPimageList.orElseThrow(() -> new CustomException("Image not found", HttpStatus.NOT_FOUND));

        legacyPimageList.stream()
                .forEach(image -> image.setLastEditDate(LocalDateTime.now()));

        List<Pimage> deleteImageList = legacyPimageList.stream()
                .filter(image -> !updatedImageUrl.contains(image.getImageUrl()))
                .collect(Collectors.toList());

        deleteImageList.stream()
                .forEach(deleteimage -> pimageRepository.deleteById(deleteimage.getPimageId()));

        List<Pimage> modifiedPimageList = pimageRepository.findByProductId(productId).get();

        List<String> modifiedImageUrlList = modifiedPimageList.stream()
                .map(image -> image.getImageUrl())
                .collect(Collectors.toList());

        return modifiedImageUrlList;
    }

    /**
     * AWS URL ??????
     */
    private String generateUrl(String fileName, HttpMethod httpMethod) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, 2); // Generated URL will be valid for 2minutes
        return amazonS3.generatePresignedUrl(bucket, fileName, calendar.getTime(), httpMethod).toString();
    }

    /**
     * AWS ?????? ?????? ??????
     */
    public String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "????????? ????????? ??????(" + fileName + ") ?????????.");
        }
    }

    /**
     * ?????? ??????
     */
    public void deleteQuestion(long productId,long memberId) {
        Product certifiedProduct  = verifyProduct(productId);
        verifyAuthority(memberId,certifiedProduct);
        productRepository.delete(certifiedProduct);
    }

    /**
     * ?????? ?????? ??????
     */
    public Product findProduct(long productId, long principalId) {

        Optional<Product> optionalProduct = productRepository.findById(productId);
        Product product = optionalProduct.orElseThrow(() -> new CustomException("Product not Found", HttpStatus.NOT_FOUND));

        product.setFavoriteCount(product.getFavoriteList().size());
        product.getFavoriteList().forEach(favorite -> {
            if (favorite.getMember().getMemberId() == principalId) {
                product.setFavoriteStatus(true);
            }
        });

        return product;
    }


    /**
     * ?????? ????????? ??????
     */
    public PageImpl<Product> findProductList(int page, int size, String pcategoryName, Product.ProductStatus status, String keyword, long principalId) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("productId").descending());
        PageImpl<Product> productList = productRepository.findByCategoryStatusKeyword(pcategoryName, status, keyword,pageRequest);


        productList.forEach(product -> {
            product.setFavoriteCount(product.getFavoriteList().size());
            product.getFavoriteList().forEach(favorite -> {
                if (favorite.getMember().getMemberId() == principalId) {
                    product.setFavoriteStatus(true);
                }
            });
        });

        return productList;
    }

    /**
     * ????????? ????????? ????????? ??????
     */
    public Page<Product> findMemberList(int page, int size,long principalId) {
        PageRequest pageRequest = PageRequest.of(page, size,Sort.by("PRODUCT_ID").descending());
        Optional<Page<Product>> optionalProductList = productRepository.findByMemberId(principalId,pageRequest);
        Page<Product> productList = optionalProductList.orElseThrow(() -> new CustomException("Member doesn't write Product", HttpStatus.NOT_FOUND));

        productList.forEach(product -> {
            product.setFavoriteCount(product.getFavoriteList().size());
            product.getFavoriteList().forEach(favorite -> {
                if (favorite.getMember().getMemberId() == principalId) {
                    product.setFavoriteStatus(true);
                }
            });
        });

        return productList;
    }

    /**
     * ?????? ???????????? ????????? ??????
     */
    public Page<Favorite> findFavoriteList(int page, int size,long memberId) {

        PageRequest pageRequest = PageRequest.of(page, size,Sort.by("MEMBER_ID").descending());
        Optional<Page<Favorite>> optionalFavoriteList = favoriteRepository.findByMemberId(memberId,pageRequest);
        Page<Favorite> favoriteList = optionalFavoriteList.orElseThrow(() -> new CustomException("Member doesn't write Product", HttpStatus.NOT_FOUND));

        favoriteList.forEach(favorite -> {
            favorite.getProduct().setFavoriteCount(favorite.getProduct().getFavoriteList().size());
                if (favorite.getMember().getMemberId() == memberId) {
                    favorite.getProduct().setFavoriteStatus(true);
            };
        });

        return favoriteList;
    }
}