<template>
    <div v-title="'确认分期'">
        <div class="bookingBox">
            <div class="mainBox">
                <div class="avatarBox">
                    <img :src="data.avatarId | nSrc(require('assets/imgs/avatar.png'))"/>
                </div>
                <div class="editBox">
                    <div class="textCell" layout="row" layout-align="start start">
                        <div class="">客户信息&emsp;</div>
                        <div flex class="color-gray">{{data.customerName}}</div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start start">
                        <div class="">开单门店&emsp;</div>
                        <div flex class="color-gray">{{data.storeName}}</div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start start">
                        <div class="">支付时间&emsp;</div>
                        <div flex class="color-gray">{{data.tradeDate}}</div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start start">
                        <div class="">购买商品&emsp;</div>
                        <div flex class="color-gray">{{data.productName}}</div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start start">
                        <div class="">收款金额&emsp;</div>
                        <div flex class="color-gray">{{data.totalFee | fen2yuan}}</div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start start">
                        <div class="">分期数&emsp;&emsp;</div>
                        <div flex class="color-gray">{{data.channelName}}</div>
                    </div>

                </div>

            </div>

            <div>
                <div v-if="state == 1">
                    <button @click="submit(1)" class="btn subBtn">确认分期授权</button>
                </div>
                <div v-else-if="state == 2">
                    <button class="btn color-gray">已确认</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import api_booking from 'services/api.booking';

    export default {
        name: '',
        data() {
            return {
                state: 1, // 1 编辑 2已确认
                orderNo: this.$route.params.orderNo,
                data: {}
            };
        },
        components: {},
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.$indicator.open();
                api_booking.queryTransferTradeDetail(this.orderNo).then(res => {
                    this.$indicator.close();
                    if (!res.success) {
                        this.$toast(res.message);
                        return;
                    }
                    this.data = res.data;
                    if (this.data.transfer) {
                        this.state = 2;
                    } else {
                        this.state = 1;
                    }
                });
            },
            submit() {
                this.$indicator.open();
                api_booking.submitTransferTrade({orderNo: this.orderNo}).then(res => {
                    this.$indicator.close();
                    this.init();
                });
            }
        }
    };
</script>
<style lang="less" scoped>
    @import '~styles/_style';

    @color-link: #7386b6;
    .bookingBox {
        min-height: 100vh;
        padding: 60px 20px 0;
        background: @bg-gray;
        .dateBox {
            position: relative;
            .dateBoxCell {
                position: absolute;
                top: 12px;
                right: 0;
            }
            input {
                position: relative;
                z-index: 2;
            }
        }
        .avatarBox {
            position: absolute;
            top: 0;
            left: 50%;
            margin-top: -35px;
            margin-left: -35px;
            img {
                width: 70px;
                height: 70px;
                border-radius: 50%;
            }
        }
        .mainBox {
            background: #fff;
            border-radius: 2px;
            border: 1px solid @border-gay;
            padding: 4px;
            position: relative;
        }
        .editBtnBox {
            height: 32px;
        }
        .editBtn {
            background: @bg-gray;
            color: @color-link;
            .fs24;
            border-radius: 2px;
            padding: 4px 10px;
            display: inline-block;
        }

        .editBox {
            margin: 30px 10px 10px;
        }
        .textCell {
            padding: 10px 0;
            &:not(:first-child) {
                border-top: 1px solid @border-gay;
            }
        }
        .btn {
            width: 100%;
            border-radius: 2px;
            padding: 8px 0;
            margin-top: 15px;
            background: transparent;
        }
        .subBtn {
            color: #fff;
            background: @color-primary;
        }
    }

    .popup {
        height: 70%;
        width: 100%;
        .popup-box {

        }
    }
</style>
