<?php

/************************************************************************
 * 管理メニュー修正
 * https://qiita.com/konweb/items/5483efbe87087eff5cc8
 * https://hirashimatakumi.com/blog/3916.html
 ************************************************************************/
function remove_menus()
{
	// global $menu;
	// unset($menu[5]);  // 投稿
	// remove_menu_page( 'edit.php' );// 投稿
}
add_action('admin_menu', 'remove_menus');
