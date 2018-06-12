<template>
    <div class="supplier-list" v-infinite-scroll="loadMore"  :infinite-scroll-disabled="loading"  infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <div class="list-con">
            <div class="list-item" v-for="(item,index) in dataList" :key="index">
              <!-- <div class="top" layout="row" layout-align="space-between center">
                  <div></div>
                  <div></div>
              </div> -->
              <div class="middle">
                      <div class="color-black fs34">商户名称：{{item.merchantNames}}</div>
                      <div class="fs28 color-gray">提交人：{{item.nickName}}</div>
                      <div class="fs28 color-gray">联系电话：{{item.contactMobile}}</div>
              </div>
              <div class="bottom" layout="row" layout-align="space-between center">
                  <div class="color-gray fs24">{{item.createdTime}}</div>
                  <div class="color-pink fs30">{{item.status | introduceStatus}}</div>

              </div>
            </div>
            <no-more :show-more="dataList.length != 0 || loading" more-text="不要再看了，我是有底线的"></no-more>
             <no-data :visible="dataList.length == 0 && !loading" :showButton="false"></no-data>
        </div>
    </div>
</template>
<script>
import api_party from 'services/api.party';
import Vue from 'vue';
import { Indicator, InfiniteScroll } from 'mint-ui';
import noMore from 'components/integral-mall/no-more';
import noData from 'components/no-data';
Vue.use(InfiniteScroll);
export default {
    data() {
        return {
            dataList: [],
            loading: false,
            scrollDisabled: false,
            pageChange: {
                page: 1,
                size: 20
            }
        };
    },
    methods: {
        loadData() {
            if (this.scrollDisabled) {
                return;
            };
            let parameter = {
                query: [
                    {
                        field: 'merchantId',
                        value: this.$store.state.party.merchantId
                    },
                    {
                        field: 'partyId',
                        value: this.$store.state.party.partyId
                    }
                ],
                page: this.pageChange.page,
                size: this.pageChange.size

            };
            Indicator.open('loading...');
            api_party.serchIntroduction(parameter).then(msg=> {
                Indicator.close();
                if (msg.data.rows.length < this.pageChange.size) {
                    this.scrollDisabled = true;
                } else {
                    this.scrollDisabled = false;
                }
                this.dataList = this.dataList.concat(msg.data.rows);
                this.loading = false;
                this.pageChange.page++;
            }, msg=> {

            });
        },
        loadMore() {
            this.loadData();
        }
    },
    components: {
        noMore,
        noData
    },
    mounted() {
        this.loadData();
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.supplier-list{
    padding: 15px;
    .list-con{
        padding: 15px 0 0 0;
        .list-item{
            padding: 10px;
            box-shadow:0px 10px 28px 0px rgba(44,45,51,0.08);
            border-radius: 7px;
            margin-bottom: 10px;
            .middle{
                padding: 0 0 22px 0;
                border-bottom: 1px solid @border-gay;
            }
            .bottom{
                padding: 15px 0;
            }
        }

}

}

</style>


