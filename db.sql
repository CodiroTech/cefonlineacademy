-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 23, 2026 at 01:34 PM
-- Server version: 11.8.3-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u635010970_admin`
--

-- --------------------------------------------------------

--
-- Table structure for table `collections`
--

CREATE TABLE `collections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(60) NOT NULL,
  `slug` varchar(60) NOT NULL,
  `project_id` int(11) NOT NULL,
  `order` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `collections`
--

INSERT INTO `collections` (`id`, `name`, `slug`, `project_id`, `order`, `created_at`, `updated_at`, `deleted_at`) VALUES
(121, 'Site Settings', 'site-settings', 3, 1, '2026-02-10 16:32:48', '2026-02-10 17:00:19', NULL),
(122, 'Homepage Hero Section', 'homepage-hero-section', 3, 3, '2026-02-10 16:34:51', '2026-02-19 13:52:18', NULL),
(124, 'How It Works', 'how-it-works', 3, 5, '2026-02-10 16:35:49', '2026-02-19 13:51:09', NULL),
(126, 'unlock new', 'unlock-new', 3, 6, '2026-02-10 16:39:05', '2026-02-19 13:51:09', NULL),
(127, 'Why Choose Us', 'why-choose-us', 3, 7, '2026-02-10 16:39:17', '2026-02-19 13:51:09', NULL),
(128, 'Journey', 'journey', 3, 8, '2026-02-10 16:40:02', '2026-02-19 13:51:09', NULL),
(129, 'Hallmarks of Excellence', 'hallmarks-of-excellence', 3, 9, '2026-02-10 16:40:31', '2026-02-19 13:51:01', NULL),
(130, 'Our Courses', 'our-courses', 3, 10, '2026-02-10 16:40:48', '2026-02-19 13:51:01', NULL),
(131, 'Offerings', 'offerings', 3, 11, '2026-02-10 16:41:23', '2026-02-19 13:51:01', NULL),
(132, 'Bookshop', 'bookshop', 3, 12, '2026-02-10 16:41:54', '2026-02-19 13:51:01', NULL),
(133, 'Testimonials section', 'testimonials-section', 3, 13, '2026-02-10 16:42:33', '2026-02-19 14:13:57', NULL),
(134, 'Mission Kirdaar', 'mission-kirdaar', 3, 15, '2026-02-10 16:43:33', '2026-02-19 14:15:22', NULL),
(135, 'Blog', 'blog', 3, 16, '2026-02-10 16:44:01', '2026-02-19 14:15:22', NULL),
(136, 'Listen & Learn', 'listen-and-learn', 3, 17, '2026-02-10 16:44:40', '2026-02-19 14:15:22', NULL),
(137, 'Join CEF', 'join-cef', 3, 18, '2026-02-10 16:44:57', '2026-02-19 14:15:22', NULL),
(139, 'socials', 'socials', 3, 2, '2026-02-19 13:45:05', '2026-02-19 13:45:34', NULL),
(140, 'slider 4 steps', 'slider-4-steps', 3, 4, '2026-02-19 13:50:52', '2026-02-19 13:52:18', NULL),
(141, 'courses', 'courses', 3, 20, '2026-02-19 14:02:15', '2026-02-19 14:15:22', NULL),
(142, 'Testimonials', 'testimonials', 3, 14, '2026-02-19 14:15:11', '2026-02-19 14:15:22', NULL),
(143, 'footer help desk', 'footer-help-desk', 3, 143, '2026-02-19 14:27:03', '2026-02-19 14:27:50', NULL),
(144, 'footer', 'footer', 3, 144, '2026-02-19 14:29:18', '2026-02-19 14:29:18', NULL),
(145, 'Our Story Section', 'our-story-section', 3, 145, '2026-02-19 16:27:15', '2026-02-19 16:27:15', NULL),
(146, 'Vision Section', 'vision-section', 3, 146, '2026-02-19 16:27:59', '2026-02-19 16:27:59', NULL),
(147, 'Mission Section', 'mission-section', 3, 147, '2026-02-19 16:28:11', '2026-02-19 16:28:11', NULL),
(148, 'Values Section', 'values-section', 3, 148, '2026-02-19 16:28:40', '2026-02-19 16:28:40', NULL),
(149, 'our teachers section', 'our-teachers-section', 3, 149, '2026-02-19 16:38:21', '2026-02-19 16:38:21', NULL),
(150, 'teachers', 'teachers', 3, 150, '2026-02-19 16:38:30', '2026-02-19 16:38:30', NULL),
(151, 'our speakers section', 'our-speakers-section', 3, 151, '2026-02-19 16:40:55', '2026-02-19 16:40:55', NULL),
(152, 'speakers', 'speakers', 3, 152, '2026-02-19 16:41:05', '2026-02-19 16:41:05', NULL),
(153, 'Our Accreditations section', 'our-accreditations-section', 3, 153, '2026-02-19 16:44:00', '2026-02-19 16:44:00', NULL),
(154, 'Accreditations', 'accreditations', 3, 154, '2026-02-19 16:44:12', '2026-02-19 16:44:12', NULL),
(155, 'Choose Us section', 'choose-us-section', 3, 155, '2026-02-19 16:46:42', '2026-02-19 16:46:42', NULL),
(156, 'Choose Us', 'choose-us', 3, 156, '2026-02-19 16:47:12', '2026-02-19 16:47:12', NULL),
(157, 'Homepage', 'homepage', 3, 157, '2026-02-23 13:07:44', '2026-02-23 13:07:44', NULL),
(158, 'About Us', 'about-us', 3, 158, '2026-02-23 13:07:58', '2026-02-23 13:07:58', NULL),
(159, 'Media Center', 'media-center', 3, 159, '2026-02-23 13:08:32', '2026-02-23 13:08:32', NULL),
(160, 'Contact Us', 'contact-us', 3, 160, '2026-02-23 13:08:53', '2026-02-23 13:08:53', NULL),
(161, 'FAQs', 'faqs', 3, 161, '2026-02-23 13:09:02', '2026-02-23 13:09:02', NULL),
(162, 'Course Details', 'course-details', 3, 162, '2026-02-23 13:09:46', '2026-02-23 13:09:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `collection_fields`
--

CREATE TABLE `collection_fields` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(60) NOT NULL,
  `label` varchar(60) NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `placeholder` varchar(255) DEFAULT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`options`)),
  `validations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`validations`)),
  `project_id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `order` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `collection_fields`
--

