package com.recoveryconnect.dto;

public class LanguageDto {
    private Long id;
    private String name;
    private String code;

    public LanguageDto() {}

    public LanguageDto(Long id, String name, String code) {
        this.id = id;
        this.name = name;
        this.code = code;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private LanguageDto dto = new LanguageDto();
        public Builder id(Long id) { dto.setId(id); return this; }
        public Builder name(String name) { dto.setName(name); return this; }
        public Builder code(String code) { dto.setCode(code); return this; }
        public LanguageDto build() { return dto; }
    }
}
