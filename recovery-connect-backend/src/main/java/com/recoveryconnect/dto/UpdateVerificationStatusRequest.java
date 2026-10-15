package com.recoveryconnect.dto;

import com.recoveryconnect.entity.VerificationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UpdateVerificationStatusRequest {

    @NotNull(message = "Verification status is required")
    private VerificationStatus status;

    @NotBlank(message = "Verification notes are required for auditing purposes")
    private String notes;

    private String source;

    public UpdateVerificationStatusRequest() {}

    public UpdateVerificationStatusRequest(VerificationStatus status, String notes, String source) {
        this.status = status;
        this.notes = notes;
        this.source = source;
    }

    public VerificationStatus getStatus() { return status; }
    public void setStatus(VerificationStatus status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private UpdateVerificationStatusRequest req = new UpdateVerificationStatusRequest();

        public Builder status(VerificationStatus status) { req.setStatus(status); return this; }
        public Builder notes(String notes) { req.setNotes(notes); return this; }
        public Builder source(String source) { req.setSource(source); return this; }

        public UpdateVerificationStatusRequest build() { return req; }
    }
}
