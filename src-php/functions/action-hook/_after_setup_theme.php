<?php

/************************************************************************
 * テーマのセットアップ
 ************************************************************************/
add_action('after_setup_theme', function () {
	add_theme_support('post-thumbnails'); // アイキャッチ画像を有効化
	// add_theme_support('automatic-feed-links'); // 投稿とコメントのRSSフィードのリンクを有効化
	add_theme_support('title-tag'); // 管理画面からのタイトルの設定（header.phpには直接記述しない）
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
