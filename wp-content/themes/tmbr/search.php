<?php
/**
 * The template for displaying search results pages.
 *
 */

get_header(); ?>

<div id="primary" class="content-area">
	<div class="container">
		<div class="row">
			<main id="main" class="site-main" role="main">
				<div class="col-sm-8">

				<?php if ( have_posts() ) : ?>

					<header class="page-header">
						<h1 class="page-title"><?php printf( __( 'Search Results for: %s', '_s' ), '<span>' . get_search_query() . '</span>' ); ?></h1>
					</header><!-- .page-header -->

					<?php /* Start the Loop */ ?>
					<?php while ( have_posts() ) : the_post(); ?>

						<?php
						/**
						 * Run the loop for the search to output the results.
						 * If you want to overload this in a child theme then include a file
						 * called content-search.php and that will be used instead.
						 */
						get_template_part( 'partials/loops/search-loop' );
						?>

					<?php endwhile; ?>

					<?php the_posts_navigation(); ?>

				<?php else : ?>

					<?php get_template_part( 'partials/loops/nocontent-loop' ); ?>

				<?php endif; ?>
				</div>
			</main>

			<?php get_sidebar(); ?>

		</div><!-- /row -->
	</div><!-- /container -->
</div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>
