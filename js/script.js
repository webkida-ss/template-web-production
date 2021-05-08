$(function(){
    
    /*********************************************
     * スムーススクロール
     *********************************************/
    $('a[href^="#"]').click(function() {
        let header = $('.header').innerHeight();
        let speed = 500;
        let id = $(this).attr("href"); // 遷移先ID（href属性）
        let target = $("#" == id ? "html" : id); // #のみだhtmlタグ（トップ）に戻る
        let position = $(target).offset().top - header; // 固定ヘッダー分引く
        // ヘッダーがfixedでない場合
        if ( $(".header").css("position") !== "fixed") {
            position = $(target).offset().top;
        }
        if (position < 0 ) {
            position = 0;
        }
        $("html, body").animate({
                scrollTop: position
            },
            speed
        );
        return false;
    });

    /*********************************************
     * フローティングアイテム
     *********************************************/
    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 200) {
            $('.util__floating').addClass('is-show');
        } else {
            $('.util__floating').removeClass('is-show');
        }
    });    

    /*********************************************
     * ドロワー
     * jQuery
     *********************************************/
    let drawerBtn = $("#js-drawer");
	drawerBtn.on("click", function(e) {
		e.preventDefault();
		let targetClass = $(this).attr("data-target");
		$("." + targetClass).toggleClass("is-checked");// for-drawerクラスがついてる要素をトグルでis-checked
		return false;
    });
    // リンク選択時にドロワーを閉じる
    $( '.js-drawer-item' ).on( 'click', function(e) {
        let targetClass = drawerBtn.attr("data-target");
        console.log(targetClass);
        $("." + targetClass).removeClass( 'is-checked' );
    });

    /*********************************************
     * スライダー
     * jQueryプラグイン
     *********************************************/
    new Swiper('.swiper-container',{
        width: 274, // スライドサイズ
        spaceBetween: 24, // スライド間
        loop: true, // 最後に達したら先頭に戻る
        loopedSlides: 6,// スライド数
        pagination: {// ページネーション
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        breakpoints: {// ブレイクポイント
            600: {// min-width 600
                spaceBetween: 40,
                width: 400,
            }
        }
    });

    /*********************************************
     * アコーディオン
     * jQuery
     *********************************************/
    $('.js-accordion').click(function(){
        // anwserの表示制御
        $(this).children('.').next().slideToggle();
        // 直下のquestion-textの表示制御
        $(this).find('.').toggleClass('is-open');
    });

    /*********************************************
     * フォームバリデーション
     *********************************************/
    let formName = $('#name'), formKana = $('#name_kana'), formEmail= $('#email'),
        formPrivacy = $('#privacy'), formSubmit = $('#submit');
    let flgName = false, flgKana = false, flgEmail = false, flgPrivacy = false;
    let regKana = /^([ァ-ン]|ー)+$/;
    let regEmail = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    // チェック方針：アウトな場合trueを返す
    let checkEmpty = str => (str == '' || str == null);　// 空チェック
    let checkName = name => checkEmpty(name); // 氏名チェック
    let checkKana = kana => (checkEmpty(kana) || kana.match(regKana) == null); // カタカナのみチェック
    let checkEmail = email => (checkEmpty(email) || email.match(regEmail) == null); // メールアドレスチェック
    let checkDisable = () => (flgName && flgKana && flgEmail && flgPrivacy);
    // 送信ボタンのdisableチェック、トグルによる変更
    function submitBtnCheckAndToggle(){
        if(checkDisable()){
            formSubmit.prop("disabled", false);
        } else{
            formSubmit.prop("disabled", true);
        }
    };
    // [入力時] 氏名チェック
    formName.change(function(){
        if(checkName(formName.val())){
            alert('氏名を入力してください。');
            flgName = false;
        } else {
            flgName = true;
        }
        submitBtnCheckAndToggle();
    });
    // [入力時] フリガナチェック
    formKana.change(function(){
        if(checkKana(formKana.val())){
            alert('カタカナで入力してください。');
            flgKana = false;
        } else {
            flgKana = true;
        }
        submitBtnCheckAndToggle();
    });
    // [入力時] メールアドレスチェック
    formEmail.change(function(){
        if(checkEmail(formEmail.val())){
            alert('メールアドレス形式で入力してください。');
            flgEmail = false;
        } else {
            flgEmail = true;
        }
        submitBtnCheckAndToggle();
    });
    // [入力時] プライバリーポリシーチェック
    formPrivacy.change(function(){
        if(formPrivacy.prop('checked') == true){
            flgPrivacy = true;
        }else{
            flgPrivacy = false;
        }
        submitBtnCheckAndToggle();
    });
    

})