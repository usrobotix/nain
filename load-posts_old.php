<?php

add_action("wp_ajax_load_more", "load_posts");
add_action("wp_ajax_nopriv_load_more", "load_posts");
function load_posts()
{
    $args = json_decode(stripslashes($_POST["query"]), true);
    $args["paged"] = $_POST["page"] + 1;
    
    
    $posts = new WP_Query($args);
    $html = '';

    if ($posts->have_posts()) : while ($posts->have_posts()) : $posts->the_post();

            ?>
           <div class="col-lg-3">
                    <a href="<?php echo get_permalink(); ?>">
                        <?php if ($_POST["flag"] == 'press'):?>
                        <?php $image_array = get_post_meta( get_the_ID(), 'press_logo', false );
						$thumbimg = wp_get_attachment_image( $image_array[0], 'large');?>
						<div class="press_logo"><?php echo $thumbimg; ?></div>
						<?php endif ?>
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
    die($html);
}
?>