<template>
    <div ref="qrcodeBox">
    </div>
</template>
<script>
/*
* url
* width
* height
*
* */
import QRCode from 'vendor/qrcode.js';
export default {
    name: '',
    data() {
        return {
        };
    },
    props: {
        config: {
            type: Object,
            default: function() {
                return {
                    width: 150,
                    height: 150
                };
            }
        },
        link: {
            type: String,
            default: ''
        },
        bg: {
            type: String,
            default: '#ffffff'
        },
        color: {
            type: String,
            default: '#000000'
        }
    },
    mounted() {
        this.qrcode();
    },
    methods: {
        qrcode() {
            if (this.link === '' || !this.link) {
                return;
            };
            var options = {
                render: 'canvas',
                width: this.config.width,
                height: this.config.height,
                typeNumber: -1,
                text: this.link,
                correctLevel: 2, // QRErrorCorrectLevel.H
                background: this.bg,
                foreground: this.color
            };

            var createCanvas = function() {
                var qrcode = new QRCode.QRCode(options.typeNumber, options.correctLevel);
                qrcode.addData(options.text);
                qrcode.make();

                var canvas = document.createElement('canvas');
                canvas.width = options.width;
                canvas.height = options.height;
                var ctx = canvas.getContext('2d');

                var tileW = options.width / qrcode.getModuleCount();
                var tileH = options.height / qrcode.getModuleCount();
                for (var row = 0; row < qrcode.getModuleCount(); row++) {
                    for (var col = 0; col < qrcode.getModuleCount(); col++) {
                        ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
                        var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
                        var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
                        ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h);
                    }
                }
                return canvas;
            };
            var img = window.document.createElement('img');
            img.src = createCanvas().toDataURL('jpg/image', 1);
            this.$refs.qrcodeBox.innerHTML = '';
            this.$refs.qrcodeBox.appendChild(img);
            return;
        }
    },
    watch: {
        link(newVal, oldVal) {
            this.qrcode();
        }
    }
};
</script>
<style lang='less'>

</style>
