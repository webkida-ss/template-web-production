module.exports = { // モジュールをエクスポート
	pug: require('gulp-pug'),
	sass: require('gulp-sass'),
	minifyCSS: require('gulp-csso'), // CSS圧縮
	concat: require('gulp-concat'), // 複数のファイルを結合
	browserSync: require('browser-sync'), // ファイル変更監視ブラウザ反映：Live Server的な
	plumber: require('gulp-plumber'), // エラーで監視が強制終了されるのを防ぐ
	notify: require('gulp-notify'), // エラーのデスクトップ通知
	// autoprefixer: require('gulp-autoprefixer'), // ベンダープレフィックス自動付与
	sourcemaps: require('gulp-sourcemaps'), // SourceMapを作成する
	rename: require('gulp-rename'), // リネーム
	imagemin: require('gulp-imagemin'), // imageのminify化
	changed: require('gulp-changed'), // 変更されたファイルだけをStreamに流す
	uglifyes: require('uglify-es'), // JS圧縮（ES6版）
	composer: require('gulp-uglify/composer'), //これはよくわからない
	// 追加 
	postcss: require('gulp-postcss'),
	mqpacker: require('css-mqpacker'), // メディアクエリ統一
	csscomb: require('gulp-csscomb'), // CSSプロパティ記述整形
	autoprefixer: require('autoprefixer'), // ベンダープレフィックス自動付与
	// htmlBeautify: require('gulp-html-beautify'), // HTML（Pug）フォーマット
	// pugBeautify: require('gulp-pug-beautify'), // Pugフォーマット
};