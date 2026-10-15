package com.recoveryconnect.service;

import com.recoveryconnect.dto.ReportDto;
import com.recoveryconnect.entity.*;
import com.recoveryconnect.exception.ResourceNotFoundException;
import com.recoveryconnect.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final ResourceRepository resourceRepository;
    private final UserRepository userRepository;
    private final VerificationHistoryRepository verificationHistoryRepository;

    public ReportService(
            ReportRepository reportRepository,
            ResourceRepository resourceRepository,
            UserRepository userRepository,
            VerificationHistoryRepository verificationHistoryRepository
    ) {
        this.reportRepository = reportRepository;
        this.resourceRepository = resourceRepository;
        this.userRepository = userRepository;
        this.verificationHistoryRepository = verificationHistoryRepository;
    }

    @Transactional
    public ReportDto.Response submitReport(ReportDto.Create req, Long optionalUserId) {
        Resource resource = resourceRepository.findById(req.getResourceId())
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with ID: " + req.getResourceId()));

        User user = optionalUserId != null ? userRepository.findById(optionalUserId).orElse(null) : null;

        Report report = Report.builder()
                .resource(resource)
                .user(user)
                .reason(req.getReason())
                .description(req.getDescription())
                .status(ReportStatus.OPEN)
                .build();

        report = reportRepository.save(report);

        // Flag resource as NEEDS_UPDATE if it was verified, so administrators inspect it
        if (resource.getVerificationStatus() == VerificationStatus.VERIFIED) {
            resource.setVerificationStatus(VerificationStatus.NEEDS_UPDATE);
            resource.setLastUpdated(LocalDateTime.now());
            resourceRepository.save(resource);
        }

        return mapToDto(report);
    }

    @Transactional(readOnly = true)
    public Page<ReportDto.Response> getAllReports(ReportStatus status, Pageable pageable) {
        if (status != null) {
            return reportRepository.findByStatus(status, pageable).map(this::mapToDto);
        }
        return reportRepository.findAll(pageable).map(this::mapToDto);
    }

    @Transactional
    public ReportDto.Response resolveReport(Long reportId, ReportDto.Resolve req, String adminEmail) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with ID: " + reportId));

        User adminUser = adminEmail != null ? userRepository.findByEmail(adminEmail).orElse(null) : null;

        report.setStatus(req.getStatus());
        report.setResolvedAt(LocalDateTime.now());
        report.setResolvedBy(adminUser);
        report.setResolutionNotes(req.getResolutionNotes());
        report = reportRepository.save(report);

        Resource resource = report.getResource();
        if (req.getStatus() == ReportStatus.RESOLVED && resource.getVerificationStatus() == VerificationStatus.NEEDS_UPDATE) {
            resource.setVerificationStatus(VerificationStatus.VERIFIED);
            resource.setVerificationDate(LocalDateTime.now());
            resource.setLastUpdated(LocalDateTime.now());
            resourceRepository.save(resource);

            VerificationHistory history = VerificationHistory.builder()
                    .resource(resource)
                    .status(VerificationStatus.VERIFIED)
                    .source("Community report resolution #" + report.getId())
                    .notes("Resolved community report regarding " + report.getReason() + ". " + req.getResolutionNotes())
                    .verifiedBy(adminUser)
                    .verifiedAt(LocalDateTime.now())
                    .build();
            verificationHistoryRepository.save(history);
        }

        return mapToDto(report);
    }

    private ReportDto.Response mapToDto(Report r) {
        return ReportDto.Response.builder()
                .id(r.getId())
                .resourceId(r.getResource().getId())
                .resourceName(r.getResource().getName())
                .reason(r.getReason())
                .description(r.getDescription())
                .status(r.getStatus())
                .createdAt(r.getCreatedAt())
                .resolvedAt(r.getResolvedAt())
                .resolvedBy(r.getResolvedBy() != null ? r.getResolvedBy().getName() : null)
                .resolutionNotes(r.getResolutionNotes())
                .build();
    }
}
