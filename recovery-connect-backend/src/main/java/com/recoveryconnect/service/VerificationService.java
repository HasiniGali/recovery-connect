package com.recoveryconnect.service;

import com.recoveryconnect.dto.VerificationHistoryResponse;
import com.recoveryconnect.entity.VerificationHistory;
import com.recoveryconnect.repository.VerificationHistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VerificationService {

    private final VerificationHistoryRepository historyRepository;

    public VerificationService(VerificationHistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    @Transactional(readOnly = true)
    public List<VerificationHistoryResponse> getHistoryByResourceId(Long resourceId) {
        return historyRepository.findByResourceIdOrderByVerifiedAtDesc(resourceId).stream()
                .map(this::mapToDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public Page<VerificationHistoryResponse> getAllHistory(Pageable pageable) {
        return historyRepository.findAllByOrderByVerifiedAtDesc(pageable)
                .map(this::mapToDto);
    }

    private VerificationHistoryResponse mapToDto(VerificationHistory vh) {
        return VerificationHistoryResponse.builder()
                .id(vh.getId())
                .resourceId(vh.getResource().getId())
                .resourceName(vh.getResource().getName())
                .status(vh.getStatus())
                .source(vh.getSource())
                .notes(vh.getNotes())
                .verifiedBy(vh.getVerifiedBy() != null ? vh.getVerifiedBy().getName() : "System Admin")
                .verifiedAt(vh.getVerifiedAt())
                .build();
    }
}
