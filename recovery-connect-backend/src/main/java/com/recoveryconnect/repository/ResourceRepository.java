package com.recoveryconnect.repository;

import com.recoveryconnect.entity.Resource;
import com.recoveryconnect.entity.VerificationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long>, JpaSpecificationExecutor<Resource> {

    Page<Resource> findByIsActiveTrue(Pageable pageable);

    Page<Resource> findByIsActiveTrueAndVerificationStatus(VerificationStatus status, Pageable pageable);

    long countByIsActiveTrue();

    long countByVerificationStatus(VerificationStatus status);

    long countByIsActiveTrueAndVerificationStatus(VerificationStatus status);

    @Query("SELECT r.category.name AS category, COUNT(r) AS count FROM Resource r WHERE r.isActive = true GROUP BY r.category.name")
    List<Map<String, Object>> countResourcesByCategory();

    @Query("SELECT r.city AS city, COUNT(r) AS count FROM Resource r WHERE r.isActive = true GROUP BY r.city")
    List<Map<String, Object>> countResourcesByCity();

    @Query("SELECT r.verificationStatus AS status, COUNT(r) AS count FROM Resource r GROUP BY r.verificationStatus")
    List<Map<String, Object>> countResourcesByVerificationStatus();

    @Query("SELECT l.name AS language, COUNT(DISTINCT r.id) AS count " +
           "FROM Resource r JOIN r.languages l " +
           "WHERE r.isActive = true " +
           "GROUP BY l.name")
    List<Map<String, Object>> countResourcesByLanguage();
}
