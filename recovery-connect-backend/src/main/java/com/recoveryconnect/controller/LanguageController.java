package com.recoveryconnect.controller;

import com.recoveryconnect.dto.LanguageDto;
import com.recoveryconnect.service.LanguageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/languages")
@Tag(name = "Languages", description = "Public endpoints for retrieving supported regional languages")
public class LanguageController {

    private final LanguageService languageService;

    public LanguageController(LanguageService languageService) {
        this.languageService = languageService;
    }

    @GetMapping
    @Operation(summary = "Get all supported languages", description = "Returns all languages supported for recovery resource filtering (e.g. English, Tamil, Hindi, Telugu, etc.)")
    public ResponseEntity<List<LanguageDto>> getLanguages() {
        return ResponseEntity.ok(languageService.getAllLanguages());
    }
}
