package com.codestates.member.controller;

import com.codestates.member.dto.MemberPatchDto;
import com.codestates.member.dto.MemberPostDto;
import com.codestates.member.dto.MemberResponseDto;
import com.codestates.member.entity.Member;
import com.codestates.member.mapper.MemberMapper;
import com.codestates.member.repository.MemberRepository;
import com.codestates.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/v1/members")
@Validated
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;
//    private final MemberRepository memberRepository;
//    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto) {

//        memberPostDto.setPassword(bCryptPasswordEncoder.encode(memberPostDto.getPassword()));
//        memberPostDto.setRoles("ROLE_USER");
        Member member = memberService.createMember(mapper.memberPostDtoToMember(memberPostDto));
        MemberResponseDto memberResponseDto = mapper.memberToMemberResponseDto(member);

        return new ResponseEntity(memberResponseDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,@Valid @RequestBody MemberPatchDto memberPatchDto) {

        memberPatchDto.setMemberId(memberId);

        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));
        MemberResponseDto memberResponseDto = mapper.memberToMemberResponseDto(member);

        return new ResponseEntity<>(memberResponseDto, HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {

        Member member = memberService.findMember(memberId);
        MemberResponseDto memberResponseDto = mapper.memberToMemberResponseDto(member);

        return new ResponseEntity(memberResponseDto, HttpStatus.OK);
    }
}