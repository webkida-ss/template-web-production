/**
 * sass-comb/watch-combを使用するには、本ファイルと同階層に .csscomb.jsonが必要
 * VScodeの機能で単体 csscombも使用可能（定義は/Applications/Visual Studio Code.app/Contents/.csscomb.json）
 */

// モジュール
let gulp=require('gulp');
let sass=require('gulp-sass');
let postcss=require('gulp-postcss');
let mqpacker = require('css-mqpacker'); // メディアクエリ統一
let autoprefixer = require('autoprefixer');// ベンダープレフィックス自動付与
let csscomb = require('gulp-csscomb'); // CSSプロパティ記述整形

// 設定
let output_style = {outputStyle:'expanded'}; // 出力形式
let browser_list = {overrideBrowserslist: ["last 2 versions", "ie >= 11"]}; // ベンダープレフィックス

/*******************************************************
 * タスク 
 * 　sass      ： csscombなし
 * 　sass-comb ： csscombあり
 *******************************************************/
gulp.task('sass',function(){
    return gulp.src(`./sass/**/*.scss`)
            .pipe(sass(output_style))
            .pipe(postcss([
                mqpacker(),
                autoprefixer(browser_list)
            ]))
            .pipe(gulp.dest(`./css`));
});
gulp.task('sass-comb',function(){ // css整形あり
    return gulp.src(`./sass/**/*.scss`)
            .pipe(sass(output_style))
            .pipe(postcss([
                mqpacker(),
                autoprefixer(browser_list)
            ]))
            .pipe(csscomb())
            .pipe(gulp.dest(`./css`));
});

/*******************************************************
 * watchモード
 * 　watch      ： csscombなし
 * 　watch-comb ： csscombあり
 *******************************************************/
gulp.task('watch',function(){  
    gulp.watch('./sass/**/*.scss',gulp.series(['sass']))
});
gulp.task('watch-comb',function(){  
    gulp.watch('./sass/**/*.scss',gulp.series(['sass-comb']))
});
