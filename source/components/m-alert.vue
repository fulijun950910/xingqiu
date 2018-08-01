<template>
    <div v-show="visible" class="m-alert" v-cloak>
        <div class="relative" @click.stop="modalClick" ref="modal" @touchmove="touchmoveHandle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'm-alert',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        };
    },
    watch: {
        visible(val) {
            if (val) {
                document.body.style.overflowY = 'hidden';
            } else {
                this.$emit('close');
                document.body.style.overflowY = 'auto';
            }
        }
    },
    mounted() {
    },
    methods: {
        show() {
            this.$emit('update:visible', true);
        },
        modalClick() {
            this.$emit('modal-click');
        },
        touchmoveHandle(event) {
            event.preventDefault();
        }
    }
};
</script>

<style lang="less">
.m-alert {
    font-size: 14px;
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    background-color: fade(black, 50%);
    .relative {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
}
</style>
