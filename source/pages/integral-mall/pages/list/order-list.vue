<template>
    <div class="order-list">
        <div class="top-tab" flex layout="row" layout-align="start center">
            <div class="tab-left" flex="95" layout="row" layout-align="start center">
            <div class="tab-index fs30 color-gray" @click="tabClick(item)" :class="{'active':item.value == isActive}" v-for="(item,index) in tabList" :key="index">
                {{item.name}}
            </div>
            </div>
            <div class="menu" flex="5">
                <m-icon class="fs35" xlink="#icon-shaixuan1"></m-icon>
            </div>
        </div>
        <div class="list-container">
            <div class="list-box" v-for="(item, index) in dataList" :key="index">
                <div class="top" layout="row" layout-align="space-between center">
                <div class="fs24">{{item.notes}}</div><div class="fs24 color-orange-yellow">{{item.notes}}</div>
                </div>
                <div class="middle" layout="row" layout-align="space-between center">
                  <div flex="70">
                      <div class="fs34 color-black">{{item.notes}}</div>
                      <div class="fs28 color-gray">{{item.notes}}</div>
                  </div>
                  <div flex="30">
                      <span><img class="img-auto"  alt=""></span>
                  </div>
                </div>
                <div layout="row" layout-align="space-between center" class="bottom">
                    <div class="fs24 color-gray">{{item.notes}}</div>
                    <div class="color-pink fs30 fwb">去支付<m-icon xlink="#icon-zuojiantou"></m-icon></div>
                </div>
            </div>
        </div>
        <no-more :show-more="showNomore" more-text="不要再看了，我是有底线的"></no-more>
    </div>
</template>
<script>
import noMore from 'components/integral-mall/no-more';
import api_party from 'services/api.party';
export default {
    data() {
        return {
            tabList: [
                {
                    name: '全部',
                    value: 1
                },
                {
                    name: '待支付',
                    value: 2
                },
                {
                    name: '待确认',
                    value: 3
                },
                {
                    name: '已完成',
                    value: 4
                }
            ],
            showNomore: true,
            isActive: 1,
            dataList: []
        };
    },
    methods: {
        loadData() {
            let parameter = {
                query: [
                    {
                        field: 'accountId',
                        value: this.$store.state.id
                    }
                ],
                page: 1,
                size: 20
            };
            api_party.orderList(parameter).then(res=> {
                this.dataList = res.data.list;
                console.log(res);
            }, res=> {

            });
        },
        tabClick(item) {
            this.isActive = item.value;
        }
    },
    mounted() {
        this.loadData();
        console.log(this.$store);
    },
    components: {
        noMore
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.order-list {
    padding: 0 15px;
    margin-top: 90px;
    .top-tab{
        border-bottom: 1px solid @border-gay;
        position: fixed;
        left: 15px;
        right: 15px;
        top:0;
        padding-top: 27px;
        background: #fff;
        z-index: 2;
        .tab-left{
            width: 95%;
            overflow-x: scroll;
        }
        .tab-index{
            padding: 10px 18px;
            flex: none;
        }
        .tab-index.active{
            color: @color-pink;
            font-weight: bold;
        }
        .menu{
            color: #4F97FF;
        }
    }
    .list-container{
        .list-box{
            box-shadow:0px 10px 28px 0px rgba(44,45,51,0.08);
            margin-bottom: 10px;
            border-radius: 7px;
            padding: 10px;
            .bottom,.moddle,.top{
                padding: 10px;
            }
        }
    }
}
</style>

