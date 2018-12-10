<template>
    <div class="b2b-mall-order-list-sell-detail">
        <div class="cell cell-box">
            <div class="total-box">
                <div class="plain1" layout="row" layout-align="space-between center">
                    <img class="title-img" :src="null | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                    <div>
                        <span>购买人数</span>
                        <span>&nbsp;</span>
                        <span class="fs48">33</span>
                    </div>
                    <div>
                        <span>购买人数</span>
                        <span>&nbsp;</span>
                        <span>￥</span>
                        <span class="fs48">488.4</span>
                    </div>
                </div>
                <div class="text-center extra-light-black">收起<m-icon xlink='#icon-xia'></m-icon></div>
            </div>
        </div>
        <div class="cell cell-box m-t-4 fs28 extra-light-black" layout="row">
            <div flex>20条订单</div>
            <div @click="showQuery" class="p-l-2">筛选<m-icon xlink='#icon-xia'></m-icon></div>
        </div>
        <div class="order-list">
            <div class="list-item bg-white cell-box">
                <div class="border-bottom cell" layout="row">
                    <img class="title-img m-r-2" :src="null | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                    <div flex>
                        <div layout="row">
                           <div flex>华山论剑 <span class="group-tag">团长</span></div>
                           <div>¥1000.00</div>
                        </div>
                        <div>1888****3948</div>
                    </div>
                </div>
                <div class="cell" layout="row">
                    <div class="extra-light-black fs24" flex>今天12:16</div>
                    <div class="fwb">
                        <span class="color-primary">未验券</span>
                        <!--<span class="">已验券</span>-->
                    </div>
                </div>
            </div>
        </div>
        <!--筛选条件-->
        <popup-right v-model="showView">
            <div class="query-box">
                <div class="query-content">
                    <div class="m-b-3">
                        <div class="title p-t-4 p-b-4 fs32 fwb">验券状态</div>
                        <div >
                            <div class="query-item">待验券</div>
                            <div class="query-item act">待验券</div>
                        </div>
                    </div>
                </div>
                <div class="query-content">
                    <div class="m-b-3">
                        <div class="title p-t-4 p-b-4 fs32 fwb">购买金额</div>
                        <div >
                            <div class="query-item">￥122</div>
                            <div class="query-item act">￥122</div>
                        </div>
                    </div>
                </div>
                <div class="query-content">
                    <div class="m-b-3">
                        <div class="title p-t-4 p-b-4 fs32 fwb">时间周期</div>
                        <div class="date-input" layout="row" layout-align="center center">
                            <input flex type="date" placeholder="开始日期">
                            <div class="cell-box">至</div>
                            <input flex type="date" placeholder="结束日期">
                        </div>
                    </div>
                </div>
                <div class="btn-box-padding"></div>
                <div class="btn-box" layout="row">
                    <button @click="showView = false;" flex class="btn-back">取消</button>
                    <button flex class="btn-submit">确定</button>
                </div>
            </div>
        </popup-right>
    </div>
</template>

<script>
import popupRight from 'components/popup-right';

export default {
    name: 'sell-detail',
    data() {
        return {
            showView: false
        };
    },
    components: {
        popupRight
    },
    mounted() {
    },
    methods: {
        showQuery() {
            this.showView = true;
        }
    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';
.b2b-mall-order-list-sell-detail {
    .total-box {
        box-shadow:0px 4px 17px 0px rgba(75,110,150,0.11);
        border-radius:2px;
        background:@white;
        padding: 8px;
        .plain1{
            padding: 8px;
        }
        .title-img{
            width: 34px;
            height:34px;
            border-radius: 2px;
        }
    }
    .list-item{
        margin-bottom: 12px;
        .title-img{
            width:34px;
            height:34px;
            border-radius: 50%;
        }
        .group-tag{
            padding: 0 6px;
            color: @color-primary;
            border: 1px solid @color-primary;
            border-radius: 2px;
            font-size: 12px;
        }
    }
    .query-box{
        .query-content{
            padding: 20px;
            .query-item{
                padding: 8px;
                text-align: center;
                background: @bg-gray;
                border: 1px solid @bg-gray;
                color: @extra-black;
                border-radius: 2px;
                margin-bottom: 8px;
                &.act{
                    border-color: @color-primary;
                    background: @white;
                    color: @color-primary;
                }
            }
            .date-input{
                input {
                    height:34px;
                    border-radius: 2px;
                    background: @bg-gray;
                    color: @color-primary;
                    border:1px solid #E3E3E3;
                }
            }
        }
        .btn-box-padding{
            height: 50px;
        }
        .btn-box{
            height: 50px;
            width: 100%;
            position: absolute;
            bottom: 0;
            left:0;
            button{
                height: 100%;
                font-size: 16px;
            }
            .btn-back{
                background: @bg-gray;
            }
            .btn-submit{
                color: @white;
                background: @color-primary;
            }
        }
    }
}
</style>
