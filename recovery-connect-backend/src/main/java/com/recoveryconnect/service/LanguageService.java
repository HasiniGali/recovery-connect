package com.recoveryconnect.service;

import com.recoveryconnect.dto.LanguageDto;
import com.recoveryconnect.entity.Language;
import com.recoveryconnect.repository.LanguageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LanguageService {

    private final LanguageRepository languageRepository;

    public LanguageService(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
    }

    @Transactional(readOnly = true)
    public List<LanguageDto> getAllLanguages() {
        return languageRepository.findAll().stream()
                .map(lang -> LanguageDto.builder()
                        .id(lang.getId())
                        .name(lang.getName())
                        .code(lang.getCode())
                        .build())
                .toList();
    }
}
