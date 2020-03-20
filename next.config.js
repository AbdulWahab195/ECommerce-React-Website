const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const config = {
    env: {
        baseURL: 'https://glattmage.testmagento.co/index.php/rest/V1/',
        user: 'admin',
        password: 'D3v3loper2015@',
        tokenPath: 'integration/admin/token',
        productImage: 'https://glattmage.testmagento.co/pub/media/catalog/product/',
        AUTH_CLIENTKEY: '3eVGFEj7r6U8KHJ4g98qb5LDA6wRyN6z4J57A53bTq6MMnh6xWZ4yhsfzXyA8HN9',
        AUTH_LOGINID: '5ScbB7Z6E'
    }
}

module.exports = withPlugins([
    [optimizedImages, {
        inlineImageLimit: 8192,
        imagesFolder: 'images',
        imagesName: '[name]-[hash].[ext]',
        handleImages: ['jpeg', 'jpg', 'png', 'svg', 'webp', 'gif', 'ico'],
        optimizeImages: true,
        optimizeImagesInDev: false,
        mozjpeg: {
            quality: 80,
        },
        optipng: {
            optimizationLevel: 3,
        },
        pngquant: false,
        gifsicle: {
            interlaced: true,
            optimizationLevel: 3,
        },
        webp: {
            preset: 'default',
            quality: 75,
        },
    }],
    [withCSS],
    [withFonts],
    [withSass]
], config);