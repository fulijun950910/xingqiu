<template>
    <div class="employee_echarts min-height-100"
         v-title="'业绩详情'">
        <div class="ed-card">
            <div class="ed-card-title"
                 layout="column"
                 layout-align="center center">
                <img class="e-avatar"
                :src="update.employeeAvatarId | mSrc(75, 75, require('assets/imgs/avatar.png'))" alt="头像">
                <p class="e-name">{{update.employeeName}}</p>
                <p class="e-no">NO:{{update.employeeNo}}</p>
            </div>
            <div class="ed-card-total"
                 layout="row"
                 layout-align="center center">
                <div class="ft-light"
                     flex="50"
                     layout="row"
                     layout-align="center center">
                    <m-icon class="ic"
                            xlink="#icon-yeji"></m-icon>
                    &nbsp;
                    <p>业绩：￥{{update.achievementAmount | fen2yuan}}</p>
                </div>
                <div class="ft-light"
                     flex="50"
                     layout="row"
                     layout-align="center center">
                    <m-icon class="ic"
                            xlink="#icon-rechange"></m-icon>
                    &nbsp;
                    <p>提成：￥{{update.commissionAmount | fen2yuan}}</p>
                </div>
            </div>
        </div>
        <div class="ed-info"
             layout="row"
             layout-align="center center">
            <div class="ed-performance"
                 flex="50"
                 layout="column"
                 layout-align="center center">
                <span class="triggle-down"></span>
                <p>售卡&nbsp;&nbsp;
                    <span>{{update.achievementSellCardsAmount | fen2yuan}}</span>
                </p>
                <p>产品&nbsp;&nbsp;
                    <span>{{update.achievementProductAmount | fen2yuan}}</span>
                </p>
                <p>项目&nbsp;&nbsp;
                    <span>{{update.achievementItemAmount | fen2yuan}}</span>
                </p>
                <p>充值&nbsp;&nbsp;
                    <span>{{update.achievementRechargeAmount | fen2yuan}}</span>
                </p>
                <p>其他&nbsp;&nbsp;
                    <span>{{update.achievementOtherAmount | fen2yuan}}</span>
                </p>
            </div>
            <div class="ed-payment"
                 flex="50"
                 layout="column"
                 layout-align="center center">
                <span class="triggle-down"></span>
                <p>售卡&nbsp;&nbsp;
                    <span>{{update.commissionSellCardsAmount | fen2yuan}}</span>
                </p>
                <p>产品&nbsp;&nbsp;
                    <span>{{update.achievementProductAmount | fen2yuan}}</span>
                </p>
                <p>项目&nbsp;&nbsp;
                    <span>{{update.commissionItemAmount | fen2yuan}}</span>
                </p>
                <p>充值&nbsp;&nbsp;
                    <span>{{update.commissionRechargeAmount | fen2yuan}}</span>
                </p>
                <p>其他&nbsp;&nbsp;
                    <span>{{update.commissionOtherAmount | fen2yuan}}</span>
                </p>
            </div>
        </div>
        <div class="ed-card-spend"
             layout="row"
             layout-align="space-between center">
            <span class="ed-card-spend-title"
                  layout="row"
                  layout-align="start center">
                <m-icon class="ic"
                        xlink="#icon-qia-"></m-icon>
                &nbsp;
                <p>卡耗分布</p>
            </span>
            <span>总数：{{update.cardConsumeTotal | fen2yuan}}</span>
        </div>
        <div class="ed-card-list">
            <div>
                <span class="color-blue">●</span>储值卡
                <span class="card-spend-money">{{update.depositCardAmount | fen2yuan}}</span>
            </div>
            <div>
                <span class="color-orange">●</span>疗养卡
                <span class="card-spend-money">{{update.itemCardAmount | fen2yuan}}</span>
            </div>
            <div>
                <span class="color-green">●</span>时段卡
                <span class="card-spend-money">{{update.timeCardAmount | fen2yuan}}</span>
            </div>
            <div>
                <span class="color-green">●</span>其他
                <span class="card-spend-money">{{update.otherConsumeAmount | fen2yuan}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import apiCharts from 'services/api.charts';
export default {
    name: 'employee-charts',
    mixins: [],
    props: {},
    components: {},
    computed: {},
    data() {
        return {
            params: {
                employeeId: this.$store.getters.employeeId,
                merchantId: this.$store.getters.merchantId,
                startDate: this.$moment().startOf('d').format('YYYY-MM-DD HH:mm:ss'),
                endDate: this.$moment().endOf('d').format('YYYY-MM-DD HH:mm:ss')
            },
            update: {}
        };
    },
    mounted() {
        this.$indicator.open();
        apiCharts.getEmployee(this.params).then(res => {
            this.$indicator.close();
            this.update = res.data;
        }).catch((err) => {
            console.log(err);
        });
    },
    methods: {}
};
</script>
<style lang="less">
@import '~@/styles/_agile';
body {
    background: @border-gay;
}
.ed-card {
    background: url('~assets/imgs/bg6.png') no-repeat;
    background-size: cover;
    color: #e3e3e3;
    .ed-card-title {
        padding: 5vw;
        .e-avatar {
            width: 77px;
            height: 77px;
            border-radius: 50%;
            border: 1px solid @light-gray;
        }
        .e-name {
            font-size: 16px;
            margin-top: 8px;
        }
        .e-no {
            font-size: 14px;
        }
    }
    .ed-card-total {
        background-color: rgba(86, 46, 86, 0.2);
        .ft-light {
            overflow: hidden;
            height: 10vw;
            .ic {
                font-size: 16px;
                font-weight: bolder;
            }
        }
    }
}
.ed-info {
    background: @white;
    div {
        padding: 7vw 0;
    }
    p {
        color: #6a6a6a;
        font-size: 0.4rem;
        line-height: 27px;
        height: 27px;
        text-overflow: ellipsis;
    }
    .triggle-down {
        display: inline-block;
        width: 0;
        height: 0;
        border: 2vw solid transparent;
        border-top: 2vw solid #a24d94;
        position: absolute;
        top: 0;
        left: 24vw;
    }
    .ed-performance {
        border-right: 1px solid @border-gay;
        position: relative;
    }
    .ed-payment {
        position: relative;
    }
}
.ed-card-spend {
    height: 14vw;
    line-height: 14vw;
    color: #333;
    padding: 0 4vw;
    font-size: 15px;
    .ed-card-spend-title {
        .ic {
            font-size: 26px;
        }
    }
}
.ed-card-list {
    background: #fff;
    div {
        height: 12vw;
        line-height: 12vw;
        margin-left: 4vw;
        color: #6a6a6a;
    }
    div:not(:first-child) {
        border-top: 1px solid #eee;
    }
    .color-blue {
        color: #4ed9cf;
        margin-right: 2vw;
    }
    .color-orange {
        color: #f7aa25;
        margin-right: 2vw;
    }
    .color-green {
        color: #03978d;
        margin-right: 2vw;
    }
    .card-spend-money {
        float: right;
        margin-right: 4vw;
        color: #333;
        margin-left: 2vw;
    }
}
</style>
