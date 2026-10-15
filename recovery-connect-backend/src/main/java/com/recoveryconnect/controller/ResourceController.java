package com.recoveryconnect.controller;

import com.recoveryconnect.dto.PageResponse;
import com.recoveryconnect.dto.ResourceResponseDto;
import com.recoveryconnect.entity.VerificationStatus;
import com.recoveryconnect.service.ResourceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/resources")
@Tag(name = "Resources", description = "Public endpoints for exploring, searching, and filtering verified recovery and support resources")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping
    @Operation(summary = "Get paginated active resources", description = "Retrieves active resources with configurable pagination and sorting (safe max page size: 100)")
    public ResponseEntity<PageResponse<ResourceResponseDto>> getResources(
            @Parameter(description = "Page number (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size (1-100)") @RequestParam(defaultValue = "20") int size,
            @Parameter(description = "Sort property and direction (e.g. name,asc or createdAt,desc)") @RequestParam(defaultValue = "name,asc") String sort
    ) {
        int safeSize = Math.min(Math.max(1, size), 100);
        Sort sortObj = parseSort(sort);
        Pageable pageable = PageRequest.of(page, safeSize, sortObj);

        Page<ResourceResponseDto> result = resourceService.getAllActiveResources(pageable);
        return ResponseEntity.ok(PageResponse.from(result));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get resource details by ID", description = "Retrieves complete operational details, trust metadata, and contact points for a specific resource")
    public ResponseEntity<ResourceResponseDto> getResourceById(
            @Parameter(description = "Resource ID") @PathVariable Long id
    ) {
        ResourceResponseDto dto = resourceService.getResourceById(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/search")
    @Operation(summary = "Multi-criteria resource search", description = "Search and filter resources using dynamic, combinable criteria (category, cost, language, city, availability, status, text query)")
    public ResponseEntity<PageResponse<ResourceResponseDto>> searchResources(
            @Parameter(description = "Category name") @RequestParam(required = false) String category,
            @Parameter(description = "Cost model (e.g. Free, Subsidized)") @RequestParam(required = false) String cost,
            @Parameter(description = "Language name or ISO code (e.g. Tamil, ta, English, en)") @RequestParam(required = false) String language,
            @Parameter(description = "City or district (e.g. Vellore)") @RequestParam(required = false) String city,
            @Parameter(description = "Availability term (e.g. open today, 24_7)") @RequestParam(required = false) String availability,
            @Parameter(description = "Verification status filter") @RequestParam(required = false) VerificationStatus verificationStatus,
            @Parameter(description = "Active status filter") @RequestParam(required = false) Boolean isActive,
            @Parameter(description = "Free-text search keyword across name, description, address") @RequestParam(required = false, name = "q") String query,
            @Parameter(description = "Page number (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size (1-100)") @RequestParam(defaultValue = "20") int size,
            @Parameter(description = "Sort field and direction") @RequestParam(defaultValue = "name,asc") String sort
    ) {
        int safeSize = Math.min(Math.max(1, size), 100);
        Sort sortObj = parseSort(sort);
        Pageable pageable = PageRequest.of(page, safeSize, sortObj);

        Page<ResourceResponseDto> result = resourceService.searchResources(
                category, cost, language, city, availability, verificationStatus, isActive, query, pageable
        );
        return ResponseEntity.ok(PageResponse.from(result));
    }

    @GetMapping("/nearby")
    @Operation(summary = "Find nearby resources by geographical coordinates", description = "Computes great-circle distances using the Haversine formula and returns nearby resources sorted by distance")
    public ResponseEntity<List<ResourceResponseDto>> getNearbyResources(
            @Parameter(description = "Latitude coordinate in decimal degrees", required = true) @RequestParam BigDecimal latitude,
            @Parameter(description = "Longitude coordinate in decimal degrees", required = true) @RequestParam BigDecimal longitude,
            @Parameter(description = "Search radius in kilometers (default: 15.0)") @RequestParam(defaultValue = "15.0") Double radius
    ) {
        List<ResourceResponseDto> list = resourceService.findNearbyResources(latitude, longitude, radius);
        return ResponseEntity.ok(list);
    }

    private Sort parseSort(String sortParam) {
        if (sortParam == null || sortParam.trim().isEmpty()) {
            return Sort.by("name").ascending();
        }
        String[] parts = sortParam.split(",");
        String property = parts[0].trim();
        Sort.Direction direction = (parts.length > 1 && parts[1].trim().equalsIgnoreCase("desc"))
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        return Sort.by(direction, property);
    }
}
