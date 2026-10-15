package com.recoveryconnect.repository;

import com.recoveryconnect.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {
    Optional<Language> findByCodeIgnoreCase(String code);
    Optional<Language> findByNameIgnoreCase(String name);
}
