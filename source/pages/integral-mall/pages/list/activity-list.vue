<template>
    <div class="activity-list">
     <div class="banner"></div>
     <div class="activity-list-con">
         <div class="activity-box" v-for="(item,index) in dataList" :key="index">
             <div class="activity-img">
                   <img class="img-auto" :src="item.avatarFileId | nSrc(require('assets/imgs/female.png'))" alt="">
             </div>
             <div class="activity-describle">
                 <p class="fwb fs34 color-black">{{item.name}}</p>
                 <span class="fs24 color-gray">{{item.description}}</span>
             </div>
             <div class="box-bottom" layout="row" layout-align="space-between center">
                 <span class="fs30 color-pink fwb">{{item.price | fen2dou}}美豆豆</span>
                 <div class="btn fs30 color-white text-center">
                     兑换
                 </div>
             </div>
         </div>
         <div class="no-more"></div>
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
            margin-bottom: 15px;
            .activity-img{
                height: 170px;
                width: 100%;
                overflow: hidden;
                margin-bottom: 15px;
            }
            .activity-describle{
                padding: 10px;
            }
            .box-bottom{
                margin-bottom: 10px;
                padding: 0 10px;
                .btn{
                    height: 30px;
                    width: 75px;
                    padding: 0;
                    line-height: 30px;
                    background:linear-gradient(180deg,rgba(255,153,216,1),rgba(252,93,192,1),rgba(255,53,104,1));
                    border-radius: 7px;
                }
            }
        }
    }

}
</style>

