<template>
    <div class="customer-detail-intro">
        <div class="card">
            <p class="title">
                <span><m-icon class="mr8" xlink="#icon-record"/> 档案信息</span>
            </p>
            <div class="field" layout="row" layout-align="start start" >
                <span>所属门店:</span><p>中山公园</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>会员账号:</span><p>中山公园</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>跟踪员工:</span><p>中山公园</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>来源渠道:</span><p>中山公园</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>入会时间:</span><p>中山公园</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>推荐人员:</span><p>中山公园</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>特殊日期:</span><p>中山公园</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>个性标签:</span><p>中山公园</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>相关禁忌:</span><p>中山公园</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>微信号码:</span><p>中山公园</p>
            </div>
            <div class="field" layout="row" layout-align="start start" >
                <span>自定义属性:</span><p>中山公中山公园中山公园中山公园中山公园园</p>
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
