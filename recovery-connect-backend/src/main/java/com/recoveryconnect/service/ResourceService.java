package com.recoveryconnect.service;

import com.recoveryconnect.dto.*;
import com.recoveryconnect.entity.*;
import com.recoveryconnect.exception.InvalidRequestException;
import com.recoveryconnect.exception.ResourceNotFoundException;
import com.recoveryconnect.repository.*;
import com.recoveryconnect.util.GeoUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class ResourceService {

    private final ResourceRepository resourceRepository;
    private final CategoryRepository categoryRepository;
    private final LanguageRepository languageRepository;
    private final UserRepository userRepository;
    private final VerificationHistoryRepository verificationHistoryRepository;

    public ResourceService(
            ResourceRepository resourceRepository,
            CategoryRepository categoryRepository,
            LanguageRepository languageRepository,
            UserRepository userRepository,
            VerificationHistoryRepository verificationHistoryRepository
    ) {
        this.resourceRepository = resourceRepository;
        this.categoryRepository = categoryRepository;
        this.languageRepository = languageRepository;
        this.userRepository = userRepository;
        this.verificationHistoryRepository = verificationHistoryRepository;
    }

    @Transactional(readOnly = true)
    public Page<ResourceResponseDto> getAllActiveResources(Pageable pageable) {
        return resourceRepository.findByIsActiveTrue(pageable)
                .map(r -> mapToDto(r, null));
    }

    @Transactional(readOnly = true)
    public Page<ResourceResponseDto> getAllResourcesAdmin(Pageable pageable) {
        return resourceRepository.findAll(pageable)
                .map(r -> mapToDto(r, null));
    }

    @Transactional(readOnly = true)
    public ResourceResponseDto getResourceById(Long id) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with ID: " + id));
        return mapToDto(resource, null);
    }

    @Transactional(readOnly = true)
    public Page<ResourceResponseDto> searchResources(
            String category,
            String cost,
            String language,
            String city,
            String availability,
            VerificationStatus verificationStatus,
            Boolean isActive,
            String query,
            Pageable pageable
    ) {
        Boolean effectiveActive = isActive != null ? isActive : true;

        Specification<Resource> spec = ResourceSpecification.filterByCriteria(
                category, cost, language, city, availability, verificationStatus, effectiveActive, query
        );

        return resourceRepository.findAll(spec, pageable)
                .map(r -> mapToDto(r, null));
    }

    @Transactional(readOnly = true)
    public List<ResourceResponseDto> findNearbyResources(BigDecimal userLat, BigDecimal userLon, Double radiusKm) {
        if (userLat == null || userLon == null) {
            throw new InvalidRequestException("Latitude and longitude must be provided for nearby resource search");
        }

        double maxRadius = (radiusKm != null && radiusKm > 0) ? radiusKm : 15.0;

        List<Resource> activeResources = resourceRepository.findAll().stream()
                .filter(r -> Boolean.TRUE.equals(r.getIsActive()))
                .filter(r -> r.getLatitude() != null && r.getLongitude() != null)
                .toList();

        List<ResourceResponseDto> nearbyList = new ArrayList<>();

        for (Resource r : activeResources) {
            Double distance = GeoUtils.calculateDistanceKm(userLat, userLon, r.getLatitude(), r.getLongitude());
            if (distance != null && distance <= maxRadius) {
                nearbyList.add(mapToDto(r, distance));
            }
        }

        nearbyList.sort(Comparator.comparing(ResourceResponseDto::getDistanceKm));
        return nearbyList;
    }

    @Transactional
    public ResourceResponseDto createResource(CreateResourceRequest req, String adminEmail) {
        Category category = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new InvalidRequestException("Category not found with ID: " + req.getCategoryId()));

        Set<Language> languages = new HashSet<>();
        if (req.getLanguageIds() != null && !req.getLanguageIds().isEmpty()) {
            languages.addAll(languageRepository.findAllById(req.getLanguageIds()));
        } else {
            languageRepository.findByCodeIgnoreCase("en").ifPresent(languages::add);
            languageRepository.findByCodeIgnoreCase("ta").ifPresent(languages::add);
        }

        Resource resource = Resource.builder()
                .name(req.getName().trim())
                .description(req.getDescription())
                .category(category)
                .languages(languages)
                .phone(req.getPhone())
                .website(req.getWebsite())
                .address(req.getAddress())
                .city(req.getCity().trim())
                .state(req.getState().trim())
                .postalCode(req.getPostalCode())
                .latitude(req.getLatitude())
                .longitude(req.getLongitude())
                .cost(req.getCost() != null ? req.getCost().trim() : "Free")
                .eligibility(req.getEligibility())
                .availability(req.getAvailability())
                .accessibility(req.getAccessibility())
                .sourceUrl(req.getSourceUrl())
                .verificationStatus(VerificationStatus.PENDING)
                .isActive(true)
                .isSynthetic(req.getIsSynthetic() != null ? req.getIsSynthetic() : true)
                .build();

        resource = resourceRepository.save(resource);

        User adminUser = adminEmail != null ? userRepository.findByEmail(adminEmail).orElse(null) : null;
        VerificationHistory initialHistory = VerificationHistory.builder()
                .resource(resource)
                .status(VerificationStatus.PENDING)
                .source(req.getSourceUrl() != null ? req.getSourceUrl() : "Admin submission")
                .notes("Resource created and queued for initial verification review.")
                .verifiedBy(adminUser)
                .verifiedAt(LocalDateTime.now())
                .build();
        verificationHistoryRepository.save(initialHistory);

        return mapToDto(resource, null);
    }

    @Transactional
    public ResourceResponseDto updateResource(Long id, UpdateResourceRequest req) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with ID: " + id));

        if (req.getName() != null) resource.setName(req.getName().trim());
        if (req.getDescription() != null) resource.setDescription(req.getDescription());
        if (req.getPhone() != null) resource.setPhone(req.getPhone());
        if (req.getWebsite() != null) resource.setWebsite(req.getWebsite());
        if (req.getAddress() != null) resource.setAddress(req.getAddress());
        if (req.getCity() != null) resource.setCity(req.getCity().trim());
        if (req.getState() != null) resource.setState(req.getState().trim());
        if (req.getPostalCode() != null) resource.setPostalCode(req.getPostalCode());
        if (req.getLatitude() != null) resource.setLatitude(req.getLatitude());
        if (req.getLongitude() != null) resource.setLongitude(req.getLongitude());
        if (req.getCost() != null) resource.setCost(req.getCost().trim());
        if (req.getEligibility() != null) resource.setEligibility(req.getEligibility());
        if (req.getAvailability() != null) resource.setAvailability(req.getAvailability());
        if (req.getAccessibility() != null) resource.setAccessibility(req.getAccessibility());
        if (req.getSourceUrl() != null) resource.setSourceUrl(req.getSourceUrl());
        if (req.getIsActive() != null) resource.setIsActive(req.getIsActive());
        if (req.getIsSynthetic() != null) resource.setIsSynthetic(req.getIsSynthetic());

        if (req.getCategoryId() != null) {
            Category category = categoryRepository.findById(req.getCategoryId())
                    .orElseThrow(() -> new InvalidRequestException("Category not found with ID: " + req.getCategoryId()));
            resource.setCategory(category);
        }

        if (req.getLanguageIds() != null) {
            Set<Language> languages = new HashSet<>(languageRepository.findAllById(req.getLanguageIds()));
            resource.setLanguages(languages);
        }

        resource.setLastUpdated(LocalDateTime.now());
        resource = resourceRepository.save(resource);
        return mapToDto(resource, null);
    }

    @Transactional
    public ResourceResponseDto updateVerificationStatus(Long id, UpdateVerificationStatusRequest req, String adminEmail) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with ID: " + id));

        User adminUser = adminEmail != null ? userRepository.findByEmail(adminEmail).orElse(null) : null;

        resource.setVerificationStatus(req.getStatus());
        resource.setVerificationDate(LocalDateTime.now());
        resource.setLastUpdated(LocalDateTime.now());
        resource = resourceRepository.save(resource);

        VerificationHistory history = VerificationHistory.builder()
                .resource(resource)
                .status(req.getStatus())
                .source(req.getSource() != null ? req.getSource() : resource.getSourceUrl())
                .notes(req.getNotes())
                .verifiedBy(adminUser)
                .verifiedAt(LocalDateTime.now())
                .build();
        verificationHistoryRepository.save(history);

        return mapToDto(resource, null);
    }

    @Transactional
    public ResourceResponseDto deactivateResource(Long id, String adminEmail) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with ID: " + id));

        resource.setIsActive(false);
        resource.setVerificationStatus(VerificationStatus.ARCHIVED);
        resource.setLastUpdated(LocalDateTime.now());
        resource = resourceRepository.save(resource);

        User adminUser = adminEmail != null ? userRepository.findByEmail(adminEmail).orElse(null) : null;
        VerificationHistory history = VerificationHistory.builder()
                .resource(resource)
                .status(VerificationStatus.ARCHIVED)
                .source("Admin management action")
                .notes("Resource deactivated and archived by admin.")
                .verifiedBy(adminUser)
                .verifiedAt(LocalDateTime.now())
                .build();
        verificationHistoryRepository.save(history);

        return mapToDto(resource, null);
    }

    public ResourceResponseDto mapToDto(Resource r, Double distanceKm) {
        List<String> langNames = r.getLanguages().stream()
                .map(Language::getName)
                .sorted()
                .toList();

        return ResourceResponseDto.builder()
                .id(r.getId())
                .name(r.getName())
                .description(r.getDescription())
                .category(r.getCategory() != null ? r.getCategory().getName() : null)
                .categoryId(r.getCategory() != null ? r.getCategory().getId() : null)
                .languages(langNames)
                .phone(r.getPhone())
                .website(r.getWebsite())
                .address(r.getAddress())
                .city(r.getCity())
                .state(r.getState())
                .postalCode(r.getPostalCode())
                .latitude(r.getLatitude())
                .longitude(r.getLongitude())
                .cost(r.getCost())
                .eligibility(r.getEligibility())
                .availability(r.getAvailability())
                .accessibility(r.getAccessibility())
                .sourceUrl(r.getSourceUrl())
                .verificationStatus(r.getVerificationStatus())
                .verificationDate(r.getVerificationDate())
                .lastUpdated(r.getLastUpdated())
                .isActive(r.getIsActive())
                .isSynthetic(r.getIsSynthetic())
                .distanceKm(distanceKm)
                .build();
    }
}
