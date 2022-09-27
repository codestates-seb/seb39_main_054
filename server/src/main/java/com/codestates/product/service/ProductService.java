package com.codestates.product.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.codestates.exception.CustomException;
import com.codestates.member.entity.Member;
import com.codestates.member.service.MemberService;
import com.codestates.pimage.entity.Pimage;
import com.codestates.pimage.repository.PimageRepository;
import com.codestates.product.entity.Product;
import com.codestates.product.repository.ProductRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;


@Service
public class ProductService{

    private final MemberService memberService;
    private final ProductRepository productRepository;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;
    private final PimageRepository pimageRepository ;

    public ProductService(MemberService memberService, ProductRepository productRepository, AmazonS3 amazonS3, PimageRepository pimageRepository) {
        this.memberService = memberService;
        this.productRepository = productRepository;
        this.amazonS3 = amazonS3;
        this.pimageRepository = pimageRepository;
    }

    /**
     * 제품 등록
     */
    public Product createProduct(Product product, Long memberId) {
        Member member = memberService.findVerifiedMember(memberId);
        product.setMember(member);
        return productRepository.save(product);
    }


    /**
     * AWS 이미지 등록
     */
    public List<String> uploadImage(List<MultipartFile> multipartFileList, Long productId) {

        List<String> fileUrlList = new ArrayList<>();
        Product product = verifyProduct(productId);

        multipartFileList.forEach(file -> {
            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());
            System.out.println(fileName);
            System.out.println(bucket);
            fileUrlList.add(generateUrl(fileName, HttpMethod.GET));
            System.out.println(fileUrlList);

            try(InputStream inputStream = file.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch(IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
            }

        });
//
//        fileUrlList.stream()
//                .forEach(url -> {
//                    Pimage image = new Pimage();
//
//                    image.setProduct(product);
//                    image.setImageUrl(url);
//                    pimageRepository.save(image);
//                });

        return fileUrlList;
    }

    /**
     * URL 생성
     */
    private String generateUrl(String fileName, HttpMethod httpMethod) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, 2); // Generated URL will be valid for 2minutes
        return amazonS3.generatePresignedUrl(bucket, fileName, calendar.getTime(), httpMethod).toString();
    }

    /**
     * 이미지 삭제
     */
    public void deleteImage(String fileName) {
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }

    public String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }


    public Product verifyProduct(Long productId) {

        return productRepository.findById(productId).orElseThrow(() -> new CustomException("Product not Found", HttpStatus.NO_CONTENT));
    }



}