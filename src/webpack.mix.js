const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
.sass('resources/sass/coach/login.scss', 'public/css/coach')
.sass('resources/sass/style/styles.scss', 'public/css/style')

.js('resources/js/install/script.js', 'public/js/install')
.sass('resources/sass/install/style.scss', 'public/css/install')
.sourceMaps();
