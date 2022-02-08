<!DOCTYPE html>
<html lang="ja">

<head>
	<?php get_header(); ?>
</head>

<body>
	<div class="l-wrapper p-idx">

		<!-------------------------------------------------- 
		- ヘッダー
		---------------------------------------------------->
		<?php get_template_part('src-php/10_layout/_header'); ?>


		<!-------------------------------------------------- 
		- メイン|サイドバー
		---------------------------------------------------->
		<div class="l-container">

			<!-------------------------- 
			- メイン
			---------------------------->
			<main class="l-main">
				<!-- ショートコード出力 -->
				<?php echo do_shortcode(''); ?>
			</main>

			<!-------------------------- 
			- サイドバー
			---------------------------->
			<aside class="aside">
				<?php get_sidebar(); ?>
			</aside>

		</div><!-- /.l-container -->

		<!-------------------------------------------------- 
		- フッター
		---------------------------------------------------->
		<?php get_template_part('src-php/10_layout/_footer'); ?>
	</div><!-- /.wrapper -->

	<?php get_footer(); ?>
</body>

</html>