-- ============================================================
-- Missing headless CMS fields for CEF Online Academy (project_id = 3)
-- Run these INSERT statements against the headless database
-- IDs start from 993 (highest existing collection_fields ID is 992)
-- ============================================================

-- 1. how-it-works (collection_id = 124): Add 'link' field
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(993, 'text', 'link', 'link', NULL, NULL, '{"enumeration":[],"media":[],"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 124, 993, NOW(), NOW());

-- 2. how-it-works (collection_id = 124): Add 'variant' field (green/blue)
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(994, 'text', 'variant', 'variant', NULL, NULL, '{"enumeration":[],"media":[],"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 124, 994, NOW(), NOW());

-- 3. offerings (collection_id = 131): Add 'link' field
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(995, 'text', 'link', 'link', NULL, NULL, '{"enumeration":[],"media":[],"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 131, 995, NOW(), NOW());

-- 4. listen-and-learn (collection_id = 136): Add 'image' field
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(996, 'media', 'image', 'image', NULL, NULL, '{"enumeration":[],"media":{"type":1},"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 136, 996, NOW(), NOW());

-- 5. listen-and-learn (collection_id = 136): Add 'video-url' field
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(997, 'text', 'video url', 'video-url', NULL, NULL, '{"enumeration":[],"media":[],"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 136, 997, NOW(), NOW());

-- 6. mission-kirdaar (collection_id = 134): Add 'video-url' field
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(998, 'text', 'video url', 'video-url', NULL, NULL, '{"enumeration":[],"media":[],"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 134, 998, NOW(), NOW());

-- 7. join-cef (collection_id = 137): Add 'background-image' field
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(999, 'media', 'background image', 'background-image', NULL, NULL, '{"enumeration":[],"media":{"type":1},"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 137, 999, NOW(), NOW());

-- 8. footer-help-desk (collection_id = 143): Add 'link' field
INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(1000, 'text', 'link', 'link', NULL, NULL, '{"enumeration":[],"media":[],"relation":[],"slug":[],"timepicker":false,"hideInContentList":false}', '{"required":{"status":false,"message":null},"unique":{"status":false,"message":null},"charcount":{"status":false,"message":null,"type":"Between","min":null,"max":null}}', 3, 143, 1000, NOW(), NOW());


-- ============================================================
-- Populate the 'link' and 'variant' values for existing content
-- entries using content_meta.
--
-- content_meta columns: id, project_id, collection_id, content_id,
--                       field_name (slug), value, created_at, updated_at, deleted_at
-- Auto-increment starts from 5561+
-- ============================================================

-- how-it-works link values (collection_id=124, content IDs: 753=Demo, 754=Enroll, 755=Student Login, 756=Our Courses)
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 124, 753, 'link', '/demo', NOW(), NOW(), NULL),
(3, 124, 754, 'link', '/enroll', NOW(), NOW(), NULL),
(3, 124, 755, 'link', '/login', NOW(), NOW(), NULL),
(3, 124, 756, 'link', '/courses', NOW(), NOW(), NULL);

-- how-it-works variant values
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 124, 753, 'variant', 'green', NOW(), NOW(), NULL),
(3, 124, 754, 'variant', 'green', NOW(), NOW(), NULL),
(3, 124, 755, 'variant', 'blue', NOW(), NOW(), NULL),
(3, 124, 756, 'variant', 'green', NOW(), NOW(), NULL);

-- offerings link values (collection_id=131, content IDs: 773-777)
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 131, 773, 'link', '/offerings/weekly-sessions', NOW(), NOW(), NULL),
(3, 131, 774, 'link', '/offerings/cef-series', NOW(), NOW(), NULL),
(3, 131, 775, 'link', '/offerings/webinars', NOW(), NOW(), NULL),
(3, 131, 776, 'link', '/offerings/workshops', NOW(), NOW(), NULL),
(3, 131, 777, 'link', '/offerings/mentorship-circles', NOW(), NOW(), NULL);

-- footer-help-desk link values (collection_id=143, content IDs: 783-788)
INSERT INTO `content_meta` (`project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 143, 783, 'link', '/contact', NOW(), NOW(), NULL),
(3, 143, 784, 'link', '/queries', NOW(), NOW(), NULL),
(3, 143, 785, 'link', '/complaints', NOW(), NOW(), NULL),
(3, 143, 786, 'link', '/book-sales-queries', NOW(), NOW(), NULL),
(3, 143, 787, 'link', '/donation-queries', NOW(), NOW(), NULL),
(3, 143, 788, 'link', '/hr-queries', NOW(), NOW(), NULL);
