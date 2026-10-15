package com.recoveryconnect.repository;

import com.recoveryconnect.entity.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class ResourceRepositoryTest {

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private LanguageRepository languageRepository;

    private Category counsellingCategory;
    private Language tamilLanguage;
    private Language englishLanguage;

    @BeforeEach
    void setUp() {
        counsellingCategory = categoryRepository.save(Category.builder()
                .name("Counselling")
                .description("One-on-one therapy")
                .build());

        tamilLanguage = languageRepository.save(Language.builder()
                .name("Tamil")
                .code("ta")
                .build());

        englishLanguage = languageRepository.save(Language.builder()
                .name("English")
                .code("en")
                .build());
    }

    @Test
    @DisplayName("Should create and retrieve a verified synthetic resource")
    void testCreateAndRetrieveResource() {
        Resource resource = Resource.builder()
                .name("Vellore Community Mental Wellness Circle")
                .description("Synthetic demo resource for youth counseling")
                .category(counsellingCategory)
                .languages(Set.of(tamilLanguage, englishLanguage))
                .city("Vellore")
                .state("Tamil Nadu")
                .cost("Free")
                .availability("Open today")
                .latitude(BigDecimal.valueOf(12.9246))
                .longitude(BigDecimal.valueOf(79.1348))
                .verificationStatus(VerificationStatus.VERIFIED)
                .verificationDate(LocalDateTime.now())
                .isActive(true)
                .isSynthetic(true)
                .build();

        Resource saved = resourceRepository.save(resource);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getName()).isEqualTo("Vellore Community Mental Wellness Circle");
        assertThat(saved.getIsSynthetic()).isTrue();
        assertThat(saved.getVerificationStatus()).isEqualTo(VerificationStatus.VERIFIED);
        assertThat(saved.getLanguages()).hasSize(2);
    }

    @Test
    @DisplayName("Should filter resources dynamically using ResourceSpecification (Category, Cost, Language, City, Verified)")
    void testDynamicSpecificationFiltering() {
        // Resource 1: Matches all filters
        Resource r1 = Resource.builder()
                .name("Vellore Community Mental Wellness Circle")
                .category(counsellingCategory)
                .languages(Set.of(tamilLanguage, englishLanguage))
                .city("Vellore")
                .state("Tamil Nadu")
                .cost("Free")
                .availability("Open today")
                .verificationStatus(VerificationStatus.VERIFIED)
                .isActive(true)
                .isSynthetic(true)
                .build();
        resourceRepository.save(r1);

        // Resource 2: Different city (Chennai)
        Resource r2 = Resource.builder()
                .name("Chennai Mental Center")
                .category(counsellingCategory)
                .languages(Set.of(tamilLanguage))
                .city("Chennai")
                .state("Tamil Nadu")
                .cost("Free")
                .verificationStatus(VerificationStatus.VERIFIED)
                .isActive(true)
                .isSynthetic(true)
                .build();
        resourceRepository.save(r2);

        // Execute Specification for Free Tamil Counselling in Vellore with VERIFIED status
        Specification<Resource> spec = ResourceSpecification.filterByCriteria(
                "Counselling", "Free", "Tamil", "Vellore", "Open today", VerificationStatus.VERIFIED, true, null
        );

        Page<Resource> results = resourceRepository.findAll(spec, PageRequest.of(0, 10));

        assertThat(results.getTotalElements()).isEqualTo(1);
        assertThat(results.getContent().get(0).getName()).isEqualTo("Vellore Community Mental Wellness Circle");
    }

    @Test
    @DisplayName("Should paginate results correctly and respect sorting")
    void testPaginationAndSorting() {
        for (int i = 1; i <= 25; i++) {
            resourceRepository.save(Resource.builder()
                    .name("Resource " + String.format("%02d", i))
                    .category(counsellingCategory)
                    .city("Vellore")
                    .state("Tamil Nadu")
                    .cost("Free")
                    .verificationStatus(VerificationStatus.VERIFIED)
                    .isActive(true)
                    .isSynthetic(true)
                    .build());
        }

        Page<Resource> page1 = resourceRepository.findAll(PageRequest.of(0, 10, Sort.by("name").ascending()));
        assertThat(page1.getContent()).hasSize(10);
        assertThat(page1.getTotalElements()).isEqualTo(25);
        assertThat(page1.getTotalPages()).isEqualTo(3);
        assertThat(page1.getContent().get(0).getName()).isEqualTo("Resource 01");
    }

    @Test
    @DisplayName("Should soft-deactivate resource and mark status ARCHIVED")
    void testDeactivateResource() {
        Resource r = resourceRepository.save(Resource.builder()
                .name("Temporary Support Post")
                .category(counsellingCategory)
                .city("Vellore")
                .state("Tamil Nadu")
                .cost("Free")
                .verificationStatus(VerificationStatus.VERIFIED)
                .isActive(true)
                .isSynthetic(true)
                .build());

        r.setIsActive(false);
        r.setVerificationStatus(VerificationStatus.ARCHIVED);
        resourceRepository.save(r);

        Resource updated = resourceRepository.findById(r.getId()).orElseThrow();
        assertThat(updated.getIsActive()).isFalse();
        assertThat(updated.getVerificationStatus()).isEqualTo(VerificationStatus.ARCHIVED);
    }
}
