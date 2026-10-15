package com.recoveryconnect.repository;

import com.recoveryconnect.entity.Report;
import com.recoveryconnect.entity.ReportStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    Page<Report> findByStatus(ReportStatus status, Pageable pageable);

    Page<Report> findByResourceId(Long resourceId, Pageable pageable);

    long countByStatus(ReportStatus status);

    @Query("SELECT r.reason AS reason, COUNT(r) AS count FROM Report r GROUP BY r.reason")
    List<Map<String, Object>> countReportsByReason();

    @Query("SELECT r.status AS status, COUNT(r) AS count FROM Report r GROUP BY r.status")
    List<Map<String, Object>> countReportsByStatus();
}
