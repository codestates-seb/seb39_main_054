package com.codestates.chat.entity;

import com.codestates.audit.Auditable;
import com.codestates.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "message")
@Getter
@Setter
@NoArgsConstructor
public class Message extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long id;

    private String content;

    private String imageName;

    private String imageUrl;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public Message(String content, Conversation conversation, Member member) {
        this.content = content;
        this.conversation = conversation;
        this.member = member;
    }

    public Message(String content, String imageName, String imageUrl, Conversation conversation, Member member) {
        this.content = content;
        this.imageName = imageName;
        this.imageUrl = imageUrl;
        this.conversation = conversation;
        this.member = member;
    }
}