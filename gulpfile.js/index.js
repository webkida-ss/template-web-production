// 変数宣言
const {
	src,
	dest,
	parallel,
	watch,
} = require('gulp');
const $ = require('./modules.js'); // 分離したmodulesをインポート
const sass = require('gulp-sass')(require('sass')); // dart-sass指定
const uglify = $.composer($.uglifyes, $.composer); // JS圧縮

// パス
const path = {
	src: './src', // 編集先
	dist: './assets', // 出力先
};


/********************************************************************************************
 * タスク定義
 ********************************************************************************************/

// EJS =====================================================================================
function ejs() {
	return src([`${path.src}/ejs/*.ejs`, `!${path.src}/ejs/**/_*.ejs`]) // 対象EJSファイル
		.pipe($.ejs({}, {}, {
			ext: ".html" // htmlにコンパイル
		}))
		.pipe($.rename({
			extname: ".html" //拡張子を.htmlにリネーム
		}))
		.pipe(dest(path.dist)) // 出力先
		.pipe(
			$.browserSync.reload({ // ブラウザ即時反映
				stream: true,
				once: true,
			})
		);
}

// PHP =====================================================================================
function php() {
	return src([`./**/*.php`]) // 対象phpファイル
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
	const options = {
		fiber: $.fibers,
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
		.pipe(sass.sync(options))
		.pipe($.postcss([
			$.mqpacker(),
			$.autoprefixer(browser_list) // ベンダープレフィックス
		]))
		.pipe($.csscomb())
		.pipe($.sourcemaps.write()) // ソースマップ
		.pipe(dest(`${path.dist}/css`)) // <style>.css
		.pipe(
			$.rename({
				suffix: '.min', // サフィックスをつけてリネーム
			})
		)
		.pipe($.minifyCSS()) // CSS minify化
		.pipe(dest(`${path.dist}/css`)) // <style>.min.css
		.pipe(
			$.browserSync.reload({
				stream: true,
				once: true,
			})
		);
}

// css：minify化なし
function css() {
	return src(`${path.src}/css/*.css`) // 対象cssファイル
		.pipe(dest(`${path.dist}/css/lib`)); // 出力先
}

// JavaScript =============================================================================
function js() {
	// return src(`${path.src}/js/**/*.js`, {
	return src(`${path.src}/js/script.js`, { // ライブラリはminify化しない(個別に読み込み)
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
			$.concat('script.min.js', {
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

// jsライブラリ：minify化なし
function js_library() {
	return src(`${path.src}/js/lib/*.js`)
		.pipe(dest(`${path.dist}/js/lib`));
}

// ========================================================================================
// タスクの定義
exports.php = php;
exports.ejs = ejs;
exports.scss = scss;
exports.css = css;
exports.js = js;
exports.js_library = js_library;
// exports.bs = bs;
// exports.img = img;

// デフォルト
exports.default = parallel([scss], () => {
	watch(`${path.src}/scss/**`, scss);
});

// WP版
exports.wp = parallel([php, scss, css, js, js_library
	// , img, bs

], () => {
	watch(`./**/*.php`, php);
	watch(`${path.src}/scss/**`, scss);
	watch(`${path.src}/css/**`, css);
	watch(`${path.src}/js/**`, js);
	watch(`${path.src}/js/**`, js_library);
	// watch(`${path.src}/img/**`, img);
});



// EJS版
exports.ejs = parallel([ejs, scss, css, js, js_library
	// , img, bs
], () => {
	watch(`${path.src}/ejs/**`, ejs);
	watch(`${path.src}/scss/**`, scss);
	watch(`${path.src}/css/**`, css);
	watch(`${path.src}/js/**`, js);
	watch(`${path.src}/js/**`, js_library);
	// watch(`${path.src}/img/**`, img);
});