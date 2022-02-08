<!DOCTYPE html>
<html lang="ja">

<head>
	<?php get_header(); ?>
</head>

<body>
	<div class="wrapper fp">

		<!-------------------------------------------------- 
		- ヘッダー
		---------------------------------------------------->
		<?php get_template_part('src-php/10_layout/_header'); ?>


		<!-------------------------------------------------- 
		- メイン|サイドバー
		---------------------------------------------------->
		<div class="container">

			<!-------------------------- 
			- メイン
			---------------------------->
			<main class="main">
				<section class="fp__top">
					<?php get_template_part('src-php/20_component/01_top/_top'); ?>
				</section>
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
		<?php get_template_part('src-php/10_layout/_footer'); ?>
	</div><!-- /.wrapper -->

	<?php get_footer(); ?>
</body>

</html>