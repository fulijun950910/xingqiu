<template>
    <div class="customer-detail-intro">
        <div class="card">
            <p class="title">
                <span><m-icon class="mr8" xlink="#icon-record"/> 档案信息</span>
            </p>
            <div class="field" layout="row" layout-align="start start" >
                <span>所属门店:</span><p>{{dataModel.storeName}}</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>会员账号:</span><p>{{dataModel.memberNo}}</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>跟踪员工:</span><p>{{dataModel.employeeName}}</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>来源渠道:</span><p>{{dataModel.sourceName}}</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>入会时间:</span><p>{{dataModel.registerDate}}</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>推荐人员:</span><p>{{dataModel.refererName}}</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>特殊日期:</span>
                <div flex>
                    <p v-for="(item, index) in dataModel.events" v-if="item.eventDate" :key="index">{{item.name}}（{{item.eventDate.formatDate('yyyy年MM月dd日')}}）</p>
                </div>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>个性标签:</span>
                <p flex v-if="dataModel.tags">{{dataModel.tags.map(x => {return x.tagName}).join('，')}}</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>相关禁忌:</span>
                <p flex v-if="dataModel.tags">{{dataModel.taboos.map(x => {return x.name}).join('，')}}</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>微信号码:</span><p>{{dataModel.wechat}}</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>自定义属性:</span>
                <div flex>
                    <p v-for="(item, index) in dataModel.customFieldValues" :key="index">{{item.displayName}}：{{item.value}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'customer-detail-intro',
    components: {},
    data() {
        return {
        };
    },
    computed: {
        dataModel() {
            return this.$store.state.customerDetail;
        }
    },
    methods: {
    }
};
</script>

<style lang="less">
    @import '~styles/_agile.less';
    .customer-detail-intro {
        padding-top: 12px;
        font-size: 14px;
        .card {
            padding-bottom: 12px;
            background-color: white;
            .title {
                padding: 12px;
                border-bottom: 1px solid #eee;
            }
            .field {
                padding: 12px;
                border-bottom: 1px solid #eee;
                span {
                    color: @light-gray;
                    width: 80px;
                }
            }
        }
    }
</style>
