<!DOCTYPE html>
<html lang="ja">

<head>
	<?php get_header(); ?>
</head>

<body>
	<div class="l-wrapper p-top">

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
				<section class="p-top__">
					<?php get_template_part('src-php/20_component/01_top/_top'); ?>
				</section>
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