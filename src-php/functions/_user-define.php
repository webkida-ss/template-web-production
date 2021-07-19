<?php

/************************************************************************
 * ユーザ定義関数
 ************************************************************************/
function getHogeHoge($param)
{
	return $param;
}

/*****************************************************
 * 子ページ取得
 * 呼び出し元で wp_reset_postdata すること
 *****************************************************/
function get_child_pages($number = -1)
{
	$parent_id = get_the_ID();
	$args = array(
		'posts_per_page' => $number, // 1ページに表示する最大投稿（-1：全部表示）
		'post_type' => 'page', // 固定ページ
		'orderby' => 'menu_order', // 並び順（管理画面）でソート
		'order' => 'ASC',
		'post_parent' => $parent_id,
	);
	// サブクエリ実行
	$pages = new WP_Query($args);
	return $pages;
}
