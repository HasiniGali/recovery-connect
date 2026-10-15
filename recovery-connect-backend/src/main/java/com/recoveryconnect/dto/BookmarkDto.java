package com.recoveryconnect.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class BookmarkDto {

    public static class Create {
        @NotNull(message = "Resource ID is required")
        private Long resourceId;

        public Create() {}
        public Create(Long resourceId) { this.resourceId = resourceId; }

        public Long getResourceId() { return resourceId; }
        public void setResourceId(Long resourceId) { this.resourceId = resourceId; }
    }

    public static class Response {
        private Long id;
        private Long userId;
        private Long resourceId;
        private String resourceName;
        private LocalDateTime createdAt;
        private ResourceResponseDto resource;

        public Response() {}

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public Long getResourceId() { return resourceId; }
        public void setResourceId(Long resourceId) { this.resourceId = resourceId; }

        public String getResourceName() { return resourceName; }
        public void setResourceName(String resourceName) { this.resourceName = resourceName; }

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

        public ResourceResponseDto getResource() { return resource; }
        public void setResource(ResourceResponseDto resource) { this.resource = resource; }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Response res = new Response();
            public Builder id(Long id) { res.setId(id); return this; }
            public Builder userId(Long userId) { res.setUserId(userId); return this; }
            public Builder resourceId(Long resourceId) { res.setResourceId(resourceId); return this; }
            public Builder resourceName(String name) { res.setResourceName(name); return this; }
            public Builder createdAt(LocalDateTime date) { res.setCreatedAt(date); return this; }
            public Builder resource(ResourceResponseDto r) { res.setResource(r); return this; }
            public Response build() { return res; }
        }
    }
}
