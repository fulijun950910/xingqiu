<template>
    <div class="voucher-list">
        <div class="swiper-con">
            <div class="swiper-item" v-for="(item,index) in dataList" :key="index">
                <div class="display-img">
                    <img class="img-auto" :src="item.image | nSrc(require('assets/imgs/female.png'))" alt="">
                </div>
                <div layout="row" layout-align="start start" class="title-img">
                    <div flex="80">
                <div class="fs40 fwb color-black">{{item.name}}</div>
                <p class="color-gray fs24">{{item.description}}</p>
                    </div>
                    <div flex="20" layout="row" layout-align="center center">
                        <span class="get-button fs30 color-white" layout="row" layout-align="center center" @click="buy">领取</span>
                    </div>
                </div>
            </div>
        </div>
        <div layout="row" layout-align="center center" class="rule-title">
            <span></span>
            <div class="fs24 extra-light-black">兑换规则</div>
            <span></span>
        </div>
        <div class="rules-list">
            <p class="fs24 color-gray"><span class="color-pink">·</span>100个美豆豆兑换一张入场券，每个账号最多可兑换一张。</p>
            <p class="fs24 color-gray"><span class="color-pink">·</span>兑换成功后入场码将以短信的形式发出</p>
            <p class="fs24 color-gray"><span class="color-pink">·</span>入场后请报入场码给到讲师，即完成兑换</p>
            <p class="fs24 color-gray"><span class="color-pink">·</span>此兑换由于商品特殊，不可退货，敬请原谅</p>
        </div>
        <integral-confirm :confirmText="confirm" @hideConfirm="hideConfirm"  @integraConfirm="inteconfirm"></integral-confirm>
    </div>
</template>
<script>
import api_party from 'services/api.party';
import integralConfirm from 'components/integral-mall/integral-confirm';
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            dataList: [],
            employee: JSON.parse(localStorage.getItem('employee')),
            confirm: {},
            personal: null,
            type: 1,
            chooseServiceItem: {},
            showBuy: false
        };
    },
    methods: {
        loadData() {
            api_party.goodsList(3).then(msg => {
                this.dataList = msg.data;
            }, msg => {

            });
        },
        init() {
            this.loadData();
            this.searchBalance();
        },
        inteconfirm(msg) {
            msg.then(data => {
                // 2豆豆足够
                if (this.type == 2) {
                    this.$router.push('/personal');
                } else if (this.type == 3) {
                    // 豆豆不足
                    this.$router.push('/recharge-doudou');
                };
            }, data => {
                this.confirm.show = false;
            });
        },
        buy() {
            this.chooseServiceItem = this.dataList[0];
            this.$router.push({
                name: 'pay-detail',
                params: {
                    itemId: this.chooseServiceItem.id
                }
            });
        },
        searchBalance() {
            Indicator.open('loading...');
            api_party.doudouAccount(this.employee.party.partyId).then(msg => {
                Indicator.close();
                this.personal = msg.data;
            }, msg => {});
        },
        hideConfirm() {
            this.confirm.show = false;
        },
        update() {
            this.showBuy = false;
        }
    },
    mounted() {
        this.init();
    },
    components: {
        integralConfirm
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.voucher-list{
    padding: 15px;
    .swiper-con{
        height: 425px;
        margin-bottom: 15px;
        .display-img{
            height: 330px;
            margin-bottom: 15px;
            overflow: hidden;
        }
        .swiper-item{
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 -9px 40px 0 rgba(0,0,0,0.10);
            padding-bottom: 20px;
            .get-button{
                width: 75px;
                height: 30px;
                background:linear-gradient(180deg,rgba(255,153,216,1),rgba(252,93,192,1),rgba(255,53,104,1));
                border-radius: 7px;
            }
        }
        .title-img{
            padding: 0 15px;
        }
    }
    .rule-title{
        div{
            margin: 0 10px;
        }
        span{
            display: block;
            height: 1px;
            width: 30%;
            background: @dark-gray;
        }
    }
    .rules-list{
        padding: 15px 0;
        span{
            display: inline-block;
            margin-right: 5px;
        }
        p{
            line-height: 200%;
        }
    }
}
</style>
