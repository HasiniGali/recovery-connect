package com.recoveryconnect.service;

import com.recoveryconnect.dto.ResourceResponseDto;
import com.recoveryconnect.entity.*;
import com.recoveryconnect.repository.CategoryRepository;
import com.recoveryconnect.repository.LanguageRepository;
import com.recoveryconnect.repository.ResourceRepository;
import com.recoveryconnect.repository.UserRepository;
import com.recoveryconnect.repository.VerificationHistoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class ResourceSearchTest {

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private LanguageRepository languageRepository;

    private Category counselling;
    private Category recovery;
    private Language tamil;
    private Language english;

    @BeforeEach
    void setUp() {
        counselling = categoryRepository.save(Category.builder().name("Counselling").build());
        recovery = categoryRepository.save(Category.builder().name("Recovery Support").build());
        tamil = languageRepository.save(Language.builder().name("Tamil").code("ta").build());
        english = languageRepository.save(Language.builder().name("English").code("en").build());

        // 1. Target resource (Vellore, Free, Tamil, Counselling, Verified, Open today)
        resourceRepository.save(Resource.builder()
                .name("Vellore Community Mental Wellness Circle")
                .description("Free Tamil psychological counselling center")
                .category(counselling)
                .languages(Set.of(tamil, english))
                .city("Vellore")
                .state("Tamil Nadu")
                .cost("Free")
                .availability("Open today · Mon-Sat")
                .latitude(BigDecimal.valueOf(12.9246))
                .longitude(BigDecimal.valueOf(79.1348))
                .verificationStatus(VerificationStatus.VERIFIED)
                .verificationDate(LocalDateTime.now())
                .isActive(true)
                .isSynthetic(true)
                .build());

        // 2. Different cost (Paid / Subsidized)
        resourceRepository.save(Resource.builder()
                .name("Private Specialist Clinic")
                .category(counselling)
                .languages(Set.of(tamil, english))
                .city("Vellore")
                .state("Tamil Nadu")
                .cost("Paid")
                .availability("Open today")
                .latitude(BigDecimal.valueOf(12.9300))
                .longitude(BigDecimal.valueOf(79.1400))
                .verificationStatus(VerificationStatus.VERIFIED)
                .isActive(true)
                .isSynthetic(true)
                .build());

        // 3. Different location (Chennai)
        resourceRepository.save(Resource.builder()
                .name("Chennai Recovery Group")
                .category(recovery)
                .languages(Set.of(tamil))
                .city("Chennai")
                .state("Tamil Nadu")
                .cost("Free")
                .availability("24_7")
                .latitude(BigDecimal.valueOf(13.0827))
                .longitude(BigDecimal.valueOf(80.2707))
                .verificationStatus(VerificationStatus.VERIFIED)
                .isActive(true)
                .isSynthetic(true)
                .build());
    }

    @Test
    @DisplayName("Should execute Hero Query search: Free + Tamil + Vellore + Counselling + Verified + Open today")
    void testHeroSearchCombination() {
        Page<ResourceResponseDto> results = resourceService.searchResources(
                "Counselling",
                "Free",
                "Tamil",
                "Vellore",
                "Open today",
                VerificationStatus.VERIFIED,
                true,
                null,
                PageRequest.of(0, 10)
        );

        assertThat(results.getTotalElements()).isEqualTo(1);
        ResourceResponseDto matched = results.getContent().get(0);
        assertThat(matched.getName()).isEqualTo("Vellore Community Mental Wellness Circle");
        assertThat(matched.getCost()).isEqualTo("Free");
        assertThat(matched.getCity()).isEqualTo("Vellore");
        assertThat(matched.getLanguages()).contains("Tamil");
    }

    @Test
    @DisplayName("Should find nearby resources within radius using Haversine calculation")
    void testNearbyResourceSearch() {
        // User is at Katpadi (12.9698, 79.1432)
        BigDecimal katpadiLat = BigDecimal.valueOf(12.9698);
        BigDecimal katpadiLon = BigDecimal.valueOf(79.1432);

        // Within 15km, should find Vellore centers (~5km away), but NOT Chennai (~125km away)
        List<ResourceResponseDto> nearby = resourceService.findNearbyResources(katpadiLat, katpadiLon, 15.0);

        assertThat(nearby).isNotEmpty();
        assertThat(nearby).allMatch(r -> r.getDistanceKm() <= 15.0);
        assertThat(nearby).noneMatch(r -> r.getName().contains("Chennai"));
    }
}
