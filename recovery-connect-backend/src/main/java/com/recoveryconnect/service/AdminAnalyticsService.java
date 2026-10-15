package com.recoveryconnect.service;

import com.recoveryconnect.dto.AdminAnalyticsResponse;
import com.recoveryconnect.entity.ReportStatus;
import com.recoveryconnect.entity.VerificationStatus;
import com.recoveryconnect.repository.ReportRepository;
import com.recoveryconnect.repository.ResourceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminAnalyticsService {

    private final ResourceRepository resourceRepository;
    private final ReportRepository reportRepository;

    public AdminAnalyticsService(ResourceRepository resourceRepository, ReportRepository reportRepository) {
        this.resourceRepository = resourceRepository;
        this.reportRepository = reportRepository;
    }

    @Transactional(readOnly = true)
    public AdminAnalyticsResponse getAnalytics() {
        long total = resourceRepository.count();
        long active = resourceRepository.countByIsActiveTrue();
        long verified = resourceRepository.countByVerificationStatus(VerificationStatus.VERIFIED);
        long pending = resourceRepository.countByVerificationStatus(VerificationStatus.PENDING);
        long underReview = resourceRepository.countByVerificationStatus(VerificationStatus.UNDER_REVIEW);
        long needsUpdate = resourceRepository.countByVerificationStatus(VerificationStatus.NEEDS_UPDATE);
        long openReports = reportRepository.countByStatus(ReportStatus.OPEN);

        return AdminAnalyticsResponse.builder()
                .totalResources(total)
                .activeResources(active)
                .verifiedResources(verified)
                .pendingResources(pending)
                .underReviewResources(underReview)
                .needsUpdateResources(needsUpdate)
                .openReports(openReports)
                .byCategory(resourceRepository.countResourcesByCategory())
                .byCity(resourceRepository.countResourcesByCity())
                .byLanguage(resourceRepository.countResourcesByLanguage())
                .byVerificationStatus(resourceRepository.countResourcesByVerificationStatus())
                .byReportReason(reportRepository.countReportsByReason())
                .build();
    }
}
