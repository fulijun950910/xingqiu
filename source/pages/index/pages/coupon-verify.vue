<template>
    <div v-title="'验券'" class="coupon-verify">
        <!-- 查券-->
        <div v-if="state==1" class="state1">
            <div class="inputNav"  layout="row" layout-align="center center">
                <div class="inputBox" layout="row" layout-align="start center">
                    <div flex  @click="$refs.inputBtn.focus()" >
                        <input placeholder="请输入兑换券券号" ref="inputBtn" type="text" v-model="ticketNo"/>
                    </div>
                    <div @click="openQrcode">
                        <m-icon xlink="#icon-saoma"></m-icon>
                    </div>
                </div>
            </div>
            <div class="stat1Img">
                <img  :src="require('assets/imgs/184305655936072535.png')" alt="">
                <div class="text-center fs24 light-gray">请在上方输入框内查询券号!!</div>
            </div>
            <div class="queryBtnBox cell cell-box">
                <button :disabled="!ticketNo" @click="queryCoupon" class="couponBtn">查询</button>
            </div>
        </div>
        <!-- 查询成功-->
        <div v-else-if="state==2" class="containerBox">
            <div class="verifyTitle success" layout="column" layout-align="center center">
                <div>
                    <m-icon xlink="#icon-wsmp-complete"></m-icon>
                </div>
                <div class="fs32">查询成功</div>
                <div class="fs24 font-gray">是否消费此券？ </div>
            </div>
            <div class="couponBox">
                <div class="couponInfo cell" layout="row" layout-align="space-between center">
                    <div flex>
                        <p class="fs32">{{ ticketInfo.ticketName }}</p>
                        <p class="fs32">NO：<span class="coupon-no">{{ ticketInfo.ticketNo | couponNo }}</span></p>
                    </div>
                    <div class="stateBox stateBox1">
                        <p class="">未使用</p>
                    </div>
                </div>
                <div>
                    <div class="textCell" layout="row" layout-align="start center" @click="checkCell">
                        <div class="dark-gray" >选择门店:&nbsp;</div>
                        <div flex layout="row" layout-align="space-between center">
                            <div class="">{{storeId | getName(storeList) | sliceStr(28)}}</div>
                            <div>
                                <m-icon xlink="#icon-right-bold"></m-icon>
                            </div>
                        </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray" >活动名称:&nbsp;</div>
                        <div flex class="">{{ ticketInfo.promotionName }}</div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray" >客户信息:&nbsp;</div>
                        <div class="">{{ ticketInfo.memberName }} {{ ticketInfo.mobile }}</div>
                        <div v-if="ticketInfo.groupRole=='CAPTAIN'" class="font-yellow">&nbsp;<sup>团长</sup></div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">开始时间:&nbsp;</div>
                        <div flex class=""> {{ ticketInfo.startDate }} </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">结束时间:&nbsp;</div>
                        <div flex class=""> {{ ticketInfo.endDate }} </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">来源:&nbsp;</div>
                        <div flex class=""> {{ ticketInfo.kind + '-'+ ticketInfo.source| getName(COUNON_KIND) }} </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">操作人:&nbsp;</div>
                        <div flex class="">{{ ticketInfo.operatorName }}</div>
                    </div>
                </div>
            </div>
            <p class="fs24 font-gray-darken cell" layout="row" layout-align="center center">点击“确认消费”使用此券。</p>
            <div class="cell-box cell">
                <button class="couponBtn" @click="verifyCoupon">确认消费</button>
            </div>
            <popup-right v-model="showView">
                <popup-right-list  :options="storeList"  title="门店"  v-model="storeId"></popup-right-list>
            </popup-right>
        </div>
        <!-- 消费成功-->
        <div v-else-if="state==3" class="containerBox">
            <div class="verifyTitle success" layout="column" layout-align="center center">
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-wsmp-complete"></use>
                    </svg>
                </div>
                <div class="fs32">验券成功</div>
            </div>
            <div class="couponBox">
                <div class="couponInfo cell" layout="row" layout-align="space-between center">
                    <div flex>
                        <p class="fs32">{{ ticketInfo.ticketName }}</p>
                        <p class="fs32">NO：<span class="coupon-no">{{ ticketInfo.ticketNo | couponNo }}</span></p>
                    </div>
                    <div class="stateBox stateBox1">
                        <p class="">已使用</p>
                    </div>
                </div>
                <div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">验券门店:&nbsp;</div>
                        <div flex class="">{{storeId | getName(storeList)}}</div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray" >活动名称:&nbsp;</div>
                        <div flex class="">{{ ticketInfo.promotionName }}</div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray" >客户信息:&nbsp;</div>
                        <div class="">{{ ticketInfo.memberName }} {{ ticketInfo.mobile }}</div>
                        <div v-if="ticketInfo.groupRole=='CAPTAIN'" class="font-yellow">&nbsp;<sup>团长</sup></div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">开始时间:&nbsp;</div>
                        <div flex class=""> {{ ticketInfo.startDate }} </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">结束时间:&nbsp;</div>
                        <div flex class=""> {{ ticketInfo.endDate }} </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">来源:&nbsp;</div>
                        <div flex class=""> {{ ticketInfo.kind + '-'+ ticketInfo.source| getName(COUNON_KIND) }} </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">操作人:&nbsp;</div>
                        <div flex class="">{{ ticketInfo.operatorName }}</div>
                    </div>
                </div>
            </div>
            <p class="fs24 font-gray-darken cell" layout="row" layout-align="center center">您可以点击"再验一张",使用其他券。</p>
            <div class="cell-box cell">
                <button  @click="state=1" class="couponBtn">再验一张</button>
            </div>
        </div>
        <!-- 消费失败-->
        <div v-else-if="state==4 || state==8" class="containerBox">
            <div class="verifyTitle danger" layout="column" layout-align="center center">
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-cuowu"></use>
                    </svg>
                </div>
                <div class="fs32" v-if="state==4">
                    哎呀，这张券已经使用喽~
                </div>
                <div class="fs32" v-else>
                    哎呀，这张券已经退款喽~
                </div>
            </div>
            <div class="couponBox">
                <div class="couponInfo cell" layout="row" layout-align="space-between center">
                    <div flex>
                        <p class="fs32">{{ ticketInfo.ticketName }}</p>
                        <p class="fs32">NO：<span class="coupon-no">{{ ticketInfo.ticketNo | couponNo }}</span></p>
                    </div>
                    <div class="stateBox stateBox2">
                        <p class="" v-if="state==4">已使用</p>
                        <p class="" v-else>已退款</p>
                    </div>
                </div>
                <div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">活动名称:&nbsp;</div>
                        <div flex class="">{{ ticketInfo.promotionName }}</div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray" >客户信息:&nbsp;</div>
                        <div class="">{{ ticketInfo.memberName }} {{ ticketInfo.mobile }}</div>
                        <div v-if="ticketInfo.groupRole=='CAPTAIN'" class="font-yellow">&nbsp;<sup>团长</sup></div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">开始时间:&nbsp;</div>
                        <div flex class=""> {{ ticketInfo.startDate }} </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">结束时间:&nbsp;</div>
                        <div flex class=""> {{ ticketInfo.endDate }} </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">来源:&nbsp;</div>
                        <div flex class=""> {{ ticketInfo.kind + '-'+ ticketInfo.source| getName(COUNON_KIND) }} </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">操作人:&nbsp;</div>
                        <div flex class="">{{ ticketInfo.operatorName }}</div>
                    </div>
                </div>
            </div>
            <p class="fs24 font-gray-darken cell" layout="row" layout-align="center center">点击“换券重验”试试别的券。</p>
            <div class="cell-box cell">
                <button @click="resetTicketNo" class="couponBtn">换券重验</button>
            </div>

        </div>
        <!-- 券未到使用日期期 -->
        <div v-else-if="state==6" class="containerBox">
            <div class="verifyTitle danger" layout="column" layout-align="center center">
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-cuowu"></use>
                    </svg>
                </div>
                <div class="fs32">
                    哎呀，这张券还未到使用日期
                </div>
            </div>
            <div class="couponBox">
                <div class="couponInfo cell" layout="row" layout-align="space-between center">
                    <div flex>
                        <p class="fs32">{{ ticketInfo.ticketName }}</p>
                        <p class="fs32">NO：<span class="coupon-no">{{ ticketInfo.ticketNo | couponNo }}</span></p>
                    </div>
                    <div class="stateBox stateBox1">
                        <p class="">未使用</p>
                    </div>
                </div>
                <div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">活动名称:&nbsp;</div>
                        <div flex class="">{{ ticketInfo.promotionName }}</div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray" >客户信息:&nbsp;</div>
                        <div class="">{{ ticketInfo.memberName }} {{ ticketInfo.mobile }}</div>
                        <div v-if="ticketInfo.groupRole=='CAPTAIN'" class="font-yellow">&nbsp;<sup>团长</sup></div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">开始时间:&nbsp;</div>
                        <div flex class=""> {{ ticketInfo.startDate }} </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">结束时间:&nbsp;</div>
                        <div flex class=""> {{ ticketInfo.endDate }} </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">来源:&nbsp;</div>
                        <div flex class=""> {{ ticketInfo.kind + '-'+ ticketInfo.source| getName(COUNON_KIND) }} </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">操作人:&nbsp;</div>
                        <div flex class="">{{ ticketInfo.operatorName }}</div>
                    </div>
                </div>
            </div>
            <p class="fs24 font-gray-darken cell" layout="row" layout-align="center center">点击“换券重验”试试别的券。</p>
            <div class="cell-box cell">
                <button @click="resetTicketNo" class="couponBtn">换券重验</button>
            </div>

        </div>
        <!-- 券过期 -->
        <div v-else-if="state==7" class="containerBox">
            <div class="verifyTitle danger" layout="column" layout-align="center center">
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-cuowu"></use>
                    </svg>
                </div>
                <div class="fs32">
                    哎呀，这张券已经过期喽~
                </div>
            </div>
            <div class="couponBox">
                <div class="couponInfo cell" layout="row" layout-align="space-between center">
                    <div flex>
                        <p class="fs32">{{ ticketInfo.ticketName }}</p>
                        <p class="fs32">NO：<span class="coupon-no">{{ ticketInfo.ticketNo | couponNo }}</span></p>
                    </div>
                    <div class="stateBox stateBox2">
                        <p class="">已过期</p>
                    </div>
                </div>
                <div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">活动名称:&nbsp;</div>
                        <div flex class="">{{ ticketInfo.promotionName }}</div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray" >客户信息:&nbsp;</div>
                        <div class="">{{ ticketInfo.memberName }} {{ ticketInfo.mobile }}</div>
                        <div v-if="ticketInfo.groupRole=='CAPTAIN'" class="font-yellow">&nbsp;<sup>团长</sup></div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">开始时间:&nbsp;</div>
                        <div flex class=""> {{ ticketInfo.startDate }} </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">结束时间:&nbsp;</div>
                        <div flex class=""> {{ ticketInfo.endDate }} </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">来源:&nbsp;</div>
                        <div flex class=""> {{ ticketInfo.kind + '-'+ ticketInfo.source| getName(COUNON_KIND) }} </div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start center">
                        <div class="dark-gray">操作人:&nbsp;</div>
                        <div flex class="">{{ ticketInfo.operatorName }}</div>
                    </div>
                </div>
            </div>
            <p class="fs24 font-gray-darken cell" layout="row" layout-align="center center">点击“换券重验”试试别的券。</p>
            <div class="cell-box cell">
                <button @click="resetTicketNo" class="couponBtn">换券重验</button>
            </div>

        </div>

        <!-- 查询失败-->
        <div v-else-if="state==5" class="containerBox">
            <div class="verifyTitle danger" layout="column" layout-align="center center">
                <div>
                    <m-icon xlink="#icon-cuowu"></m-icon>
                </div>
                <div class="fs32">查询失败</div>
                <div class="fs24 font-gray">此券无效或输入错误 </div>
            </div>
            <div class="stat5Img">
            </div>
            <div class="cell-box cell">
                <button @click="resetTicketNo" class="couponBtn">换券重验</button>
            </div>
        </div>

    </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
