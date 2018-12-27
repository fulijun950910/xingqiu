<template>
    <div class="b2b-mall-ticket-index">
        <div class="cell cell-box">
            <div class="total-box" layout="row" layout-align="start end">
                <div flex>
                    <div>待验券人数</div>
                    <div class="m-t-1"><span class="fwb fs52">{{$store.state.b2bMallData.verifyTicketNum}}</span> 人</div>
                </div>
                <div>
                    <button @click="gonVerityTicket" class="goVerifyTicketBtn">去验券</button>
                </div>
            </div>
        </div>
        <sellorderList></sellorderList>
    </div>
</template>

<script>
import sellorderList from './order-list/sell-detail';
export default {
    name: 'ticket-index',
    data() {
        return {
        };
    },
    components: {
        sellorderList
    },
    mounted() {
        if (this.$store.state.b2bMallData.verifyTicketNum || this.$store.state.b2bMallData.verifyTicketNum == 0) {
            this.loadData();
        } else {
            this.back();
        }
    },
    methods: {
    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';
@import 'b2b-mall-style';
.b2b-mall-ticket-index {
    font-size: 13px;
    min-height: 100vh;
    background: @bg-gray;
    .total-box {
        box-shadow:0px 4px 17px 0px rgba(75,110,150,0.11);
        border-radius:4px;
        background:@white;
        padding: 24px 20px;
        .plain1{
            padding: 8px;
        }
        .title-img{
            width: 34px;
            height:34px;
            border-radius: 2px;
        }
    }
    .goVerifyTicketBtn{
        background: @color-primary;
        border-radius: 2px;
        font-size: 14px;
        color: #fff;
        padding: 4px 16px;
        font-weight: bold;
    }
}
</style>
