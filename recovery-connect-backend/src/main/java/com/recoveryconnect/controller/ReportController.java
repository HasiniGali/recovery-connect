package com.recoveryconnect.controller;

import com.recoveryconnect.dto.ReportDto;
import com.recoveryconnect.entity.User;
import com.recoveryconnect.repository.UserRepository;
import com.recoveryconnect.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
@Tag(name = "Community Reports", description = "Public endpoints for reporting incorrect, outdated, or broken resource information")
public class ReportController {

    private final ReportService reportService;
    private final UserRepository userRepository;

    public ReportController(ReportService reportService, UserRepository userRepository) {
        this.reportService = reportService;
        this.userRepository = userRepository;
    }

    @PostMapping
    @Operation(summary = "Submit resource accuracy report", description = "Submits an accuracy correction report for a resource. Supports both anonymous submissions and authenticated users.")
    public ResponseEntity<ReportDto.Response> submitReport(
            @Valid @RequestBody ReportDto.Create request,
            Authentication authentication
    ) {
        Long optionalUserId = null;
        if (authentication != null && authentication.isAuthenticated() && !authentication.getName().equalsIgnoreCase("anonymousUser")) {
            optionalUserId = userRepository.findByEmail(authentication.getName())
                    .map(User::getId)
                    .orElse(null);
        }

        ReportDto.Response response = reportService.submitReport(request, optionalUserId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
