package com.recoveryconnect.repository;

import com.recoveryconnect.entity.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class ReportRepositoryTest {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    private Resource sampleResource;
    private User adminUser;
    private User studentUser;

    @BeforeEach
    void setUp() {
        Category cat = categoryRepository.save(Category.builder().name("Counselling").build());

        sampleResource = resourceRepository.save(Resource.builder()
                .name("Katpadi Health Post")
                .category(cat)
                .city("Vellore")
                .state("Tamil Nadu")
                .cost("Free")
                .verificationStatus(VerificationStatus.VERIFIED)
                .isActive(true)
                .isSynthetic(true)
                .build());

        adminUser = userRepository.save(User.builder()
                .name("Admin User")
                .email("admin@test.local")
                .passwordHash("hashed")
                .role(Role.ADMIN)
                .build());

        studentUser = userRepository.save(User.builder()
                .name("Student User")
                .email("student@test.local")
                .passwordHash("hashed")
                .role(Role.USER)
                .build());
    }

    @Test
    @DisplayName("Should submit anonymous community report (user_id is nullable)")
    void testCreateAnonymousReport() {
        Report report = Report.builder()
                .resource(sampleResource)
                .user(null) // Anonymous
                .reason(ReportReason.HOURS_INCORRECT)
                .description("Center is closed on Saturdays.")
                .status(ReportStatus.OPEN)
                .build();

        Report saved = reportRepository.save(report);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getUser()).isNull();
        assertThat(saved.getReason()).isEqualTo(ReportReason.HOURS_INCORRECT);
        assertThat(saved.getStatus()).isEqualTo(ReportStatus.OPEN);
    }

    @Test
    @DisplayName("Should submit authenticated report and retrieve by status")
    void testCreateAuthenticatedReport() {
        Report report = Report.builder()
                .resource(sampleResource)
                .user(studentUser)
                .reason(ReportReason.PHONE_NUMBER_INCORRECT)
                .description("Line disconnected during morning hours.")
                .status(ReportStatus.OPEN)
                .build();

        reportRepository.save(report);

        Page<Report> openReports = reportRepository.findByStatus(ReportStatus.OPEN, PageRequest.of(0, 10));
        assertThat(openReports.getTotalElements()).isEqualTo(1);
        assertThat(openReports.getContent().get(0).getUser().getEmail()).isEqualTo("student@test.local");
    }

    @Test
    @DisplayName("Should resolve report and update resolution notes")
    void testResolveReport() {
        Report report = reportRepository.save(Report.builder()
                .resource(sampleResource)
                .reason(ReportReason.PHONE_NUMBER_INCORRECT)
                .status(ReportStatus.OPEN)
                .build());

        report.setStatus(ReportStatus.RESOLVED);
        report.setResolvedAt(LocalDateTime.now());
        report.setResolvedBy(adminUser);
        report.setResolutionNotes("Updated contact phone line to official switchboard.");
        reportRepository.save(report);

        Report updated = reportRepository.findById(report.getId()).orElseThrow();
        assertThat(updated.getStatus()).isEqualTo(ReportStatus.RESOLVED);
        assertThat(updated.getResolvedBy().getName()).isEqualTo("Admin User");
        assertThat(updated.getResolutionNotes()).contains("Updated contact phone line");
    }
}
