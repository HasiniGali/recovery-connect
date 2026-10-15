package com.recoveryconnect.repository;

import com.recoveryconnect.entity.Language;
import com.recoveryconnect.entity.Resource;
import com.recoveryconnect.entity.VerificationStatus;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ResourceSpecification {

    public static Specification<Resource> filterByCriteria(
            String category,
            String cost,
            String language,
            String city,
            String availability,
            VerificationStatus verificationStatus,
            Boolean isActive,
            String searchTerm
    ) {
        return (Root<Resource> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. Active status (defaults to true)
            if (isActive != null) {
                predicates.add(cb.equal(root.get("isActive"), isActive));
            }

            // 2. Verification status
            if (verificationStatus != null) {
                predicates.add(cb.equal(root.get("verificationStatus"), verificationStatus));
            }

            // 3. Category (by category name or ID)
            if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("all")) {
                predicates.add(cb.equal(
                    cb.lower(root.get("category").get("name")),
                    category.trim().toLowerCase()
                ));
            }

            // 4. Cost ("Free", "Subsidized", etc.)
            if (cost != null && !cost.trim().isEmpty() && !cost.equalsIgnoreCase("all")) {
                predicates.add(cb.equal(
                    cb.lower(root.get("cost")),
                    cost.trim().toLowerCase()
                ));
            }

            // 5. City
            if (city != null && !city.trim().isEmpty()) {
                predicates.add(cb.like(
                    cb.lower(root.get("city")),
                    "%" + city.trim().toLowerCase() + "%"
                ));
            }

            // 6. Availability
            if (availability != null && !availability.trim().isEmpty() && !availability.equalsIgnoreCase("all")) {
                String availLower = availability.trim().toLowerCase();
                predicates.add(cb.like(
                    cb.lower(root.get("availability")),
                    "%" + availLower + "%"
                ));
            }

            // 7. Language (Join with languages table)
            if (language != null && !language.trim().isEmpty() && !language.equalsIgnoreCase("all")) {
                Join<Resource, Language> languageJoin = root.join("languages", JoinType.INNER);
                String langLower = language.trim().toLowerCase();
                Predicate byName = cb.equal(cb.lower(languageJoin.get("name")), langLower);
                Predicate byCode = cb.equal(cb.lower(languageJoin.get("code")), langLower);
                predicates.add(cb.or(byName, byCode));
                // Ensure distinct results when joining
                query.distinct(true);
            }

            // 8. General search keyword across name, description, address
            if (searchTerm != null && !searchTerm.trim().isEmpty()) {
                String term = "%" + searchTerm.trim().toLowerCase() + "%";
                Predicate nameMatch = cb.like(cb.lower(root.get("name")), term);
                Predicate descMatch = cb.like(cb.lower(root.get("description")), term);
                Predicate addrMatch = cb.like(cb.lower(root.get("address")), term);
                Predicate cityMatch = cb.like(cb.lower(root.get("city")), term);
                predicates.add(cb.or(nameMatch, descMatch, addrMatch, cityMatch));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
