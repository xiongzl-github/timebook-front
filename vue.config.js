// module.exports = {
//     devServer: {
//         host: 'http://localhost:9080', //设置本地服务器   选填
//         port: 9080, //设置本地默认端口  选填
//         proxy: {
//             '/': {
//                 target: 'http://localhost:8090', // 你要请求的后端接口ip+port
//                 changeOrigin: true, // 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
//                 ws: true, // 开启webSocket
//                 pathRewrite: {
//                     '^/': '', // 替换成target中的地址
//                 }
//             }
//         }
//     }
// }