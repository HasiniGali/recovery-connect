-- V9: Seed Initial Data (Single Source of Truth)

-- 1. Seed Categories
INSERT INTO categories (id, name, description, created_at, updated_at) VALUES
(1, 'Counselling', 'Confidential one-on-one psychological first-aid, stress counseling, and emotional therapy.', NOW(), NOW()),
(2, 'Recovery Support', 'Peer-guided sobriety circles, behavioral habit reset, and compassionate rehabilitation.', NOW(), NOW()),
(3, 'Support Groups', 'Facilitated sharing circles for anxiety, neurodivergence, grief, and mutual encouragement.', NOW(), NOW()),
(4, 'Crisis Support', '24/7 urgent active listening, de-escalation hotlines, and distress alleviation lines.', NOW(), NOW()),
(5, 'Campus Support', 'Student-friendly guidance posts, hostel listening tables, and academic stress support.', NOW(), NOW()),
(6, 'Community Support', 'Grassroots neighborhood initiatives, informal drop-in centers, and mutual aid.', NOW(), NOW()),
(7, 'Medical Support', 'Specialist hospital outpatient psychiatric clinics and subsidized medical evaluations.', NOW(), NOW()),
(8, 'Rehabilitation', 'Structured residential and day-care facilities for long-term recovery support.', NOW(), NOW()),
(9, 'Helpline', 'Telephonic, chat, or WhatsApp based emotional guidance and psychological referral.', NOW(), NOW()),
(10, 'Other', 'Specialized initiatives, legal aid, social worker referrals, and adjunct support.', NOW(), NOW());

-- 2. Seed Languages
INSERT INTO languages (id, name, code, created_at) VALUES
(1, 'English', 'en', NOW()),
(2, 'Tamil', 'ta', NOW()),
(3, 'Hindi', 'hi', NOW()),
(4, 'Telugu', 'te', NOW()),
(5, 'Kannada', 'kn', NOW()),
(6, 'Malayalam', 'ml', NOW()),
(7, 'Bengali', 'bn', NOW()),
(8, 'Marathi', 'mr', NOW());

-- 3. Seed Users (Demo Admin & Demo User with BCrypt password hashes)
-- Password for admin: AdminSecurePass2026! (BCrypt: $2a$10$7Z/Vq4oXo0JvY7iH3zK3.e9u.E1n7v7l4R8z5.T1b8d2y8b6c0e2a -> standard salt)
-- We store standard BCrypt hash: $2a$10$w6B08w9Vj.tX3O0XkFh4te4sC9BshbY0tJkI3pWd6Zg3YnEwS3Vv6
INSERT INTO users (id, name, email, password_hash, role, created_at, updated_at) VALUES
(1, 'Recovery Connect Admin', 'admin@recoveryconnect.local', '$2a$10$w6B08w9Vj.tX3O0XkFh4te4sC9BshbY0tJkI3pWd6Zg3YnEwS3Vv6', 'ADMIN', NOW(), NOW()),
(2, 'Demo Student User', 'student@recoveryconnect.local', '$2a$10$w6B08w9Vj.tX3O0XkFh4te4sC9BshbY0tJkI3pWd6Zg3YnEwS3Vv6', 'USER', NOW(), NOW());

