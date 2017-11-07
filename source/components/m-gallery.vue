<template>
    <div class="m-gallery native-image" v-show="show">
        <div class="native-image-box" layout="row" layout-align="center center">
            <img :style="{width, height}" :src="value | nSrc(require('assets/imgs/nullimg.jpg'))" @click.stop="eventStop($event)" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'm-gallery',
    props: {
        value: {
            type: String,
            default: null
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            height: 'auto',
            width: '100%'
        };
    },
    methods: {
        eventStop(event) {
            // this.height = this.height == '100vh' ? 'auto' : '100vh';
            // this.width = this.width == 'auto' ? '100vw' : 'auto';
            this.$emit('update:show', false);
            this.$emit('input', null);
            event.stopPropagation();
        }
    }
};
</script>
