"use strict";
/**
 * 모듈 호출
 * [gulp-if]      - 조건 처리
 * [gulp-rename]  - 파일 이름 변경
 * [gulp-connect] - 웹 서버
 * [gulp-open]    - 브라우저 오픈
 * [gulp-jade]		- Jade 컴파일
 * [del]          - 폴더(디렉토리)/파일 제거
 */
var gulp    = require('gulp'),
	gulpif  = require('gulp-if'),
	rename  = require('gulp-rename'),
	connect = require('gulp-connect'),
	open    = require('gulp-open'),
	jade 		= require('gulp-jade'),
	del     = require('del'),
	config  = require('./config.json'); // 환경설정 config.json

/**
 * Gulp 업무(Tasks) 정의
 */
// 기본 업무
gulp.task('default', ['serve', 'open', 'watch']);
// Jade 컴파일
gulp.task('jade', function() {
	gulp.src(config.input+'/jade/**/*.jade')
			.pipe(jade({pretty: true}))
			.pipe(gulp.dest(config.output));
});
// 관찰 업무
gulp.task('watch', function () {
  gulp.watch([config.output+'/*.html'], ['html']);
  gulp.watch([config.output+'/css/*.css'], ['css']);
  gulp.watch([config.input+'/jade/*.jade'], ['jade']);
});
// 웹 서버 업무 (LiveReload 사용)
gulp.task('serve', function() {
	connect.server({
		root: config.output,
		port: config.port,
		livereload: config.livereload
	});
});
// 브라우저 오픈 업무
gulp.task('open', function() {
	var options = {
		url: 'http://localhost:'+config.port, 
		app: config.browser // chrome, firefox, iexplore, opera, safari
	};
	gulp.src(config.output+'/*.html')
		.pipe(open('<%file.path%>', options));
});
// HTML 변경 내용, 자동 갱신(업데이트)
gulp.task('html', function() {
	gulp.src(config.output+'/index.html')
		.pipe(connect.reload());
});
// CSS 변경 내용, 자동 갱신(업데이트)
gulp.task('css', function() {
	gulp.src(config.output+'/css/*.css')
		.pipe(connect.reload());
});

