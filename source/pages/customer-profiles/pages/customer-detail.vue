<template>
    <div class="customer-detail" v-if="dataModel">
        <!--顾客基本信息-->
        <div class="profiles background-cover">
            <!-- 头部名片 -->
            <div class="c-card" layout="row" layout-align="space-between end">
                <div class="c-card-content" layout="row" layout-align="space-between center">
                    <img :src="dataModel.avatarId|mSrc(90,90,require('assets/imgs/avatar.png'))" alt="">
                    <div>
                        <p class="c-card-title no-wrap">
                            {{dataModel.name || dataModel.nickName || '-'}}<span class="badge-vip ml8 ft-light"><m-icon xlink="#icon-huangguan"/> {{dataModel.grade}}</span>
                        </p>
                        <p class="c-card-subtitle no-wrap ft-light">
                            {{dataModel.mobile | mobile(true)}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="c-asset" layout="row" layout-align="space-around center">
                <div class="bdr text-center" flex>
                    <p class="ft16">{{dataModel.point}}</p>
                    <p class="light-gray">积分</p>
                </div>
                <div class="bdr text-center" flex>
                    <p class="ft16">{{dataModel.balance | integer | currency('￥', 0)}}<span class="ft12">.{{dataModel.balance | decimals}}</span></p>
                    <p class="light-gray">钱包</p>
                </div>
                <div class="text-center" flex>
                    <p class="ft16">{{dataModel.retainage | integer | currency('￥', 0)}}<span class="ft12">.{{dataModel.retainage | decimals}}</span></p>
                    <p class="light-gray">欠款</p>
                </div>
            </div>
        </div>

        <!--菜单-->
        <div class="record-tab" layout="row" layout-align="space-around center">
            <div :class="{active: tab.name==$route.name}" v-for="(tab, index) in childRoute" :key="index" @click="$router.replace(tab.name)">
                {{tab.label}}
            </div>
        </div>

        <!--顾客其他信息-->
        <div class="others">
            <transition :name="transitionName" mode="out-in">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>
<script>
import api_customerProfiles from 'services/api.customerProfiles';
export default {
    name: 'customer-detail',
    components: {},
    data() {
        return {
            transitionName: 'slide-right',
            childRoute: [
                { label: '账户资产', name: 'assets' },
                { label: '护理记录', name: 'record' },
                { label: '回访/关怀', name: 'service' },
                { label: '档案信息', name: 'intro' }
            ]
        };
    },
    watch: {
        '$route'(to, from) {
            const toLevel = to.meta.level;
            const fromLevel = from.meta.level;
            if (fromLevel < toLevel) {
                this.transitionName = 'slide-left';
            } else {
                this.transitionName = 'slide-right';
            }
        }
    },
    mounted() {
        this.fetchData();
    },
    computed: {
        dataModel() {
            return this.$store.state.customerDetail;
        }
    },
    methods: {
        fetchData() {
            this.$indicator.open();
            api_customerProfiles.memberDetail(this.$route.params.customerId).then(res => {
                this.$indicator.close();
                this.$store.commit('updateMemberInfo', res.data);
            }, err => {
                this.$indicator.close();
            });
        }
    },
    filters: {
        integer(val) {
            if (val) {
                return Math.floor(val / 100);
            } else {
                return '0';
            }
        },
        decimals(val) {
            if (val) {
                return (val / 100).toString().split('.')[1] || '00';
            } else {
                return '00';
            }
        }
    }
};
</script>
<style lang="less">
    @import '~styles/_agile.less';

    .customer-detail {
        background-color: @color-bg;
        min-height: 100vh;
        .ml8 {
            margin-left: 8px;
        }
        .mr8 {
            margin-right: 4px;
        }
        .ft12 {
            font-size: 12px;
        }
        .ft16 {
            font-size: 16px;
        }
        .badge-vip {
            font-size: 12px;
            padding: 2px 4px;
            background-color: @golden;
            border-radius: 2px;
        }
        // 顾客基本信息
        .profiles {
            color: white;
            background-image: url(~assets/imgs/profile-back.png);
            height: 160px;
            border-bottom: 1px solid #e4e4e4;
            .c-card {
                height: 90px;
                font-size: 14px;
                border-bottom: 1px solid #e4e4e4;
                .c-card-content{
                    img {
                        border: 1px solid white;
                        margin: 16px;
                        border-radius: 50%;
                        width: 60px;
                        height: 60px;
                    }
                    p {
                        height: 30px;
                        line-height: 30px;
                    }
                    .c-card-title {
                        font-size: 18px;
                    }
                    .c-card-subtitle {
                    }
                }
            }
            .c-asset {
                height: 70px;
                .bdr {
                    border-right: 1px solid #eee;
                }
            }
        }
        // 菜单
        .record-tab {
            height: 50px;
            background: #FFFFFF;
            box-shadow: 0 4px 4px 0 rgba(228,228,228,0.50);
            &>div {
                box-sizing: border-box;
                height: 50px;
                line-height: 50px;
                padding: 0 8px;
                border-bottom: 3px solid white;
            }
            .active {
                font-weight: bold;
                border-bottom: 3px solid @color-primary;
            }
        }
        // 顾客其他信息
        .others {

        }
    }
</style>
