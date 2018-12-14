<template>
    <div class="good-recommended" :class="{'active':isShow}">
        <div class="top-bar" layout="row" layout-align="start center">
            <div flex></div>
            <div class="close" @click="close">
                    <m-icon link="icon-huabanfuben29"></m-icon>收起宝贝
            </div>
        </div>
        <div class="goods-list" layout="row" layout-align="start center">
            <div class="good-item" @click="goodsDetail" v-for="(item,index) in dataList" :key="index">
                <span>
                    <img :src="item.img" alt="">
                </span>
                <div class="text only-two-line">
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mIcon from 'components/m-icon';
import shopBuyNav from 'components/shop-buy-nav';
export default {
    data() {
        return {
            dataList: [
                {
                    name: 'Maxdonas新品邂逅特调持久淡香',
                    img: require('assets/imgs/shop/good-img-1.png')
                },
                {
                    name: '指甲油热销Maxdona5只装甲油',
                    img: require('assets/imgs/shop/good-img-2.png')
                },
                {
                    name: '新品热销Maxdona4色腮红胭脂...销...',
                    img: require('assets/imgs/shop/good-img-3.png')
                }
            ]
        };
    },
    components: {
        mIcon,
        shopBuyNav
    },
    methods: {
        close() {
            this.$emit('mClose');
        },
        goodsDetail() {
            this.$router.push('/goods-detail');
        }
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    }
};
</script>
<style lang="less">
.good-recommended{
    background: rgba(0,0,0,0.8);
    height: 215px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%);
    transition: all ease .4s;
    z-index: 10000;
    .top-bar{
        padding: 10px;
    }
    .close{
        font-size: 12px;
        color: white;
        .icon{
            font-size: 18px;
            margin-right: 5px;
        }
    }
    .goods-list{
        overflow-x: scroll;
        .good-item{
            margin: 0 8px;
            span{
                display: block;
                width: 110px;
                height: 110px;
                overflow: hidden;
                border-radius: 15px;
                margin-bottom: 10px;
                img{
                    width: 100%;
                    height: auto;;
                }
            }
            flex: none;
            .text{
                font-size: 12px;
                color: white;
                width: 110px;
                letter-spacing: 2px;
                line-height: 20px;
            }
        }
    }
}
.good-recommended.active{
     transform: translateY(0);
}
</style>
