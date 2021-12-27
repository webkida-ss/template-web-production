jQuery(function () {

	/*********************************************
	 * WOW初期化
	 *********************************************/
	new WOW().init();

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
	 * フローティングアイテム
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
	// リンク選択時にドロワーを閉じる
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
	 * Geocording：住所からマップ作成
	 * jQuery
	 * Google Maps API
	 *********************************************/
	function draw_map(address) {
		let geocoder = new google.maps.Geocoder();

		// 住所から座標を取得する
		geocoder.geocode({ // リクエスト
				'address': address,
				'region': 'jp'
			},
			// コールバック関数
			function (results, status) {
				if (status != google.maps.GeocoderStatus.OK) { // ステータスOK出ない場合は表示しない
					return;
				}

				// Google Map 表示
				function init_gmap() {
					// 表示箇所
					let map_tag = jQuery('#js-map')[0];

					// 取得した座標を緯度経度にセット
					let result_location = results[0].geometry.location;
					let map_location = new google.maps.LatLng(result_location.lat(), result_location.lng());

					// マップ表示オプション
					let map_options = {
						zoom: 15, // 縮尺
						center: map_location, // 地図の中心座標
						disableDefaultUI: true, // falseにすると地図上に人みたいなアイコンとか表示される
						mapTypeId: google.maps.MapTypeId.ROADMAP // 地図の種類を指定
					};

					// マップ表示
					let map = new google.maps.Map(map_tag, map_options);

					// 地図上にマーカー（ピン留め）を表示させる
					new google.maps.Marker({
						position: map_location, // マーカーを表示させる座標
						map: map // マーカーを表示させる地図
					});
				}

				// 画面ロード時に表示
				google.maps.event.addDomListener(window, 'load', init_gmap);
			}
		);
	}
	// 住所取得して関数呼び出し
	let address = jQuery('#js-address').text();
	draw_map(address);

})