package com.recoveryconnect.dto;

public class CategoryDto {
    private Long id;
    private String name;
    private String description;

    public CategoryDto() {}

    public CategoryDto(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private CategoryDto dto = new CategoryDto();
        public Builder id(Long id) { dto.setId(id); return this; }
        public Builder name(String name) { dto.setName(name); return this; }
        public Builder description(String description) { dto.setDescription(description); return this; }
        public CategoryDto build() { return dto; }
    }
}
