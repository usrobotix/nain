jQuery(function () {
  // -------- OwlCarousel init (как у вас) --------
  jQuery(".association .owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: true,
    navText: [
      "<img src='/wp-content/themes/twentynineteen/images/myprevimage.png'>",
      "<img src='/wp-content/themes/twentynineteen/images/mynextimage.png'>",
    ],
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } },
  });

  jQuery(".celi .owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: false,
    navText: [
      "<img src='/wp-content/themes/twentynineteen/images/myprevimage.png'>",
      "<img src='/wp-content/themes/twentynineteen/images/mynextimage.png'>",
    ],
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } },
  });

  jQuery(".sovet .owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: true,
    navText: [
      "<img src='/wp-content/themes/twentynineteen/images/myprevimage.png'>",
      "<img src='/wp-content/themes/twentynineteen/images/mynextimage.png'>",
    ],
    dots: false,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } },
  });

  jQuery("#mnenia").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } },
  });

  jQuery("#news").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } },
  });

  jQuery("#press").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } },
  });

  jQuery("#count").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } },
  });

  jQuery(".partners .owl-carousel").owlCarousel({
    items: 1,
    loop: false,
    margin: 10,
    nav: true,
    navText: [
      "<img src='/wp-content/themes/twentynineteen/images/myprevimage.png'>",
      "<img src='/wp-content/themes/twentynineteen/images/mynextimage.png'>",
    ],
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1000: { items: 5 } },
  });

  // -------- Рабочие органы ассоциации --------
  jQuery("p.gr").click(function (event) {
    var divtoggle = jQuery(event.target).next();
    jQuery(event.target).toggleClass("active");
    jQuery(divtoggle).collapse("toggle");
  });

  // -------- Load more (исправлено: анти-двойной клик + правильное условие max_pages) --------
  jQuery(function ($) {
    $(".btn--load").on("click", function () {
      var current_page;
      const button = $(this);

      if (button.data("loading")) return;

      const flag = button.attr("flag");
      const maxPages = parseInt(button.attr("data-max-pages"), 10);

      // блокируем повторный клик
      button.data("loading", true);
      button.prop("disabled", true);
      button.html("Загрузка...");

      if (flag == "news") current_page = current_page_news;
      if (flag == "press") current_page = current_page_press;

      const shownIds = Array.from(
        new Set(
          $(`a[data-load-flag="${flag}"][data-post-id]`)
            .map(function () {
              return parseInt($(this).attr("data-post-id"), 10);
            })
            .get()
            .filter((id) => Number.isInteger(id) && id > 0)
        )
      );

      const data = {
        action: "load_more",
        query: button.attr("data-param-posts"),
        page: current_page,
        flag: flag,
        shown_ids: shownIds.join(","),
      };

      $.ajax({
        url: "/wp-admin/admin-ajax.php",
        data: data,
        type: "POST",
        success: function (resp) {
          if (resp) {
            button.html("Загрузить ещё");
            console.log(resp);
            button.parent().before(resp);

            if (flag == "news") {
              current_page_news++;
              // было: == ; стало: >=
              if (current_page_news >= maxPages) {
                button.remove();
              }
            }

            if (flag == "press") {
              current_page_press++;
              // было: == ; стало: >=
              if (current_page_press >= maxPages) {
                button.remove();
              }
            }
          } else {
            button.remove();
          }
        },
        complete: function () {
          // если кнопку удалили — уже неважно, но на всякий случай:
          button.data("loading", false);
          button.prop("disabled", false);
        },
      });
    });
  });
});

// Показывает в консоли:
// 1) какие новости были на странице ДО клика (batch #0)
// 2) какие пришли по AJAX при клике (batch #N)
// 3) какие из пришедших — дубли (уже были ДО клика)
// 4) что реально добавилось в DOM после вставки
//
// Важно: не ломает ваш текущий AJAX/HTML, просто логирует.
// Вставьте в конец custom.js (после того как подключён jQuery)

