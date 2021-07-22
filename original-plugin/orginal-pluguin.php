<?php

/**
 * https://www.udemy.com/course/wordpress_master/learn/lecture/22621816#overview
 * 格納先：plugins（themesと同階層）
 * テーマをまたいで共通的に使用したい機能はプラグイン化を推奨
 * Plugin Nameは必須！
 */
/**
 * Plugin Name: 自作プラグイン
 * Version: 1.0
 * Description: 自分専用プラグイン
 * Auther: Shun Sakakida
 * Auther URI: https://webkida.site/
 */

/**
 * プラグインはクラスで書かれていることが多い 
 * → クラスでフックを記載する場合は配列で指定すること
 * WP教科書No317
 */

// 以下、functions.phpで記載するような内容を書いておくとよい！
add_shortcode('hogehoge', function () {
	return date('Y年 n月 j日');
});

function getPekePeke($param)
{
	return $param;
}