-- 4. Seed Resources (Centered around Vellore / Katpadi)
-- Note: Synthetic demo data is marked is_synthetic = TRUE. Genuine national emergency lines are marked is_synthetic = FALSE.
INSERT INTO resources (
    id, name, description, category_id, phone, website, address, city, state, postal_code,
    latitude, longitude, cost, eligibility, availability, accessibility, source_url,
    verification_status, verification_date, last_updated, is_active, is_synthetic, created_at, updated_at
) VALUES
(
    1,
    'Vellore Community Mental Wellness Circle',
    'Synthetic demo resource: A welcoming community space offering empathetic psychological first-aid, stress counseling, and youth listening circles.',
    1,
    '+91 416 220 0110',
    'https://example.org/vellore-wellness-demo',
    '14 Officers Line, Near Anna Salai, Vellore',
    'Vellore',
    'Tamil Nadu',
    '632001',
    12.9246000,
    79.1348000,
    'Free',
    'Open to all students, young adults, and families residing in Vellore district.',
    'Open today · Mon-Sat 9:00 AM - 6:00 PM',
    'Ground floor wheelchair ramp; tactile indoor signage; gender-neutral quiet room.',
    'https://example.org/sources/tn-district-health-demo',
    'VERIFIED',
    '2026-09-18 10:00:00',
    NOW(),
    TRUE,
    TRUE,
    NOW(),
    NOW()
),
(
    2,
    'Vaigai Youth Resilience & Counselling Center',
    'Synthetic demo resource: Student-oriented youth distress counselling, exam anxiety management, and confidential listening.',
    1,
    '+91 416 222 3344',
    'https://example.org/vaigai-youth-demo',
    '22 Gandhi Nagar East, Near Silk Mill Bus Stop, Katpadi',
    'Vellore',
    'Tamil Nadu',
    '632006',
    12.9290000,
    79.1380000,
    'Free',
    'Youth aged 16-29, college students, and apprentices.',
    'Open today · Mon-Sat 10:00 AM - 7:00 PM',
    'Elevator access; quiet sensory zones; private counseling cubicles.',
    'https://example.org/sources/youth-welfare-registry-demo',
    'VERIFIED',
    '2026-09-18 11:30:00',
    NOW(),
    TRUE,
    TRUE,
    NOW(),
    NOW()
),
(
    3,
    'Katpadi De-Addiction & Recovery Peer Circle',
    'Synthetic demo resource: Peer-guided 12-step mutual recovery group, habit reset meetings, and compassionate sober living guidance.',
    2,
    '+91 416 224 8899',
    'https://example.org/katpadi-recovery-demo',
    '8 Chittoor Road, Near Katpadi Railway Junction, Katpadi',
    'Vellore',
    'Tamil Nadu',
    '632014',
    12.9698000,
    79.1432000,
    'Free',
    'Anyone seeking recovery from substance dependency or behavioral habits.',
    'Open today · Daily 6:30 PM - 8:30 PM',
    'Step-free entrance; transit accessible; tea & discussion lounge.',
    'https://example.org/sources/recovery-network-charter-demo',
    'VERIFIED',
    '2026-09-18 14:15:00',
    NOW(),
    TRUE,
    TRUE,
    NOW(),
    NOW()
),
(
    4,
    'VIT Student Guidance & Counselling Division',
    'Synthetic demo resource: Collegiate psychological counseling, peer mentoring, and emotional first-aid center for university students.',
    5,
    '+91 416 220 2000',
    'https://example.org/vit-guidance-demo',
    'Student Welfare Block, VIT University Main Campus, Katpadi',
    'Vellore',
    'Tamil Nadu',
    '632014',
    12.9692000,
    79.1559000,
    'Free',
    'Enrolled university students, faculty, and campus staff.',
    'Open today · Mon-Fri 8:30 AM - 7:00 PM',
    'Fully accessible campus; elevators; confidential private consultation rooms.',
    'https://example.org/sources/campus-welfare-register-demo',
    'VERIFIED',
    '2026-09-18 09:00:00',
    NOW(),
    TRUE,
    TRUE,
    NOW(),
    NOW()
),
(
    5,
    'CMC Vellore Outpatient Mental Health Unit',
    'Specialist tertiary psychiatric outpatient consultations, neurodevelopmental evaluations, and subsidized clinical care.',
    7,
    '+91 416 228 1000',
    'https://example.org/cmc-mental-health-demo',
    'Christian Medical College Campus, Ida Scudder Road, Vellore',
    'Vellore',
    'Tamil Nadu',
    '632004',
    12.9234000,
    79.1328000,
    'Subsidized',
    'All citizens; low-income concessions upon social worker assessment.',
    'Open today · Mon-Sat 8:00 AM - 4:00 PM',
    'Hospital standard accessibility; ramps; medical transit support.',
    'https://example.org/sources/cmc-hospital-directory-demo',
    'VERIFIED',
    '2026-09-18 08:30:00',
    NOW(),
    TRUE,
    TRUE,
    NOW(),
    NOW()
),
(
    6,
    'Tele-MANAS National Tele-Mental Health Assistance',
    'Official Government of India 24x7 toll-free national tele-mental health programme providing free psychological first-aid and referral.',
    4,
    '14416',
    'https://telemanas.mohfw.gov.in',
    'National Tele-Mental Health Network Center, Bengaluru & Chennai Cells',
    'Chennai',
    'Tamil Nadu',
    '600001',
    13.0827000,
    80.2707000,
    'Free',
    'Open to all citizens across India 24/7 in all major regional languages.',
    'Open 24/7 · Toll-free helpline 14416 / 1800 891 4416',
    'IVR accessible; multi-lingual operator support; TTY assistance.',
    'https://telemanas.mohfw.gov.in',
    'VERIFIED',
    '2026-09-18 00:00:00',
    NOW(),
    TRUE,
    FALSE,
    NOW(),
    NOW()
),
(
    7,
    'Tamil Nadu State Emergency Medical & Ambulance Service',
    'Official state toll-free emergency medical, acute crisis de-escalation, and ambulance dispatch service.',
    4,
    '108',
    'https://tn.gov.in',
    'State Emergency Response Centre, Chennai, Tamil Nadu',
    'Vellore',
    'Tamil Nadu',
    '632001',
    12.9165000,
    79.1325000,
    'Free',
    'Emergency assistance available to everyone in Tamil Nadu.',
    'Open 24/7 · 365 Days a year',
    'Direct emergency voice dispatch; rapid response coordination.',
    'https://tn.gov.in/emergency',
    'VERIFIED',
    '2026-09-18 00:00:00',
    NOW(),
    TRUE,
    FALSE,
    NOW(),
    NOW()
),
(
    8,
    'Vandrevala Foundation Mental Health Helpline',
    'Verified 24/7 telephonic emotional support and distress mitigation helpline staffed by experienced psychologists.',
    4,
    '+91 9999 666 555',
    'https://vandrevalafoundation.com',
    'Vandrevala Foundation National Coordination Centre',
    'National',
    'Pan-India',
    '400001',
    12.9200000,
    79.1300000,
    'Free',
    'Anyone facing anxiety, depression, burnout, or emotional distress.',
    'Open 24/7 · Phone & WhatsApp support',
    'Voice call & digital chat channels.',
    'https://vandrevalafoundation.com',
    'VERIFIED',
    '2026-09-18 00:00:00',
    NOW(),
    TRUE,
    FALSE,
    NOW(),
    NOW()
),
(
    9,
    'Vellore Family Resilience & Recovery Circle',
    'Synthetic demo resource: Grassroots support group for caregivers and family members assisting relatives through recovery.',
    3,
    '+91 416 226 7788',
    'https://example.org/vellore-family-demo',
    '45 Arcot Road, Ranipet Road Junction, Vellore',
    'Vellore',
    'Tamil Nadu',
    '632009',
    12.9340000,
    79.1450000,
    'Free',
    'Caregivers, siblings, and partners of individuals in recovery.',
    'Weekends · Sat 4:00 PM - 6:00 PM',
    'Wheelchair ramp; outdoor garden terrace meeting space.',
    'https://example.org/sources/family-support-initiative-demo',
    'UNDER_REVIEW',
    '2026-09-15 16:00:00',
    NOW(),
    TRUE,
    TRUE,
    NOW(),
    NOW()
),
(
    10,
    'Government Vellore Medical College Psychiatric Unit',
    'Government tertiary medical institution offering subsidized psychiatric consultations, de-addiction evaluation, and pharmacy support.',
    7,
    '+91 416 226 0900',
    'https://example.org/gvmc-psychiatry-demo',
    'Adukkamparai, Vellore, Tamil Nadu',
    'Vellore',
    'Tamil Nadu',
    '632011',
    12.8708000,
    79.1332000,
    'Free',
    'Open to all public patients; free OPD consultations and generic medicines.',
    'Open today · Mon-Sat 8:00 AM - 2:00 PM',
    'State hospital accessibility standards; ambulance bay; outpatient ramp.',
    'https://example.org/sources/tamilnadu-health-dept-demo',
    'VERIFIED',
    '2026-09-18 12:00:00',
    NOW(),
    TRUE,
    TRUE,
    NOW(),
    NOW()
);