INSERT INTO `collection_fields` (`id`, `type`, `label`, `name`, `description`, `placeholder`, `options`, `validations`, `project_id`, `collection_id`, `order`, `created_at`, `updated_at`) VALUES
(893, 'media', 'site logo', 'site-logo', NULL, NULL, '{\"enumeration\":[],\"relation\":[],\"slug\":[],\"hideInContentList\":false,\"hiddenInAPI\":false,\"repeatable\":false,\"media\":{\"type\":1}}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 121, 893, '2026-02-10 16:55:28', '2026-02-10 16:55:28'),
(894, 'media', 'social icon', 'social-icon', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 139, 894, '2026-02-19 13:46:04', '2026-02-19 13:46:04'),
(895, 'slug', 'social url', 'social-url', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":{\"field\":null},\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 139, 895, '2026-02-19 13:47:26', '2026-02-19 13:47:26'),
(896, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"relation\":[],\"slug\":[],\"hideInContentList\":false,\"hiddenInAPI\":false,\"repeatable\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 122, 896, '2026-02-19 13:53:01', '2026-02-23 12:55:48'),
(897, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 122, 897, '2026-02-19 13:53:51', '2026-02-19 13:53:51'),
(898, 'media', 'image', 'image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 122, 898, '2026-02-19 13:54:09', '2026-02-19 13:54:09'),
(899, 'number', 'step', 'step', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 140, 899, '2026-02-19 13:56:31', '2026-02-19 13:56:31'),
(900, 'media', 'icon', 'icon', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 140, 900, '2026-02-19 13:56:48', '2026-02-19 13:56:48'),
(901, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 140, 901, '2026-02-19 13:57:01', '2026-02-19 13:57:01'),
(902, 'longtext', 'step description', 'step-description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 140, 902, '2026-02-19 13:57:50', '2026-02-19 13:57:50'),
(903, 'media', 'icon', 'icon', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 124, 903, '2026-02-19 13:58:26', '2026-02-19 13:58:26'),
(904, 'text', 'heading', 'heading', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 124, 904, '2026-02-19 13:58:44', '2026-02-19 13:58:44'),
(905, 'text', 'button text', 'button-text', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 124, 905, '2026-02-19 13:58:57', '2026-02-19 13:58:57'),
(906, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 126, 906, '2026-02-19 14:00:49', '2026-02-19 14:00:49'),
(907, 'longtext', 'unlock description', 'unlock-description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 126, 907, '2026-02-19 14:01:14', '2026-02-19 14:01:14'),
(908, 'media', 'homepage unlock section image', 'homepage-unlock-section-image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 141, 908, '2026-02-19 14:03:08', '2026-02-19 14:03:08'),
(909, 'text', 'homepage unlock section title', 'homepage-unlock-section-title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 141, 909, '2026-02-19 14:03:38', '2026-02-19 14:03:38'),
(910, 'richtext', 'homepage unlock section description', 'homepage-unlock-section-description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 141, 910, '2026-02-19 14:03:54', '2026-02-19 14:03:54'),
(911, 'media', 'icon', 'icon', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 127, 911, '2026-02-19 14:04:27', '2026-02-19 14:04:27'),
(912, 'number', 'number', 'number', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 127, 912, '2026-02-19 14:04:45', '2026-02-19 14:04:45'),
(913, 'text', 'text', 'text', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 127, 913, '2026-02-19 14:04:59', '2026-02-19 14:04:59'),
(914, 'media', 'icon', 'icon', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 128, 914, '2026-02-19 14:05:24', '2026-02-19 14:05:24'),
(915, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 128, 915, '2026-02-19 14:05:36', '2026-02-19 14:05:36'),
(916, 'longtext', 'text', 'text', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 128, 916, '2026-02-19 14:05:45', '2026-02-19 14:05:45'),
(917, 'media', 'icon', 'icon', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 129, 917, '2026-02-19 14:06:13', '2026-02-19 14:06:13'),
(918, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 129, 918, '2026-02-19 14:06:33', '2026-02-19 14:06:33'),
(919, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 129, 919, '2026-02-19 14:06:50', '2026-02-19 14:06:50'),
(920, 'media', 'homepage our courses section image', 'homepage-our-courses-section-image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 141, 920, '2026-02-19 14:08:07', '2026-02-19 14:08:07'),
(921, 'text', 'homepage our courses section title', 'homepage-our-courses-section-title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 141, 921, '2026-02-19 14:08:43', '2026-02-19 14:08:43'),
(923, 'richtext', 'homepage our courses section description', 'homepage-our-courses-section-description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 141, 923, '2026-02-19 14:09:15', '2026-02-19 14:09:15'),
(924, 'media', 'image', 'image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 131, 924, '2026-02-19 14:10:20', '2026-02-19 14:10:20'),
(925, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 131, 925, '2026-02-19 14:10:32', '2026-02-19 14:10:32'),
(926, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 131, 926, '2026-02-19 14:10:45', '2026-02-19 14:10:45'),
(927, 'media', 'image', 'image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 132, 927, '2026-02-19 14:11:34', '2026-02-19 14:11:34'),
(928, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 132, 928, '2026-02-19 14:11:47', '2026-02-19 14:11:47'),
(929, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 132, 929, '2026-02-19 14:12:00', '2026-02-19 14:12:00'),
(930, 'text', 'section title', 'section-title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 133, 930, '2026-02-19 14:12:37', '2026-02-19 14:12:37'),
(931, 'longtext', 'section sub title', 'section-sub-title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 133, 931, '2026-02-19 14:13:10', '2026-02-19 14:13:10'),
(932, 'media', 'image', 'image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 142, 932, '2026-02-19 14:15:54', '2026-02-19 14:15:54'),
(933, 'text', 'name', 'name', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 142, 933, '2026-02-19 14:16:09', '2026-02-19 14:16:09'),
(934, 'text', 'country', 'country', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 142, 934, '2026-02-19 14:16:21', '2026-02-19 14:16:21'),
(935, 'text', 'text', 'text', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 142, 935, '2026-02-19 14:16:37', '2026-02-19 14:16:37'),
(936, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 134, 936, '2026-02-19 14:17:21', '2026-02-19 14:17:21'),
(937, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 134, 937, '2026-02-19 14:17:39', '2026-02-19 14:17:39'),
(938, 'media', 'media', 'media', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 134, 938, '2026-02-19 14:17:55', '2026-02-19 14:17:55'),
(939, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 136, 939, '2026-02-19 14:20:26', '2026-02-19 14:20:26'),
(940, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 136, 940, '2026-02-19 14:20:49', '2026-02-19 14:20:49'),
(941, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 137, 941, '2026-02-19 14:21:26', '2026-02-19 14:21:26'),
(942, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 137, 942, '2026-02-19 14:21:42', '2026-02-19 14:21:42'),
(943, 'media', 'icon', 'icon', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 143, 943, '2026-02-19 14:28:14', '2026-02-19 14:28:14'),
(944, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 143, 944, '2026-02-19 14:28:27', '2026-02-19 14:28:27'),
(945, 'media', 'logo', 'logo', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 144, 945, '2026-02-19 14:29:37', '2026-02-19 14:29:37'),
(946, 'media', 'icon logo', 'icon-logo', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 144, 946, '2026-02-19 14:30:09', '2026-02-19 14:30:09'),
(947, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 144, 947, '2026-02-19 14:30:30', '2026-02-19 14:30:30'),
(948, 'longtext', 'copyright text', 'copyright-text', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 144, 948, '2026-02-19 14:30:50', '2026-02-19 14:30:50'),
(949, 'media', 'images', 'images', NULL, NULL, '{\"enumeration\":[],\"relation\":[],\"slug\":[],\"hideInContentList\":false,\"hiddenInAPI\":false,\"repeatable\":false,\"media\":{\"type\":\"2\"}}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 145, 949, '2026-02-19 16:31:13', '2026-02-19 16:31:13'),
(950, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 145, 950, '2026-02-19 16:31:27', '2026-02-19 16:31:27'),
(951, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 145, 951, '2026-02-19 16:31:41', '2026-02-19 16:31:41'),
(952, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 146, 952, '2026-02-19 16:32:06', '2026-02-19 16:32:06'),
(953, 'longtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 146, 953, '2026-02-19 16:32:21', '2026-02-19 16:32:21'),
(954, 'media', 'image', 'image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 146, 954, '2026-02-19 16:32:32', '2026-02-19 16:32:32'),
(955, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 147, 955, '2026-02-19 16:33:27', '2026-02-19 16:33:27'),
(956, 'longtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 147, 956, '2026-02-19 16:33:37', '2026-02-19 16:33:37'),
(957, 'media', 'image', 'image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 147, 957, '2026-02-19 16:33:47', '2026-02-19 16:33:47'),
(958, 'media', 'image', 'image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 148, 3, '2026-02-19 16:34:07', '2026-02-19 16:34:35'),
(959, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 148, 1, '2026-02-19 16:34:21', '2026-02-19 16:34:35'),
(960, 'longtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 148, 2, '2026-02-19 16:34:28', '2026-02-19 16:34:35'),
(961, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 149, 961, '2026-02-19 16:38:49', '2026-02-19 16:38:49'),
(962, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 149, 962, '2026-02-19 16:39:03', '2026-02-19 16:39:03'),
(963, 'media', 'image', 'image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 150, 963, '2026-02-19 16:39:48', '2026-02-19 16:39:48'),
(964, 'text', 'name', 'name', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 150, 964, '2026-02-19 16:39:56', '2026-02-19 16:39:56'),
(965, 'text', 'designation', 'designation', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 150, 965, '2026-02-19 16:40:08', '2026-02-19 16:40:08'),
(966, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 150, 966, '2026-02-19 16:40:23', '2026-02-19 16:40:23'),
(967, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 151, 967, '2026-02-19 16:41:21', '2026-02-19 16:41:21'),
(968, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 151, 968, '2026-02-19 16:41:33', '2026-02-19 16:41:33'),
(969, 'text', 'name', 'name', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 152, 2, '2026-02-19 16:41:48', '2026-02-19 16:42:27'),
(970, 'text', 'designation', 'designation', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 152, 3, '2026-02-19 16:41:59', '2026-02-19 16:42:27'),
(971, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 152, 4, '2026-02-19 16:42:11', '2026-02-19 16:42:27'),
(972, 'media', 'image', 'image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 152, 1, '2026-02-19 16:42:21', '2026-02-19 16:42:27'),
(973, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 153, 973, '2026-02-19 16:44:27', '2026-02-19 16:44:27'),
(974, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 153, 974, '2026-02-19 16:44:48', '2026-02-19 16:44:48'),
(975, 'text', 'name', 'name', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 154, 2, '2026-02-19 16:45:08', '2026-02-19 16:45:53'),
(976, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 154, 3, '2026-02-19 16:45:21', '2026-02-19 16:45:53'),
(977, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 154, 4, '2026-02-19 16:45:37', '2026-02-19 16:45:53'),
(978, 'media', 'image', 'image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 154, 1, '2026-02-19 16:45:48', '2026-02-19 16:45:53'),
(979, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 155, 979, '2026-02-19 16:47:31', '2026-02-19 16:47:31'),
(980, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 155, 980, '2026-02-19 16:47:44', '2026-02-19 16:47:44'),
(981, 'text', 'title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 156, 2, '2026-02-19 16:48:06', '2026-02-19 16:49:03'),
(982, 'media', 'icon', 'icon', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 156, 1, '2026-02-19 16:48:28', '2026-02-19 16:49:03'),
(983, 'richtext', 'description', 'description', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 156, 3, '2026-02-19 16:48:51', '2026-02-19 16:49:03'),
(984, 'text', 'Title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":true,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 157, 984, '2026-02-23 13:10:23', '2026-02-23 13:10:23'),
(985, 'text', 'Title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":true,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 158, 985, '2026-02-23 13:10:34', '2026-02-23 13:10:34'),
(986, 'text', 'Title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":true,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 159, 986, '2026-02-23 13:10:45', '2026-02-23 13:10:45'),
(987, 'text', 'Title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":false,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 160, 987, '2026-02-23 13:10:54', '2026-02-23 13:10:54'),
(988, 'media', 'Header Image', 'header-image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":true,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 158, 988, '2026-02-23 13:11:57', '2026-02-23 13:11:57'),
(989, 'media', 'Header Image', 'header-image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":true,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 159, 989, '2026-02-23 13:12:13', '2026-02-23 13:12:13'),
(990, 'media', 'Header Image', 'header-image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":true,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 160, 990, '2026-02-23 13:12:23', '2026-02-23 13:12:23'),
(991, 'media', 'Header Image', 'header-image', NULL, NULL, '{\"enumeration\":[],\"media\":{\"type\":1},\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":true,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 161, 991, '2026-02-23 13:12:32', '2026-02-23 13:12:32'),
(992, 'text', 'Title', 'title', NULL, NULL, '{\"enumeration\":[],\"media\":[],\"relation\":[],\"slug\":[],\"timepicker\":false,\"hideInContentList\":false}', '{\"required\":{\"status\":true,\"message\":null},\"unique\":{\"status\":false,\"message\":null},\"charcount\":{\"status\":false,\"message\":null,\"type\":\"Between\",\"min\":null,\"max\":null}}', 3, 162, 992, '2026-02-23 13:12:44', '2026-02-23 13:12:44');

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `locale` varchar(10) DEFAULT NULL,
  `form_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `published_at` timestamp NULL DEFAULT NULL,
  `published_by` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `sort_number` int(11) DEFAULT 999
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `project_id`, `collection_id`, `locale`, `form_id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `published_at`, `published_by`, `deleted_at`, `sort_number`) VALUES
(747, 3, 121, 'en', NULL, '2026-02-20 06:32:51', 1, '2026-02-20 06:32:51', NULL, NULL, NULL, NULL, 1),
(748, 3, 122, 'en', NULL, '2026-02-20 06:38:41', 1, '2026-02-20 06:38:41', NULL, NULL, NULL, NULL, 2),
(749, 3, 140, 'en', NULL, '2026-02-20 06:47:48', 1, '2026-02-20 06:47:48', NULL, NULL, NULL, NULL, 1),
(750, 3, 140, 'en', NULL, '2026-02-20 06:48:36', 1, '2026-02-20 06:48:36', NULL, NULL, NULL, NULL, 2),
(751, 3, 140, 'en', NULL, '2026-02-20 06:49:41', 1, '2026-02-20 06:49:41', NULL, NULL, NULL, NULL, 3),
(752, 3, 140, 'en', NULL, '2026-02-20 06:50:23', 1, '2026-02-20 06:50:23', NULL, NULL, NULL, NULL, 4),
(753, 3, 124, 'en', NULL, '2026-02-20 06:56:35', 1, '2026-02-20 06:56:35', NULL, NULL, NULL, NULL, 1),
(754, 3, 124, 'en', NULL, '2026-02-20 06:57:37', 1, '2026-02-20 06:57:37', NULL, NULL, NULL, NULL, 2),
(755, 3, 124, 'en', NULL, '2026-02-20 06:58:32', 1, '2026-02-20 06:58:32', NULL, NULL, NULL, NULL, 3),
(756, 3, 124, 'en', NULL, '2026-02-20 06:59:04', 1, '2026-02-20 06:59:04', NULL, NULL, NULL, NULL, 4),
(757, 3, 126, 'en', NULL, '2026-02-20 06:59:47', 1, '2026-02-20 06:59:47', NULL, NULL, NULL, NULL, 1),
(758, 3, 127, 'en', NULL, '2026-02-20 07:14:33', 1, '2026-02-20 07:14:33', NULL, NULL, NULL, NULL, 1),
(759, 3, 127, 'en', NULL, '2026-02-20 07:16:15', 1, '2026-02-20 07:16:15', NULL, NULL, NULL, NULL, 2),
(760, 3, 127, 'en', NULL, '2026-02-20 07:17:40', 1, '2026-02-20 07:17:40', NULL, NULL, NULL, NULL, 3),
(761, 3, 127, 'en', NULL, '2026-02-20 07:18:24', 1, '2026-02-20 07:18:24', NULL, NULL, NULL, NULL, 4),
(762, 3, 127, 'en', NULL, '2026-02-20 07:20:27', 1, '2026-02-20 07:20:27', NULL, NULL, NULL, NULL, 5),
(763, 3, 128, 'en', NULL, '2026-02-20 07:41:15', 1, '2026-02-20 07:41:15', NULL, NULL, NULL, NULL, 1),
(764, 3, 128, 'en', NULL, '2026-02-20 07:42:05', 1, '2026-02-20 07:42:05', NULL, NULL, NULL, NULL, 2),
(765, 3, 128, 'en', NULL, '2026-02-20 07:42:48', 1, '2026-02-20 07:42:48', NULL, NULL, NULL, NULL, 3),
(766, 3, 128, 'en', NULL, '2026-02-20 07:43:37', 1, '2026-02-20 07:43:37', NULL, NULL, NULL, NULL, 4),
(767, 3, 129, 'en', NULL, '2026-02-20 08:10:35', 1, '2026-02-20 08:12:29', 1, NULL, NULL, NULL, 1),
(768, 3, 129, 'en', NULL, '2026-02-20 08:14:05', 1, '2026-02-20 08:14:05', NULL, NULL, NULL, NULL, 2),
(769, 3, 129, 'en', NULL, '2026-02-20 08:14:51', 1, '2026-02-20 08:14:51', NULL, NULL, NULL, NULL, 3),
(770, 3, 129, 'en', NULL, '2026-02-20 09:17:15', 1, '2026-02-20 09:17:15', NULL, NULL, NULL, NULL, 4),
(771, 3, 129, 'en', NULL, '2026-02-20 09:18:04', 1, '2026-02-20 09:18:04', NULL, NULL, NULL, NULL, 5),
(772, 3, 129, 'en', NULL, '2026-02-20 09:20:16', 1, '2026-02-20 09:20:16', NULL, NULL, NULL, NULL, 6),
(773, 3, 131, 'en', NULL, '2026-02-20 09:25:40', 1, '2026-02-20 09:25:40', NULL, NULL, NULL, NULL, 1),
(774, 3, 131, 'en', NULL, '2026-02-20 09:27:35', 1, '2026-02-20 09:27:35', NULL, NULL, NULL, NULL, 2),
(775, 3, 131, 'en', NULL, '2026-02-20 09:28:43', 1, '2026-02-20 09:28:43', NULL, NULL, NULL, NULL, 3),
(776, 3, 131, 'en', NULL, '2026-02-20 09:30:20', 1, '2026-02-20 09:30:20', NULL, NULL, NULL, NULL, 4),
(777, 3, 131, 'en', NULL, '2026-02-20 09:31:55', 1, '2026-02-20 09:31:55', NULL, NULL, NULL, NULL, 5),
(778, 3, 132, 'en', NULL, '2026-02-20 09:35:36', 1, '2026-02-20 09:35:36', NULL, NULL, NULL, NULL, 1),
(779, 3, 142, 'en', NULL, '2026-02-20 09:43:46', 1, '2026-02-20 09:43:46', NULL, NULL, NULL, NULL, 1),
(780, 3, 142, 'en', NULL, '2026-02-20 09:44:49', 1, '2026-02-20 09:44:49', NULL, NULL, NULL, NULL, 2),
(781, 3, 134, 'en', NULL, '2026-02-20 09:46:29', 1, '2026-02-20 09:46:29', NULL, NULL, NULL, NULL, 1),
(782, 3, 137, 'en', NULL, '2026-02-20 09:49:39', 1, '2026-02-20 09:49:39', NULL, NULL, NULL, NULL, 1),
(783, 3, 143, 'en', NULL, '2026-02-20 09:52:06', 1, '2026-02-20 09:52:06', NULL, NULL, NULL, NULL, 1),
(784, 3, 143, 'en', NULL, '2026-02-20 09:52:43', 1, '2026-02-20 09:52:43', NULL, NULL, NULL, NULL, 2),
(785, 3, 143, 'en', NULL, '2026-02-20 09:53:17', 1, '2026-02-20 09:53:17', NULL, NULL, NULL, NULL, 3),
(786, 3, 143, 'en', NULL, '2026-02-20 09:53:56', 1, '2026-02-20 09:53:56', NULL, NULL, NULL, NULL, 4),
(787, 3, 143, 'en', NULL, '2026-02-20 09:54:47', 1, '2026-02-20 09:54:47', NULL, NULL, NULL, NULL, 5),
(788, 3, 143, 'en', NULL, '2026-02-20 09:55:21', 1, '2026-02-20 09:55:21', NULL, NULL, NULL, NULL, 6);

-- --------------------------------------------------------

--
-- Table structure for table `content_meta`
--

CREATE TABLE `content_meta` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `content_id` int(11) NOT NULL,
  `field_name` varchar(255) NOT NULL,
  `value` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `content_meta`
--

INSERT INTO `content_meta` (`id`, `project_id`, `collection_id`, `content_id`, `field_name`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(5397, 3, 121, 747, 'sort_number', '1', '2026-02-20 06:32:51', '2026-02-20 06:32:51', NULL),
(5398, 3, 121, 747, 'site-logo', '1165', '2026-02-20 06:32:51', '2026-02-20 06:32:51', NULL),
(5399, 3, 122, 748, 'sort_number', '2', '2026-02-20 06:38:41', '2026-02-20 06:38:41', NULL),
(5400, 3, 122, 748, 'titla', 'Transforming Lives Globally— From Quran to Character', '2026-02-20 06:38:41', '2026-02-20 06:38:41', NULL),
(5401, 3, 122, 748, 'description', '<p><strong>Illuminate Your Soul with Quran.</strong></p><p>At CEF Online Academy, we offer excellence in Nazirah and Fahm-ul-Quran, helping students recite, understand, and live the Quran. Our character-building courses blend modern skills with Quranic and Prophetic values, empowering youth to live purposefully, lead confidently, and serve the Ummah with excellence.</p>', '2026-02-20 06:38:41', '2026-02-20 06:38:41', NULL),
(5402, 3, 122, 748, 'image', '1166', '2026-02-20 06:38:41', '2026-02-20 06:38:41', NULL),
(5403, 3, 140, 749, 'sort_number', '1', '2026-02-20 06:47:48', '2026-02-20 06:47:48', NULL),
(5404, 3, 140, 749, 'step', '1', '2026-02-20 06:47:48', '2026-02-20 06:47:48', NULL),
(5405, 3, 140, 749, 'title', 'Sign up', '2026-02-20 06:47:48', '2026-02-20 06:47:48', NULL),
(5406, 3, 140, 749, 'step-description', 'Create your account by adding your basic details.', '2026-02-20 06:47:48', '2026-02-20 06:47:48', NULL),
(5407, 3, 140, 749, 'icon', '1167', '2026-02-20 06:47:48', '2026-02-20 06:47:48', NULL),
(5408, 3, 140, 750, 'sort_number', '2', '2026-02-20 06:48:36', '2026-02-20 06:48:36', NULL),
(5409, 3, 140, 750, 'step', '2', '2026-02-20 06:48:36', '2026-02-20 06:48:36', NULL),
(5410, 3, 140, 750, 'title', 'Take a Demo', '2026-02-20 06:48:36', '2026-02-20 06:48:36', NULL),
(5411, 3, 140, 750, 'step-description', 'Explore our teaching excellence through a free demo session.', '2026-02-20 06:48:36', '2026-02-20 06:48:36', NULL),
(5412, 3, 140, 750, 'icon', '1168', '2026-02-20 06:48:36', '2026-02-20 06:48:36', NULL),
(5413, 3, 140, 751, 'sort_number', '3', '2026-02-20 06:49:41', '2026-02-20 06:49:41', NULL),
(5414, 3, 140, 751, 'step', '3', '2026-02-20 06:49:41', '2026-02-20 06:49:41', NULL),
(5415, 3, 140, 751, 'title', 'Choose & Enroll', '2026-02-20 06:49:41', '2026-02-20 06:49:41', NULL),
(5416, 3, 140, 751, 'step-description', 'Select your preferred course and complete the payment.', '2026-02-20 06:49:41', '2026-02-20 06:49:41', NULL),
(5417, 3, 140, 751, 'icon', '1169', '2026-02-20 06:49:41', '2026-02-20 06:49:41', NULL),
(5418, 3, 140, 752, 'sort_number', '4', '2026-02-20 06:50:23', '2026-02-20 06:50:23', NULL),
(5419, 3, 140, 752, 'step', '4', '2026-02-20 06:50:23', '2026-02-20 06:50:23', NULL),
(5420, 3, 140, 752, 'title', 'Start Learning', '2026-02-20 06:50:23', '2026-02-20 06:50:23', NULL),
(5421, 3, 140, 752, 'step-description', 'Access your dashboard & begin your learning journey.', '2026-02-20 06:50:23', '2026-02-20 06:50:23', NULL),
(5422, 3, 140, 752, 'icon', '1170', '2026-02-20 06:50:23', '2026-02-20 06:50:23', NULL),
(5423, 3, 124, 753, 'sort_number', '1', '2026-02-20 06:56:35', '2026-02-20 06:56:35', NULL),
(5424, 3, 124, 753, 'heading', 'Demo', '2026-02-20 06:56:35', '2026-02-20 06:56:35', NULL),
(5425, 3, 124, 753, 'button-text', 'BOOK A FREE DEMO', '2026-02-20 06:56:35', '2026-02-20 06:56:35', NULL),
(5426, 3, 124, 753, 'icon', '1171', '2026-02-20 06:56:35', '2026-02-20 06:56:35', NULL),
(5427, 3, 124, 754, 'sort_number', '2', '2026-02-20 06:57:37', '2026-02-20 06:57:37', NULL),
(5428, 3, 124, 754, 'heading', 'Enroll', '2026-02-20 06:57:37', '2026-02-20 06:57:37', NULL),
(5429, 3, 124, 754, 'button-text', 'CHOOSE & ENROLL', '2026-02-20 06:57:37', '2026-02-20 06:57:37', NULL),
(5430, 3, 124, 754, 'icon', '1172', '2026-02-20 06:57:37', '2026-02-20 06:57:37', NULL),
(5431, 3, 124, 755, 'sort_number', '3', '2026-02-20 06:58:32', '2026-02-20 06:58:32', NULL),
(5432, 3, 124, 755, 'heading', 'Student Login', '2026-02-20 06:58:32', '2026-02-20 06:58:32', NULL),
(5433, 3, 124, 755, 'button-text', 'LOGIN TO LEARN', '2026-02-20 06:58:32', '2026-02-20 06:58:32', NULL),
(5434, 3, 124, 755, 'icon', '1173', '2026-02-20 06:58:32', '2026-02-20 06:58:32', NULL),
(5435, 3, 124, 756, 'sort_number', '4', '2026-02-20 06:59:04', '2026-02-20 06:59:04', NULL),
(5436, 3, 124, 756, 'heading', 'Our Courses', '2026-02-20 06:59:04', '2026-02-20 06:59:04', NULL),
(5437, 3, 124, 756, 'button-text', 'VIEW COURSES', '2026-02-20 06:59:04', '2026-02-20 06:59:04', NULL),
(5438, 3, 124, 756, 'icon', '1174', '2026-02-20 06:59:04', '2026-02-20 06:59:04', NULL),
(5439, 3, 126, 757, 'sort_number', '1', '2026-02-20 06:59:47', '2026-02-20 06:59:47', NULL),
(5440, 3, 126, 757, 'title', 'Unlock What\'s  New!', '2026-02-20 06:59:47', '2026-02-20 06:59:47', NULL),
(5441, 3, 126, 757, 'unlock-description', 'Explore our fresh new courses and inspiring sessions designed to expand your knowledge, skills, and character.', '2026-02-20 06:59:47', '2026-02-20 06:59:47', NULL),
(5442, 3, 127, 758, 'sort_number', '1', '2026-02-20 07:14:33', '2026-02-20 07:14:33', NULL),
(5443, 3, 127, 758, 'number', '25', '2026-02-20 07:14:33', '2026-02-20 07:14:33', NULL),
(5444, 3, 127, 758, 'text', 'Countries', '2026-02-20 07:14:33', '2026-02-20 07:14:33', NULL),
(5445, 3, 127, 758, 'icon', '1175', '2026-02-20 07:14:33', '2026-02-20 07:14:33', NULL),
(5446, 3, 127, 759, 'sort_number', '2', '2026-02-20 07:16:15', '2026-02-20 07:16:15', NULL),
(5447, 3, 127, 759, 'number', '25', '2026-02-20 07:16:15', '2026-02-20 07:16:15', NULL),
(5448, 3, 127, 759, 'text', 'Students', '2026-02-20 07:16:15', '2026-02-20 07:16:15', NULL),
(5449, 3, 127, 759, 'icon', '1176', '2026-02-20 07:16:15', '2026-02-20 07:16:15', NULL),
(5450, 3, 127, 760, 'sort_number', '3', '2026-02-20 07:17:40', '2026-02-20 07:17:40', NULL),
(5451, 3, 127, 760, 'number', '25', '2026-02-20 07:17:40', '2026-02-20 07:17:40', NULL),
(5452, 3, 127, 760, 'text', 'Years of Experience', '2026-02-20 07:17:40', '2026-02-20 07:17:40', NULL),
(5453, 3, 127, 760, 'icon', '1177', '2026-02-20 07:17:40', '2026-02-20 07:17:40', NULL),
(5454, 3, 127, 761, 'sort_number', '4', '2026-02-20 07:18:24', '2026-02-20 07:18:24', NULL),
(5455, 3, 127, 761, 'number', '25', '2026-02-20 07:18:24', '2026-02-20 07:18:24', NULL),
(5456, 3, 127, 761, 'text', 'Tutors', '2026-02-20 07:18:24', '2026-02-20 07:18:24', NULL),
(5457, 3, 127, 761, 'icon', '1178', '2026-02-20 07:18:24', '2026-02-20 07:18:24', NULL),
(5458, 3, 127, 762, 'sort_number', '5', '2026-02-20 07:20:27', '2026-02-20 07:20:27', NULL),
(5459, 3, 127, 762, 'number', '25', '2026-02-20 07:20:27', '2026-02-20 07:20:27', NULL),
(5460, 3, 127, 762, 'text', 'Courses', '2026-02-20 07:20:27', '2026-02-20 07:20:27', NULL),
(5461, 3, 127, 762, 'icon', '1179', '2026-02-20 07:20:27', '2026-02-20 07:20:27', NULL),
(5462, 3, 128, 763, 'sort_number', '1', '2026-02-20 07:41:15', '2026-02-20 07:41:15', NULL),
(5463, 3, 128, 763, 'title', 'Sign Up', '2026-02-20 07:41:15', '2026-02-20 07:41:15', NULL),
(5464, 3, 128, 763, 'text', 'Create your account by adding your basic details.', '2026-02-20 07:41:15', '2026-02-20 07:41:15', NULL),
(5465, 3, 128, 763, 'icon', '1181', '2026-02-20 07:41:15', '2026-02-20 07:41:15', NULL),
(5466, 3, 128, 764, 'sort_number', '2', '2026-02-20 07:42:05', '2026-02-20 07:42:05', NULL),
(5467, 3, 128, 764, 'title', 'Take a Demo', '2026-02-20 07:42:05', '2026-02-20 07:42:05', NULL),
(5468, 3, 128, 764, 'text', 'Explore our teaching excellence through a free demo session.', '2026-02-20 07:42:05', '2026-02-20 07:42:05', NULL),
(5469, 3, 128, 764, 'icon', '1182', '2026-02-20 07:42:05', '2026-02-20 07:42:05', NULL),
(5470, 3, 128, 765, 'sort_number', '3', '2026-02-20 07:42:48', '2026-02-20 07:42:48', NULL),
(5471, 3, 128, 765, 'icon', '1183', '2026-02-20 07:42:48', '2026-02-20 07:42:48', NULL),
(5472, 3, 128, 765, 'title', 'Choose & Enroll', '2026-02-20 07:42:48', '2026-02-20 07:42:48', NULL),
(5473, 3, 128, 765, 'text', 'Select your preferred course and complete the payment.', '2026-02-20 07:42:48', '2026-02-20 07:42:48', NULL),
(5474, 3, 128, 766, 'sort_number', '4', '2026-02-20 07:43:37', '2026-02-20 07:43:37', NULL),
(5475, 3, 128, 766, 'icon', '1184', '2026-02-20 07:43:37', '2026-02-20 07:43:37', NULL),
(5476, 3, 128, 766, 'title', 'Start Learning', '2026-02-20 07:43:37', '2026-02-20 07:43:37', NULL),
(5477, 3, 128, 766, 'text', 'Access your dashboard & begin your personalized learning journey.', '2026-02-20 07:43:37', '2026-02-20 07:43:37', NULL),
(5478, 3, 129, 767, 'sort_number', '1', '2026-02-20 08:10:35', '2026-02-20 08:10:35', NULL),
(5479, 3, 129, 767, 'title', 'Progress Feedback Mechanism with 24/7 Support', '2026-02-20 08:10:35', '2026-02-20 08:10:35', NULL),
(5480, 3, 129, 767, 'description', '<p><span style=\"color: rgb(42, 54, 63); background-color: rgb(243, 245, 255);\">Regular assessments, progress reports, and round-the-clock support help students stay on track and continuously improve.</span></p>', '2026-02-20 08:10:35', '2026-02-20 08:12:29', NULL),
(5481, 3, 129, 767, 'icon', '1185', '2026-02-20 08:10:35', '2026-02-20 08:10:35', NULL),
(5482, 3, 129, 768, 'sort_number', '2', '2026-02-20 08:14:05', '2026-02-20 08:14:05', NULL),
(5483, 3, 129, 768, 'icon', '1186', '2026-02-20 08:14:05', '2026-02-20 08:14:05', NULL),
(5484, 3, 129, 768, 'title', 'Virtual Classroom - Individual & Group Instructions', '2026-02-20 08:14:05', '2026-02-20 08:14:05', NULL),
(5485, 3, 129, 768, 'description', '<p><span style=\"color: rgb(255, 255, 255);\">Enjoy the flexibility of personalized one-on-one sessions or interactive group classes in our digital learning environment.</span></p>', '2026-02-20 08:14:05', '2026-02-20 08:14:05', NULL),
(5486, 3, 129, 769, 'sort_number', '3', '2026-02-20 08:14:51', '2026-02-20 08:14:51', NULL),
(5487, 3, 129, 769, 'icon', '1187', '2026-02-20 08:14:51', '2026-02-20 08:14:51', NULL),
(5488, 3, 129, 769, 'title', 'Unique Teaching Methodology', '2026-02-20 08:14:51', '2026-02-20 08:14:51', NULL),
(5489, 3, 129, 769, 'description', '<p><span style=\"color: rgb(255, 255, 255);\">We use interactive techniques like Total Physical Interaction (TPI), contextual learning, and gradual progression for effective knowledge retention.</span></p>', '2026-02-20 08:14:51', '2026-02-20 08:14:51', NULL),
(5490, 3, 129, 770, 'sort_number', '4', '2026-02-20 09:17:15', '2026-02-20 09:17:15', NULL),
(5491, 3, 129, 770, 'title', 'Highly Researched Content', '2026-02-20 09:17:15', '2026-02-20 09:17:15', NULL),
(5492, 3, 129, 770, 'description', '<p><span style=\"color: rgb(255, 255, 255);\">Our courses are built on well-researched, authentic knowledge, ensuring a structured and engaging learning experience.</span></p>', '2026-02-20 09:17:15', '2026-02-20 09:17:15', NULL),
(5493, 3, 129, 770, 'icon', '1188', '2026-02-20 09:17:15', '2026-02-20 09:17:15', NULL),
(5494, 3, 129, 771, 'sort_number', '5', '2026-02-20 09:18:04', '2026-02-20 09:18:04', NULL),
(5495, 3, 129, 771, 'title', 'Highly Trained Tutors', '2026-02-20 09:18:04', '2026-02-20 09:18:04', NULL),
(5496, 3, 129, 771, 'description', '<p><span style=\"color: rgb(255, 255, 255);\">Our tutors are experienced educators, trained in modern teaching methodologies and Islamic studies to provide quality instruction.</span></p>', '2026-02-20 09:18:04', '2026-02-20 09:18:04', NULL),
(5497, 3, 129, 771, 'icon', '1189', '2026-02-20 09:18:04', '2026-02-20 09:18:04', NULL),
(5498, 3, 129, 772, 'sort_number', '6', '2026-02-20 09:20:16', '2026-02-20 09:20:16', NULL),
(5499, 3, 129, 772, 'title', 'Female & Male Tutors for Separate Classes', '2026-02-20 09:20:16', '2026-02-20 09:20:16', NULL),
(5500, 3, 129, 772, 'description', '<p><span style=\"color: rgb(255, 255, 255);\">We offer gender-segregated classes, ensuring a comfortable and focused learning space for all students.</span></p>', '2026-02-20 09:20:16', '2026-02-20 09:20:16', NULL),
(5501, 3, 129, 772, 'icon', '1190', '2026-02-20 09:20:16', '2026-02-20 09:20:16', NULL),
(5502, 3, 131, 773, 'sort_number', '1', '2026-02-20 09:25:40', '2026-02-20 09:25:40', NULL),
(5503, 3, 131, 773, 'title', 'Weekly Sessions', '2026-02-20 09:25:40', '2026-02-20 09:25:40', NULL),
(5504, 3, 131, 773, 'description', '<h3>Explore our weekly learning sessions designed to deepen Quranic understanding, strengthen character, and inspire meaningful growth in everyday life.</h3>', '2026-02-20 09:25:40', '2026-02-20 09:25:40', NULL),
(5505, 3, 131, 773, 'image', '1191', '2026-02-20 09:25:40', '2026-02-20 09:25:40', NULL),
(5506, 3, 131, 774, 'sort_number', '2', '2026-02-20 09:27:35', '2026-02-20 09:27:35', NULL),
(5507, 3, 131, 774, 'description', '<h3>Engage with our special series offering focused learning journeys that connect Quranic wisdom with real-life values and personal transformation.</h3>', '2026-02-20 09:27:35', '2026-02-20 09:27:35', NULL),
(5508, 3, 131, 774, 'title', 'CEF Series', '2026-02-20 09:27:35', '2026-02-20 09:27:35', NULL),
(5509, 3, 131, 774, 'image', '1193', '2026-02-20 09:27:35', '2026-02-20 09:27:35', NULL),
(5510, 3, 131, 775, 'sort_number', '3', '2026-02-20 09:28:43', '2026-02-20 09:28:43', NULL),
(5511, 3, 131, 775, 'description', '<h3>Join our interactive webinars featuring scholars and experts who share insights on faith, character, and purposeful living.</h3>', '2026-02-20 09:28:43', '2026-02-20 09:28:43', NULL),
(5512, 3, 131, 775, 'title', 'Webinars', '2026-02-20 09:28:43', '2026-02-20 09:28:43', NULL),
(5513, 3, 131, 775, 'image', '1194', '2026-02-20 09:28:43', '2026-02-20 09:28:43', NULL),
(5514, 3, 131, 776, 'sort_number', '4', '2026-02-20 09:30:20', '2026-02-20 09:30:20', NULL),
(5515, 3, 131, 776, 'description', '<h3>Experience our hands-on workshops that build practical skills, strengthen values, and encourage personal and community growth.</h3>', '2026-02-20 09:30:20', '2026-02-20 09:30:20', NULL),
(5516, 3, 131, 776, 'title', 'Workshops', '2026-02-20 09:30:20', '2026-02-20 09:30:20', NULL),
(5517, 3, 131, 776, 'image', '1195', '2026-02-20 09:30:20', '2026-02-20 09:30:20', NULL),
(5518, 3, 131, 777, 'sort_number', '5', '2026-02-20 09:31:55', '2026-02-20 09:31:55', NULL),
(5519, 3, 131, 777, 'description', '<h3>Be part of our mentorship circles designed to guide, support, and inspire learners through shared experiences and meaningful dialogue.</h3>', '2026-02-20 09:31:55', '2026-02-20 09:31:55', NULL),
(5520, 3, 131, 777, 'title', 'Mentorship Circles', '2026-02-20 09:31:55', '2026-02-20 09:31:55', NULL),
(5521, 3, 131, 777, 'image', '1196', '2026-02-20 09:31:55', '2026-02-20 09:31:55', NULL),
(5522, 3, 132, 778, 'sort_number', '1', '2026-02-20 09:35:36', '2026-02-20 09:35:36', NULL),
(5523, 3, 132, 778, 'title', 'CEF Bookshop', '2026-02-20 09:35:36', '2026-02-20 09:35:36', NULL),
(5524, 3, 132, 778, 'description', '<p>Step into the CEF Bookshop—where learning comes alive! Discover inspiring curriculum book series on Nazirah, Fahm-ul-Quran, character building, Urdu, Islamiyat, and Early Childhood Education. From colorful storybooks and engaging activity packs to self-assessment diaries and career counselling books—there’s something for everyone. Explore our full resource collection today!</p>', '2026-02-20 09:35:36', '2026-02-20 09:35:36', NULL),
(5525, 3, 132, 778, 'image', '1197', '2026-02-20 09:35:36', '2026-02-20 09:35:36', NULL),
(5526, 3, 142, 779, 'sort_number', '1', '2026-02-20 09:43:46', '2026-02-20 09:43:46', NULL),
(5527, 3, 142, 779, 'country', 'United Kingdom', '2026-02-20 09:43:46', '2026-02-20 09:43:46', NULL),
(5528, 3, 142, 779, 'name', 'Ayesha Khan', '2026-02-20 09:43:46', '2026-02-20 09:43:46', NULL),
(5529, 3, 142, 779, 'text', 'An amazing learning experience. The lessons were easy to follow and very well structured. Highly recommended for anyone who wants to improve their Quran recitation.', '2026-02-20 09:43:46', '2026-02-20 09:43:46', NULL),
(5530, 3, 142, 779, 'image', '1198', '2026-02-20 09:43:46', '2026-02-20 09:43:46', NULL),
(5531, 3, 142, 780, 'country', 'New Zealand', '2026-02-20 09:44:49', '2026-02-20 09:44:49', NULL),
(5532, 3, 142, 780, 'sort_number', '2', '2026-02-20 09:44:49', '2026-02-20 09:44:49', NULL),
(5533, 3, 142, 780, 'name', 'Sidra Ashraf', '2026-02-20 09:44:49', '2026-02-20 09:44:49', NULL),
(5534, 3, 142, 780, 'text', 'This Tajweed Course completely transformed the way I read the Quran. The tutor was patient, knowledgeable, and explained the rules so clearly. I feel so much more confident now, Alhamdulillah!', '2026-02-20 09:44:49', '2026-02-20 09:44:49', NULL),
(5535, 3, 142, 780, 'image', '1199', '2026-02-20 09:44:49', '2026-02-20 09:44:49', NULL),
(5536, 3, 134, 781, 'sort_number', '1', '2026-02-20 09:46:29', '2026-02-20 09:46:29', NULL),
(5537, 3, 134, 781, 'title', 'Mission Kirdaar', '2026-02-20 09:46:29', '2026-02-20 09:46:29', NULL),
(5538, 3, 134, 781, 'description', '<p><span style=\"color: rgb(65, 65, 65);\">Explore our latest series specially created to inspire young minds and make learning exciting. Each story nurtures values, strengthens character, and helps children grow with purpose and confidence.</span></p>', '2026-02-20 09:46:29', '2026-02-20 09:46:29', NULL),
(5539, 3, 134, 781, 'media', '1200', '2026-02-20 09:46:29', '2026-02-20 09:46:29', NULL),
(5540, 3, 137, 782, 'sort_number', '1', '2026-02-20 09:49:39', '2026-02-20 09:49:39', NULL),
(5541, 3, 137, 782, 'description', '<p><span style=\"color: rgb(65, 65, 65);\">Enroll in our courses. Join our sessions. Or support us with your donation. Together, let\'s spread Quran and Sunnah-based Character Education, inspire meaningful living, and nurture leadership for the Ummah.</span></p>', '2026-02-20 09:49:39', '2026-02-20 09:49:39', NULL),
(5542, 3, 137, 782, 'title', 'Join CEF Online Academy Be Part of a Global Mission', '2026-02-20 09:49:39', '2026-02-20 09:49:39', NULL),
(5543, 3, 143, 783, 'sort_number', '1', '2026-02-20 09:52:06', '2026-02-20 09:52:06', NULL),
(5544, 3, 143, 783, 'title', 'Contact Us', '2026-02-20 09:52:06', '2026-02-20 09:52:06', NULL),
(5545, 3, 143, 783, 'icon', '1201', '2026-02-20 09:52:06', '2026-02-20 09:52:06', NULL),
(5546, 3, 143, 784, 'sort_number', '2', '2026-02-20 09:52:43', '2026-02-20 09:52:43', NULL),
(5547, 3, 143, 784, 'title', 'Queries', '2026-02-20 09:52:43', '2026-02-20 09:52:43', NULL),
(5548, 3, 143, 784, 'icon', '1202', '2026-02-20 09:52:43', '2026-02-20 09:52:43', NULL),
(5549, 3, 143, 785, 'sort_number', '3', '2026-02-20 09:53:17', '2026-02-20 09:53:17', NULL),
(5550, 3, 143, 785, 'title', 'Complaints', '2026-02-20 09:53:17', '2026-02-20 09:53:17', NULL),
(5551, 3, 143, 785, 'icon', '1203', '2026-02-20 09:53:17', '2026-02-20 09:53:17', NULL),
(5552, 3, 143, 786, 'sort_number', '4', '2026-02-20 09:53:56', '2026-02-20 09:53:56', NULL),
(5553, 3, 143, 786, 'title', 'Book Sales Representative', '2026-02-20 09:53:56', '2026-02-20 09:53:56', NULL),
(5554, 3, 143, 786, 'icon', '1204', '2026-02-20 09:53:56', '2026-02-20 09:53:56', NULL),
(5555, 3, 143, 787, 'sort_number', '5', '2026-02-20 09:54:47', '2026-02-20 09:54:47', NULL),
(5556, 3, 143, 787, 'title', 'Donation Representative', '2026-02-20 09:54:47', '2026-02-20 09:54:47', NULL),
(5557, 3, 143, 787, 'icon', '1205', '2026-02-20 09:54:47', '2026-02-20 09:54:47', NULL),
(5558, 3, 143, 788, 'sort_number', '6', '2026-02-20 09:55:21', '2026-02-20 09:55:21', NULL),
(5559, 3, 143, 788, 'title', 'Careers', '2026-02-20 09:55:21', '2026-02-20 09:55:21', NULL),
(5560, 3, 143, 788, 'icon', '1206', '2026-02-20 09:55:21', '2026-02-20 09:55:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `submit_btn_text` varchar(255) NOT NULL DEFAULT 'Submit',
  `fields` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`fields`)),
  `project_id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` int(11) NOT NULL,
  `name` varchar(110) NOT NULL,
  `type` varchar(10) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `caption` varchar(110) DEFAULT NULL,
  `disk` varchar(10) NOT NULL DEFAULT 'local',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `project_id`, `name`, `type`, `size`, `width`, `height`, `caption`, `disk`, `created_at`, `updated_at`) VALUES
(1165, 3, 'CEF Logo-01.png', 'png', 65601, 1108, 1542, NULL, 'local', '2026-02-20 06:31:35', '2026-02-20 06:31:35'),
(1166, 3, 'Child Image with Circles-01.jpg', 'jpg', 1563954, 3251, 2962, NULL, 'local', '2026-02-20 06:38:09', '2026-02-20 06:38:09'),
(1167, 3, 'Sign Up Icon-01.svg', 'svg', 6291, NULL, NULL, NULL, 'local', '2026-02-20 06:47:32', '2026-02-20 06:47:32'),
(1168, 3, 'Take a Demo Icon-01.svg', 'svg', 3647, NULL, NULL, NULL, 'local', '2026-02-20 06:48:27', '2026-02-20 06:48:27'),
(1169, 3, 'Choose & Encroll Icon-01.svg', 'svg', 3751, NULL, NULL, NULL, 'local', '2026-02-20 06:49:19', '2026-02-20 06:49:19'),
(1170, 3, 'Start Learning Icon-01.svg', 'svg', 6446, NULL, NULL, NULL, 'local', '2026-02-20 06:50:15', '2026-02-20 06:50:15'),
(1171, 3, 'Demo Icon-01.svg', 'svg', 9362, NULL, NULL, NULL, 'local', '2026-02-20 06:56:24', '2026-02-20 06:56:24'),
(1172, 3, 'Enroll Icon-01.svg', 'svg', 7306, NULL, NULL, NULL, 'local', '2026-02-20 06:57:26', '2026-02-20 06:57:26'),
(1173, 3, 'Student Login Icon.svg', 'svg', 10709, NULL, NULL, NULL, 'local', '2026-02-20 06:58:25', '2026-02-20 06:58:25'),
(1174, 3, 'Our Courses Icon.svg', 'svg', 5781, NULL, NULL, NULL, 'local', '2026-02-20 06:59:00', '2026-02-20 06:59:00'),
(1175, 3, 'Earth.svg', 'svg', 9322, NULL, NULL, NULL, 'local', '2026-02-20 07:13:36', '2026-02-20 07:13:36'),
(1176, 3, 'Students-01.svg', 'svg', 493548, NULL, NULL, NULL, 'local', '2026-02-20 07:15:51', '2026-02-20 07:15:51'),
(1177, 3, 'Years.svg', 'svg', 35268, NULL, NULL, NULL, 'local', '2026-02-20 07:16:52', '2026-02-20 07:16:52'),
(1178, 3, 'Tutors.svg', 'svg', 42235, NULL, NULL, NULL, 'local', '2026-02-20 07:18:17', '2026-02-20 07:18:17'),
(1179, 3, 'Courses.svg', 'svg', 49940, NULL, NULL, NULL, 'local', '2026-02-20 07:20:21', '2026-02-20 07:20:21'),
(1180, 3, 'Sign Up Icon-01(1).svg', 'svg', 6291, NULL, NULL, NULL, 'local', '2026-02-20 07:40:59', '2026-02-20 07:40:59'),
(1181, 3, 'Sign Up Icon-01(2).svg', 'svg', 6291, NULL, NULL, NULL, 'local', '2026-02-20 07:41:08', '2026-02-20 07:41:08'),
(1182, 3, 'Take a Demo Icon-01(1).svg', 'svg', 3647, NULL, NULL, NULL, 'local', '2026-02-20 07:41:55', '2026-02-20 07:41:55'),
(1183, 3, 'Choose & Encroll Icon-01(1).svg', 'svg', 3751, NULL, NULL, NULL, 'local', '2026-02-20 07:42:33', '2026-02-20 07:42:33'),
(1184, 3, 'Start Learning Icon-01(1).svg', 'svg', 6446, NULL, NULL, NULL, 'local', '2026-02-20 07:43:25', '2026-02-20 07:43:25'),
(1185, 3, '24-7.svg', 'svg', 11772, NULL, NULL, NULL, 'local', '2026-02-20 08:10:23', '2026-02-20 08:10:23'),
(1186, 3, 'Virtual Class Room.svg', 'svg', 6355, NULL, NULL, NULL, 'local', '2026-02-20 08:13:32', '2026-02-20 08:13:32'),
(1187, 3, 'Unique Teaching.svg', 'svg', 12345, NULL, NULL, NULL, 'local', '2026-02-20 08:14:39', '2026-02-20 08:14:39'),
(1188, 3, 'Highly Researched.svg', 'svg', 3837, NULL, NULL, NULL, 'local', '2026-02-20 09:17:05', '2026-02-20 09:17:05'),
(1189, 3, 'Highly Trained.svg', 'svg', 20034, NULL, NULL, NULL, 'local', '2026-02-20 09:17:53', '2026-02-20 09:17:53'),
(1190, 3, 'Male & Female.svg', 'svg', 4727, NULL, NULL, NULL, 'local', '2026-02-20 09:19:58', '2026-02-20 09:19:58'),
(1191, 3, 'Weekly Sessions.png', 'png', 355320, 1462, 1464, NULL, 'local', '2026-02-20 09:25:12', '2026-02-20 09:25:12'),
(1192, 3, 'CEF Series.png', 'png', 346252, 1425, 1434, NULL, 'local', '2026-02-20 09:26:38', '2026-02-20 09:26:38'),
(1193, 3, 'CEF Series(1).png', 'png', 346252, 1425, 1434, NULL, 'local', '2026-02-20 09:27:14', '2026-02-20 09:27:14'),
(1194, 3, 'Webinars.png', 'png', 346141, 1499, 1477, NULL, 'local', '2026-02-20 09:28:34', '2026-02-20 09:28:34'),
(1195, 3, 'Work Shopes.png', 'png', 374275, 1510, 1469, NULL, 'local', '2026-02-20 09:30:09', '2026-02-20 09:30:09'),
(1196, 3, 'Work Shopes(1).png', 'png', 374275, 1510, 1469, NULL, 'local', '2026-02-20 09:31:15', '2026-02-20 09:31:15'),
(1197, 3, 'CEF Shop Book.png', 'png', 830792, 1829, 3057, NULL, 'local', '2026-02-20 09:34:53', '2026-02-20 09:34:53'),
(1198, 3, 'CEF Series(2).png', 'png', 346252, 1425, 1434, NULL, 'local', '2026-02-20 09:43:39', '2026-02-20 09:43:39'),
(1199, 3, 'Sidra Ashrif.png', 'png', 248749, 1272, 1262, NULL, 'local', '2026-02-20 09:44:35', '2026-02-20 09:44:35'),
(1200, 3, 'Mission Kirdaar.png', 'png', 1210738, 5059, 2562, NULL, 'local', '2026-02-20 09:46:13', '2026-02-20 09:46:13'),
(1201, 3, 'Contact Us.svg', 'svg', 3597, NULL, NULL, NULL, 'local', '2026-02-20 09:51:57', '2026-02-20 09:51:57'),
(1202, 3, 'Queries.svg', 'svg', 1509, NULL, NULL, NULL, 'local', '2026-02-20 09:52:37', '2026-02-20 09:52:37'),
(1203, 3, 'Complaints.svg', 'svg', 2944, NULL, NULL, NULL, 'local', '2026-02-20 09:53:11', '2026-02-20 09:53:11'),
(1204, 3, 'Book Sales.svg', 'svg', 4771, NULL, NULL, NULL, 'local', '2026-02-20 09:53:50', '2026-02-20 09:53:50'),
(1205, 3, 'Donations.svg', 'svg', 3467, NULL, NULL, NULL, 'local', '2026-02-20 09:54:40', '2026-02-20 09:54:40'),
(1206, 3, 'Careers.svg', 'svg', 3295, NULL, NULL, NULL, 'local', '2026-02-20 09:55:12', '2026-02-20 09:55:12');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(81, '2014_10_12_000000_create_users_table', 1),
(82, '2014_10_12_100000_create_password_resets_table', 1),
(83, '2019_08_19_000000_create_failed_jobs_table', 1),
(84, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(85, '2021_03_07_200339_create_projects_table', 1),
(86, '2021_03_08_162324_create_collections_table', 1),
(87, '2021_08_05_094530_create_collection_fields_table', 1),
(88, '2021_08_06_120930_create_content_table', 1),
(89, '2021_08_18_113855_create_media_table', 1),
(90, '2021_08_26_082427_crate_content_meta_table', 1),
(91, '2021_08_28_150937_create_permission_tables', 1),
(92, '2022_03_06_162012_add_disk_field_to_media_table', 1),
(93, '2022_03_08_152849_add_disk_field_to_projects_table', 1),
(94, '2022_06_08_145410_create_webhooks_table', 1),
(95, '2022_06_09_120727_create_webhook_collections_table', 1),
(96, '2022_06_21_151142_create_webhook_logs_table', 1),
(97, '2022_10_07_134859_create_jobs_table', 1),
(98, '2022_12_07_100137_create_forms_table', 1),
(99, '2022_12_07_100217_add_form_id_to_content_table', 1),
(100, '2022_12_08_171001_add_public_api_field_to_projects_table', 1),
(101, '2024_02_26_104028_add_sort_number_column_in_content_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` char(36) NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `default_locale` varchar(10) NOT NULL DEFAULT 'en',
  `locales` varchar(255) DEFAULT NULL,
  `disk` varchar(10) NOT NULL DEFAULT 'local',
  `public_api` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `uuid`, `name`, `description`, `default_locale`, `locales`, `disk`, `public_api`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, '7c659eaece9c42a98b7030d402f04074', 'CEF ONLINE ACADEMY', 'At CEF Online Academy, we offer excellence in Nazirah and Fahm-ul-Quran, helping students recite, understand, and live the Quran.', 'en', 'en', 'local', 0, '2026-02-10 16:31:09', '2026-02-10 16:31:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'super_admin', 'web', '2023-01-28 17:53:35', '2023-01-28 17:53:35'),
(6, 'admin3', 'web', '2026-02-10 16:31:09', '2026-02-10 16:31:09'),
(7, 'editor3', 'web', '2026-02-10 16:31:09', '2026-02-10 16:31:09');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Codiro Admin', 'admin@admin.com', NULL, '$2y$10$CI3LPnGwFfgMaIDx2CfnvOOHCRR6pC3pDtc.seZAbgB6ZniaMrENi', 'JpE5a2tQAxvVOEREZylriquIMs8DqNaM5h8fK2bCH1uvxbZzXjvevkj1EUrp', '2023-01-28 17:53:35', '2023-09-07 09:29:43'),
(2, 'developer', 'developer@codiro.tech', NULL, '$2y$10$p28cf9Sd3O0IBuP116HxpeWYTGJ46uIFelhq5pW5v.DwUus6xdQaG', NULL, '2023-09-07 09:31:26', '2023-09-07 09:31:26'),
(3, 'CEF', 'website@cef.org.pk', NULL, '$2y$10$e5yvwjgTf02g7NXJwTJRXO8WDD682.a3pxYyicAYMxaGROk.ZWQXq', NULL, '2025-12-16 10:06:43', '2025-12-16 10:06:43');

-- --------------------------------------------------------

--
-- Table structure for table `webhooks`
--

CREATE TABLE `webhooks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `secret` varchar(255) DEFAULT NULL,
  `collection_ids` varchar(255) NOT NULL,
  `events` varchar(255) NOT NULL,
  `sources` varchar(255) NOT NULL,
  `payload` tinyint(1) NOT NULL DEFAULT 1,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `webhook_collections`
--

CREATE TABLE `webhook_collections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `webhook_id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `webhook_logs`
--

CREATE TABLE `webhook_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_uuid` varchar(255) NOT NULL,
  `webhook_id` int(11) NOT NULL,
  `action` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `request` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`request`)),
  `response` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`response`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `collection_fields`
--
ALTER TABLE `collection_fields`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `content_meta`
--
ALTER TABLE `content_meta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `forms_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `projects_uuid_unique` (`uuid`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `webhooks`
--
ALTER TABLE `webhooks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `webhook_collections`
--
ALTER TABLE `webhook_collections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `webhook_logs`
--
ALTER TABLE `webhook_logs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `collections`
--
ALTER TABLE `collections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT for table `collection_fields`
--
ALTER TABLE `collection_fields`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=993;

--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=789;

--
-- AUTO_INCREMENT for table `content_meta`
--
ALTER TABLE `content_meta`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5561;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1207;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `webhooks`
--
ALTER TABLE `webhooks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `webhook_collections`
--
ALTER TABLE `webhook_collections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `webhook_logs`
--
ALTER TABLE `webhook_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
