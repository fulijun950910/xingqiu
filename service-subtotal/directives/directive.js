import Vue from 'vue';

Vue.directive('image-404', {
    bind: function(el, binding, vnode) {
        var notFoundCount = 0;
        if (!el.attributes.src) {
            changeSCR();
        }
        el.onerror = changeSCR;

        function changeSCR() {
            var newIamgeUrl = binding.value;
            if (notFoundCount >= 3 || !newIamgeUrl) {
                newIamgeUrl = getDefaultImagePlaceholder();
            }
            el.setAttribute('src', newIamgeUrl);
            notFoundCount++;
        }

        function getDefaultImagePlaceholder() {
            var width = el.offsetWidth || 120;
            var height = el.offsetHeight || 120;
            var protocol = window.location.href.split('://').shift();
            if (!protocol) protocol = 'http';
            return protocol + '://dummyimage.com/' + width + 'x' + height;
        }
    },
    componentUpdated: function() {

    }
});

Vue.directive('title', {
    inserted: function(el, binding) {
        document.title = binding.value;
    }
});
