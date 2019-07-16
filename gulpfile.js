'use strict';

/* параметры для gulp-autoprefixer */
var autoprefixerList = [
  'Chrome >= 45',
  'Firefox ESR',
  'Edge >= 12',
  'Explorer >= 10',
  'iOS >= 9',
  'Safari >= 9',
  'Android >= 4.4',
  'Opera >= 30'
];

// init
var gulp        = require('gulp'),
    watch       = require('gulp-watch'),        // Наблюдение за изменениями файлов
    prefixer    = require('gulp-autoprefixer'), // Автоматически добавляет вендорные префиксы к CSS свойствам
    uglify      = require('gulp-uglify'),       // Сжимать наш JS
    rigger      = require('gulp-rigger'),       // Позволяет импортировать один файл в другой простой конструкцией
    sass        = require('gulp-sass'),         // для компиляции нашего SCSS кода
    sourcemaps  = require('gulp-sourcemaps'),   // Для генерации css sourscemaps, помогает нам при отладке кода
    cssmin      = require('gulp-clean-css'),    // Сжатие CSS кода
    imagemin    = require('gulp-imagemin'),     // Сжатие картинок
    pngquant    = require('imagemin-pngquant'), // Сжатие картинок | работа с PNG
    plumber     = require('gulp-plumber'),      // Ловим ошибки, чтобы не прервался watch
    svgSprite   = require('gulp-svg-sprite'),   // Создаем спрайт из svg
    svgmin      = require('gulp-svgmin'),       // оптимизируем наш svg
    svg2png     = require('gulp-svg2png'),      // Создадим альтернативный спрайт из svg в png
    spritesmith = require('gulp.spritesmith'),  // Создание png спрайтов
    concatJs    = require('gulp-concat'),       // Конкатенация JS
    concatCss   = require('gulp-concat-css');   // Конкатенация CSS
	


// write routs
var dir = {
    localPath:        'local/templates/main/',
    compotents:       'bower_components/',
},

path = {
    build: {
        js:            dir.localPath,
        styles:        dir.localPath,
        images:        dir.localPath + 'images/',
        fonts:         dir.localPath + 'fonts/',
        fontBootstrap: dir.localPath + 'fonts/bootstrap/'
    },
    src: {
        js:                'src/js/*.*',
        styles:            'src/scss/*.*',
        stylesPartials:    'src/scss/partials/',
        images:            'src/images/**/*.*',
        sprite:            'src/sprite/*.*',
        spriteTemplate:    'src/sprite-template.scss',
        spriteSvg:         'src/sprite-svg/*.*',
        spriteSvgTemplate: 'src/sprite-svg-template.scss',
        fonts:             'src/fonts/**/*.*',
        jquery:            dir.components + 'jquery/dist/jquery.min.js',
		fontBootstrap:     dir.components + 'bootstrap-sass/assets/fonts/bootstrap/*.*'
    },
    watch: {
        js:        'src/js/**/*.js',
        styles:    'src/scss/**/*.scss',
        images:    'src/images/**/*.*',
        sprite:    'src/sprite/*.*',
        spriteSvg: 'src/sprite-svg/*.*',
        fonts:     'src/fonts/**/*.*'
    }
};

// javascript concat build
gulp.task('js:build', function () {
    gulp.src(path.src.js)               // Найдем наш main файл
        .pipe(plumber())
        .pipe(rigger())                 // Прогоним через rigger
        .pipe(sourcemaps.init())        // Инициализируем sourcemap
        .pipe(uglify())                 // Сожмем наш js
        .pipe(sourcemaps.write())       // Пропишем карты
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.js)) // Выплюнем готовый файл в build
});

// png sprite build
gulp.task('sprite:build', function() {
    var spriteData =
        gulp.src(path.src.sprite)
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.scss',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                padding: 5,
                cssTemplate: path.src.spriteTemplate,
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest(path.build.images));
    spriteData.css.pipe(gulp.dest(path.src.stylesPartials));
});

// svg sprite build
gulp.task('spriteSvg:build', function () {
    gulp.src(path.src.spriteSvg)
        .pipe(plumber())
        .pipe(svgmin())
        .pipe(svgSprite({
            "shape": {
                "spacing": {
                    "padding": 5,
                },
            },
            "mode": {
                "css": {
                    "dest": "./",
                    "layout": "diagonal",
                    "sprite": path.build.images+"sprite-svg.svg",
                    "bust": false,
                    "render": {
                        "scss": {
                            "dest": path.src.stylesPartials+'sprite-svg.scss',
                            "template": path.src.spriteSvgTemplate
                        }
                    }
                }
            }
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest("./"));
});

// svg to png sprite | for ie
gulp.task('svg2png', function() {
    gulp.src(path.build.images+"sprite-svg.svg")
        .pipe(plumber())
        .pipe(svg2png())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.images));
});

// images compress
gulp.task('image:build', function () {
    gulp.src(path.src.images)
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.images))
});

// move bootstrap icons(font) to build
gulp.task('icons:build', function() {
    gulp.src(path.src.fontBootstrap)
        .pipe(gulp.dest(path.build.fontBootstrap));
});

// move custom fonts to build
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// styles concat build
gulp.task('styles:build', function () {
    gulp.src(path.src.styles)               // Выберем наш main.scss
        .pipe(plumber())
        .pipe(sourcemaps.init())            // То же самое что и с js
        .pipe(sass())                       // Скомпилируем
        .pipe(prefixer({
			browsers: autoprefixerList
		}))                   // Добавим вендорные префиксы
        .pipe(cssmin())                     // Сожмем
        .pipe(sourcemaps.write())           // Пропишем карты
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.styles)) // И в build
});

// javascript main.min.js build
gulp.task('mainjs', function() {
  return gulp.src('src/js/*.js')
	.pipe(plumber())
    .pipe(concatJs('src/js/main.js', {newLine: ';'}))
    .pipe(sourcemaps.init())        // Инициализируем sourcemap
    .pipe(uglify())                 // Сожмем наш js
    .pipe(sourcemaps.write())       // Пропишем карты
    .pipe(plumber.stop())
    .pipe(gulp.dest('src/js/main.min.js'));
});

// css main.min.css build
gulp.task('maincss', function () {
  return gulp.src('src/css/*.css')
    .pipe(plumber())
	.pipe(sourcemaps.init())
    .pipe(concatCss("src/css/main.css"))
	.pipe(sourcemaps.write())
	.pipe(plumber.stop())
    .pipe(gulp.dest('src/css/main.min.css'));
});

// start task for build
gulp.task('build', [
    'js:build',
    'sprite:build',
    'spriteSvg:build',
    'image:build',
    'icons:build',
    'fonts:build',
    'styles:build',
]);

// start task for watch
gulp.task('watch', function(){
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.sprite], function(event, cb) {
        gulp.start('sprite:build');
    });
    watch([path.watch.spriteSvg], function(event, cb) {
        gulp.start('spriteSvg:build');
    });
    // watch for sprite-svg
    watch([path.build.images+"sprite-svg.svg"], function(event, cb) {
        gulp.start('svg2png');
    });
    watch([path.watch.images], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.styles], function(event, cb) {
        gulp.start('styles:build');
    });
});

// start gulp
gulp.task('default', ['build', 'watch']);
