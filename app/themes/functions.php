<?php

/**
 * Ensure dependencies are loaded
 */
if (file_exists($composer = __DIR__ . '/vendor/autoload.php')) {
    require_once $composer;
} else {
    wp_die(__('You must run <code>composer install</code> from the theme directory.', 'saigonsiblings'), __('Autoloader not found', 'saigonsiblings'));
}

/**
 * Required library files
 *
 * The mapped array determines the code library included in the theme.
 * Add or remove files to the array as needed. Supports child theme overrides.
 */
array_map(function ($file) {
    $file = "lib/{$file}.php";
    if (!locate_template($file, true, true)) {
        wp_die(sprintf(__('Error locating <code>%s</code> for inclusion.', 'saigonsiblings'), $file), __('Theme Library File not found', 'saigonsiblings'));
    }
}, ['setup', 'init', 'filters', 'actions', 'acf', 'assets', 'helpers', 'customizer', 'commands']);

