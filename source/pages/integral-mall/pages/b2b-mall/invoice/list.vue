<template>
    <div class="b2b-mall-invoice-list" v-title="'发票管理'">
        <div layout="row" class="card-item">
            <div flex>新增管理</div>
            <div @click="goEdit()" class="color-primary"><m-icon link="icon-jia"></m-icon> 新增发票</div>
        </div>
        <div>
            <div @click="select(item)" v-for="item in dataList" :key="item.id" class="invoice-item cell card-item m-b-3 bg-white" layout="row" layout-align="center center">
                <div flex>
                    <div>{{item.rise}}</div>
                    <div class="extra-light-black">{{item.taxpayerNumber}}</div>
                </div>
                <div @click.stop="goEdit(item.id)" class="border-left p-t-2 p-b-2 cell-box extra-light-black">
                    <m-icon link="icon-bianji"></m-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api_b2bmall from 'services/api.b2bmall';
export default {
    name: 'list',
    data() {
        return {
            dataList: []
        };
    },
    mounted() {
        this.queryData();
    },
    methods: {
        async queryData() {
            this.$indicator.open();
            let res = await api_b2bmall.queryInvoice(this.$store.state.party.merchantId);
            this.$indicator.close();
            this.dataList = res.data.rows;
        },
        select(item) {
            this.$store.state.b2bMallInvoice = item;
            this.$router.back();
        },
        goEdit(id) {
            this.$router.push({
                name: 'b2b-mall-invoice-edit',
                params: {
                    id: id
                }
            });
        }
    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';
.b2b-mall-invoice-list{
    font-size: 13px;
    min-height: 100vh;
    background: @bg-gray;
    .card-item {
        padding: 20px 12px;
    }
}
</style>
