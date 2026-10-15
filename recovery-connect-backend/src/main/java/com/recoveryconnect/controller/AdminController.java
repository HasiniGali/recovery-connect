package com.recoveryconnect.controller;

import com.recoveryconnect.dto.*;
import com.recoveryconnect.entity.ReportStatus;
import com.recoveryconnect.service.AdminAnalyticsService;
import com.recoveryconnect.service.ReportService;
import com.recoveryconnect.service.ResourceService;
import com.recoveryconnect.service.VerificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Management", description = "Privileged endpoints for directory administration, resource verification, report resolution, and analytics")
public class AdminController {

    private final ResourceService resourceService;
    private final ReportService reportService;
    private final VerificationService verificationService;
    private final AdminAnalyticsService analyticsService;

    public AdminController(ResourceService resourceService,
                           ReportService reportService,
                           VerificationService verificationService,
                           AdminAnalyticsService analyticsService) {
        this.resourceService = resourceService;
        this.reportService = reportService;
        this.verificationService = verificationService;
        this.analyticsService = analyticsService;
    }

    // 1. Resources Management
    @GetMapping("/resources")
    @Operation(summary = "Admin list all resources", description = "Retrieves all resources including pending, unverified, and archived items with pagination")
    public ResponseEntity<PageResponse<ResourceResponseDto>> getAdminResources(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id,desc") String sort
    ) {
        Pageable pageable = PageRequest.of(page, Math.min(Math.max(1, size), 100), parseSort(sort));
        Page<ResourceResponseDto> result = resourceService.getAllResourcesAdmin(pageable);
        return ResponseEntity.ok(PageResponse.from(result));
    }

    @PostMapping("/resources")
    @Operation(summary = "Create resource", description = "Creates a new directory resource and queues it with an initial PENDING verification audit record")
    public ResponseEntity<ResourceResponseDto> createResource(
            @Valid @RequestBody CreateResourceRequest request,
            Authentication authentication
    ) {
        String adminEmail = authentication != null ? authentication.getName() : null;
        ResourceResponseDto created = resourceService.createResource(request, adminEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/resources/{id}")
    @Operation(summary = "Update resource details", description = "Updates operational metadata, contact points, location, or eligibility for an existing resource")
    public ResponseEntity<ResourceResponseDto> updateResource(
            @PathVariable Long id,
            @Valid @RequestBody UpdateResourceRequest request
    ) {
        ResourceResponseDto updated = resourceService.updateResource(id, request);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/resources/{id}/status")
    @Operation(summary = "Update verification status", description = "Advances or modifies a resource's verification state and appends an immutable audit record to verification_history")
    public ResponseEntity<ResourceResponseDto> updateVerificationStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateVerificationStatusRequest request,
            Authentication authentication
    ) {
        String adminEmail = authentication != null ? authentication.getName() : null;
        ResourceResponseDto updated = resourceService.updateVerificationStatus(id, request, adminEmail);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/resources/{id}")
    @Operation(summary = "Deactivate resource", description = "Soft-deactivates and archives a resource without destroying historical verification records")
    public ResponseEntity<ResourceResponseDto> deactivateResource(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String adminEmail = authentication != null ? authentication.getName() : null;
        ResourceResponseDto archived = resourceService.deactivateResource(id, adminEmail);
        return ResponseEntity.ok(archived);
    }

    // 2. Reports Management
    @GetMapping("/reports")
    @Operation(summary = "Get community reports", description = "Retrieves community accuracy reports, with optional filtering by status (OPEN, UNDER_REVIEW, RESOLVED, REJECTED)")
    public ResponseEntity<PageResponse<ReportDto.Response>> getReports(
            @RequestParam(required = false) ReportStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, Math.min(Math.max(1, size), 100), Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<ReportDto.Response> result = reportService.getAllReports(status, pageable);
        return ResponseEntity.ok(PageResponse.from(result));
    }

    @PatchMapping("/reports/{id}")
    @Operation(summary = "Resolve community report", description = "Updates report status to RESOLVED or REJECTED with resolution notes and restores resource verification if appropriate")
    public ResponseEntity<ReportDto.Response> resolveReport(
            @PathVariable Long id,
            @Valid @RequestBody ReportDto.Resolve request,
            Authentication authentication
    ) {
        String adminEmail = authentication != null ? authentication.getName() : null;
        ReportDto.Response resolved = reportService.resolveReport(id, request, adminEmail);
        return ResponseEntity.ok(resolved);
    }

    // 3. Verification History Audit Trail
    @GetMapping("/verification-history")
    @Operation(summary = "Get verification history audit trail", description = "Returns chronological, append-only verification audit logs for all resources or filtered by resource ID")
    public ResponseEntity<?> getVerificationHistory(
            @RequestParam(required = false) Long resourceId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        if (resourceId != null) {
            List<VerificationHistoryResponse> list = verificationService.getHistoryByResourceId(resourceId);
            return ResponseEntity.ok(list);
        }
        Pageable pageable = PageRequest.of(page, Math.min(Math.max(1, size), 100));
        Page<VerificationHistoryResponse> historyPage = verificationService.getAllHistory(pageable);
        return ResponseEntity.ok(PageResponse.from(historyPage));
    }

    // 4. Admin Analytics
    @GetMapping("/analytics")
    @Operation(summary = "Get admin analytics", description = "Returns database-aggregated counts, verification status breakdowns, discipline distributions, and report metrics")
    public ResponseEntity<AdminAnalyticsResponse> getAnalytics() {
        AdminAnalyticsResponse response = analyticsService.getAnalytics();
        return ResponseEntity.ok(response);
    }

    private Sort parseSort(String sortParam) {
        if (sortParam == null || sortParam.trim().isEmpty()) {
            return Sort.by("id").descending();
        }
        String[] parts = sortParam.split(",");
        String property = parts[0].trim();
        Sort.Direction direction = (parts.length > 1 && parts[1].trim().equalsIgnoreCase("asc"))
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;
        return Sort.by(direction, property);
    }
}
