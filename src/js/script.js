jQuery(function () {

	/*********************************************
	 * スムーススクロール
	 *********************************************/
	jQuery('a[href^="#"]').click(function () {
		let header = jQuery('.header').innerHeight();
		let speed = 500;
		let id = jQuery(this).attr("href"); // 遷移先ID（href属性）
		let target = jQuery("#" == id ? "html" : id); // #のみだhtmlタグ（トップ）に戻る
		let position = jQuery(target).offset().top - header; // 固定ヘッダー分引く
		// ヘッダーがfixedでない場合
		if (jQuery(".header").css("position") !== "fixed") {
			position = jQuery(target).offset().top;
		}
		if (position < 0) {
			position = 0;
		}
		jQuery("html, body").animate({
				scrollTop: position
			},
			speed
		);
		return false;
	});

	/*********************************************
	 * フローティングアイテムを表示
	 *********************************************/
	jQuery(window).on("scroll", function () {
		if (jQuery(this).scrollTop() > 200) {
			jQuery('.util__floating').addClass('is-show');
		} else {
			jQuery('.util__floating').removeClass('is-show');
		}
	});

	/*********************************************
	 * ドロワー
	 * jQuery
	 *********************************************/
	let drawerBtn = jQuery("#js-drawer");
	drawerBtn.on("click", function (e) {
		e.preventDefault();
		let targetClass = jQuery(this).attr("data-target");
		jQuery("." + targetClass).toggleClass("is-checked"); // for-drawerクラスがついてる要素をトグルでis-checked
		return false;
	});
	// リンク選択時にドロワーを閉じる
	jQuery('.js-drawer-item').on('click', function (e) {
		let targetClass = drawerBtn.attr("data-target");
		jQuery("." + targetClass).removeClass('is-checked');
	});
	jQuery(window).resize(function () {
		if (jQuery(window).width() > 559) {
			let targetClass = drawerBtn.attr("data-target");
			jQuery("." + targetClass).removeClass('is-checked');
		}
	});

	/*********************************************
	 * スライダー
	 * jQueryプラグイン
	 *********************************************/
	new Swiper('.swiper-container', {
		width: 274, // スライドサイズ
		spaceBetween: 24, // スライド間
		loop: true, // 最後に達したら先頭に戻る
		loopedSlides: 6, // スライド数
		pagination: { // ページネーション
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: { // ブレイクポイント
			600: { // min-width 600
				spaceBetween: 40,
				width: 400,
			}
		}
	});

	/*********************************************
	 * アコーディオン
	 * jQuery
	 *********************************************/
	jQuery('.js-accordion').click(function () {
		// anwserの表示制御
		jQuery(this).children('.').next().slideToggle();
		// 直下のquestion-textの表示制御
		jQuery(this).find('.').toggleClass('is-open');
	});

	/*********************************************
	 * スクロールトップ
	 *********************************************/
	jQuery('.js-scroll-top').click(function () {
		jQuery('body, html').animate({
			scrollTop: 0
		}, 500, 'swing');
		return false;
	});

	/*********************************************
	 * ふわっと表示
	 *********************************************/
	let fadeIn = jQuery(".c-fade-in");
	jQuery(window).scroll(function () {
		fadeIn.each(function () {
			let offset = jQuery(this).offset().top;
			let scroll = jQuery(window).scrollTop();
			let windowHeight = jQuery(window).height();
			if (scroll > offset - windowHeight + 150) {
				jQuery(this).addClass("c-scroll-in");
			}
		});
	})
})