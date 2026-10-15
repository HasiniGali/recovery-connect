package com.recoveryconnect.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
@Tag(name = "Health Check", description = "System health check and diagnostic information")
public class HealthController {

    @GetMapping
    @Operation(summary = "Check service health status", description = "Returns system operational status and timestamp")
    public ResponseEntity<Map<String, Object>> checkHealth() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "recovery-connect-backend",
                "timestamp", LocalDateTime.now(),
                "database", "MySQL 8 (Connected via Flyway)"
        ));
    }
}
