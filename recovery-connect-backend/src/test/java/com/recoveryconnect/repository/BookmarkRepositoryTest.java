package com.recoveryconnect.repository;

import com.recoveryconnect.entity.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DataJpaTest
@ActiveProfiles("test")
class BookmarkRepositoryTest {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private User user;
    private Resource resource1;
    private Resource resource2;

    @BeforeEach
    void setUp() {
        user = userRepository.save(User.builder()
                .name("Alice")
                .email("alice@test.local")
                .passwordHash("hash")
                .role(Role.USER)
                .build());

        Category cat = categoryRepository.save(Category.builder().name("Recovery").build());

        resource1 = resourceRepository.save(Resource.builder()
                .name("Recovery Center 1")
                .category(cat)
                .city("Vellore")
                .state("Tamil Nadu")
                .cost("Free")
                .build());

        resource2 = resourceRepository.save(Resource.builder()
                .name("Recovery Center 2")
                .category(cat)
                .city("Vellore")
                .state("Tamil Nadu")
                .cost("Free")
                .build());
    }

    @Test
    @DisplayName("Should create bookmark and retrieve user bookmarks")
    void testCreateAndRetrieveBookmark() {
        bookmarkRepository.save(Bookmark.builder()
                .user(user)
                .resource(resource1)
                .build());

        Page<Bookmark> bookmarks = bookmarkRepository.findByUserIdOrderByCreatedAtDesc(user.getId(), PageRequest.of(0, 10));
        assertThat(bookmarks.getTotalElements()).isEqualTo(1);
        assertThat(bookmarks.getContent().get(0).getResource().getName()).isEqualTo("Recovery Center 1");
    }

    @Test
    @DisplayName("Should reject duplicate bookmark for same user and resource")
    void testPreventDuplicateBookmark() {
        bookmarkRepository.save(Bookmark.builder()
                .user(user)
                .resource(resource1)
                .build());

        // Attempting to bookmark resource 1 again should trigger unique constraint
        assertThrows(DataIntegrityViolationException.class, () -> {
            bookmarkRepository.saveAndFlush(Bookmark.builder()
                    .user(user)
                    .resource(resource1)
                    .build());
        });
    }

    @Test
    @DisplayName("Should delete bookmark")
    void testDeleteBookmark() {
        bookmarkRepository.save(Bookmark.builder()
                .user(user)
                .resource(resource1)
                .build());

        assertThat(bookmarkRepository.existsByUserIdAndResourceId(user.getId(), resource1.getId())).isTrue();

        bookmarkRepository.deleteByUserIdAndResourceId(user.getId(), resource1.getId());
        bookmarkRepository.flush();

        assertThat(bookmarkRepository.existsByUserIdAndResourceId(user.getId(), resource1.getId())).isFalse();
    }
}
