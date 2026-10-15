package com.recoveryconnect.repository;

import com.recoveryconnect.entity.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class VerificationHistoryRepositoryTest {

    @Autowired
    private VerificationHistoryRepository historyRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    private Resource resource;
    private User admin;

    @BeforeEach
    void setUp() {
        Category cat = categoryRepository.save(Category.builder().name("Campus Support").build());

        resource = resourceRepository.save(Resource.builder()
                .name("Campus Guidance Post")
                .category(cat)
                .city("Vellore")
                .state("Tamil Nadu")
                .cost("Free")
                .verificationStatus(VerificationStatus.PENDING)
                .build());

        admin = userRepository.save(User.builder()
                .name("Admin")
                .email("admin@test.local")
                .passwordHash("hash")
                .role(Role.ADMIN)
                .build());
    }

    @Test
    @DisplayName("Should maintain append-only audit trail across verification lifecycle transitions")
    void testAppendOnlyVerificationAuditTrail() {
        // Stage 1: Added -> PENDING
        historyRepository.save(VerificationHistory.builder()
                .resource(resource)
                .status(VerificationStatus.PENDING)
                .source("Initial entry")
                .notes("Resource created")
                .verifiedBy(admin)
                .verifiedAt(LocalDateTime.now().minusDays(2))
                .build());

        // Stage 2: SOURCE_CHECKED
        historyRepository.save(VerificationHistory.builder()
                .resource(resource)
                .status(VerificationStatus.SOURCE_CHECKED)
                .source("University Directory")
                .notes("Phone number confirmed")
                .verifiedBy(admin)
                .verifiedAt(LocalDateTime.now().minusDays(1))
                .build());

        // Stage 3: VERIFIED
        historyRepository.save(VerificationHistory.builder()
                .resource(resource)
                .status(VerificationStatus.VERIFIED)
                .source("Official website")
                .notes("All fields verified and published")
                .verifiedBy(admin)
                .verifiedAt(LocalDateTime.now())
                .build());

        List<VerificationHistory> history = historyRepository.findByResourceIdOrderByVerifiedAtDesc(resource.getId());

        assertThat(history).hasSize(3);
        assertThat(history.get(0).getStatus()).isEqualTo(VerificationStatus.VERIFIED);
        assertThat(history.get(1).getStatus()).isEqualTo(VerificationStatus.SOURCE_CHECKED);
        assertThat(history.get(2).getStatus()).isEqualTo(VerificationStatus.PENDING);
    }
}
