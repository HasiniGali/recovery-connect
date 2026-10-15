package com.recoveryconnect.controller;

import com.recoveryconnect.dto.BookmarkDto;
import com.recoveryconnect.dto.PageResponse;
import com.recoveryconnect.entity.User;
import com.recoveryconnect.exception.ResourceNotFoundException;
import com.recoveryconnect.exception.UnauthorizedException;
import com.recoveryconnect.repository.UserRepository;
import com.recoveryconnect.service.BookmarkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookmarks")
@Tag(name = "Bookmarks", description = "Authenticated endpoints for saving and managing bookmarked recovery resources")
public class BookmarkController {

    private final BookmarkService bookmarkService;
    private final UserRepository userRepository;

    public BookmarkController(BookmarkService bookmarkService, UserRepository userRepository) {
        this.bookmarkService = bookmarkService;
        this.userRepository = userRepository;
    }

    @PostMapping
    @Operation(summary = "Bookmark a resource", description = "Saves a recovery resource to the authenticated user's bookmarks list (prevents duplicates)")
    public ResponseEntity<BookmarkDto.Response> addBookmark(
            @Valid @RequestBody BookmarkDto.Create request,
            Authentication authentication
    ) {
        Long userId = getUserId(authentication);
        BookmarkDto.Response response = bookmarkService.addBookmark(userId, request.getResourceId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Get user bookmarks", description = "Retrieves paginated saved bookmarks for the authenticated user")
    public ResponseEntity<PageResponse<BookmarkDto.Response>> getBookmarks(
            @Parameter(description = "Page number") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "20") int size,
            Authentication authentication
    ) {
        Long userId = getUserId(authentication);
        Pageable pageable = PageRequest.of(page, Math.min(Math.max(1, size), 100));
        Page<BookmarkDto.Response> result = bookmarkService.getUserBookmarks(userId, pageable);
        return ResponseEntity.ok(PageResponse.from(result));
    }

    @DeleteMapping("/{resourceId}")
    @Operation(summary = "Remove bookmark", description = "Removes a resource from the authenticated user's saved list")
    public ResponseEntity<Void> removeBookmark(
            @Parameter(description = "Resource ID to unbookmark") @PathVariable Long resourceId,
            Authentication authentication
    ) {
        Long userId = getUserId(authentication);
        bookmarkService.removeBookmark(userId, resourceId);
        return ResponseEntity.noContent().build();
    }

    private Long getUserId(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("User must be authenticated to perform bookmark operations");
        }
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for email: " + email));
        return user.getId();
    }
}
