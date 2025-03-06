<?php

$locations = [];
$menu_name = 'primary_navigation';

if (($menu_locations = get_nav_menu_locations()) && isset($menu_locations[$menu_name])) {
    $menu = wp_get_nav_menu_object($menu_locations[$menu_name]);
    $menu_items = wp_get_nav_menu_items($menu->term_id);
    foreach ((array) $menu_items as $key => $menu_item) {
        if ($image = get_field('image', $menu_item)) {
            $locations[] = [
                'title' => $menu_item->title,
                'url' => $menu_item->url,
                'image' => $image,
            ];
        }
    }
}

$upcoming_events = get_upcoming_events();

echo view('home', compact('locations', 'upcoming_events'));
