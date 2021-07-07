<?php

/************************************************************************
 * ファイル取込み
 ************************************************************************/
include_once 'src-functions/_func';

/************************************************************************
 * テーマのセットアップ
 ************************************************************************/
function setup()
{
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
}
// 初期化処理（after_setup_theme）
add_action('after_setup_theme', 'setup');

/************************************************************************
 * CSS・JS読み込み
 * ① functionを設定
 * ② header.php、footer.phpにてwp_head、wp_footerをフックする。※ ファイル分割していること
 * 　 → functionで定義したstyleが読み込まれる
 ************************************************************************/
function script_init()
{
	// CSS読み込み
	wp_enqueue_style('reset', get_template_directory_uri() . '/css/lib/reset.css', array(), '1.0.0', 'all');
	wp_enqueue_style('style', get_template_directory_uri() . '/css/style.min.css', array(), '1.0.0', 'all');
	// JS読み込み：$deps 依存JS、$in_footer：true：</body> 終了タグの前に配置される： wp_footer() の位置注意
	wp_enqueue_script('script', get_template_directory_uri() . '/js/script.min.js', array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'script_init');



/************************************************************************
 * ユーザ定義関数
 ************************************************************************/
function getHogeHoge($param)
{
	return $param;
}