-- 5. Seed Resource Languages
-- Resource 1: Tamil, English
INSERT INTO resource_languages (resource_id, language_id) VALUES (1, 1), (1, 2);
-- Resource 2: Tamil, English
INSERT INTO resource_languages (resource_id, language_id) VALUES (2, 1), (2, 2);
-- Resource 3: Tamil, English, Telugu
INSERT INTO resource_languages (resource_id, language_id) VALUES (3, 1), (3, 2), (3, 4);
-- Resource 4: English, Tamil, Hindi, Telugu
INSERT INTO resource_languages (resource_id, language_id) VALUES (4, 1), (4, 2), (4, 3), (4, 4);
-- Resource 5: Tamil, English, Hindi, Bengali, Malayalam
INSERT INTO resource_languages (resource_id, language_id) VALUES (5, 1), (5, 2), (5, 3), (5, 6), (5, 7);
-- Resource 6 (Tele-MANAS): All 8 Languages
INSERT INTO resource_languages (resource_id, language_id) VALUES (6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 6), (6, 7), (6, 8);
-- Resource 7 (108 Ambulance): Tamil, English
INSERT INTO resource_languages (resource_id, language_id) VALUES (7, 1), (7, 2);
-- Resource 8 (Vandrevala): English, Hindi, Tamil
INSERT INTO resource_languages (resource_id, language_id) VALUES (8, 1), (8, 2), (8, 3);
-- Resource 9: Tamil, English
INSERT INTO resource_languages (resource_id, language_id) VALUES (9, 1), (9, 2);
-- Resource 10: Tamil, English
INSERT INTO resource_languages (resource_id, language_id) VALUES (10, 1), (10, 2);

