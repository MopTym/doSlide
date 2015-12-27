const path = require('path')
const gulp = require('gulp')
const gutil = require('gulp-util')
const clean = require('gulp-clean')
const jade = require('gulp-jade')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

//////////////////////////////////////////////////////////////////////

const webpackConfig = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve('./dist/js'),
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: []
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    devtool: 'source-map'
}

//////////////////////////////////////////////////////////////////////

function webpackTask(done, config, name) {
    webpack(config, (err, stats) => {
        if (err) throw new gutil.PluginError(name, err)
        gutil.log('[' + name + ']', stats.toString({
            colors: true,
            chunks: false
        }))
        done()
    })
}

function startupServer() {
    new WebpackDevServer(webpack(webpackConfig), {
        publicPath: '/',
        contentBase: path.resolve('./dist'),
        lazy: true,
        filename: 'main.js',
        stats: { colors: true }
    }).listen(80, 'localhost', function(err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err)
        gutil.log('[webpack-dev-server]', 'http://localhost/')
    })
}

//////////////////////////////////////////////////////////////////////

gulp.task('default', ['assets', 'css', 'js', 'html'])

gulp.task('watch', ['default'], (done) => {
    gulp.watch('src/assets/**/*', ['assets'])
    gulp.watch('src/js/**/*.js', ['js'])
    gulp.watch('src/css/**/*.{sass,scss}', ['css'])
    gulp.watch('src/**/*.jade', ['html'])
    gutil.log('watching...')
})



gulp.task('clean', () => {
   return gulp.src('dist', { read: false })
       .pipe(clean({ force: true }))
})

gulp.task('assets', () => {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets'))
})

gulp.task('html', () => {
    return gulp.src('src/index.jade')
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest('dist'))
})

gulp.task('css', () => {
    return gulp.src('src/css/**/*.{sass,scss}')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({
			browsers: ['> 5%'],
			cascade: false
		}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'))
})

gulp.task('js', (done) => webpackTask(done, webpackConfig, 'webpack'))

gulp.task('server', startupServer)
