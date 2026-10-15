package com.recoveryconnect.dto;

import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;

public class UpdateResourceRequest {

    @Size(max = 255, message = "Resource name cannot exceed 255 characters")
    private String name;

    private String description;
    private Long categoryId;
    private List<Long> languageIds;

    @Size(max = 50, message = "Phone cannot exceed 50 characters")
    private String phone;

    @Size(max = 500, message = "Website URL cannot exceed 500 characters")
    private String website;

    private String address;

    @Size(max = 100, message = "City cannot exceed 100 characters")
    private String city;

    @Size(max = 100, message = "State cannot exceed 100 characters")
    private String state;

    @Size(max = 20, message = "Postal code cannot exceed 20 characters")
    private String postalCode;

    private BigDecimal latitude;
    private BigDecimal longitude;
    private String cost;
    private String eligibility;
    private String availability;
    private String accessibility;
    private String sourceUrl;
    private Boolean isActive;
    private Boolean isSynthetic;

    public UpdateResourceRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public List<Long> getLanguageIds() { return languageIds; }
    public void setLanguageIds(List<Long> languageIds) { this.languageIds = languageIds; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getPostalCode() { return postalCode; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }

    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }

    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }

    public String getCost() { return cost; }
    public void setCost(String cost) { this.cost = cost; }

    public String getEligibility() { return eligibility; }
    public void setEligibility(String eligibility) { this.eligibility = eligibility; }

    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }

    public String getAccessibility() { return accessibility; }
    public void setAccessibility(String accessibility) { this.accessibility = accessibility; }

    public String getSourceUrl() { return sourceUrl; }
    public void setSourceUrl(String sourceUrl) { this.sourceUrl = sourceUrl; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public Boolean getIsSynthetic() { return isSynthetic; }
    public void setIsSynthetic(Boolean isSynthetic) { this.isSynthetic = isSynthetic; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private UpdateResourceRequest req = new UpdateResourceRequest();

        public Builder name(String name) { req.setName(name); return this; }
        public Builder description(String description) { req.setDescription(description); return this; }
        public Builder categoryId(Long categoryId) { req.setCategoryId(categoryId); return this; }
        public Builder languageIds(List<Long> languageIds) { req.setLanguageIds(languageIds); return this; }
        public Builder phone(String phone) { req.setPhone(phone); return this; }
        public Builder website(String website) { req.setWebsite(website); return this; }
        public Builder address(String address) { req.setAddress(address); return this; }
        public Builder city(String city) { req.setCity(city); return this; }
        public Builder state(String state) { req.setState(state); return this; }
        public Builder postalCode(String postalCode) { req.setPostalCode(postalCode); return this; }
        public Builder latitude(BigDecimal latitude) { req.setLatitude(latitude); return this; }
        public Builder longitude(BigDecimal longitude) { req.setLongitude(longitude); return this; }
        public Builder cost(String cost) { req.setCost(cost); return this; }
        public Builder eligibility(String eligibility) { req.setEligibility(eligibility); return this; }
        public Builder availability(String availability) { req.setAvailability(availability); return this; }
        public Builder accessibility(String accessibility) { req.setAccessibility(accessibility); return this; }
        public Builder sourceUrl(String sourceUrl) { req.setSourceUrl(sourceUrl); return this; }
        public Builder isActive(Boolean isActive) { req.setIsActive(isActive); return this; }
        public Builder isSynthetic(Boolean isSynthetic) { req.setIsSynthetic(isSynthetic); return this; }

        public UpdateResourceRequest build() { return req; }
    }
}
