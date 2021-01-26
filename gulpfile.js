let gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  fileinclude = require('gulp-file-include'),
  browserSync = require('browser-sync'),
  svgSprite = require('gulp-svg-sprite');

gulp.task('sass', function () {
  return gulp.src('public/sass/*.sass')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer(['> 1%']))
    .pipe(gulp.dest('public/styles'));
});

gulp.task('fileinclude', function () {
  return gulp.src(['public/html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'public/html/partials/'
    }))
    .pipe(gulp.dest('public/'));
});

gulp.task('svgSprite', function () {
  return gulp.src('public/images/svg-icons/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    }
    ))
    .pipe(gulp.dest('public/images'));
});

gulp.task('js-libs', function () {
  return gulp.src([
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('css-libs', function () {
  return gulp.src([
  ])
    .pipe(concat('libs.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('public/styles'));
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'public'
    },
    files: [
      'public/sass/**/*.sass',
      'public/scripts/**/*.js',
      'public/*.html',
    ],
    notify: false
  });
});

gulp.task('watch', async function () {
  gulp.watch('public/sass/**/*.sass', gulp.series(['sass']));
  gulp.watch('public/html/**/*.html', gulp.series(['fileinclude']));
  gulp.watch('public/images/svg-icons/*.svg', gulp.series(['svgSprite']));
});

gulp.task('default', gulp.series([
  'sass',
  'js-libs',
  'css-libs',
  'fileinclude',
  'svgSprite',
  'watch',
  'browser-sync'
]));

gulp.task('build', async function () {
  gulp.series([
    'sass',
    'js-libs',
    'css-libs',
    'fileinclude',
    'svgSprite'
  ]);

  gulp.src(['public/styles/*'])
    .pipe(gulp.dest('docs/styles'));

  gulp.src('public/fonts/**/*')
    .pipe(gulp.dest('docs/fonts'));

  gulp.src('public/scripts/**/*')
    .pipe(gulp.dest('docs/scripts'));

  gulp.src('public/images/**/*')
    .pipe(gulp.dest('docs/images'));

  gulp.src('public/*.*')
    .pipe(gulp.dest('docs'));
});
