<?php
// Template Name: Brands
?>
<?php get_header(); ?>
<main id="page-main" role="main">
	<div id="primary" class="content-area">
		<div class="container">
			<div class="row">
				<main id="main" class="site-main" role="main">
					<div class="col-sm-8">

						<?php while ( have_posts() ) : the_post(); ?>
								<?php get_template_part( 'partials/loops/page-content' ); ?>
						<?php endwhile; // end of the loop. ?>

					</div><!-- /col -->
				</main>

				<?php get_sidebar(); ?>

			</div><!-- /row -->
		</div><!-- /container -->
	</div><!-- #primary -->
</main>
<!-- #page-main -->
<?php get_footer(); ?>