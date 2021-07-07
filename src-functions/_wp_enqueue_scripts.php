<?php

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
