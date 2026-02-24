-- ============================================================
-- Remaining Pages — Headless CMS: Missing Fields + Content
-- Project ID = 3
-- Run against the headless CMS database (u635010970_admin)
--
-- Field IDs start from 1008 (current AUTO_INCREMENT after
--   993-1000 from missing-headless-fields.sql +
--   1001-1007 added via CMS admin for site-settings)
-- Content IDs start from 789 (current AUTO_INCREMENT)
-- content_meta IDs: auto-increment (no explicit IDs)
-- ============================================================

-- ************************************************************
-- PART A: MISSING FIELDS ON EXISTING COLLECTIONS
-- ************************************************************

-- 1. teachers (collection_id = 150): Add 'link' field
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(1008, 'text', 'link', 'link', NULL, NULL, '{"enumeration":[],"media":[],"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 150, 1008, NOW(), NOW());

-- 2. speakers (collection_id = 152): Add 'link' field
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(1009, 'text', 'link', 'link', NULL, NULL, '{"enumeration":[],"media":[],"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 152, 1009, NOW(), NOW());

-- 3. accreditations (collection_id = 154): Add 'link' field
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(1010, 'text', 'link', 'link', NULL, NULL, '{"enumeration":[],"media":[],"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 154, 1010, NOW(), NOW());

-- 4. faqs (collection_id = 161): Add 'question' field
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(1011, 'text', 'question', 'question', NULL, NULL, '{"enumeration":[],"media":[],"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 161, 1011, NOW(), NOW());

-- 5. faqs (collection_id = 161): Add 'answer' field
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(1012, 'longtext', 'answer', 'answer', NULL, NULL, '{"enumeration":[],"media":[],"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 161, 1012, NOW(), NOW());

-- 6. contact-us (collection_id = 160): Add 'address' field
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(1013, 'text', 'address', 'address', NULL, NULL, '{"enumeration":[],"media":[],"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 160, 1013, NOW(), NOW());

-- 7. contact-us (collection_id = 160): Add 'phone' field
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(1014, 'text', 'phone', 'phone', NULL, NULL, '{"enumeration":[],"media":[],"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 160, 1014, NOW(), NOW());

-- 8. contact-us (collection_id = 160): Add 'email' field
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(1015, 'text', 'email', 'email', NULL, NULL, '{"enumeration":[],"media":[],"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 160, 1015, NOW(), NOW());

-- 9. contact-us (collection_id = 160): Add 'description' field (richtext)
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(1016, 'richtext', 'description', 'description', NULL, NULL, '{"enumeration":[],"media":[],"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 160, 1016, NOW(), NOW());


-- ************************************************************
-- PART B: CONTENT ENTRIES
-- All content entries for empty collections.
-- Images/media fields are omitted — upload via CMS admin.
-- ************************************************************

INSERT INTO `content` (`id`, `project_id`, `collection_id`, `locale`, `form_id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `published_at`, `published_by`, `deleted_at`, `sort_number`) VALUES
-- Page headers
(789, 3, 158, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
(790, 3, 159, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
-- About: Our Story, Vision, Mission, Values
(791, 3, 145, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
(792, 3, 146, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
(793, 3, 147, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
(794, 3, 148, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
-- About: Teachers section header + 6 teachers
(795, 3, 149, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
(796, 3, 150, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
(797, 3, 150, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 2),
(798, 3, 150, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 3),
(799, 3, 150, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 4),
(800, 3, 150, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 5),
(801, 3, 150, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 6),
-- About: Speakers section header + 6 speakers
(802, 3, 151, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
(803, 3, 152, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
(804, 3, 152, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 2),
(805, 3, 152, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 3),
(806, 3, 152, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 4),
(807, 3, 152, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 5),
(808, 3, 152, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 6),
-- About: Accreditations section header + 6 accreditations
(809, 3, 153, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
(810, 3, 154, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
(811, 3, 154, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 2),
(812, 3, 154, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 3),
(813, 3, 154, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 4),
(814, 3, 154, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 5),
(815, 3, 154, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 6),
-- About: Choose Us section header
(816, 3, 155, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
-- Media Center: Testimonials section header
(817, 3, 133, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
-- Contact: contact-us info
(818, 3, 160, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
-- Contact: 12 FAQs
(819, 3, 161, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1),
(820, 3, 161, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 2),
(821, 3, 161, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 3),
(822, 3, 161, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 4),
(823, 3, 161, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 5),
(824, 3, 161, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 6),
(825, 3, 161, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 7),
(826, 3, 161, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 8),
(827, 3, 161, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 9),
(828, 3, 161, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 10),
(829, 3, 161, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 11),
(830, 3, 161, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 12),
-- Media Center: Podcasts section placeholder
(831, 3, 136, NULL, NULL, NOW(), 1, NOW(), 1, NOW(), 1, NULL, 1);


-- ************************************************************
-- PART C: CONTENT META VALUES
-- Text content extracted from current static components.
-- Media/image fields omitted — upload via CMS admin panel.
-- ************************************************************

-- ===================== Page Headers =====================

-- about-us (158) — content_id 789
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 158, 789, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 158, 789, 'title', 'About CEF Online Academy', NOW(), NOW(), NULL);

-- media-center (159) — content_id 790
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 159, 790, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 159, 790, 'title', 'Media Center', NOW(), NOW(), NULL);


-- ===================== Our Story Section (145) =====================

-- content_id 791
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 145, 791, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 145, 791, 'title', 'Our Story', NOW(), NOW(), NULL),
(3, 145, 791, 'description', '<p>There was a time when we asked ourselves a simple, yet powerful question:</p><h3>What kind of generation do we want to raise?</h3><p>We knew the answer was more than academic success—it was a generation with faith, character, and the ability to spread goodness. We realised that education without character is incomplete, and character without the Quran and Sunnah loses its purpose and direction.</p><p>This journey began in 2016—not as an institution, but as a heartfelt effort to awaken hearts through the Quran and Sunnah. In small rooms across Pakistan, we witnessed early change—children connecting with the Quran, families softening, and hearts returning to Allah.</p><p>To carry this trust beyond borders, CEF Online Academy was born—a place where the Quran reaches homes and hearts worldwide. Here, dedicated teachers and mentors guide each learner with care.</p><p>From such hearts, we pray to raise aspiring leaders—those who don''t just know the Quran, but live it. Leaders with dignity in character, clarity in purpose, and courage to guide humanity.</p><p>Because real change begins not in systems, but in hearts that remember who they are—and who they are meant to become!</p>', NOW(), NOW(), NULL);


-- ===================== Vision Section (146) =====================

-- content_id 792
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 146, 792, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 146, 792, 'title', 'Our Vision', NOW(), NOW(), NULL),
(3, 146, 792, 'description', 'Nurture a generation that connects revealed and acquired knowledge.', NOW(), NOW(), NULL);


-- ===================== Mission Section (147) =====================

-- content_id 793
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 147, 793, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 147, 793, 'title', 'Our Mission', NOW(), NOW(), NULL),
(3, 147, 793, 'description', 'We will achieve our vision by investing in holistic character development in light of Quran and Sunnah.', NOW(), NOW(), NULL);


-- ===================== Values Section (148) =====================

-- content_id 794
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 148, 794, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 148, 794, 'title', 'Our Values', NOW(), NOW(), NULL),
(3, 148, 794, 'description', 'Collaboration, Excellence, Innovation, Transparency and a Sense of Responsibility', NOW(), NOW(), NULL);


-- ===================== Our Teachers Section Header (149) =====================

-- content_id 795
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 149, 795, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 149, 795, 'title', 'Meet Our Teachers', NOW(), NOW(), NULL),
(3, 149, 795, 'description', '<p>At CEF Online Academy, we are privileged to have a remarkable team of teachers who not only guide children in learning the Quran but also nurture their character. Our teachers inspire students to harmonize revealed knowledge with acquired knowledge, enabling them to think critically, act ethically, and live purposefully. Through their mentorship, children are empowered to become compassionate, responsible leaders of tomorrow. For parents, it is both an honor and a reassurance to entrust their children to such dedicated educators who embody our vision of a generation grounded in faith and equipped for the world.</p>', NOW(), NOW(), NULL);


-- ===================== Teachers (150) — 6 entries =====================

-- Teacher 1 — content_id 796
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 150, 796, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 150, 796, 'name', 'Ayesha Khan', NOW(), NOW(), NULL),
(3, 150, 796, 'designation', 'Instructor', NOW(), NOW(), NULL),
(3, 150, 796, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 150, 796, 'link', '/teachers/ayesha-khan', NOW(), NOW(), NULL);

-- Teacher 2 — content_id 797
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 150, 797, 'sort_number', '2', NOW(), NOW(), NULL),
(3, 150, 797, 'name', 'Muhammad Ali', NOW(), NOW(), NULL),
(3, 150, 797, 'designation', 'Instructor', NOW(), NOW(), NULL),
(3, 150, 797, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 150, 797, 'link', '/teachers/muhammad-ali', NOW(), NOW(), NULL);

-- Teacher 3 — content_id 798
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 150, 798, 'sort_number', '3', NOW(), NOW(), NULL),
(3, 150, 798, 'name', 'Fatima Noor', NOW(), NOW(), NULL),
(3, 150, 798, 'designation', 'Instructor', NOW(), NOW(), NULL),
(3, 150, 798, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 150, 798, 'link', '/teachers/fatima-noor', NOW(), NOW(), NULL);

-- Teacher 4 — content_id 799
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 150, 799, 'sort_number', '4', NOW(), NOW(), NULL),
(3, 150, 799, 'name', 'Ahmed Raza', NOW(), NOW(), NULL),
(3, 150, 799, 'designation', 'Instructor', NOW(), NOW(), NULL),
(3, 150, 799, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 150, 799, 'link', '/teachers/ahmed-raza', NOW(), NOW(), NULL);

-- Teacher 5 — content_id 800
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 150, 800, 'sort_number', '5', NOW(), NOW(), NULL),
(3, 150, 800, 'name', 'Zainab Tariq', NOW(), NOW(), NULL),
(3, 150, 800, 'designation', 'Instructor', NOW(), NOW(), NULL),
(3, 150, 800, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 150, 800, 'link', '/teachers/zainab-tariq', NOW(), NOW(), NULL);

-- Teacher 6 — content_id 801
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 150, 801, 'sort_number', '6', NOW(), NOW(), NULL),
(3, 150, 801, 'name', 'Usman Farooq', NOW(), NOW(), NULL),
(3, 150, 801, 'designation', 'Instructor', NOW(), NOW(), NULL),
(3, 150, 801, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 150, 801, 'link', '/teachers/usman-farooq', NOW(), NOW(), NULL);


-- ===================== Our Speakers Section Header (151) =====================

-- content_id 802
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 151, 802, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 151, 802, 'title', 'Meet Our Speakers', NOW(), NOW(), NULL),
(3, 151, 802, 'description', '<p>At CEF Online Academy, we are honored to host a distinguished group of speakers who inspire, enlighten, and guide our students and community. They bridge the wisdom of revealed knowledge with insights from contemporary learning, helping audiences understand and apply principles that lead to purposeful living. Through their guidance, participants are encouraged to think critically, act ethically, and contribute meaningfully to society. For all who attend, it is both a privilege and a source of inspiration to learn from such accomplished individuals who embody our vision of nurturing a generation grounded in faith and equipped for the world.</p>', NOW(), NOW(), NULL);


-- ===================== Speakers (152) — 6 entries =====================

-- Speaker 1 — content_id 803
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 152, 803, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 152, 803, 'name', 'Ayesha Khan', NOW(), NOW(), NULL),
(3, 152, 803, 'designation', 'Instructor', NOW(), NOW(), NULL),
(3, 152, 803, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 152, 803, 'link', '/speakers/ayesha-khan', NOW(), NOW(), NULL);

-- Speaker 2 — content_id 804
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 152, 804, 'sort_number', '2', NOW(), NOW(), NULL),
(3, 152, 804, 'name', 'Muhammad Ali', NOW(), NOW(), NULL),
(3, 152, 804, 'designation', 'Instructor', NOW(), NOW(), NULL),
(3, 152, 804, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 152, 804, 'link', '/speakers/muhammad-ali', NOW(), NOW(), NULL);

-- Speaker 3 — content_id 805
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 152, 805, 'sort_number', '3', NOW(), NOW(), NULL),
(3, 152, 805, 'name', 'Fatima Noor', NOW(), NOW(), NULL),
(3, 152, 805, 'designation', 'Instructor', NOW(), NOW(), NULL),
(3, 152, 805, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 152, 805, 'link', '/speakers/fatima-noor', NOW(), NOW(), NULL);

-- Speaker 4 — content_id 806
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 152, 806, 'sort_number', '4', NOW(), NOW(), NULL),
(3, 152, 806, 'name', 'Ahmed Raza', NOW(), NOW(), NULL),
(3, 152, 806, 'designation', 'Instructor', NOW(), NOW(), NULL),
(3, 152, 806, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 152, 806, 'link', '/speakers/ahmed-raza', NOW(), NOW(), NULL);

-- Speaker 5 — content_id 807
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 152, 807, 'sort_number', '5', NOW(), NOW(), NULL),
(3, 152, 807, 'name', 'Zainab Tariq', NOW(), NOW(), NULL),
(3, 152, 807, 'designation', 'Instructor', NOW(), NOW(), NULL),
(3, 152, 807, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 152, 807, 'link', '/speakers/zainab-tariq', NOW(), NOW(), NULL);

-- Speaker 6 — content_id 808
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 152, 808, 'sort_number', '6', NOW(), NOW(), NULL),
(3, 152, 808, 'name', 'Usman Farooq', NOW(), NOW(), NULL),
(3, 152, 808, 'designation', 'Instructor', NOW(), NOW(), NULL),
(3, 152, 808, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 152, 808, 'link', '/speakers/usman-farooq', NOW(), NOW(), NULL);


-- ===================== Our Accreditations Section Header (153) =====================

-- content_id 809
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 153, 809, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 153, 809, 'title', 'Our Accredited Programs', NOW(), NOW(), NULL),
(3, 153, 809, 'description', '<p>CEF Online Academy is proud to hold accreditations from distinguished and recognized institutions. These endorsements reflect the quality, credibility, and standards of our programs. Parents and students can have full confidence in the authenticity, rigor, and value of the education and guidance we provide.</p>', NOW(), NOW(), NULL);


-- ===================== Accreditations (154) — 6 entries =====================

-- Accreditation 1 — content_id 810
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 154, 810, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 154, 810, 'name', 'Ayesha Khan', NOW(), NOW(), NULL),
(3, 154, 810, 'title', 'Instructor', NOW(), NOW(), NULL),
(3, 154, 810, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 154, 810, 'link', '/programs/ayesha-khan', NOW(), NOW(), NULL);

-- Accreditation 2 — content_id 811
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 154, 811, 'sort_number', '2', NOW(), NOW(), NULL),
(3, 154, 811, 'name', 'Muhammad Ali', NOW(), NOW(), NULL),
(3, 154, 811, 'title', 'Instructor', NOW(), NOW(), NULL),
(3, 154, 811, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 154, 811, 'link', '/programs/muhammad-ali', NOW(), NOW(), NULL);

-- Accreditation 3 — content_id 812
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 154, 812, 'sort_number', '3', NOW(), NOW(), NULL),
(3, 154, 812, 'name', 'Fatima Noor', NOW(), NOW(), NULL),
(3, 154, 812, 'title', 'Instructor', NOW(), NOW(), NULL),
(3, 154, 812, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 154, 812, 'link', '/programs/fatima-noor', NOW(), NOW(), NULL);

-- Accreditation 4 — content_id 813
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 154, 813, 'sort_number', '4', NOW(), NOW(), NULL),
(3, 154, 813, 'name', 'Ahmed Raza', NOW(), NOW(), NULL),
(3, 154, 813, 'title', 'Instructor', NOW(), NOW(), NULL),
(3, 154, 813, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 154, 813, 'link', '/programs/ahmed-raza', NOW(), NOW(), NULL);

-- Accreditation 5 — content_id 814
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 154, 814, 'sort_number', '5', NOW(), NOW(), NULL),
(3, 154, 814, 'name', 'Zainab Tariq', NOW(), NOW(), NULL),
(3, 154, 814, 'title', 'Instructor', NOW(), NOW(), NULL),
(3, 154, 814, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 154, 814, 'link', '/programs/zainab-tariq', NOW(), NOW(), NULL);

-- Accreditation 6 — content_id 815
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 154, 815, 'sort_number', '6', NOW(), NOW(), NULL),
(3, 154, 815, 'name', 'Usman Farooq', NOW(), NOW(), NULL),
(3, 154, 815, 'title', 'Instructor', NOW(), NOW(), NULL),
(3, 154, 815, 'description', '<p>CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.</p>', NOW(), NOW(), NULL),
(3, 154, 815, 'link', '/programs/usman-farooq', NOW(), NOW(), NULL);


-- ===================== Choose Us Section Header (155) =====================

-- content_id 816
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 155, 816, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 155, 816, 'title', 'Why Choose Us?', NOW(), NOW(), NULL),
(3, 155, 816, 'description', '<p>CEF Online Academy is designed with a comprehensive and well-structured mechanism to ensure holistic learning. We use advanced teaching techniques, carefully curated content, and interactive methodologies to engage students effectively. Our highly trained tutors and mentors are dedicated to guiding every child with patience, expertise, and care. Through this integrated approach, we develop not only knowledge but also character, values, and leadership, preparing students for a purposeful and confident future.</p>', NOW(), NOW(), NULL);


-- ===================== Testimonials Section Header (133) =====================

-- content_id 817
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 133, 817, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 133, 817, 'section-title', 'What Do Our Students SAY!', NOW(), NOW(), NULL),
(3, 133, 817, 'section-sub-title', 'At CEF Online Academy, our students experience more than just learning the Quran. Through our courses, they connect revealed knowledge with acquired knowledge, building confidence, understanding, and strong character. Here''s what they have to say about their journey with us.', NOW(), NOW(), NULL);


-- ===================== Contact Us (160) =====================

-- content_id 818
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 160, 818, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 160, 818, 'title', 'Contact Us', NOW(), NOW(), NULL),
(3, 160, 818, 'address', '2nd Floor, Landmark Heights, Service Road (East), Islamabad Expressway, Islamabad 44000, Pakistan', NOW(), NOW(), NULL),
(3, 160, 818, 'phone', '+92-51-8435553, +92-51-8435554, +92 300 8594256', NOW(), NOW(), NULL),
(3, 160, 818, 'email', 'info@cef.org.pk', NOW(), NOW(), NULL),
(3, 160, 818, 'description', '<p>Head Office, Islamabad</p>', NOW(), NOW(), NULL);


-- ===================== FAQs (161) — 12 entries =====================

-- FAQ 1 — content_id 819
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 161, 819, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 161, 819, 'question', 'What is CEF Online Academy?', NOW(), NOW(), NULL),
(3, 161, 819, 'answer', 'CEF Online Academy is a digital learning platform that provides courses focused on character development, Islamic values, leadership, and practical life skills for learners of all ages.', NOW(), NOW(), NULL);

-- FAQ 2 — content_id 820
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 161, 820, 'sort_number', '2', NOW(), NOW(), NULL),
(3, 161, 820, 'question', 'What courses are available at CEF Online Academy?', NOW(), NOW(), NULL),
(3, 161, 820, 'answer', 'Courses include character building, Quranic studies, leadership development, parenting guidance, and entrepreneurship.', NOW(), NOW(), NULL);

-- FAQ 3 — content_id 821
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 161, 821, 'sort_number', '3', NOW(), NOW(), NULL),
(3, 161, 821, 'question', 'Are the courses live or pre-recorded?', NOW(), NOW(), NULL),
(3, 161, 821, 'answer', 'Most courses are pre-recorded for flexibility, while selected sessions may be conducted live.', NOW(), NOW(), NULL);

-- FAQ 4 — content_id 822
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 161, 822, 'sort_number', '4', NOW(), NOW(), NULL),
(3, 161, 822, 'question', 'How can I enroll in a course?', NOW(), NOW(), NULL),
(3, 161, 822, 'answer', 'You can enroll by creating an account on the platform and selecting the course you want to join.', NOW(), NOW(), NULL);

-- FAQ 5 — content_id 823
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 161, 823, 'sort_number', '5', NOW(), NOW(), NULL),
(3, 161, 823, 'question', 'Are the courses free or paid?', NOW(), NOW(), NULL),
(3, 161, 823, 'answer', 'The academy offers both free and paid courses depending on the program.', NOW(), NOW(), NULL);

-- FAQ 6 — content_id 824
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 161, 824, 'sort_number', '6', NOW(), NOW(), NULL),
(3, 161, 824, 'question', 'What age groups are the courses for?', NOW(), NOW(), NULL),
(3, 161, 824, 'answer', 'Courses are designed for children, teens, parents, and adults.', NOW(), NOW(), NULL);

-- FAQ 7 — content_id 825
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 161, 825, 'sort_number', '7', NOW(), NOW(), NULL),
(3, 161, 825, 'question', 'What makes CEF Online Academy unique?', NOW(), NOW(), NULL),
(3, 161, 825, 'answer', 'It combines Islamic teachings with modern educational techniques to build strong character.', NOW(), NOW(), NULL);

-- FAQ 8 — content_id 826
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 161, 826, 'sort_number', '8', NOW(), NOW(), NULL),
(3, 161, 826, 'question', 'Can I access courses on mobile devices?', NOW(), NOW(), NULL),
(3, 161, 826, 'answer', 'Yes, the platform is fully responsive and works seamlessly on mobile devices.', NOW(), NOW(), NULL);

-- FAQ 9 — content_id 827
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 161, 827, 'sort_number', '9', NOW(), NOW(), NULL),
(3, 161, 827, 'question', 'Do participants receive certificates?', NOW(), NOW(), NULL),
(3, 161, 827, 'answer', 'Certificates are awarded upon successful completion of eligible courses.', NOW(), NOW(), NULL);

-- FAQ 10 — content_id 828
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 161, 828, 'sort_number', '10', NOW(), NOW(), NULL),
(3, 161, 828, 'question', 'How can I contact CEF Online Academy support?', NOW(), NOW(), NULL),
(3, 161, 828, 'answer', 'Support can be reached through the official website or via provided contact channels.', NOW(), NOW(), NULL);

-- FAQ 11 — content_id 829
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 161, 829, 'sort_number', '11', NOW(), NOW(), NULL),
(3, 161, 829, 'question', 'Can I purchase related books?', NOW(), NOW(), NULL),
(3, 161, 829, 'answer', 'Yes, books and supplementary learning materials are available for purchase.', NOW(), NOW(), NULL);

-- FAQ 12 — content_id 830
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 161, 830, 'sort_number', '12', NOW(), NOW(), NULL),
(3, 161, 830, 'question', 'Are there any discounts or scholarships available?', NOW(), NOW(), NULL),
(3, 161, 830, 'answer', 'Discounts and scholarships are offered periodically for selected courses.', NOW(), NOW(), NULL);


-- ===================== Listen & Learn / Podcasts placeholder (136) =====================

-- content_id 831 — Section-level placeholder (individual podcast items to be added via CMS admin)
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 136, 831, 'sort_number', '1', NOW(), NOW(), NULL),
(3, 136, 831, 'title', 'Podcasts You''ll Want To LISTEN!', NOW(), NOW(), NULL),
(3, 136, 831, 'description', '<p>Tune in to CEF Online Academy''s Podcasts to explore ideas that connect revealed knowledge with acquired knowledge. Each episode offers insights, practical guidance, and inspiring discussions on leadership, character, and purposeful living, helping listeners grow into thoughtful, ethical, and faith-grounded leaders.</p>', NOW(), NOW(), NULL);


-- ============================================================
-- NOTE: Media/image fields are NOT included in the above inserts.
-- Upload images via the headless CMS admin panel and they will
-- be automatically linked by the media field IDs.
--
-- Images to upload per collection:
--   about-us (158): header-image for About pages
--   media-center (159): header-image for Media Center pages
--   our-story-section (145): 2 story images
--   vision-section (146): vision circle image
--   mission-section (147): mission circle image
--   values-section (148): values circle image
--   teachers (150): 6 teacher profile images
--   speakers (152): 6 speaker profile images
--   accreditations (154): 6 accreditation logo images
--   contact-us (160): header-image for Contact page
--   listen-and-learn (136): podcast thumbnail images
-- ============================================================
