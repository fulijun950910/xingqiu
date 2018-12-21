<template>
    <div class="detail-bottom" layout="row" layout-align="start center">
     <div class="tab text-center" @click="tabClick(item)" v-for="(item,index) in tabList" :key="index" layout="row" layout-align="center center">
         <m-icon :link="item.icon"></m-icon>
         <span>{{item.name}}
             <i class="text-center" v-if="item.more">100+</i>
         </span>
     </div>
    </div>
</template>
<script>
import mIcon from 'components/m-icon';
export default {
    data() {
        return {
            tabList: [
                {
                    name: '收藏',
                    icon: 'icon-huabanfuben',
                    more: false,
                    value: 1
                },
                {
                    name: '评论',
                    icon: 'icon-duanxin',
                    more: true,
                    value: 2
                },
                {
                    name: '集采活动',
                    icon: 'icon-jicai',
                    more: false,
                    value: 3
                }
            ]
        };
    },
    methods: {
        tabClick(item) {
            this.$emit('tabClick', item.value);
        }
    },
    components: {
        mIcon
    }
};
</script>
<style lang="less">
.detail-bottom{
    height: 50px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background: white;
    .tab{
        width: 33.33%;
        height: 100%;
        border-left: 1px solid #eee;
        color: #777;
        font-size: 14px;
        .icon{
            font-size: 16px;
            margin-right: 5px;
        }
        span{
            position: relative;
            i{
                height: 15px;
                display: block;
                background: #E65391;
                left: 100%;
                top:-9px;
                position: absolute;
                border-radius: 6px;
                width: 30px;
                font-size: 10px;
                color: white;
                font-style: normal;
            }
        }
    }
}
</style>
