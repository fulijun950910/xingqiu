<template>
<div class="b2b-activity-list">
    <div class="activity-list">
        <div class="activity-box" @click="toActivity(item)" v-for="(item, index) in dataList" :key="index" layout="row" layout-align="start center">
          <div flex="60">
              <span class="color-title no-wrap fs24 tag text-center">限时抢购</span>
              <div class="color-title fs30 no-wrap title">{{item.title}} <img :src="require('assets/imgs/activity-des/img-03.png')" />  </div>
              <div class="fs24 color-des only-two-line">{{item.featrueDescription}}</div>
          </div>
          <div flex="40" layout="row" layout-align="end center">
              <div class="img-con">
                  <img :src="item.promotionFileId | nSrc(require('assets/imgs/activity-des/img-01.jpg'))" alt="">
              </div>
          </div>
        </div>
    </div>
</div>
</template>
<script>
import api_party from 'services/api.party';
export default {
    data() {
        return {
            dataList: [],
            paging: {
                page: 1,
                size: 10
            }
        };
    },
    methods: {
        loadData() {
            let parameter = {
                // merchantId: this.$store.state.party.merchantId,
                status: 4,
                page: this.paging.page,
                size: this.paging.size
            };
            api_party.api_b2bAcyivities(parameter).then(msg=> {
                this.dataList = msg.data.rows;
            }, msg=> {
                console.log('网络错误');
            });
        },
        toActivity(item) {
            location.href = item.promotionAuthUrl;
        }
    },
    mounted() {
        this.loadData();
    }
};
</script>

<style lang="less" scoped>
@import '~styles/_style';
.color-title{
    color: #FFF8D6FF;
};
.color-des{
    color: #FFDDD4FF;
}

.b2b-activity-list{
    background: #120934;
    height: 100%;
    padding: 20px;
    overflow-y: scroll;
    .activity-box{
        margin-bottom: 20px;
        background: #7051E7;
        padding: 14px 10px;
        border-radius: 4px;
        border: 1px solid #936EED;
        box-shadow: #936EED;
        overflow: hidden;
        .title{
            margin: 8px 0 13.5px 0;
            img{
                width: 14px;
                height: auto;
            }
        }
        .tag{
            display: block;
            width: 60px;
            height: 20px;
            background: url('~assets/imgs/activity-des/bg-06.png') no-repeat;
            background-size: 100% 100%;            
        }
        .img-con{
            width: 83.5px;
            height: 83.5px;
            overflow: hidden;
            img{
                width: 100%;
                height: auto;
            }
        }
    }
}
</style>


