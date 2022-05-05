<?php

/************************************************************************
 * W3C対策
 ************************************************************************/

/************************************************************************
 * text/javascript削除
 * text/css削除
 ************************************************************************/
add_action('template_redirect', function () {
	ob_start(function ($buffer) {
		$buffer = str_replace(array('type="text/javascript"', "type='text/javascript'"), '', $buffer);
		$buffer = str_replace(array('type="text/css"', "type='text/css'"), '', $buffer);
		return $buffer;
	});
});

/************************************************************************
 * mw_wp_form_token 
 * ID重複解除
 ************************************************************************/
add_filter('aioseo_disable_shortcode_parsing', '__return_true');

/************************************************************************
 * MW WP Form
 * actionが空で出力される
 ************************************************************************/
function my_do_shortcode_tag($output, $tag, $attr)
{
	if (
		'mwform_formkey' == $tag
		&&
		(
			(isset($attr['key']) && 'xxx' == $attr['key']) // フォームのIDを指定すること
		)
	) {
		$output = str_replace(
			'<form method="post" action="" enctype="multipart/form-data">',
			'<form method="post" enctype="multipart/form-data">',
			$output
		);
	}
	return $output;
}
add_filter('do_shortcode_tag', 'my_do_shortcode_tag', 10, 3);
