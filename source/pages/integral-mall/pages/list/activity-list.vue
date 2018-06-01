<template>
    <div class="activity-list">
     <div class="banner"></div>
     <div class="activity-list-con">
         <div class="activity-box" v-for="(item,index) in dataList" :key="index">
             <div class="activity-img">

             </div>
             <div class="activity-describle">
                 <p class="fwb fs34 color-black">{{item.name}}</p>
                 <span class="fs24 color-gray">{{item.description}}</span>
             </div>
             <div class="box-bottom" layout="row" layout-align="space-between center">
                 <span>{{item.price | fen2dou}}</span>
                 <div class="btn">
                     兑换
                 </div>
             </div>
         </div>
     </div>
    </div>
</template>

<script>
import api_party from 'services/api.party';
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            employee: JSON.parse(localStorage.getItem('employee')),
            dataList: []
        };
    },
    methods: {
        loadData() {
            Indicator.open('loading...');
            api_party.goodsList(5).then(msg=> {
                Indicator.close();
                this.dataList = msg.data;
            }, msg=> {

            });

        },
        init() {
            this.loadData();
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="less" scoped>
@import '~styles/_style';
.activity-list{
    position: relative;
    padding:95px 15px 15px 15px;
    .banner{
        position: absolute;
        height: 65px;
        top: 15px;
        left: 15px;
        right: 15px;
        background: @gray;
        border-radius: 7px;
    }
    .activity-list-con{
        .activity-box{
            border: 1px solid @border-gay;
            overflow: hidden;
            border-radius: 14px;
            .activity-img{
                height: 170px;
                width: 100%;
                background: @gray;
            }
            .activity-describle{
                padding: 10px;
            }
            .box-bottom{
                margin-bottom: 10px;
            }
        }
    }

}
</style>

