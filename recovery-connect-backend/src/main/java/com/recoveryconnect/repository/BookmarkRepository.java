package com.recoveryconnect.repository;

import com.recoveryconnect.entity.Bookmark;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Page<Bookmark> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    Optional<Bookmark> findByUserIdAndResourceId(Long userId, Long resourceId);

    boolean existsByUserIdAndResourceId(Long userId, Long resourceId);

    void deleteByUserIdAndResourceId(Long userId, Long resourceId);

    long countByUserId(Long userId);

    long countByResourceId(Long resourceId);
}
