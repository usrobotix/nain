jQuery(function() {
	

    jQuery(".association .owl-carousel").owlCarousel({
        items:1,
        loop:true,
        margin:10,
        nav: true,
        navText: ["<img src='/wp-content/themes/twentynineteen/images/myprevimage.png'>","<img src='/wp-content/themes/twentynineteen/images/mynextimage.png'>"],
        dots: false,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        responsive:{
//Кол-во слайдо на разном разрешении
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

    jQuery(".celi .owl-carousel").owlCarousel({
        items:1,
        loop:true,
        margin:10,
        nav: false,
        navText: ["<img src='/wp-content/themes/twentynineteen/images/myprevimage.png'>","<img src='/wp-content/themes/twentynineteen/images/mynextimage.png'>"],
        dots: false,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        responsive:{
//Кол-во слайдо на разном разрешении
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

    jQuery(".sovet .owl-carousel").owlCarousel({
        items:1,
        loop:true,
        margin:10,
        nav: true,
        navText: ["<img src='/wp-content/themes/twentynineteen/images/myprevimage.png'>","<img src='/wp-content/themes/twentynineteen/images/mynextimage.png'>"],
        dots: false,
        autoplay:false,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        responsive:{
//Кол-во слайдо на разном разрешении
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });
    jQuery("#mnenia").owlCarousel({
        items:1,
        loop:true,
        margin:10,
        nav: false,
        dots: false,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        responsive:{
//Кол-во слайдо на разном разрешении
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
    jQuery("#news").owlCarousel({
        items:1,
        loop:true,
        margin:10,
        nav: false,
        dots: false,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        responsive:{
//Кол-во слайдо на разном разрешении
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
	jQuery("#press").owlCarousel({
        items:1,
        loop:true,
        margin:10,
        nav: false,
        dots: false,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        responsive:{
//Кол-во слайдо на разном разрешении
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
    jQuery("#count").owlCarousel({
        items:1,
        loop:true,
        margin:10,
        nav: false,
        dots: false,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        responsive:{
//Кол-во слайдо на разном разрешении
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
	jQuery(".partners .owl-carousel").owlCarousel({
        items:1,
        loop:false,
        margin:10,
        nav: true,
        navText: ["<img src='/wp-content/themes/twentynineteen/images/myprevimage.png'>","<img src='/wp-content/themes/twentynineteen/images/mynextimage.png'>"],
        dots: false,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        responsive:{
//Кол-во слайдо на разном разрешении
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });
	
	//Рабочие органы ассоциации
	jQuery('p.gr').click(function (event) {
	var divtoggle =	jQuery(event.target).next();
		jQuery(event.target).toggleClass('active');
  // сворачиваем или разворачиваем collapse-элемент
  jQuery(divtoggle).collapse('toggle');
});

jQuery(function ($) {	
	$(".btn--load").on("click", function () {
		var current_page;
        const button = $(this);
        button.html("Загрузка...");
		if(button.attr("flag") == "news"){
			current_page = current_page_news;
		}
		if(button.attr("flag") == "press"){
			current_page = current_page_press;
		}

        const data = {
            "action": "load_more",
            "query": button.attr("data-param-posts"),
            "page": current_page,
            "flag": button.attr("flag"),
        }

        $.ajax({
            url: "/wp-admin/admin-ajax.php",
            data: data,
            type: "POST",
            success: function (data) {
                if (data) {
                    button.html("Загрузить ещё");
					console.log(data);
                    button.parent().before(data);
                    if(button.attr("flag") == "news"){
						current_page_news++;
						if (current_page_news == button.attr("data-max-pages")) {
                        button.remove();
                    	}
					}
					if(button.attr("flag") == "press"){
						current_page_press++;
						if (current_page_press == button.attr("data-max-pages")) {
                        button.remove();
                    	}
					}
                    
                } else {
                    button.remove();
                }
            }
        });
    });
	});

});