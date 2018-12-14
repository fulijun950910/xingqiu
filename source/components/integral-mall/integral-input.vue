<template>
    <div class="integral-input" layout="row" layout-align="center center">
        <span @click="changeNumber(2)" class="fs24 color-black">
            <m-icon xlink="icon-jian"></m-icon>
        </span>
        <input class="text-center fs24" type="number" min="0" inputmode="numeric" pattern="[0-9]*" title="Non-negative integral number" v-model="num" @change="changeQuality(num)">
        <span @click="changeNumber(1)" class="color-black fs24">
            <m-icon xlink="icon-jia"></m-icon>
        </span>
    </div>
</template>
<script>
import mIcon from 'components/m-icon';
export default {
    data() {
        return {
            num: 1
        };
    },
    methods: {
        changeNumber(type) {
            if (type == 1) {
                // 加
                this.num++;
            } else if (type == 2) {
                // 减
                if (this.num < 0) {
                    return;
                };
                this.num--;
            };
            this.$emit('numOut', this.num);
        },
        changeQuality(num) {
            this.$emit('changeAmount', num);
        }
    },
    components: {
        mIcon
    },
    mounted() {}
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.integral-input{
    width: 92px;
    height: 30px;
    border-radius: 7px;
    background: #f9f9f9;
    input{
        width: 40px;
    }
}
</style>
