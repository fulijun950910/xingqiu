<template>
    <div class="b2b-mall-invoice-edit" v-title="'编辑发票'">
        <mt-field label="发票抬头" placeholder="请输入发票抬头" v-model="dataModel.rise"></mt-field>
        <mt-field label="纳税人识别号" placeholder="请输入纳税人识别号" v-model="dataModel.taxpayerNumber"></mt-field>
        <sumit-btn @click="submit">保存</sumit-btn>
    </div>
</template>

<script>
import Vue from 'vue';
import {
    Field,
    Cell
} from 'mint-ui';
import sumitBtn from 'components/fixed-submit-btn';
Vue.component(Field.name, Field);
Vue.component(Cell.name, Cell);

import api_b2bmall from 'services/api.b2bmall';

export default {
    name: 'edit',
    props: ['id'],
    data() {
        return {
            dataModel: {
                merchantId: this.$store.state.party.merchantId
            }
        };
    },
    components: {
        sumitBtn
    },
    mounted() {
        if (this.id) {
            this.queryData();
        }
    },
    methods: {
        async queryData() {
            this.$indicator.open();
            await api_b2bmall.queryInvoice(this.$store.state.party.merchantId);
            this.$indicator.close();
        },
        check() {
            if (!this.dataModel.rise) {
                this.$toast('请输入发票抬头');
                return true;
            }
            if (!this.dataModel.taxpayerNumber) {
                this.$toast('请输入纳税人识别号');
                return true;
            }
        },
        async submit() {
            if (this.check()) {
                return;
            }
            this.$indicator.open();
            await api_b2bmall.editInvoice(this.dataModel);
            this.$indicator.close();
            this.$router.replace({
                name: 'b2b-mall-invoice-list'
            });
        }
    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';
.b2b-mall-invoice-edit{
    font-size: 13px;
    min-height: 100vh;
    background: @bg-gray;
}
</style>
