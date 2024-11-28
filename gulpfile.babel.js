import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import {deleteAsync} from 'del';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import gulpBrowserSync from 'browser-sync';
import changed from 'gulp-changed';
import webp from 'gulp-webp';
import sourcemaps from 'gulp-sourcemaps';
import svgSprite from 'gulp-svg-sprite';
import gulpIf from 'gulp-if';

import webpack from 'webpack';
import webpackStream from 'webpack-stream';


const sass = gulpSass(dartSass);
const browserSync = gulpBrowserSync.create();


// CONST
const folder = 'src',
	hostName = 'http://start/';

const paths = {
	dist: `./${folder}/assets/dist`,
	src:  `./${folder}/assets/src`,
	php:  `./${folder}`,
};
const src = {
	img:   paths.src + '/img/**/*.*',
	scss:  paths.src + '/scss',
	js:    paths.src + '/js',
	fonts: paths.src + '/fonts',
	svg:   paths.src + '/svg/*.*',
	php:   paths.php + '/**/*.php',
};
const dist = {
	img:   paths.dist + '/img/',
	css:   paths.dist + '/css/',
	js:    paths.dist + '/js/',
	fonts: paths.dist + '/fonts/',
};


// GET ARRG TERMINAL
const arg = ((argList) => {
	let arg = {},
		a,
		opt,
		thisOpt,
		curOpt;
		
	for (a = 0; a < argList.length; a++) {
		thisOpt = argList[a].trim();
		opt = thisOpt.replace(/^\-+/, '');

		if (opt === thisOpt) {
			// argument value
			if (curOpt) arg[curOpt] = opt;
			curOpt = null;
		} else {
			// argument name
			curOpt = opt;
			arg[curOpt] = true;
		}
	}

	return arg;
})(process.argv);


// Clean folder
function clean() {
	return deleteAsync([paths.dist]);
}


// INIT SERVER
function browserSyncInit(done) {
	browserSync.init({
		proxy: hostName,
		host: 'localhost',
		port: 3000,
	});
	done();
}


// RELOAD PAGE
function browserSyncReload(done) {
	browserSync.reload();
	done();
}


// Copy fonts
function copyFonts() {
	return gulp.src([src.fonts + '/**/*']).pipe(gulp.dest(dist.fonts));
}


// Images optimizing
function imgProcess() {
	let condition = (file) => {
        if(['.jpg', 'jpeg', '.png'].includes(file.extname)) {
			return true;
		}
    };

	return gulp
		.src(src.img)
		.pipe(changed(dist.img))
		.pipe(
			gulpIf(
				condition,
				webp({
					quality: 100,
				}),
			)
		)
		.pipe(gulp.dest(dist.img));
}


// SCSS
function scssProcess() {
	const plugins = [
		autoprefixer({ 
			grid: true,
		}),
	];
	if (arg.production === 'true') {
		return gulp
			.src([src.scss + '/*.scss'])
			.pipe(sass({
				includePaths: ['node_modules']
			}))
			.pipe(postcss([ autoprefixer(), cssnano() ]))
			.pipe(gulp.dest(dist.css));
	} else {
		return gulp
			.src([src.scss + '/*.scss'])
			.pipe(sourcemaps.init())
			.pipe(sass({
				includePaths: ['node_modules']
			}))
			.pipe(sourcemaps.write('/'))
			.pipe(gulp.dest(dist.css))
			.pipe(browserSync.reload({stream: true}));
	}
}


// JS
function jsProcess() {
	return gulp
		.src([src.js + '/index.js'])
		.pipe(webpackStream({
			mode: (arg.production === 'true') ? 'production' : 'development',
			output: {
				filename: 'index.bundle.js',
			},
			plugins: [
				new webpack.ProvidePlugin({
					$: 'jquery',
					jQuery: 'jquery',
				})
			],
			module: {
				rules: [
					// js babel
					{
						test: /\.m?js$/i,
						exclude: /(node_modules|bower_components)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env'],
							},
						},
					},
				],
			}
		}))
		.pipe(gulp.dest(dist.js));
}

function jsProcessFirst() {
	return gulp
		.src([src.js + '/first.js'])
		.pipe(webpackStream({
			mode: (arg.production === 'true') ? 'production' : 'development',
			output: {
				filename: 'first.bundle.js',
			},
			plugins: [
				new webpack.ProvidePlugin({
					$: 'jquery',
					jQuery: 'jquery',
				})
			],
			module: {
				rules: [
					// js babel
					{
						test: /\.m?js$/i,
						exclude: /(node_modules|bower_components)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env'],
							},
						},
					},
				],
			}
		}))
		.pipe(gulp.dest(dist.js));
}


// SVG SPRITES
function SVGProcess() {
	return gulp
		.src(src.svg)
		.pipe(
			svgSprite({
				mode: {
					symbol: {
						sprite: '../icons.svg',
					},
				},
			}),
		)
		.pipe(gulp.dest(dist.img));
}


// WATCH
function watchFiles() {
	gulp.watch(src.php, gulp.series(browserSyncReload));
	gulp.watch(src.scss + '/**/*.scss', gulp.series(scssProcess));
	gulp.watch(src.js + '/**/*.js', gulp.series(jsProcessFirst, jsProcess, browserSyncReload));
	gulp.watch(src.img, gulp.series(imgProcess, browserSyncReload));
	gulp.watch(src.svg, gulp.series(SVGProcess, browserSyncReload));
	gulp.watch(src.fonts, gulp.series(copyFonts, browserSyncReload));
}


const buildGulp = gulp.series(
	clean,
	gulp.parallel(
		scssProcess,
		jsProcessFirst,
		jsProcess,
		imgProcess,
		SVGProcess,
		copyFonts,
	)
);

const watch = gulp.parallel(buildGulp, watchFiles, browserSyncInit);

export default watch;
export const build = buildGulp;