import fixedButton from 'components/fixed-submit-btn';
import apiTicket from 'services/api.couponVerify.js';
import popupRight from 'components/popup-right';
import popupRightList from 'components/popup-right-list';
import api_getJSSignature from 'services/api.getJSSignature';
import { COUNON_KIND } from 'config/mixins';

export default {
    name: '',
    data() {
        return {
            COUNON_KIND: COUNON_KIND,
            merchantId: this.$store.getters.merchantId,
            storeId: this.$store.getters.storeId,
            storeList: [],
            showView: false,
            state: 1, // 验券状态 1输入 2查询成功 3验券成功 4 验券失败 5查询失败 6未到时间 7 券过期 8已退款
            ticketNo: this.$route.params.couponNo,
            ticketInfo: {
                id: null,
                groupRole: null,
                ticketName: null,
                memberName: null,
                promotionName: null,
                mobile: null,
                status: null,
                ticketNo: null,
                operatorId: null,
                operatorNo: null,
                operatorName: null,
                startDate: null,
                endDate: null
            }
        };
    },
    components: {
        'popup-right': popupRight,
        'fixed-button': fixedButton,
        'popup-right-list': popupRightList
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (this.ticketNo != null && this.ticketNo != 0) {
                this.queryCoupon();
            };
        },
        resetTicketNo() {
            this.state = 1;
            this.ticketNo = '';
        },
        checkCell() {
            this.showView = true;
        },
        openQrcode() {
            let data = {
                url: encodeURIComponent(window.location.href.split('#')[0])
            };
            Indicator.open();
            api_getJSSignature.getJSSignature(data).then(res => {
                Indicator.close();
                api_getJSSignature.scanQRCode();
            });
        },
        initStoreData(storeStr) {
            if (!storeStr) { return; }
            let localStoreList = this.$store.state.storeList;
            if (!localStoreList) { return; }
            let storeList = storeStr.split(',');
            this.storeList = [];
            storeList.forEach((item) => {
                let store = localStoreList.find(function(value) { return value.id == item; });
                if (store) {
                    this.storeList.push({
                        name: store.name,
                        value: store.id
                    });
                }
            });
        },
        queryCoupon() {
            if (!this.ticketNo) {
                Toast('请输入客户的券号');
                return;
            }
            let merchantId = this.merchantId; // window.localStorage.employee.merchantId;
            let data = {
                merchantId: merchantId,
                ticketNo: this.ticketNo
            };
            Indicator.open();
            // 查询券使用状态
            apiTicket.queryCoupon(data).then(results => {
                Indicator.close();
                this.ticketInfo.ticketNo = this.ticketNo;
                this.ticketInfo.groupRole = results.data.groupRole;
                this.ticketInfo.id = results.data.id;
                this.ticketInfo.promotionName = results.data.promotionName;
                this.ticketInfo.memberName = results.data.memberName;
                this.ticketInfo.mobile = results.data.mobile;
                this.ticketInfo.ticketName = results.data.ticketName;
                this.ticketInfo.status = results.data.status;
                this.ticketInfo.kind = results.data.kind;
                this.ticketInfo.source = results.data.source;
                // operatorName获取系统操作人
                this.ticketInfo.operatorName = this.$store.state.user.name;
                this.ticketInfo.startDate = results.data.startDate;
                this.ticketInfo.endDate = results.data.endDate;
                if (results.data.status == 1) {
                    this.state = 2;
                    this.initStoreData(results.data.storeIds);
                } else if (results.data.status == 4) {
                    this.state = 4;
                } else if (results.data.status == 31) {
                    this.state = 6;
                } else if (results.data.status == 32 || results.data.status == 3) {
                    this.state = 7;
                } else if (results.data.status == 5) {
                    this.state = 8;
                } else {
                    this.state = 5;
                }
            }, error => {
                Indicator.close();
                this.state = 5;
            });
        },
        verifyDelayCoupon() {
            this.$messageBox.confirm('确认延期验券？').then(action => {
                Indicator.open();
                apiTicket.couponDelay(this.ticketInfo.id).then(results => {
                    Indicator.close();
                    this.ticketInfo.endDate = '永久有效';
                    this.verifyCoupon();
                }, error => {
                    Indicator.close();
                    // 验券失败
                    if (error.code == '080009') {
                    } else {
                        this.state = 4;
                    }
                });
            }, action => {});
        },
        verifyCoupon() {
            let merchantId = this.merchantId; // window.localStorage.employee.merchantId;
            let storeId = this.storeId; // window.localStorage.employee.storeId;
            let data = {
                merchantId: merchantId,
                storeId: storeId,
                ticketNo: this.ticketInfo.ticketNo,
                operatorId: this.ticketInfo.operatorId,
                operatorNo: this.ticketInfo.operatorNo,
                operatorName: this.ticketInfo.operatorName
            };

            Indicator.open();
            apiTicket.verifyTicketInstance(data).then(results => {
                Indicator.close();
                // 验券成功
                this.state = 3;
                this.ticketNo = '';
            }, error => {
                Indicator.close();
                // 验券失败
                if (error.code == '080009') {
                } else {
                    this.state = 4;
                }
            });
        }
    },
    filters: {
        couponNo(val) {
            if (val && val.toString().length == 12) {
                return val.substr(0, 4) + ' ' + val.substr(4, 4) + ' ' + val.substr(8, 4);
            } else {
                return val;
            }
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
@inputFontSize: 14px;
@pink: #DF508B;
@color-blue:#73D0CC;
@color-blue-lighten:#F0FAFB;
@color-red:#DF508B;
@color-red-lighten:#FEEDF4;
@extra-yellow: #eea637; //黄色

.coupon-verify{
    .no-wrap {
        white-space: nowrap;
    }
    .font-gray{
        color:@dark-gray;
    }
    .font-yellow{
        color:@extra-yellow;
    }
    .font-gray-darken{
        color:@extra-light-gray;
    }
    .font-primary{
        color:@color-primary;
    }
    .state1{
        background:@white;
        min-height:100vh;
    }
    .inputNav{
        background: url(~assets/imgs/527827582130992805.jpg) no-repeat;
        background-size:100% 100%;
        height:90px;
        .inputBox{
            border-radius: 2px;
            width:90%;
            height:44px;
            margin:0 auto;
            .icon{
                font-size:30px;
                margin:0 @l8 0 @l24;
                color:#fff;
            }
            input{
                background:rgba(255,255,255,0.6);
                font-size:@inputFontSize;
                width:100%;
                height:34px;
                border-radius:2px;
                padding:5px;
                box-sizing:border-box;
            }
        }
    }
    .stat1Img{
        img{
            height:220px;
            margin-top:50px;
            width:auto;
            margin-left:auto;
            margin-right:auto;
            display: block;
        }
    }
    .stat5Img{
        img{
            height:350px;
            margin-top:50px;
            width:auto;
            margin-left:auto;
            margin-right:auto;
            display: block;
        }
    }
    .containerBox{
        min-height:100vh;
        background:@bg-gray;
    }
    .verifyTitle{
        padding: @l24 0;
        margin-bottom: @l24;
        background:@white;
        border-bottom:1px solid @border-gay;
        .icon{
            font-size:48px;
            margin:@l8;
        }
        &.success .icon{
            color:@color-blue;
        }
        &.danger .icon{
            color:@color-red;
        }
    }
    /* 券盒子  */
    .couponBox{
        background:@white;
        padding:0 @l24;
        border-top:1px solid @border-input;
        border-bottom:1px solid @border-input;
    }
    .couponInfo{
        line-height:1.2;
        .stateBox{
            text-align:center;
            color:@white;
            padding:@l8*2;
            border-radius: 4px;
        }
        .stateBox1{
            color:@color-blue;
            background:@color-blue-lighten;
        }
        .stateBox2{
            color:@color-red;
            background:@color-red-lighten;
        }
    }
    .queryBtnBox{
        position:fixed;
        width:100%;
        bottom:0;
        left:0;
    }
    .couponBtn{
        background:@pink;
        width:100%;
        border-radius: 4px;
        padding:8px 0;
        color:@white;
        font-size: @fs32;
    }
    .couponBtn[disabled]{
        background:@light-gray;
    }

    .subBtn{
        right:0;
        left:auto;
    }
    .textCell{
        padding:@l24 0;
        border-top:1px solid @border-gay;
    }
    /* 券盒子end  */
}
</style>
