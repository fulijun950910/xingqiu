<template>
    <div class="customer-detail-service">
        <div class="card">
            <p class="title">
                <span><m-icon class="mr8" xlink="#icon-tel"/> 回访关怀</span>
            </p>
            <div class="content" v-for="(item, index) in 3" :key="index" layout="row" layout-align="space-between start">
                <div class="ava ft12 text-center" layout="column" layout-align="center center">
                    <p>06.11</p>
                    <p>2016年</p>
                </div>
                <div class="block" flex>
                    <p>技师：李某某</p>
                    <p class="ft12 ft-light dark-gray">技师：李技师：李某某技师：李某某技师：李某某技师：李某某某某</p>
                    <div class="image" layout="row" layout-align="start start" flex-wrap="wrap">
                        <img v-for="(img, index) in 1" :key="index" src="" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'customer-detail-service',
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
    .customer-detail-service {
        padding-top: 12px;
        font-size: 14px;
        .card {
            background-color: white;
            .title {
                padding: 12px;
                border-bottom: 1px solid #eee;
            }
            .content {
                padding: 12px;
                border-bottom: 1px solid #eee;
                .ava {
                    width: 50px;
                    height: 50px;
                    background: #3FCEC9;
                    border-radius: 5px;
                    color: white;
                }
                .block {
                    padding: 0 12px;
                    .image {
                        margin-top: 8px;
                        img {
                            width: 70px;
                            height: 70px;
                            margin-bottom: 8px;
                            margin-right: 8px;
                        }
                    }
                }
            }
        }
    }
</style>