-- 6. Seed Initial Verification History (Audit Trail)
INSERT INTO verification_history (id, resource_id, status, source, notes, verified_by, verified_at) VALUES
(1, 1, 'VERIFIED', 'Tamil Nadu District Mental Health Programme Directory (Demo)', 'Operating hours and physical center location verified.', 1, '2026-09-18 10:00:00'),
(2, 2, 'VERIFIED', 'Youth Welfare Society Registry (Demo)', 'Youth counseling facilities and free admission verified.', 1, '2026-09-18 11:30:00'),
(3, 3, 'VERIFIED', 'Katpadi Recovery Network Charter (Demo)', 'Meeting schedules and step-free accessibility verified.', 1, '2026-09-18 14:15:00'),
(4, 4, 'VERIFIED', 'VIT Campus Student Welfare Registry (Demo)', 'On-campus timing and confidential counseling room verified.', 1, '2026-09-18 09:00:00'),
(5, 5, 'VERIFIED', 'CMC Hospital Clinical Directory (Demo)', 'Subsidized psychiatric outpatient clinic hours verified.', 1, '2026-09-18 08:30:00'),
(6, 6, 'VERIFIED', 'Official Ministry of Health & Family Welfare Portal', 'National 24x7 toll-free helpline 14416 independently verified.', 1, '2026-09-18 00:00:00'),
(7, 7, 'VERIFIED', 'Tamil Nadu Health Department Official Emergency Registry', 'Official state 108 ambulance dispatch service verified.', 1, '2026-09-18 00:00:00'),
(8, 8, 'VERIFIED', 'Vandrevala Foundation Official Website', 'National 24/7 psychological hotline number verified.', 1, '2026-09-18 00:00:00'),
(9, 9, 'UNDER_REVIEW', 'Community Referral Form', 'Awaiting updated weekend session timetable confirmation.', 1, '2026-09-15 16:00:00'),
(10, 10, 'VERIFIED', 'Tamil Nadu Government Medical College Portal', 'Government OPD hours and free consultations verified.', 1, '2026-09-18 12:00:00');

-- 7. Seed Initial Sample Reports (To demonstrate report resolution flow)
INSERT INTO reports (id, resource_id, user_id, reason, description, status, created_at, resolved_at, resolved_by, resolution_notes) VALUES
(1, 1, NULL, 'HOURS_INCORRECT', 'Center now opens at 9:00 AM instead of 9:30 AM on Saturdays.', 'RESOLVED', '2026-09-17 14:00:00', '2026-09-18 10:00:00', 1, 'Confirmed with center coordinator; schedule updated.'),
(2, 9, NULL, 'INFORMATION_OUTDATED', 'Weekend meeting time may have shifted to 4:30 PM.', 'OPEN', '2026-09-18 16:30:00', NULL, NULL, NULL);

-- 8. Seed Initial Sample Bookmarks
INSERT INTO bookmarks (id, user_id, resource_id, created_at) VALUES
(1, 2, 1, NOW()),
(2, 2, 4, NOW());
