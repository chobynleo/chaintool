module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://xxxx/device/', // 对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
            '/getMap': {
                target: 'http://localhost:3000/getMap', // 对应自己的接口
                changeOrigin: true,
                ws: true,
            },
        },
    },
    publicPath: './',
}