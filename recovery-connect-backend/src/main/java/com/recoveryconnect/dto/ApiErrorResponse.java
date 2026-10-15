package com.recoveryconnect.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    private Map<String, String> validationErrors;

    public ApiErrorResponse() {}

    public ApiErrorResponse(LocalDateTime timestamp, int status, String error, String message, String path, Map<String, String> validationErrors) {
        this.timestamp = timestamp;
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
        this.validationErrors = validationErrors;
    }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }

    public Map<String, String> getValidationErrors() { return validationErrors; }
    public void setValidationErrors(Map<String, String> validationErrors) { this.validationErrors = validationErrors; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private ApiErrorResponse res = new ApiErrorResponse();
        public Builder timestamp(LocalDateTime t) { res.setTimestamp(t); return this; }
        public Builder status(int s) { res.setStatus(s); return this; }
        public Builder error(String e) { res.setError(e); return this; }
        public Builder message(String m) { res.setMessage(m); return this; }
        public Builder path(String p) { res.setPath(p); return this; }
        public Builder validationErrors(Map<String, String> v) { res.setValidationErrors(v); return this; }
        public ApiErrorResponse build() { return res; }
    }
}
