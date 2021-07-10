<?php

/************************************************************************
 * CSS・JS読み込み
 * wp_enqueue_***：cssやJS等の外部ファイル読み込みの推奨関数
 * 
 * ① functionを設定
 * ② header.php、footer.phpにてwp_head、wp_footerをフックする。※ ファイル分割していること
 * 　 → functionで定義したstyleが読み込まれる
 ************************************************************************/

add_action('wp_enqueue_scripts', function () {
	// CSS読み込み
	wp_enqueue_style('reset', get_template_directory_uri() . '/dist/css/lib/reset.css', array(), '1.0.0', 'all');
	wp_enqueue_style('style', get_template_directory_uri() . '/dist/css/style.min.css', array(), '1.0.0', 'all');
	// JS読み込み：$deps 依存JS、$in_footer：true：</body> 終了タグの前に配置される： wp_footer() の位置注意
	wp_enqueue_script('script', get_template_directory_uri() . '/dist/js/script.min.js', array('jquery'), '1.0.0', true);
});
