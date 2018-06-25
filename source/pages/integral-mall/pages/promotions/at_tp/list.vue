<template>
    <div class="tp-list" v-title="$store.state.at_tp.title">
        <div class="tabBar bg-white text-center" layout="row" layout-align="space-between center">
            <div @click="itemClick(0)" flex="33"><div :class="{'act': selected == 0}" class="tabBarItem cell">全部团</div></div>
            <div @click="itemClick(3)" flex="33"><div :class="{'act': selected == 3}" class="tabBarItem cell">团满啦</div></div>
            <div @click="itemClick(1)" flex="33"><div :class="{'act': selected == 1}" class="tabBarItem cell">团ING</div></div>
        </div>
        <div class="main cell-box">
            <div @click="goPromotionDetail(item.id)" v-for="item in dataList" class="list-item cell cell-box" layout="row" layout-align="start center">
                <img class="img m-r-2" :src="item.captainAvatarId | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                <div flex>
                    <div>团长：{{item.captainName}}</div>
                    <div class="color-gray fs24">
                        {{item.status | getName(PROMOTION_TP_STATUS)}}
                        &nbsp;&nbsp;
                        <span class="color-orange">{{item.groupLevel}}</span>人团
                    </div>
                    <div class="color-gray"><span class="color-primary">￥{{item.sellingPrice | fen2yuan}}</span> <s>￥{{item.originalPrice | fen2yuan}}</s></div>
                </div>
                <div flex="25" class="text-center"  >
                    <div v-if="item.status == 1" layout="column" layout-align="space-between stretch">
                        <div><m-icon xlink="#icon-shalou"></m-icon>{{item.remainSecond | mTime}}</div>
                        <button class="goDetailBtn">来抱团</button>
                    </div>
                    <div v-else-if="item.status == 3" layout="column" layout-align="space-between stretch">
                        <m-icon class="success-icon color-primary" xlink="#icon-yueman"></m-icon>
                    </div>
                    <div v-else layout="column" layout-align="space-between stretch">
                        <span class="color-gray">已结束</span>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {
        PROMOTION_TP_STATUS
    } from 'config/mixins';
    import apiPromotion from 'services/api.promotion';
    import apiGetJSSignature from 'services/api.getJSSignature';

    export default {
        name: 'list',
        data() {
            return {
                selected: 0,
                PROMOTION_TP_STATUS: PROMOTION_TP_STATUS,
                dataList: []
            };
        },
        mounted() {
            this.loadData();
            this.dynamicTime();
            this.js_sdk();
        },
        methods: {
            itemClick(index) {
                this.selected = index;
                this.loadData();
            },
            goPromotionDetail(id) {
                this.$router.push(`/promotion-at-tp-detail/${this.$store.state.at_tp.promotionId}/${this.$store.state.at_tp.openid}/${id}`);
            },
            dynamicTime() {
                setTimeout(() => {
                    for (let i = 0; i < this.dataList.length; i++) {
                        if (this.dataList[i].remainSecond > 0) {
                            this.dataList[i].remainSecond -= 1;
                        }
                    }
                    this.dynamicTime();
                }, 1000);
            },
            js_sdk() {
                let _this = this;
                let share = {
                    title: _this.$store.state.at_tp.title,
                    desc: _this.$store.state.at_tp.desc,
                    link: _this.$store.state.at_tp.promotionAuthUrl,
                    imgUrl: window.location.origin + '/api/file/' + _this.$store.state.at_tp.imgUrl,
                    type: 'link',
                    dataUrl: '',
                    success: function() {
                    },
                    cancel: null
                };
                apiGetJSSignature.hideMenuItems();
                apiGetJSSignature.shareAppMessage(share);
            },
            async loadData() {
                let queryData = {
                    promotionInstanceId: this.$store.state.at_tp.promotionId,
                    page: 1,
                    size: 10000
                };
                if (this.selected > 0) {
                    queryData.status = this.selected;
                }
                this.$indicator.open();
                let { data } = await apiPromotion.getGroupJoinList(queryData);
                this.$indicator.close();
                this.dataList = data.rows;
            }
        }
    };
</script>

<style scoped lang='less'>
    @import '~styles/_style';
    .tp-list{
        min-height:100vh;
        background: @bg-gray;
        .color-orange{
            color:#EEA637;
        }
        .tabBar {
            position: fixed;
            width: 100%;
            top: 0;
            left:0;
            z-index: 5;
            border-bottom: 1px solid #D4D1D1;
            box-shadow: 0 0 5px 1px #D4D1D1;
            .tabBarItem{
                margin: 0 @l16;
                border-bottom:2px solid transparent;
                &.act{
                    color: @color-primary;
                    border-bottom:2px solid @color-primary;
                }
            }
        }
        .main{
            padding-top:50px;
            .list-item{
                margin-top: 5vw ;
                box-shadow: 3px 3px 4px #eaeaea;
                box-sizing: border-box;
                background: @white;
                border-radius: 2px;
                .img{
                    width: 55px;
                    height: 55px;
                    display:block;
                    border-radius: 50%;
                }
                .goDetailBtn{
                    background:transparent;
                    color: @color-primary;
                    border: 1px solid @color-primary;
                    margin-top:@l8;
                    border-radius: 4px;
                    padding:@l8 @l24;
                }
            }
            .success-icon{
                font-size: 72px;
            }
        }
    }
</style>
