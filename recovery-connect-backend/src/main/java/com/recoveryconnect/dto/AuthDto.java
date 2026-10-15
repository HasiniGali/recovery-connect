package com.recoveryconnect.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthDto {

    public static class RegisterRequest {
        @NotBlank(message = "Name is required")
        private String name;

        @NotBlank(message = "Email is required")
        @Email(message = "Valid email is required")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;

        public RegisterRequest() {}

        public RegisterRequest(String name, String email, String password) {
            this.name = name;
            this.email = email;
            this.password = password;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private RegisterRequest req = new RegisterRequest();
            public Builder name(String name) { req.setName(name); return this; }
            public Builder email(String email) { req.setEmail(email); return this; }
            public Builder password(String password) { req.setPassword(password); return this; }
            public RegisterRequest build() { return req; }
        }
    }

    public static class LoginRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Valid email is required")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;

        public LoginRequest() {}

        public LoginRequest(String email, String password) {
            this.email = email;
            this.password = password;
        }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private LoginRequest req = new LoginRequest();
            public Builder email(String email) { req.setEmail(email); return this; }
            public Builder password(String password) { req.setPassword(password); return this; }
            public LoginRequest build() { return req; }
        }
    }

    public static class LoginResponse {
        private String token;
        private String tokenType = "Bearer";
        private Long userId;
        private String name;
        private String email;
        private String role;
        private long expiresInMs;

        public LoginResponse() {}

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }

        public String getTokenType() { return tokenType; }
        public void setTokenType(String tokenType) { this.tokenType = tokenType; }

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }

        public long getExpiresInMs() { return expiresInMs; }
        public void setExpiresInMs(long expiresInMs) { this.expiresInMs = expiresInMs; }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private LoginResponse res = new LoginResponse();
            public Builder token(String token) { res.setToken(token); return this; }
            public Builder tokenType(String tokenType) { res.setTokenType(tokenType); return this; }
            public Builder userId(Long userId) { res.setUserId(userId); return this; }
            public Builder name(String name) { res.setName(name); return this; }
            public Builder email(String email) { res.setEmail(email); return this; }
            public Builder role(String role) { res.setRole(role); return this; }
            public Builder expiresInMs(long expiresInMs) { res.setExpiresInMs(expiresInMs); return this; }
            public LoginResponse build() { return res; }
        }
    }
}
