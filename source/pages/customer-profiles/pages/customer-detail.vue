<template>
    <div class="customer-detail">
        <!--顾客基本信息-->
        <div class="profiles">
            <!-- 头部名片 -->
            <div class="c-card" layout="row" layout-align="space-between end">
                <div class="c-card-content" layout="row" layout-align="space-between center">
                    <img :src="dataModel.memberAvatarId|mSrc(90,90,require('assets/imgs/avatar.png'))" alt="">
                    <div>
                        <p class="c-card-title no-wrap">
                            serviceName
                        </p>
                        <p class="c-card-subtitle no-wrap">
                            152 **** 9832
                        </p>
                    </div>
                </div>
            </div>
            <div class="c-asset">
                
            </div>
        </div>

        <!--顾客其他信息-->
        <div class="others">

        </div>
    </div>
</template>
<script>
export default {
    name: 'customer-detail',
    components: {},
    data() {
        return {
            dataModel: {
            }
        };
    },
    methods: {}
};
</script>
<style lang="less">
    @import '~styles/_agile.less';
    .customer-detail {
        .profiles {
            height: 160px;
            border-bottom: 1px solid #e4e4e4;
        }
        .c-card {
            background-color: white;
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
        .others {}
    }
</style>
