package com.petstore.exception;

public class PetUnavailableException extends RuntimeException {
    public PetUnavailableException(String message) {
        super(message);
    }
}
