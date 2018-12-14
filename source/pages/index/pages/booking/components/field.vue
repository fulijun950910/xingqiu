<template>
    <div class="m-field-panel"
         layout="row"
         layout-align="start center">
        <m-icon v-if="icon"
                class="fs28 dark-gray"
                :link="icon"></m-icon>
        <input type="text"
               flex
               @change="$emit('change', currentValue)"
               :placeholder="placeholder"
               v-model="currentValue"
               @input="handleInput"
               class="mf-input">
    </div>
</template>
<script>
export default {
    name: 'm-field',
    props: {
        placeholder: String,
        icon: String,
        value: {}
    },
    components: {},
    computed: {},
    data() {
        return {
            currentValue: this.value
        };
    },
    mounted() {},
    methods: {
        handleInput(evt) {
            this.currentValue = evt.target.value;
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        },
        currentValue(val) {
            this.$emit('input', val);
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.m-field-panel {
    .icon {
        margin-left: 2px;
    }
    .mf-input {
        height: 44px;
        font-size: 13px;
        color: @color-black;
        padding: 0;
    }
    .icon + .mf-input {
        margin-left: 16px;
    }
    border-bottom: 1px solid @light-gray; /*no*/
}
</style>
