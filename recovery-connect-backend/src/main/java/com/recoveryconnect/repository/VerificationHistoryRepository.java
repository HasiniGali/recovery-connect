package com.recoveryconnect.repository;

import com.recoveryconnect.entity.VerificationHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VerificationHistoryRepository extends JpaRepository<VerificationHistory, Long> {

    List<VerificationHistory> findByResourceIdOrderByVerifiedAtDesc(Long resourceId);

    Page<VerificationHistory> findAllByOrderByVerifiedAtDesc(Pageable pageable);
}
