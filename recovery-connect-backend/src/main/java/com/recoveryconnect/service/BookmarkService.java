package com.recoveryconnect.service;

import com.recoveryconnect.dto.BookmarkDto;
import com.recoveryconnect.entity.Bookmark;
import com.recoveryconnect.entity.Resource;
import com.recoveryconnect.entity.User;
import com.recoveryconnect.exception.DuplicateBookmarkException;
import com.recoveryconnect.exception.ResourceNotFoundException;
import com.recoveryconnect.repository.BookmarkRepository;
import com.recoveryconnect.repository.ResourceRepository;
import com.recoveryconnect.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    private final ResourceRepository resourceRepository;
    private final ResourceService resourceService;

    public BookmarkService(
            BookmarkRepository bookmarkRepository,
            UserRepository userRepository,
            ResourceRepository resourceRepository,
            ResourceService resourceService
    ) {
        this.bookmarkRepository = bookmarkRepository;
        this.userRepository = userRepository;
        this.resourceRepository = resourceRepository;
        this.resourceService = resourceService;
    }

    @Transactional(readOnly = true)
    public Page<BookmarkDto.Response> getUserBookmarks(Long userId, Pageable pageable) {
        return bookmarkRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable)
                .map(this::mapToDto);
    }

    @Transactional
    public BookmarkDto.Response addBookmark(Long userId, Long resourceId) {
        if (bookmarkRepository.existsByUserIdAndResourceId(userId, resourceId)) {
            throw new DuplicateBookmarkException("Resource " + resourceId + " is already bookmarked by user " + userId);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with ID: " + resourceId));

        Bookmark bookmark = Bookmark.builder()
                .user(user)
                .resource(resource)
                .build();

        bookmark = bookmarkRepository.save(bookmark);
        return mapToDto(bookmark);
    }

    @Transactional
    public void removeBookmark(Long userId, Long resourceId) {
        if (!bookmarkRepository.existsByUserIdAndResourceId(userId, resourceId)) {
            throw new ResourceNotFoundException("Bookmark not found for resource ID: " + resourceId);
        }
        bookmarkRepository.deleteByUserIdAndResourceId(userId, resourceId);
    }

    @Transactional(readOnly = true)
    public boolean isResourceBookmarked(Long userId, Long resourceId) {
        return bookmarkRepository.existsByUserIdAndResourceId(userId, resourceId);
    }

    private BookmarkDto.Response mapToDto(Bookmark b) {
        return BookmarkDto.Response.builder()
                .id(b.getId())
                .userId(b.getUser().getId())
                .resourceId(b.getResource().getId())
                .resourceName(b.getResource().getName())
                .createdAt(b.getCreatedAt())
                .resource(resourceService.mapToDto(b.getResource(), null))
                .build();
    }
}
