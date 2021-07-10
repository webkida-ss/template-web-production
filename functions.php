<?php

/************************************************************************
 * ファイル取込み
 ************************************************************************/

// アクションフック
get_template_part('src-php/functions/action-hook/_admin_menu');
get_template_part('src-php/functions/action-hook/_after_setup_theme');
get_template_part('src-php/functions/action-hook/_wp_enqueue_scripts');

// その他
get_template_part('src-php/functions/_filter-hook'); // フィルターフック
get_template_part('src-php/functions/_short-code'); // ショートコード
get_template_part('src-php/functions/_user-define'); // ユーザ定義関数
