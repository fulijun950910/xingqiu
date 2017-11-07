<template>
    <div class="file-slice">
        <div v-show="state==1">
            <input class="path"  @change="imageChange" ref="path" accept="image/*" type="file">
        </div>
        <div v-show="state==2" ref="fileView" class="file-view" v-touch:move="move" v-touch:end="end" v-touch:scale="scale">
            <img class="file" ref="file" :src="url" alt="">
            <div class="imgView" ref="imgView">
                <div class="imgViewBox" ref="imgViewBox">
                    <svg class="icon exchange-proportion" aria-hidden="true" @click.stop="exchangeProportion">
                        <use xlink:href="#icon-exchange"></use>
                    </svg>
                    <img class="file" ref="file2" :src="url" alt="">
                </div>
            </div>
            <div layout="row" layout-align="space-between stretch" class="ctrl">
                <div class="back" flex="33" @click="back" layout="column" layout-align="center center">取消</div>
                <div class="rotate" @click="rotateChange" flex="33" layout="column" layout-align="center center">旋转</div>
                <div class="submit" flex="33" @click="submitFile" layout="column" layout-align="center center">确认</div>
            </div>
        </div>
    </div>

</template>
<script>
/*
 value{}
 config{
    size:1200 固定图片宽度  1200默认
    isSlice: true 判断图片是否符合比例，是否直接上传
 }此对象不传有默认，传时对象里的每个属性必须都传
 proportion:{w: 2,h: 1}长宽比
 quality 清晰度默认1
 immediatelyUpload：false 是否直接上传 false  ture
 屏幕旋转暂未调试
* */
import { Indicator } from 'mint-ui';
import sumitBtn from 'components/fixed-submit-btn';
export default {
    name: '',
    data() {
        return {
            state: 1, // 截图状态
            top: null, // 初始移动Y
            left: null, // 初始移动X
            url: null, // 图片地址
            img: new Image(),
            maxSize: 3, // 最大缩放比
            initViewWidth: 74 / 100, // 初始截取区宽度比例
            borderWidth: 1, // 截取区border
            view: {width: 0, height: 0}, // 屏幕
            fileSize: {width: 0, height: 0, top: 0, left: 0}, // 图片
            fileInitSize: {width: 0, height: 0}, // 图片初始大小
            filRealitySize: {width: 0, height: 0}, // 图片真实大小
            viewBox: {width: 0, height: 0, left: 0, top: 0}, // 截取区
            rotate: 0, // 旋转角度 0 1 2 3
            point1: null, // 触控点1
            point2: null // 触控点2
        };
    },
    props: {
        hasSlice: {
            type: Boolean,
            default: true
        },
        value: {
            type: Object
        },
        proportion: {
            type: Object,
            default: function() { // 比例
                return {w: 2, h: 1};
            }
        },
        quality: {
            type: Number,
            default: 0.98
        },
        immediatelyUpload: {
            type: Boolean,
            default: false
        },
        config: {
            type: Object,
            default: function() {
                return {
                    size: 1200,
                    isSlice: true
                };
            }
        }
    },
    components: {
        'sumit-btn': sumitBtn,
        [Indicator.name]: Indicator
    },
    beforeDestroy() {
        document.removeEventListener('touchmove', this.preventDefault, false);
        document.body.removeChild(this.$refs.fileView); // 退出销毁外置截取区域
    },
    mounted() {
        // 初始化value格式
        document.body.appendChild(this.$refs.fileView); // 外置截取区域
        this.currentValue.origin = {};
        this.$nextTick(function() {
            this.initViewSize();
        });
    },
    methods: {
        imageChange(evt) {
            // 加载文件
            let file = evt.target.files[0];
            if (!file) return;
            let url = URL.createObjectURL(file);
            this.currentValue.origin = file;
            // 渲染图片
            this.img.src = url;

            this.img.onload = ()=> {
                this.filRealitySize = {
                    width: this.img.width,
                    height: this.img.height
                };
                if (!this.hasSlice) {
                    this.$emit('update:proportion', {
                        w: this.filRealitySize.width,
                        h: this.filRealitySize.height
                    });
                }
                let showView = ()=> {
                    Indicator.open();
                    this.loadImg();
                    setTimeout(()=> {
                        Indicator.close();
                        this.state = 2;
                        this.$nextTick(function() {
                            this.file2SizePosition();
                        });
                    }, 800);
                };
                if (this.immediatelyUpload) {
                    this.uploadCanvas();
                } else {
                    if (this.config.isSlice && (this.filRealitySize.width / this.filRealitySize.height) == (this.proportion.w / this.proportion.h)) {
                        this.$messageBox.confirm('文件已符合规定尺寸，是否直接上传？').then(action => {
                            this.uploadCanvas();
                        }, action => {
                            showView();
                        });
                    } else {
                        showView();
                    };
                };
            };
        },
        loadImg() {
            let imgWidth = this.filRealitySize.width;
            if (imgWidth > this.config.size) {
                imgWidth = this.config.size;
            }
            let imgHeight = imgWidth * (this.filRealitySize.height / this.filRealitySize.width);
            // 解决兼容 ios
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            switch (this.rotate) {
                case 0:
                    canvas.setAttribute('width', imgWidth);
                    canvas.setAttribute('height', imgHeight);
                    ctx.drawImage(this.img, 0, 0, imgWidth, imgHeight);
                    break;
                case 1:
                    imgWidth += imgHeight;
                    imgHeight = imgWidth - imgHeight;
                    imgWidth = imgWidth - imgHeight;
                    canvas.setAttribute('width', imgWidth);
                    canvas.setAttribute('height', imgHeight);
                    ctx.translate(imgWidth, 0);
                    ctx.rotate(90 * Math.PI / 180);
                    ctx.drawImage(this.img, 0, 0, imgHeight, imgWidth);
                    break;
                case 2:
                    canvas.setAttribute('width', imgWidth);
                    canvas.setAttribute('height', imgHeight);
                    ctx.translate(imgWidth, imgHeight);
                    ctx.rotate(180 * Math.PI / 180);
                    ctx.drawImage(this.img, 0, 0, imgWidth, imgHeight);
                    break;
                case 3:
                    imgWidth += imgHeight;
                    imgHeight = imgWidth - imgHeight;
                    imgWidth = imgWidth - imgHeight;
                    canvas.setAttribute('width', imgWidth);
                    canvas.setAttribute('height', imgHeight);
                    ctx.translate(0, imgHeight);
                    ctx.rotate(270 * Math.PI / 180);
                    ctx.drawImage(this.img, 0, 0, imgHeight, imgWidth);
                    break;
            }
            this.url = canvas.toDataURL(this.currentValue.origin.type, this.quality);
            if ((imgWidth / imgHeight) >= (this.view.width / this.view.height)) { // 判断图片长宽比
                let _fileSize = {
                    width: this.view.width,
                    height: (imgHeight / imgWidth) * this.view.width
                };
                if (_fileSize.height < this.viewBox.height) { // 判断是否小于截取区
                    _fileSize.height = this.viewBox.height;
                    _fileSize.width = (imgWidth / imgHeight) * _fileSize.height;
                };
                this.fileSize.width = _fileSize.width;
                this.fileSize.height = _fileSize.height;
                this.fileSize.left = 0;
                this.fileSize.top = (this.view.height - this.fileSize.height) / 2;
            } else {
                let _fileSize = {
                    width: (imgWidth / imgHeight) * this.view.height,
                    height: this.view.height
                };
                if (_fileSize.width < this.viewBox.width) {
                    _fileSize.width = this.viewBox.width;
                    _fileSize.height = (imgHeight / imgWidth) * _fileSize.width;
                };
                this.fileSize.height = _fileSize.height;
                this.fileSize.width = _fileSize.width;
                this.fileSize.top = 0;
                this.fileSize.left = (this.view.width - this.fileSize.width) / 2;
            };
            this.fileInitSize = {
                width: this.fileSize.width,
                height: this.fileSize.height
            };
            this.fileSizePosition();
        },
        initViewSize() {
            this.view.width = document.documentElement.clientWidth;
            this.view.height = document.documentElement.clientHeight;
            // 屏幕
            this.$refs.fileView.style.width = this.view.width + 'px';
            this.$refs.fileView.style.height = this.view.height + 'px';
            // 主工作区
            this.$refs.imgView.style.width = this.view.width + 'px';
            this.$refs.imgView.style.height = this.view.height + 'px';
            // 视图区
            if (this.view.width * this.proportion.h / this.proportion.w < this.view.height) { // 判断宽高
                this.viewBox = {
                    width: Math.floor(this.view.width * this.initViewWidth),
                    height: Math.floor(this.view.width * this.initViewWidth * this.proportion.h / this.proportion.w)
                };
            } else {
                this.viewBox = {
                    width: Math.floor(this.view.height * this.initViewWidth * this.proportion.w / this.proportion.h),
                    height: Math.floor(this.view.height * this.initViewWidth)
                };
            };

            this.viewBox.left = Math.floor((this.view.width - this.viewBox.width) / 2);
            this.viewBox.top = Math.floor((this.view.height - this.viewBox.height) / 2);

            this.$refs.imgViewBox.style.width = this.viewBox.width + 'px';
            this.$refs.imgViewBox.style.height = this.viewBox.height + 'px';
            this.$refs.imgViewBox.style.top = this.viewBox.top + 'px';
            this.$refs.imgViewBox.style.left = this.viewBox.left + 'px';
        },
        fileSizePosition() {
            this.$refs.file.style.top = this.fileSize.top + 'px';
            this.$refs.file.style.left = this.fileSize.left + 'px';
            this.$refs.file.style.width = this.fileSize.width + 'px';
            this.$refs.file.style.height = this.fileSize.height + 'px';
            this.file2SizePosition();
        },
        file2SizePosition() {
            this.$refs.file2.style.top = this.$refs.file.offsetTop - (this.$refs.imgViewBox.offsetTop + this.borderWidth) + 'px';
            this.$refs.file2.style.left = this.$refs.file.offsetLeft - (this.$refs.imgViewBox.offsetLeft + this.borderWidth) + 'px';
            this.$refs.file2.style.width = this.$refs.file.offsetWidth + 'px';
            this.$refs.file2.style.height = this.$refs.file.offsetHeight + 'px';
        },
        setAttr(ele, attrs) { // 暂未用到
            if (!attrs && attrs.length < 1) {return;};
            // attrs.forEach((item, key)=>{
            //     console.log(item);
            //     console.log(key);
            // });
        },
        checkPosition() { // 缩放移动校验
            let sizeFlag = false;
            if (this.fileSize.top >= this.viewBox.top + this.borderWidth) { // top 校验
                this.fileSize.top = this.viewBox.top + this.borderWidth;
            } else if (this.fileSize.top + this.fileSize.height <= this.viewBox.top + this.viewBox.height + this.borderWidth) {
                this.fileSize.top = (this.viewBox.top + this.viewBox.height) - (this.fileSize.height) + this.borderWidth;
            };
            if (this.fileSize.left >= this.viewBox.left + this.borderWidth) { // left 校验
                this.fileSize.left = this.viewBox.left + this.borderWidth;
            } else if (this.fileSize.left + this.fileSize.width <= this.viewBox.left + this.viewBox.width + this.borderWidth) {
                this.fileSize.left = (this.viewBox.left + this.viewBox.width) - (this.fileSize.width) + this.borderWidth;
            };
            // 缩放大小校验
            if (this.fileSize.width <= this.viewBox.width) { // width 校验
                this.fileSize.width = this.viewBox.width;
                this.fileSize.height = this.fileInitSize.height / this.fileInitSize.width * this.fileSize.width;
            };
            if (this.fileSize.height <= this.viewBox.height) {
                this.fileSize.height = this.viewBox.height;
                this.fileSize.width = this.fileInitSize.width / this.fileInitSize.height * this.fileSize.height;
            };
            if (this.fileSize.width > this.fileInitSize.width * this.maxSize) {
                this.fileSize.width = this.fileInitSize.width * this.maxSize;
                this.fileSize.height = this.fileInitSize.height / this.fileInitSize.width * this.fileSize.width;
                sizeFlag = true;
            };
            if (this.fileSize.height > this.fileInitSize.height * this.maxSize) {
                this.fileSize.height = this.fileInitSize.height * this.maxSize;
                this.fileSize.width = this.fileInitSize.width / this.fileInitSize.height * this.fileSize.height;
                sizeFlag = true;
            };
            if (sizeFlag) {
                this.fileSize.left = this.$refs.file.offsetLeft; // 阻止移动
                this.fileSize.top = this.$refs.file.offsetTop;
            }
        },
        move(evt) {
            if (!this.top) {
            } else {
                this.fileSize.top = Math.floor(this.$refs.file.offsetTop + evt.touches[0].clientY - this.top);
                this.fileSize.left = Math.floor(this.$refs.file.offsetLeft + evt.touches[0].clientX - this.left);
                this.checkPosition();
                this.fileSizePosition();
            }
            this.top = evt.touches[0].clientY;
            this.left = evt.touches[0].clientX;
        },
        scale(evt) {
            if (this.point1) {
                let scale = this.distance(evt.touches);
                let oldSize = {
                    width: this.fileSize.width,
                    height: this.fileSize.height
                };
                let newSize = {
                    width: oldSize.width * scale,
                    height: oldSize.height * scale
                };
                this.fileSize.width = newSize.width;
                this.fileSize.height = newSize.height;
                this.fileSize.left = this.$refs.file.offsetLeft - ((newSize.width - oldSize.width) / 2);
                this.fileSize.top = this.$refs.file.offsetTop - ((newSize.height - oldSize.height) / 2);
                this.checkPosition();
                this.fileSizePosition();
            };
            this.point1 = JSON.stringify(evt.touches[0]).length < 3 ? evt.touches[0] : JSON.parse(JSON.stringify(evt.touches[0]));
            this.point2 = JSON.stringify(evt.touches[1]).length < 3 ? evt.touches[1] : JSON.parse(JSON.stringify(evt.touches[1]));
        },
        distance(touches) {
            let oldVal = Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) + Math.pow(touches[0].clientY - touches[1].clientY, 2));
            let newVal = Math.sqrt(Math.pow(this.point1.clientX - this.point2.clientX, 2) + Math.pow(this.point1.clientY - this.point2.clientY, 2));
            let scale = oldVal / newVal;
            return scale;
        },
        imgSizeScale() {
            let sizeScale;
            if ((this.viewBox.width / this.$refs.file.offsetWidth) * this.filRealitySize.width < this.config.size) {
                sizeScale = Number((((this.viewBox.width / this.$refs.file.offsetWidth) * this.filRealitySize.width) / this.viewBox.width).toFixed(15));
            } else {
                sizeScale = this.config.size / this.viewBox.width;
            };
            return sizeScale;
        },
        setCanvas() {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let sizeScale = this.imgSizeScale(); // 固定大小宽度比值
            canvas.setAttribute('width', (this.viewBox.width) * sizeScale);
            canvas.setAttribute('height', (this.viewBox.height) * sizeScale);
            ctx.drawImage(this.$refs.file, (this.$refs.file.offsetLeft - this.viewBox.left - this.borderWidth) * sizeScale, (this.$refs.file.offsetTop - this.viewBox.top - this.borderWidth) * sizeScale, this.$refs.file.offsetWidth * sizeScale, this.$refs.file.offsetHeight * sizeScale);
            // let base64 = canvas.toDataURL(this.currentValue.origin.type, this.quality);
            let base64 = canvas.toDataURL('image/jpeg', this.quality);
            this.$set(this.currentValue, 'base64', base64);
            // this.currentValue.content = base64.split(',')[1];    不需要
            this.currentValue.id = null;
            this.$emit('click', this.currentValue);
        },
        uploadCanvas() { // 不裁剪，直接上传
            let imgWidth = this.filRealitySize.width;
            if (imgWidth > this.config.size) {
                imgWidth = this.config.size;
            }
            let imgHeight = imgWidth * (this.filRealitySize.height / this.filRealitySize.width);
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            canvas.setAttribute('width', imgWidth);
            canvas.setAttribute('height', imgHeight);
            ctx.drawImage(this.img, 0, 0, imgWidth, imgHeight);
            // let _base64 = canvas.toDataURL(this.currentValue.origin.type, this.quality);
            let base64 = canvas.toDataURL('image/jpeg', this.quality);
            this.$set(this.currentValue, 'base64', base64);
            // this.currentValue.content = base64.split(',')[1]; 不需要
            this.currentValue.id = null;
            this.$emit('click', this.currentValue);
        },
        end() {
            this.top = null ;
            this.left = null ;
            this.point1 = null ;
            this.point2 = null ;
        },
        preventDefault(e) {
            e.preventDefault();
        },
        addEventDefault() {
            document.addEventListener('touchmove', this.preventDefault, false);
        },
        removeEventDefault() {
            document.removeEventListener('touchmove', this.preventDefault, false);
        },
        submitFile() {
            this.state = 1;
            this.$refs.path.value = null; // 重置选取文件
            this.setCanvas();
        },
        rotateChange() {
            this.rotate++;
            this.rotate %= 4;
            this.loadImg();
        },
        back() {
            this.state = 1;
            this.$refs.path.value = null; // 重置选取文件
        },
        exchangeProportion() {
            this.$emit('update:proportion', {
                w: this.proportion.h,
                h: this.proportion.w
            });
        }
    },
    watch: {
        state(newVal) {
            if (newVal === 2) {
                this.addEventDefault();
            } else {
                this.removeEventDefault();
            }
        },
        proportion: {
            handler(val) {
                this.initViewSize();
                this.loadImg();
            },
            deep: true
        }
    },
    computed: {
        currentValue: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }
};
</script>
<style lang="less">
@import '../styles/_agile';
    .file-view{
        position: fixed;
        top:0;
        left:0;
        z-index: 9999;
        background:rgba(0,0,0,0.9);
        .file{
            position:absolute;
            top:0;
            left:0;
            z-index:1
        }
        .imgView{
            position:absolute;
            top:0;
            left:0;
            z-index:2;
            background:rgba(0,0,0,0.4);
        }
        .imgViewBox{
            position:absolute;
            top:10px;
            left:10px;
            border:1px solid @white;
            overflow: hidden;
            .exchange-proportion {
                color: white;
                font-size: 28px;
                position: absolute;
                z-index: 3;
                right: 0;
                right: 0;
            }
        }
        canvas{
            position:absolute;
            top:0;
            left:0;
            z-index:4;
        }
        .back.fixed-sumbit-btn.primary{
            background:@light-gray;
        }
        .ctrl{
            div {
                border: 1px solid fade(white,10%);
                background:fade(white,10%);
            }
            position:absolute;
            bottom:0;
            left:0;
            z-index:5;
            width:100%;
            text-align:center;
            font-size: 16px;
            color:@white;
            height: 50px;
        }
    }
    input.path{
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
        left: 0;
        top: 0;
    }
</style>
