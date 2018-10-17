import Vue from 'vue';

Vue.directive('title', function(el, binding) {
    let title = binding.value;
    if (title === undefined || window.document.title === title) {
        return;
    }
    document.title = title;
    let img = el.getAttribute('img-set');
    var mobile = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(mobile)) {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.setAttribute('src', img || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
        var iframeCallback = function() {
            setTimeout(function() {
                iframe.removeEventListener('load', iframeCallback);
                document.body.removeChild(iframe);
            }, 0);
        };
        iframe.addEventListener('load', iframeCallback);
        document.body.appendChild(iframe);
    }
});
