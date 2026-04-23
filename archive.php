<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since Twenty Nineteen 1.0
 */

get_header();
?>
<?php $args_news = array(
    'category__in'        => 4,
    'posts_per_page'      => 8,
    'orderby'             => array( 'date' => 'DESC', 'ID' => 'DESC' ),
    'ignore_sticky_posts' => 1,
);

$my_query_news = new wp_query($args_news);

$args_press=array(
    'category__in' => 9, //из какой категории вывести (удалите эту строку, если хотите, чтобы показовало последние материалы из всех рубрик сразу)
	"posts_per_page"   => 8,   
    'orderby'=>'data', //сортировка по дате
    'caller_get_posts'=>1);

$my_query_press = new wp_query($args_press);

$args_opinions=array(
    'category__in' => 6, //из какой категории вывести (удалите эту строку, если хотите, чтобы показовало последние материалы из всех рубрик сразу)
    'orderby'=>'data', //сортировка по дате
    'caller_get_posts'=>1);

$my_query_opinions = new wp_query($args_opinions);

?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

		<?php if ( have_posts() ) : ?>

			<header class="page-header">
				<?php
               single_cat_title('<h1 class="page-title">', '</h1>');
					//the_archive_title( '<h1 class="page-title">', '</h1>' );
				?>
			</header><!-- .page-header -->
            <div class="container archive">
				<?php if(get_the_category()[0]->slug == 'news'):?>
                <!--Mobile-->
                <div class="d-block d-lg-none over-display news">
                    <div class="owl-carousel owl-theme" id="news">

                        <?php if( $my_query_news->have_posts() ) {
                            while ($my_query_news->have_posts()) {
                                $my_query_news->the_post();
                                ?>
                                <div class="item">
                                    <a href="<?php echo get_permalink($post->ID); ?>" data-load-flag="news" data-post-id="<?php echo get_the_ID(); ?>">
                                        <div class="n_date"><?php echo get_the_date('j.m.Y'); ?></div>
                                        <p><?php echo $post->post_title; ?></p>
                                        <div class="n_img" style="background:url('<?php echo get_the_post_thumbnail_url($post->ID, array(350, 233))?>')">
                                        </div>



                                    </a>

                                </div>

                            <?php } }
                        wp_reset_query();
                        ?>

                    </div>
                </div>
				
				<h2 style="margin-top:25px" class="d-block d-lg-none">Пресса о нас</h2>
				<div class="d-block d-lg-none over-display news press">
                    <div class="owl-carousel owl-theme" id="press">
						
	<?php if ($my_query_press->have_posts()) : while ($my_query_press->have_posts()) : $my_query_press->the_post();

            ?>
           <div class="item">
                    <a href="<?php echo get_permalink(); ?>" data-load-flag="press" data-post-id="<?php echo get_the_ID(); ?>">
						<?php $image_array = get_post_meta( get_the_ID(), 'press_logo', false );
						
						$thumbimg = wp_get_attachment_image( $image_array[0], 'large');?>
						<div class="press_logo"><?php echo $thumbimg; ?></div>
                        <div class="n_date"><?php echo get_the_date('j.m.Y'); ?></div>
                        <p><?php the_title(); ?></p>
                        <div class="n_img" style="background:url('<?php echo get_the_post_thumbnail_url($post->ID, array(350, 233))?>')">
                        </div>
                    </a>
                </div>
            <?php
				// End the loop.
		

        endwhile;
    endif;

    wp_reset_postdata();						
	?>	
					</div>
				</div>
				
				
                <!--END Mobile-->
				<?php endif?>
                <div id="news_desc" class="d-none d-lg-block <?= get_the_category()[0]->slug?>">
                    
                        <?php if(get_the_category()[0]->slug == 'projects'):?>
                        <div class="col-lg-12">
                            <div class="project-div">
                                <?php while (have_posts()) : the_post(); ?>
									<div class="b-r analitics-material">
                                            <a class="row" href="<?php echo get_post_meta($post->ID, 'href', true); ?>" target="_blank">
<div class="p-0 col-md-3"><img src="<?= the_post_thumbnail_url()?>"></div>
<div class="p-0 col-md-8">
<p class="title"><?php the_title(); ?></p>
                                        <p class="title"><?php the_content(); ?></p>
</div>
                                           <div class="p-0 col-md-1 strelka"></div>
                                        </a>
                                            </div>
									
									<?php endwhile; ?>
									
                                      </div>
                                </div>


                           

                            <?php endif;?>
					<div class="row">
			<?php
			// Start the Loop.

            if (get_the_category()[0]->slug == 'news'):
			while ( $my_query_news->have_posts()) :
                $my_query_news->the_post();

				/*
				 * Include the Post-Format-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Format name) and that
				 * will be used instead.
				 */?>
                <?php if(get_the_category()[0]->slug == 'news' || get_the_category()[0]->slug == 'opinions'):?>

                        <div class="col-lg-3">
                    <a href="<?php echo get_permalink(); ?>" data-load-flag="news" data-post-id="<?php echo get_the_ID(); ?>">
                        <div class="n_date"><?php echo get_the_date('j.m.Y'); ?></div>
                        <p><?php the_title(); ?></p>
                        <div class="n_img" style="background:url('<?php echo get_the_post_thumbnail_url($post->ID, array(350, 233))?>')">
                        </div>
                    </a>
						
                <?php endif;?>



                    <?php //get_template_part( 'template-parts/content/content', 'excerpt' );?>
                </div>
            <?php
				// End the loop.
			endwhile;
            endif;
			// Previous/next page navigation.
			//twentynineteen_the_posts_navigation();

			// If no content, include the "No posts found" template.
		else :
			get_template_part( 'template-parts/content/content', 'none' );

		endif;
		?>
