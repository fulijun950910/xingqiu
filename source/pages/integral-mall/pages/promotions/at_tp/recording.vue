<template>
    <div class="tp-recording">
        <div @click="goDetail(item)" v-for="item in dataList" class="cell cell-box border-bottom" layout="row" >
            <div class="img" layout="row" layout-align="center cneter"><img :src="item.id | mSrc2(require('assets/imgs/nullimg.jpg'))" alt=""></div>
            <div flex layout="column" layout-align="space-between stretch">
                <div>
                    <div class="fs32">{{item.promotionName}}</div>
                    <div class="color-gray">{{item.status | getName(PROMOTION_TP_STATUS)}}&nbsp;&nbsp;<span class="color-orange">{{item.groupLevel}}</span>人团</div>
                </div>
                <div>
                    <span class="color-gray fs24">团号：</span>
                    <span class="color-primary">{{item.groupNo}}</span>
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
        name: 'recording',
        data() {
            return {
                dataList: [],
                PROMOTION_TP_STATUS: PROMOTION_TP_STATUS
            };
        },
        mounted() {
            this.loadData();
            this.js_sdk();
        },
        methods: {
            goDetail(item) {
                this.$router.push(`/promotion-at-tp-detail/${item.promotionInstanceId}/${this.$store.state.at_tp.openid}/${item.id}`);
            },
            async loadData() {
                let queryData = {
                    openid: this.$store.state.at_tp.openid
                };
                this.$indicator.open();
                let { data } = await apiPromotion.getMyGroupJoinList(queryData);
                this.$indicator.close();
                this.dataList = data.rows;
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
            }
        }
    };
</script>

<style scoped lang='less'>
    @import '~styles/_style';
    .tp-recording {
        .border-bottom{
            border-bottom:1px solid @border-gay;
        }
        .img{
            width:80px;
            height:80px;
            border-radius: 4px;
            margin-right:@l16;
            img{
                display:block;
                height: 100%;
                width: auto;
            }

        }
        .color-orange{
            color:#EEA637;
        }
    }
</style>
