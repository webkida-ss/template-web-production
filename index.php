<!DOCTYPE html>
<html lang="en">

<head>
	<?php get_header(); ?>
</head>

<body>
	<div class="wrapper">

		<!-- ヘッダー-->
		<?php get_template_part('src-php/_header'); ?>



		<!-- メイン|サイドバー -->
		<div class="container">

			<!-- メイン-->
			<main class="main">
				<!-- ショートコード出力 -->
				<?php echo do_shortcode(''); ?>
			</main>

			<!-- サイトバー -->
			<?php get_sidebar(); ?>

		</div><!-- /.container -->



		<!-- フッター-->
		<?php get_template_part('src-php/_footer'); ?>

	</div><!-- /.wrapper -->
	<?php get_footer(); ?>
</body>

</html>