<?php

add_action("wp_ajax_load_more", "load_posts");
add_action("wp_ajax_nopriv_load_more", "load_posts");

function load_posts()
{
    $args = json_decode(stripslashes($_POST["query"] ?? ''), true);
    $flag = sanitize_key($_POST["flag"] ?? '');
    if (!in_array($flag, ['news', 'press'], true)) {
        $flag = '';
    }
    if (!is_array($args)) {
        $args = [];
    }

    // чистим "ломающие" параметры
    $bad_keys = [
        'offset',
        'p', 'name',
        'page',
        'page_id', 'pagename',
        'category_name',
        'posts', 'post_count', 'found_posts', 'max_num_pages',
        'lazy_load_term_meta',
        'cache_results',
        'update_post_meta_cache',
        'update_post_term_cache',
        'fields',
    ];
    foreach ($bad_keys as $k) {
        if (isset($args[$k])) unset($args[$k]);
    }

    $page = isset($_POST["page"]) ? (int)$_POST["page"] : 1;
    if ($page < 1) $page = 1;

    // page=1 => paged=2
    $args["paged"] = $page + 1;

// стабилизация порядка (детерминированная, чтобы не было дублей на границе страниц)
$args['orderby'] = array(
    'date' => 'DESC',
    'ID'   => 'DESC',
);
$args['ignore_sticky_posts'] = 1;

    // анти-дубли: исключаем уже показанные
    $shown_ids_raw = $_POST['shown_ids'] ?? '';
    if (is_string($shown_ids_raw) && $shown_ids_raw !== '') {
        $shown_ids = array_filter(array_map('intval', explode(',', $shown_ids_raw)), static function ($id) {
            return $id > 0;
        });
        if (!empty($shown_ids)) {
            $args['post__not_in'] = isset($args['post__not_in'])
                ? array_values(array_unique(array_merge((array)$args['post__not_in'], $shown_ids)))
                : $shown_ids;
        }
    }

    $posts = new WP_Query($args);

    if ($posts->have_posts()) :
        while ($posts->have_posts()) : $posts->the_post();
            ?>
            <div class="col-lg-3">
                <a href="<?php echo esc_url(get_permalink()); ?>" data-load-flag="<?php echo esc_attr($flag); ?>" data-post-id="<?php echo esc_attr(get_the_ID()); ?>">
                    <?php if ($flag === 'press'): ?>
                        <?php
                        $image_array = get_post_meta(get_the_ID(), 'press_logo', false);
                        $thumbimg = (!empty($image_array[0])) ? wp_get_attachment_image($image_array[0], 'large') : '';
                        ?>
                        <div class="press_logo"><?php echo $thumbimg; ?></div>
                    <?php endif; ?>

                    <div class="n_date"><?php echo get_the_date('j.m.Y'); ?></div>
                    <p><?php the_title(); ?></p>
                    <div class="n_img" style="background:url('<?php echo get_the_post_thumbnail_url(get_the_ID(), [350, 233]) ?>')"></div>
                </a>
            </div>
            <?php
        endwhile;
    endif;

    wp_reset_postdata();
    wp_die();
}
?>
