package com.codestates.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_NICKNAME_EXISTS(409, "Member nickname exists"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    QUESTION_NOT_FOUND(404, "Question not found" ),
    PROVIDER_NOT_FOUND(404, "Provider not found"),
    JWT_TOKEN_NOT_AUTHORIZED(401, "Expired or invalid JWT token"),
    CHATROOM_NOT_FOUND(404, "ChatRoom not found"),
    FAVORITE_NOT_FOUND(404, "Favorite not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
