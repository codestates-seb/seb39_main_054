package com.codestates.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity CustomException(CustomException e) throws IOException {
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }
}