<?php if(get_the_category()[0]->slug == 'news'):?>	
	<? if ($my_query_news->max_num_pages > 1) : ?>
		<div class="col-md-12">
			<script>
				var current_page_news = 1;
			</script>
			<button type="button" class="btn--load" id="newsLoad" data-max-pages="<?= $my_query_news->max_num_pages; ?>" data-param-posts='<?= json_encode($my_query_news->query_vars); ?>' flag="news">Смотреть все</button>
		</div>
	<?php endif;?>
						
	<div class="col-md-12"><h2>Пресса о нас</h2></div>
						
	<?php if ($my_query_press->have_posts()) : while ($my_query_press->have_posts()) : $my_query_press->the_post();

            ?>
           <div class="col-lg-3">
                    <a href="<?php echo get_permalink(); ?>" data-load-flag="press" data-post-id="<?php echo get_the_ID(); ?>">
						<?php $image_array = get_post_meta( get_the_ID(), 'press_logo', false );
						
						$thumbimg = wp_get_attachment_image( $image_array[0], 'large');?>
						<div class="press_logo"><?php echo $thumbimg; ?></div>
                        <div class="n_date"><?php echo get_the_date('j.m.Y'); ?></div>
                        <p><?php the_title(); ?></p>
                        <div class="n_img" style="background:url('<?php echo get_the_post_thumbnail_url($post->ID, array(350, 233))?>')">
                        </div>
                    </a>
                </div>
            <?php
				// End the loop.
		

        endwhile;
    endif;

    wp_reset_postdata();						
	?>	
	<? if ($my_query_press->max_num_pages > 1) : ?>
		<div class="col-md-12">
			<script>
				var current_page_press = 1;
			</script>
			<button type="button" class="btn--load" id="pressLoad" data-max-pages="<?= $my_query_press->max_num_pages; ?>" data-param-posts='<?= json_encode($my_query_press->query_vars); ?>' flag="press">Смотреть все</button>
		</div>
	<?php endif;?>
<?php endif;?>
            </div>



                </div>
<?php if(get_the_category()[0]->slug == 'opinions'):?>
                <div class="over-display mnenia">

                        <div class="row d-none">
                            <div class="col-md-12">
                                <!--<div class="line"></div>-->
                                <h2>Мнения</h2>
                            </div>
                        </div>

                    <!--Mobile-->

                    <div class="d-block d-lg-none opinions">
                        <div class="owl-carousel owl-theme " id="mnenia">

                            <?if( $my_query_opinions->have_posts() ) {
                                while ($my_query_opinions->have_posts()) {
                                    $my_query_opinions->the_post();
                                    ?>
                                    <div class="item">
                                        <a class="href" href="<?php echo get_permalink($post->ID); ?>">
                                            <div class="n_date"><?php echo get_the_date('j.m.Y'); ?></div>
                                            <p class="title"><span></span> <?php echo get_the_excerpt() ?></p>
                                            <div class="n_img" style="background:url('<?php echo get_the_post_thumbnail_url($post->ID, array(350, 233))?>')">
                                            </div>
                                            <p class="fio"><?php echo get_post_meta($post->ID, 'fio', true); ?></p>
                                            <p class="post"><?php echo get_post_meta($post->ID, 'post', true); ?></p>
                                        </a>
                                    </div>

                                <?php } }
                            wp_reset_query();
                            ?>

                        </div>
                    </div>
                    <!--END MOBILE-->
                        <div class="d-none d-lg-block">
                            <div class="row">

                                <?php if( $my_query_opinions->have_posts() ) {
                                    while ($my_query_opinions->have_posts()) {
                                        $my_query_opinions->the_post();
                                        ?>
                                        <div class="col-lg-3">
                                            <a class="href" href="<?php echo get_permalink($post->ID); ?>">
                                                <div class="n_date"><?php echo get_the_date('j.m.Y'); ?></div>
                                                <p class="title"><span></span> <?php echo get_the_excerpt() ?></p>
                                                <div class="n_img" style="background:url('<?php echo get_the_post_thumbnail_url($post->ID, array(350, 233))?>')">
                                                </div>
                                                <p class="fio"><?php echo get_post_meta($post->ID, 'fio', true); ?></p>
                                                <p class="post"><?php echo get_post_meta($post->ID, 'post', true); ?></p>
                                            </a>
                                        </div>

                                    <?php } }
                                wp_reset_query();
                                ?>

                            </div>
                        </div>

                </div>

                
<?php endif?>
            </div>
				
		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
