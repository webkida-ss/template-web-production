// 変数宣言
const {
	src,
	dest,
	parallel,
	watch,
} = require('gulp');
const $ = require('./__modules.js'); // 分離したmodulesをインポート
const sass = require('gulp-sass')(require('sass')); // dart-sass指定

// パス
const path = {
	src: './src', // 編集先
	dist: './assets', // 出力先
};


/********************************************************************************************
 * タスク定義
 ********************************************************************************************/


// scss ====================================================================================
function scss() {
	// 設定
	const output_style = {
		outputStyle: 'expanded'
	}; // 出力形式
	const browser_list = {
		overrideBrowserslist: ["last 2 versions", "ie >= 11"]
	}; // ベンダープレフィックス

	return src("./src/scss/**/*.scss")
		.pipe($.sourcemaps.init())
		.pipe(sass.sync(output_style))
		.pipe($.csscomb())
		.pipe($.sourcemaps.write()) // ソースマップ
		.pipe(dest(`${path.dist}/css`));
}

// ========================================================================================
// タスクの定義
exports.scss = scss;

// デフォルト
exports.default = parallel([scss], () => {
	watch(`${path.src}/scss/**`, scss);
});