jQuery(function ($) {
  // --- настройки фильтра ссылок под посты ---
  function normalizeUrl(u) {
    return (u || "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/$/, "");
  }

  function isPostLikeUrl(href) {
    // фильтр под WP-посты по дате в URL: /YYYY/MM/DD/slug/
    return /\/\d{4}\/\d{2}\/\d{2}\//.test(href);
  }

  function collectPostsFrom(root) {
    const items = [];
    const seen = new Set();

    (root || document).querySelectorAll("a[href]").forEach((a) => {
      const href = normalizeUrl(a.href);
      if (!href) return;
      if (!isPostLikeUrl(href)) return;

      if (seen.has(href)) return;
      seen.add(href);

      // пробуем вытащить заголовок рядом (если есть)
      let title = "";
      const p = a.querySelector("p");
      if (p) title = (p.textContent || "").trim();

      // пробуем вытащить дату (если есть)
      let date = "";
      const d = a.querySelector(".n_date");
      if (d) date = (d.textContent || "").trim();

      items.push({ url: href, date, title });
    });

    return items;
  }

  function urls(list) {
    return list.map((x) => x.url);
  }

  function unique(arr) {
    return Array.from(new Set(arr));
  }

  function intersect(a, b) {
    const bs = new Set(b);
    return a.filter((x) => bs.has(x));
  }

  // --- глобальное хранилище "до клика" ---
  window.__LM_DEBUG__ = window.__LM_DEBUG__ || {
    baselineCaptured: false,
    baseline: [],
    clickIndex: 0,
    pending: null, // данные "до" конкретного запроса
  };

  // 1) Снимок "до клика" (как только DOM готов)
  function captureBaselineOnce() {
    if (window.__LM_DEBUG__.baselineCaptured) return;

    const base = collectPostsFrom(document);
    window.__LM_DEBUG__.baseline = base;
    window.__LM_DEBUG__.baselineCaptured = true;

    console.group("LOAD_MORE DEBUG: BASELINE (до клика)");
    console.table(base.map((x) => ({ date: x.date, title: x.title, url: x.url })));
    console.log("Baseline count:", base.length);
    console.groupEnd();
  }

  captureBaselineOnce();

  // 2) Перед отправкой AJAX сохраним "до запроса" именно для этого клика
  $(document).ajaxSend(function (event, xhr, settings) {
    try {
      const dataStr =
        typeof settings.data === "string" ? settings.data : $.param(settings.data || {});
      if (!dataStr.includes("action=load_more")) return;
      if (!dataStr.includes("flag=news")) return; // только новости

      captureBaselineOnce();

      window.__LM_DEBUG__.clickIndex += 1;

      const beforeNow = collectPostsFrom(document);
      window.__LM_DEBUG__.pending = {
        idx: window.__LM_DEBUG__.clickIndex,
        sentAt: new Date().toISOString(),
        before: beforeNow,
        requestData: dataStr,
      };

      console.group(`LOAD_MORE DEBUG: CLICK #${window.__LM_DEBUG__.pending.idx} (перед запросом)`);
      console.log("Sent at:", window.__LM_DEBUG__.pending.sentAt);
      console.log("Request data:", dataStr);
      console.table(beforeNow.map((x) => ({ date: x.date, title: x.title, url: x.url })));
      console.log("Before count:", beforeNow.length);
      console.groupEnd();
    } catch (e) {
      // тихо игнорируем
    }
  });

  // 3) После успеха AJAX распарсим HTML ответа и покажем "после клика"
  $(document).ajaxSuccess(function (event, xhr, settings, responseData) {
    try {
      const dataStr =
        typeof settings.data === "string" ? settings.data : $.param(settings.data || {});
      if (!dataStr.includes("action=load_more")) return;
      if (!dataStr.includes("flag=news")) return;

      const pending = window.__LM_DEBUG__.pending;
      if (!pending) return;

      // responseData у вас — HTML строка с <div class="col-lg-3">...
      const html =
        typeof responseData === "string"
          ? responseData
          : (xhr && xhr.responseText ? xhr.responseText : "");

      const tmp = document.createElement("div");
      tmp.innerHTML = html;

      const loaded = collectPostsFrom(tmp);              // что пришло в ответе
      const loadedUrls = urls(loaded);

      const beforeUrls = urls(pending.before);           // что было ДО этого клика
      const baselineUrls = urls(window.__LM_DEBUG__.baseline);

      const dupVsBefore = intersect(loadedUrls, beforeUrls);     // дубли относительно текущей страницы ДО клика
      const dupVsBaseline = intersect(loadedUrls, baselineUrls); // дубли относительно исходной загрузки (до первого клика)

      // после того как ваш код вставил HTML в DOM (обычно уже вставлено к моменту ajaxSuccess)
      const afterNow = collectPostsFrom(document);
      const afterUrls = urls(afterNow);

      // что реально добавилось в DOM (по URL)
      const addedToDom = afterUrls.filter((u) => !new Set(beforeUrls).has(u));

      console.group(`LOAD_MORE DEBUG: CLICK #${pending.idx} (после ответа)`);

      console.log("Loaded count:", loaded.length);
      console.table(loaded.map((x) => ({ date: x.date, title: x.title, url: x.url })));

      if (dupVsBefore.length) {
        console.warn("DUPLICATES vs BEFORE (были на странице до клика):", unique(dupVsBefore).length);
        console.table(unique(dupVsBefore).map((u) => ({ url: u })));
      } else {
        console.log("Duplicates vs BEFORE: 0");
      }

      if (dupVsBaseline.length) {
        console.warn("DUPLICATES vs BASELINE (были изначально до первого клика):", unique(dupVsBaseline).length);
        console.table(unique(dupVsBaseline).map((u) => ({ url: u })));
      } else {
        console.log("Duplicates vs BASELINE: 0");
      }

      console.log("Added to DOM after click count:", addedToDom.length);
      console.table(addedToDom.map((u) => ({ url: u })));

      console.groupEnd();

      // сброс pending
      window.__LM_DEBUG__.pending = null;
    } catch (e) {
      console.error("LOAD_MORE DEBUG error:", e);
      try { console.groupEnd(); } catch (_) {}
      window.__LM_DEBUG__.pending = null;
    }
  });

});
