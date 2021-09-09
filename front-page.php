<!DOCTYPE html>
<html lang="en">

<head>
	<?php get_header(); ?>
</head>

<body>
	<div class="wrapper front-page">

		<!-------------------------------------------------- 
		- ヘッダー
		---------------------------------------------------->
		<?php get_template_part('src-php/10_common/_header'); ?>


		<!-------------------------------------------------- 
		- メイン|サイドバー
		---------------------------------------------------->
		<div class="container">

			<!-------------------------- 
			- メイン
			---------------------------->
			<main class="main">
				<!-- ショートコード出力 -->
				<?php echo do_shortcode(''); ?>
			</main>

			<!-------------------------- 
			- サイドバー
			---------------------------->
			<aside class="aside">
				<?php get_sidebar(); ?>
			</aside>

		</div><!-- /.container -->

		<!-------------------------------------------------- 
		- フッター
		---------------------------------------------------->
		<?php get_template_part('src-php/10_common/_footer'); ?>
	</div><!-- /.wrapper -->

	<?php get_footer(); ?>
</body>

</html>