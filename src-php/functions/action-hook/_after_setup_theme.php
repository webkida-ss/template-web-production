<?php

/************************************************************************
 * テーマのセットアップ
 ************************************************************************/
add_action('after_setup_theme', function () {
	add_theme_support('post-thumbnails'); // アイキャッチ画像を有効化
	// add_theme_support('automatic-feed-links'); // 投稿とコメントのRSSフィードのリンクを有効化
	// add_theme_support('title-tag'); // <title> タグが自動的に <head> タグ内に挿入される
	// add_theme_support(
	//   'html5',
	//   array( //HTML5でマークアップ
	//     'search-form',
	//     'comment-form',
	//     'comment-list',
	//     'gallery',
	//     'caption',
	//   )
	// );
});
