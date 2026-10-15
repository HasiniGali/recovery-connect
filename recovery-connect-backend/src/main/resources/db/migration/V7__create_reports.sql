-- V7: Create reports table
CREATE TABLE reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resource_id BIGINT NOT NULL,
    user_id BIGINT NULL,
    reason VARCHAR(50) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'OPEN',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resolved_at DATETIME NULL,
    resolved_by BIGINT NULL,
    resolution_notes TEXT NULL,

    CONSTRAINT fk_reports_resource FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    CONSTRAINT fk_reports_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_reports_resolved_by FOREIGN KEY (resolved_by) REFERENCES users(id) ON DELETE SET NULL,

    CONSTRAINT chk_report_reason CHECK (reason IN (
        'PHONE_NUMBER_INCORRECT',
        'ADDRESS_INCORRECT',
        'HOURS_INCORRECT',
        'WEBSITE_INCORRECT',
        'RESOURCE_NO_LONGER_EXISTS',
        'INFORMATION_OUTDATED',
        'OTHER'
    )),
    CONSTRAINT chk_report_status CHECK (status IN (
        'OPEN',
        'UNDER_REVIEW',
        'RESOLVED',
        'REJECTED'
    ))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_resource_id ON reports(resource_id);
CREATE INDEX idx_reports_created_at ON reports(created_at);
