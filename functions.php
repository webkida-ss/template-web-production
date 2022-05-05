<?php

/************************************************************************
 * 管理メニュー修正
 ************************************************************************/

add_action('admin_menu', function () {
	// global $menu;
	// unset($menu[5]);  // 投稿
	// remove_menu_page( 'edit.php' );// 投稿
});


/************************************************************************
 * テーマのセットアップ
 ************************************************************************/
add_action('after_setup_theme', function () {
	add_theme_support('post-thumbnails'); // アイキャッチ画像を有効化
	add_theme_support('automatic-feed-links');
	add_theme_support('title-tag'); // 管理画面からのタイトルの設定（header.phpには直接記述しない）
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		)
	);
	// add_image_size();画像のリサイズ
});


// カスタムメニュー機能を有効化
add_action('admin_menu', function () {
	register_nav_menus(
		array(
			'global' => 'ヘッダーメニュー',
			'drawer' => 'ドロワーメニュー',
		)
	);
});

/**
 * ウィジェットの登録
 */
add_action(
	'widgets_init',
	function () {
		register_sidebar(
			array(
				'name' => 'サイドバー', // 表示するエリア名
				'id' => 'sidebar', // id
			)
		);
	}
);

/************************************************************************
 * CSS・JS読み込み
 ************************************************************************/

add_action('wp_enqueue_scripts', function () {
	wp_enqueue_style('reset', get_template_directory_uri() . '/assets/css/lib/reset.css', array(), '1.0.0', 'all');
	wp_enqueue_style('style', get_template_directory_uri() . '/assets/css/style.min.css', array(), '1.0.0', 'all');
	wp_enqueue_script('script', get_template_directory_uri() . '/assets/js/script.min.js', array('jquery'), '1.0.0', true);
});

/************************************************************************
 * セキュリティ対策：投稿者アー	カイブの無効化
 ************************************************************************/
// 投稿者アーカイブを無効化
function disable_author_archive($query)
{
	if (!is_admin() && is_author()) {
		$query->set_404();
		status_header(404);
		nocache_headers();
	}
}
add_action('parse_query', 'disable_author_archive');



/************************************************************************
 * ファイル取込み
 ************************************************************************/
get_template_part('src-php/99_functions/_my-global-variables'); // グローバル変数
get_template_part('src-php/99_functions/_filter-hook'); // フィルターフック
get_template_part('src-php/99_functions/_short-code'); // ショートコード
get_template_part('src-php/99_functions/_user-define'); // ユーザ定義関数
get_template_part('src-php/99_functions/_W3C'); // W3C対策
