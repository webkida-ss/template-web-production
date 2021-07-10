<?php

/************************************************************************
 * ファイル取込み
 ************************************************************************/

// アクションフック
get_template_part('src-functions/action-hook/_admin_menu');
get_template_part('src-functions/action-hook/_after_setup_theme');
get_template_part('src-functions/action-hook/_wp_enqueue_scripts');

// その他
get_template_part('src-functions/_user-define'); // ユーザ定義関数
get_template_part('src-functions/_short-code');// ショートコード
