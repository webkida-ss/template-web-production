/********************************************************************************************
 * 事前準備
 * sass-comb/watch-combを使用するには、本ファイルと同階層に .csscomb.jsonが必要
 ********************************************************************************************/

// 変数宣言
const {
	src, // gulpからsrcをインポート
	dest, // gulpからdistをインポート
	parallel, // gulpからparallelをインポート
	watch, // gulpからwatchをインポート
} = require('gulp');
const $ = require('./modules.js'); // 分離したmodulesをインポート
const uglify = $.composer($.uglifyes, $.composer); // JS圧縮

// パス
const path = {
	src: './src', // 編集先
	dist: './dist', // 出力先
};


/********************************************************************************************
 * タスク定義
 ********************************************************************************************/

// HTML =====================================================================================
function html() {
	return src([`${path.src}/pug/*.pug`, `!${path.src}/pug/**/_*.pug`]) // 対象pugファイル
		.pipe(
			$.plumber({ // エラーのデスクトップ通知
				errorHandler: $.notify.onError('Error: <%= error.message %>'),
			})
		)
		.pipe(
			$.pug({
				pretty: true, // 整形ツール？
			})
		)
		.pipe(dest(path.dist)) // 出力先
		.pipe(
			$.browserSync.reload({ // ブラウザ即時反映
				stream: true,
				once: true,
			})
		);
}

// scss ====================================================================================
function scss() {
	// 設定
	const output_style = {
		outputStyle: 'expanded'
	}; // 出力形式
	const browser_list = {
		overrideBrowserslist: ["last 2 versions", "ie >= 11"]
	}; // ベンダープレフィックス

	return src(`${path.src}/scss/*.scss`) // 対象scssファイル
		.pipe(
			$.plumber({ // エラーをデスクトップ通知
				errorHandler: $.notify.onError('Error: <%= error.message %>'),
			})
		)
		.pipe($.sourcemaps.init())
		.pipe($.sass(output_style))
		.pipe($.postcss([
			$.mqpacker(),
			$.autoprefixer(browser_list) // ベンダープレフィックス
		]))
		.pipe($.csscomb())
		// .pipe($.autoprefixer()) // ベンダープレフィックス
		.pipe($.sourcemaps.write()) // ソースマップ
		.pipe(dest(`${path.dist}/css`)) // 出力先
		.pipe(
			$.rename({
				suffix: '.min', // サフィックスをつけてリネーム
			})
		)
		.pipe($.minifyCSS()) // CSS minify化
		.pipe(dest(`${path.dist}/css`))
		.pipe(
			$.browserSync.reload({
				stream: true,
				once: true,
			})
		);
}

// CSS ====================================================================================
function css() {
	return src(`${path.src}/css/*.css`) // 対象cssファイル
		.pipe(
			$.plumber({ // エラーをデスクトップ通知
				errorHandler: $.notify.onError('Error: <%= error.message %>'),
			})
		)
		.pipe(dest(`${path.dist}/css/lib`)); // 出力先
	// .pipe($.minifyCSS()) // CSS minify化
}

// JS =====================================================================================
function js() {
	return src(`${path.src}/js/**/*.js`, {
			sourcemaps: true
		})
		.pipe(
			$.plumber({
				errorHandler: $.notify.onError('Error: <%= error.message %>'),
			})
		)
		.pipe(uglify({
			output: {
				comments: /^!/
			}
		}))
		.pipe(
			$.concat('main.min.js', {
				newLine: '\n',
			})
		)
		.pipe(dest(`${path.dist}/js`, {
			sourcemaps: true
		}))
		.pipe(
			$.browserSync.reload({
				stream: true,
				once: true,
			})
		);
}

// 画像 =====================================================================================
function img() {
	return src(`${path.src}/img/**/**`) // 対象img
		.pipe($.changed(`${path.dist}/img/`)) // 変更されたファイルのみ
		.pipe(
			$.imagemin({
				optimizationLevel: 3, // 圧縮率（圧縮率を高めすぎると劣化する）
			})
		)
		.pipe(dest(`${path.dist}/img/`)); // 出力先
}

// BrowserSync ============================================================================
function bs() {
	$.browserSync.init({
		server: {
			baseDir: path.dist,
		},
		notify: true,
		xip: false,
	});
}

// ========================================================================================

exports.html = html;
exports.scss = scss;
exports.css = css;
exports.js = js;
exports.bs = bs;
exports.img = img;

exports.default = parallel([html, scss, css, js, img, bs], () => {
	watch(`${path.src}/pug/**`, html);
	watch(`${path.src}/scss/**`, scss);
	watch(`${path.src}/css/**`, css);
	watch(`${path.src}/js/**`, js);
	watch(`${path.src}/img/**`, img);
});