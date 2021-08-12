<?php

/**
 * ウィジェットの登録
 */
add_action('widgets_init', function () {
		register_sidebar(
			array(
				'name' => 'サイドバー', // 表示するエリア名
				'id' => 'sidebar', // id
				// 'before_widget' => '<div id="%1$s" class="widget %2$s">',
				// 'after_widget' => '</div>',
				// 'before_title' => '<div class="widget-title">',
				// 'after_title' => '</div>',
			)
		);
	}
);
