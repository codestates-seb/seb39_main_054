package com.codestates.config.oauth;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.jwt.oauth.PrincipalDetails;
import com.codestates.member.repository.MemberRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    public PrincipalOauth2UserService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("userRequest = " + userRequest);

        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> attributes = oAuth2User.getAttributes();
        Member.ProviderType providerType = Member.ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());
        String providerId;

        switch (providerType) {
            case KAKAO:
                providerId = attributes.get("id").toString();
                break;
            case GOOGLE:
                providerId = attributes.get("sub").toString();
                break;
            default:
                throw new BusinessLogicException(ExceptionCode.PROVIDER_NOT_FOUND);
        }
        Optional<Member> member = memberRepository.findByProviderAndProviderId(providerType.name(), providerId);

        return member.map(member1 -> new PrincipalDetails(member1, attributes)).orElseGet(() -> new PrincipalDetails(createMember(providerType, attributes)));
    }

    private Member createMember(Member.ProviderType providerType, Map<String, Object> attributes) {
        Member member = Member.of(providerType, attributes);
        member.setNickname(member.getNickname() + " #" + (memberRepository.countAllByNicknameStartsWith(member.getNickname()) + 1));
        return memberRepository.save(member);
    }
}
