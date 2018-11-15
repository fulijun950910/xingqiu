<template>
    <div class="member-detail"
         v-title="'客户详情'">
        <div class="serviceLogList"
             v-if="memberDetail.id">
            <div class="memberDetailBox">
                <div class="memberInfo Mbottom"
                     layout="row"
                     layout-align="start center">
                    <img class="memberImg"
                         :src="memberDetail.avatarId | mSrc(35, 35, require('assets/imgs/avatar.png'))">
                    <ul flex
                        style="margin-top:8px;list-style:none">
                        <li>
                            <div>
                                <strong>{{memberDetail.name}}</strong>&nbsp;
                                <span>{{ memberDetail.mobile }}</span>
                                <m-icon v-show="memberDetail.gender==1"
                                        class="ic"
                                        style="color:#4ed9cf"
                                        xlink="#icon-left-bold"></m-icon>
                                <m-icon v-show="memberDetail.gender==2"
                                        class="ic"
                                        style="color:#f7398f"
                                        xlink="#icon-left-bold"></m-icon>
                            </div>
                        </li>
                        <li>
                            <div class="storeIcon">
                                <m-icon class="ic"
                                        style="color:#d76eed"
                                        xlink="#icon-left-bold"></m-icon>&nbsp;
                                <span v-show="memberDetail.birthday"
                                      style="color:#9b9b9b">{{this.$moment(memberDetail.birthday).format('MM月DD日')}}</span>
                                <span v-show="!memberDetail.birthday"
                                      style="color:#9b9b9b">尚未设置生日日期</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="membrRemake Mbottom">
                    <p layout="row"
                       layout-align="start start">
                        <span class="font-gay">钱包余额 :&nbsp;</span>
                        <span style="color:#d76eed">{{memberDetail.balance | fen2yuan | currency('￥',2)}}</span>
                    </p>
                    <p layout="row"
                       layout-align="start start">
                        <span class="font-gay">持卡数量 :&nbsp;</span>
                        <span>{{ memberDetail.cardNum }}</span>
                    </p>
                    <p layout="row"
                       layout-align="start start">
                        <span class="font-gay">累计消费 :&nbsp;</span>
                        <span>{{ memberDetail.totalConsume | fen2yuan | currency('￥',2)}}</span>
                    </p>
                    <p layout="row"
                       layout-align="start start">
                        <span class="font-gay">入会时间 :&nbsp;</span>
                        <span>{{this.$moment(memberDetail.registerDate).format('YYYY年MM月DD日')}}</span>
                    </p>
                    <p layout="row"
                       layout-align="start start">
                        <span class="font-gay">会员等级 :&nbsp;</span>
                        <span v-show="memberDetail.grade">{{ memberDetail.grade }}</span>
                        <span v-show="!memberDetail.grade">尚未设置会员等级</span>

                    </p>
                    <p layout="row"
                       layout-align="start start">
                        <span class="font-gay">所属门店 :&nbsp;</span>
                        <span v-show="memberDetail.storeName">{{ memberDetail.storeName }}</span>
                        <span v-show="!memberDetail.storeName">尚未设置所属门店</span>
                    </p>
                </div>
                <div class="tagList Mbottom">
                    <p style="margin-bottom:4px;color: #9b9b9b;">个性化标签</p>
                    <ul class="memberTags">
                        <li :class="`li${index%6}`" v-for="(item,index) in memberDetail.tags"
                            :key="index">{{item.tagName}}</li>
                        <span v-show="memberDetail.tags.length<1">尚未添加个性化标签</span>
                    </ul>
                </div>
                <div class="serviceNote Mbottom">
                    <p class="font-gay"
                       style="margin-bottom:4px;font-size:14px">最近一次服务</p>
                    <p layout="row"
                       layout-align="start start">
                        <span class="font-gay">服务时间 :&nbsp;</span>
                        <span>{{ this.$moment(LastOrder.orderDate).format("YYYY-MM-DD HH:mm") }}</span>
                    </p>
                    <p layout="row"
                       layout-align="start start">
                        <span class="font-gay">服务人员 :&nbsp;</span>
                        <span v-show="LastOrder.employees">{{LastOrder.employees}}</span>
                        <span v-show="!LastOrder.employees">未指定服务人员</span>
                    </p>
                    <p layout="row"
                       layout-align="start start">
                        <span class="font-gay">服务项目 :&nbsp;</span>
                        <span v-for="(item3,index) in LastOrder.orderItems"
                              :key="index">{{item3.itemName}}</span>
                    </p>
                </div>
                <div class="rule Mbottom">
                    <p style="margin-bottom:4px;font-size:14px;color:#9b9b9b">其他注意事项或禁忌</p>
                    <p v-for="(item4,index) in memberDetail.taboos"
                       :key="index">{{index+1}}.&nbsp;{{item4.name}}</p>
                    <span v-show="memberDetail.taboos.length<1"
                          style="font-size:14px">尚未添加注意事项或禁忌</span>
                </div>
            </div>
        </div>
        <div class="serverceLogList"
             v-if="memberDetail.id">
            <div class="memberDetailBox" v-show="ServiceList.length>0" v-for="(item4,index) in ServiceList" :key="index">
                <div class="boxCell Mbottom">
                    <p style="margin-bottom:4px;font-size:14px;color:#9b9b9b">客情维护:</p>
                    <p layout="row"
                       layout-align="start start">
                        <span class="font-gay">服务时间 :&nbsp;</span>
                        <span>{{item4.recordTime}}</span>
                    </p>
                    <p layout="row"
                       layout-align="start start">
                        <span class="font-gay">服务人员 :&nbsp;</span>
                        <span>{{ item4.employeeName }}</span>
                    </p>
                </div>
                <p style="font-size:12px;margin-bottom:4px">{{ item4.content }}</p>
                <img style="width:100%" :src="item4.imageIds | mSrc(35, 35, require('assets/imgs/404.png'))">
            </div>
            <div style="margin:15px">
                <p style="text-align:center;color:#9b9b9b;font-size:13px" v-show="ServiceList.length<=0">已加载全部客情维护</p>
                <p style="text-align:center;color:#4ed9cf;font-size:13px" @click="this.getMemberServiceList" v-show="ServiceList.length>0">查看更多客情维护</p>
            </div>
        </div>

        <div style="height:58px"></div>
        <div class="breadCrumbs"
             layout="row"
             layout-align="space-around center"
             flex>
            <div layout="row"
                 @click="goback"
                 layout-align="center center"
                 flex=100>
                <m-icon class="ic"
                        xlink="#icon-left-bold"></m-icon>&nbsp;
                <p>返回</p>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import getMemberDetail from 'services/api.member';
