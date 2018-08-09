// export default {
//     init() {
//         return new Promise((resolve, reject)=> {
//             if (typeof BMap != 'undefined') {
//                 resolve(BMap);
//                 return;
//             };
//             window.onBMapCallback = function() {
//                 resolve(BMap);
//             };
//             let script = document.createElement('script');
//             script.type = 'text/javascript';
//             script.src = 'https://api.map.baidu.com/api?v=2.0&ak=dQZ76xtTUHAwmDZUN72tFD5LvehvFGIh&s=1&callback=onBMapCallback';
//             document.body.appendChild(script);
//         });
//     }
// };
