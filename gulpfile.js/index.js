// 変数宣言
const {
	src,
	dest,
	parallel,
	watch,
} = require('gulp');
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

	return src("./src/scss/**/*.scss")
		.pipe(sass.sync({
			outputStyle: "expanded"
		}))
		.pipe(dest(`${path.dist}/css`));
}

// ========================================================================================
// タスクの定義
exports.scss = scss;

// デフォルト
exports.default = parallel([scss], () => {
	watch(`${path.src}/scss/**`, scss);
});