import * as member from 'services/api.member2';
export default {
    name: 'member-detail',
    data() {
        return {
            memberDetail: {},
            LastOrder: {},
            ServiceList: [],
            params: {
                memberId: this.$route.params.memberId,
                merchantId: this.$store.getters.merchantId,
                page: 1,
                rows: 2
            }
        };
    },
    methods: {
        toNumber(val) {
            return Vue.filter('fen2yuan')(val).split('.');
        },
        getMemberLastOrder() {
            let data = this.$store.getters.merchantId;
            member.default.getMemberLastOrder(this.$route.params.memberId, data).then(res => {
                this.LastOrder = res.data;
            });
        },
        getMemberServiceList() {
            member.default.getMemberServiceList(this.params).then(res => {
                this.ServiceList = this.ServiceList.concat(res.data.rows);
                this.params.page++;
            }, erro => {
                console.log('error');
            }
            );
        },
        goback() {
            this.$router.go(-1);
        }
    },
    mounted() {
        this.$indicator.open('加载中...');
        getMemberDetail.getMemberDetail(this.$route.params.memberId).then(res => {
            this.$indicator.close();
            this.memberDetail = res.data;
            this.getMemberLastOrder();
            this.getMemberServiceList();
        });
    }
};
</script>

<style lang="less">
@import '~@/styles/_agile';

body,
html {
    width: 100%;
    height: 100%;
    background: #f4f4fc;
    font-size: 14px;
    ul {
        list-style: none;
    }
}
.member-detail {
    .Mbottom {
        margin-bottom: 15px !important;
        border-bottom: 1px solid #e5e5e5; /*no*/
        padding-bottom: 15px !important;
    }
    .memberDetailBox {
        position: relative;
        width: 96%;
        margin: 11px auto 0;
        background: @white;
        border-radius: 5px;
        box-shadow: 0 0 2vw #ddd;
        padding: 8px 11px;
        box-sizing: border-box;
        .memberInfo {
            padding: 8px;
            line-height: 24px;
            .memberImg {
                width: 60px;
                height: 60px;
                border-radius: 100%;
                margin-right: 8px;
            }
        }
        .membrRemake {
            font-size: 12px;
            line-height: 24px;
            .font-gay {
                color: #9b9b9b;
            }
        }
        .memberTags {
            li {
                display: inline-block;
                border: 1px solid; /*no*/
                padding: 0.75px 8px 0;
                margin: 4px 4px;
                font-size: 11px;
                line-height: 160%;
                border-radius: 2px;
            }
            .li0 {
                color: #00ca64;
                border-color: #00ca64;
                background: rgba(0, 202, 100, 0.04);
            }
            .li1 {
                color: #04cdc8;
                border-color: #04cdc8;
                background: rgba(4, 205, 200, 0.04);
            }
            .li2 {
                color: #009dc3;
                border-color: #009dc3;
                background: rgba(0, 157, 195, 0.04);
            }
            .li3 {
                color: #d76eed;
                border-color: #d76eed;
                background: rgba(215, 110, 237, 0.04);
            }
            .li4 {
                color: #d4af7b;
                border-color: #d4af7b;
                background: rgba(212, 175, 123, 0.04);
            }
            .li5 {
                color: #a16a48;
                border-color: #a16a48;
                background: rgba(161, 106, 70, 0.04);
            }
        }
        .serviceNote {
            font-size: 12px;
            line-height: 20px;
            .font-gay {
                color: #9b9b9b;
            }
        }
        .rule {
            line-height: 24px;
            font-size: 12px;
        }
        .font-gay {
            color: #9b9b9b;
        }
        .boxCell {
            font-size: 12px;
        }
    }
    .breadCrumbs {
        position: fixed;
        height: 56px;
        width: 100%;
        background: #f4f4fc;
        color: #4ed9cf;
        bottom: 0;
        border-top: 1px solid #eaeaea; /*no*/
        z-index: 6;
    }
}
</style>
