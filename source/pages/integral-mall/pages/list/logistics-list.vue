<template>
    <div class="logistics-list m-l-4 m-r-4 m-t-4" v-title="'查看物流'">
        <div v-if="data.data && data.data.length > 0">
            <div class="fs24 color-gray logisticsInfo" layout="row" layout-align="start center">
                <div class="m-r-2"><img :src="null | mSrc2(require('assets/imgs/nullimg.jpg'))" alt=""></div>
                <div>
                    <div >物流公司：{{expInfo.expressName}}</div>
                    <div>物流单号：{{data.nu}}</div>
                    <!--<div>物流电话：12345</div>-->
                </div>
            </div>
            <div class="logistics-box m-t-4" >
                <div class="fs32 fwb m-b-4">物流状态</div>
                <div v-for="(item,index) in data.data" :key="index" class="logisticsItem" layout="row" layout-align="start stretch">
                    <div class="left m-l-5 m-r-5"><m-icon :class="{'color-green':index==0,'color-gray':index!=0}" class="icon " link="icon-webicon318"></m-icon></div>
                    <div flex class="border-top color-gray p-t-1 p-b-1">
                        <div>{{item.context}}</div>
                        <div class="fs22">{{item.time}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!data.data || data.data.length <= 0" class="text-center">
            ：( 该单号暂无物流进展，请稍后再试。
        </div>

    </div>
</template>

<script>
import apiPromotion from 'services/api.promotion';
import api_b2bmall from 'services/api.b2bmall';
export default {
    name: 'logistics-list',
    props: ['orderId', 'campanyCode'],
    data() {
        return {
            expInfo: {},
            data: {}
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        async loadData() {
            this.$indicator.open();
            let res;
            if (this.campanyCode) {
                let queryData = {
                    expressCode: this.campanyCode,
                    expressNo: this.orderId
                };
                res = await api_b2bmall.queryExpress(queryData);
            } else {
                let queryData = {
                    b2bOrderId: this.orderId
                };
                res = await apiPromotion.getOrderExpressDetail(queryData);
            }
            this.$indicator.close();
            this.data = JSON.parse(res.data);
            if (this.data.com) {
                let res = await apiPromotion.getExpressByCode(this.data.com);
                this.expInfo = res.data;
            }
        }

    }
};
</script>

<style scoped lang='less'>
    @import '~styles/_style';

    .logistics-list{
        min-height:100vh;
        background:@white;
        .logisticsInfo{
            img{
                width: 60px;
                height: 60px;
                display: block;
            }
        }
        .border-top {
            border-top: 1px solid @border-gay;
        }
        .color-green {
            color: @color-success;
        }
        .logistics-box{
            border:1px solid @border-gay;
            box-shadow: 0 2px 17px 0 rgba(44, 45, 51, 0.11);
            margin-bottom: 20px;
            border-radius: 7px;
            padding: 10px;
        }
        .logisticsItem{
            padding-right: @l16;
            .left{
                border-left:1px solid @border-gay;
                position:relative;
                .icon{
                    position:absolute;
                    left:-0.5em;
                    top:5px;
                }
            }
        }
    }
</style>
