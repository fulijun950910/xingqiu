<template>
    <div class="voucher" v-if="show">
        <div class="mask"></div>
        <div class="main">
             <div class="notice fs24 fwb color-white" layout="row" layout-align="center center">
                 已为您选择临近过期的抵用券
             </div>
             <div flex class="p-l-4 p-r-4">
             <div layout="row" class="p-t-3 p-b-3" layout-align="space-between center">
                 <div class="color-black fs24" layout="row" layout-align="center center">
                     <span class="fs40 fwb">优惠券</span>（共{{dalaList.length}}张可用）
                 </div>
                 <div>
                     <m-icon class="fs40" xlink="#icon-huabanfuben29"></m-icon>
                 </div>
             </div>
             <div class="data-list" flex>
                 <div class="box m-b-3" v-for="(item,index) in dalaList" :key="index" layout="row" layout-align="start stretch" :class="{'box-active' : item.status == 2}">
                     <div class="mask-box"></div>
                       <div flex="70">
                           <div class="p-t-4">
                               <div class="color-pink fs40">￥{{item.price | fen2yuan}}</div>
                               <div class="color-black fs40 fwb m-b-2">{{item.name}}</div>
                               <div>有效期至{{item.time}}</div>
                           </div>
                       </div>
                       <div layout="row" layout-align="center center" flex="30">
                           <m-icon class="border-gay fs48" xlink="#icon-gouxuanshixin"></m-icon>
                       </div>
                 </div>
             </div>
             </div>
        </div>
    </div>
</template>
<script>
    import mIcon from 'components/m-icon';
    import api_party from 'services/api.party';
    export default {
        props: {
            mwItem() {
                return {};
            },
            vocherShow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                dalaList: [{
                    price: 200,
                    name: '短信包抵用券',
                    time: '2018-07-23',
                    status: 2
                }],
                show: false
            };
        },
        methods: {
            getCouponList() {
                let parameter = {
                    merchantId: this.$store.state.party.merchantId,
                    partyId: this.$store.state.party.partyId,
                    userId: this.$store.state.party.id,
                    payDoudouAmount: this.mwItem.price * 10

                };
                api_party.getCouponList(parameter).then(msg=> {

                }, msg=> {

                });
            }

        },
        components: {
            mIcon
        },
        computed: {
            ShowMain: {
                get() {
                    return this.vocherShow;
                },
                set() {
                    return this.show;
                }
            }

        }
    };
</script>

<style lang="less" scoped>
@import '~styles/_style';
.voucher {
    position: relative;
    z-index: 10;
    .mask {
        position: fixed;
        background: rgba(0, 0, 0, .5);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
    .main {
        position: fixed;
        top: 71.5px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        background: white;
        overflow-y: scroll;
        overflow-x: hidden;
        .notice {
            height: 28px;
            background: @color-pink;
        }
        .data-list {
            .box {
                height: 118px;
                background: url("~assets/imgs/integral-mall/voucher-bg.png") no-repeat center;
                background-size: 100% 100%;
                padding: 0 0 0 70px;
                position: relative;
                .mask{
                    display: none;
                }
            }
            .box-active {
                .mask-box{
                    position: absolute;
                    left: 0;
                    right: 0;
                    top:0;
                    bottom: 0;
                    background: rgba(255,255,255,.8);
                    display: block;
                }
            }
        }
    }
}
</style>

