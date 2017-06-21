<template>
    <div class="container">
        <div class="mask" v-if="vm.mask" v-on:click="searchStatu()">
        </div>
        <div class="top-bar">
            <div layout="row" layout-align="start center" flex v-if="vm.search.statu">
                <a class="bar-btn border-r" layout="row" layout-align="center center" flex v-on:click="searchStatu()">
                    <div v-if="!vm.search.main">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-search2"></use>
                        </svg>
                        <span class="bar-text">搜索</span>
                    </div>
                    <span v-if="vm.search.main" flex class="text-center"> 
                    {{vm.search.main}}
                     </span>
                    <span v-on:click.stop="clearSearch()" v-if="vm.search.main">
                    <svg class="icon icon-close-grey icon-margin" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>                         
                     </span>
                </a>
                <a class="bar-btn see-data" layout="row" layout-align="center center" flex>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shuju"></use>
                    </svg>
                    <span class="bar-text">查看数据</span>
                </a>
            </div>
            <div class="search-input bar-btn" v-if="!vm.search.statu">
                <div layout="row" layout-align="start center" flex class="search-main">
                    <svg class="icon icon-margin" aria-hidden="true" flex>
                        <use xlink:href="#icon-search2"></use>
                    </svg>
                    <input flex="70" type="text" name="search-text" placeholder="搜索员工/工号" v-model="vm.search.text">
                    <span flex v-on:click="searchStatu()">
                      <svg class="icon icon-close icon-margin" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>                        
                    </span>
                </div>
                <ul class="employee-list">
                    <li v-for="item in vm.employeeList" v-on:click="backMain(item)">{{item.name}}</li>
                </ul>
            </div>
        </div>
        <div class="placeholder" flex>
        </div>
        <div class="dynamics">
            <div class="div-box" v-for="i in 10">
                <div class="title" layout="row" layout-align="space-between center">
                    <div class="user" layout="row" layout-align="center center">
                        <span class="view">
                            <img  src="../assets/imgs/service.png" alt="">
                        </span>
                        <div>
                            <h3>NO:007</h3>
                            <h3>告示的话</h3>
                        </div>
                    </div>
                    <div flex>
                    </div>
                    <div class="text-type" layout="row" layout-align="center center">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-fuwu-copy"></use>
                        </svg>
                        <span>服务小计</span>
                    </div>
                    <div>
                    </div>
                </div>
                <div class="main-text" flex>
                    客户服务不错
                </div>
                <div class="main-img" layout="row" layout-align="space-between center" flex-wrap="wrap">
                    <span flex="30">
                        <img  src="../assets/imgs/huan.png" height="296" width="288" alt="">
                    </span>
                </div>
                <div class="box-bottom" flex layout="row" layout-align="start center">
                    <span>昨天05：00 PM</span>
                    <span flex></span>
                    <a>查看详情</a>
                </div>
            </div>
        </div>
        <bottom-menu @click="link" :click-able="employeeList" :flex="vm.flex"></bottom-menu>
    </div>
</template>
<script>
// 引用底部的菜单
import Vue from 'vue';
import {Lazyload} from 'mint-ui';
import bottomMenu from 'components/bottom-menu';
Vue.use(Lazyload);
export default {
    name: 'service-dynamics',
    components: {
        bottomMenu
    },

    data() {
        return {
            vm: {
                employeeList: [{
                    name: '赵辉',
                    id: 12345678
                }, {
                    name: '金超',
                    id: 87654321
                }, {
                    name: '现伟',
                    id: 87654321
                }, {
                    name: '子轩',
                    id: 87654321
                }, {
                    name: '金超',
                    id: 87654321
                }, {
                    name: '金超',
                    id: 87654321
                }],
                search: {
                    statu: true,
                    text: '测试文字',
                    main: ''
                },
                flex: 25,
                mask: false
            }

        };
    },
    methods: {
        // 显示/隐藏搜索详情
        searchStatu() {
            this.vm.search.statu = !this.vm.search.statu;
            this.vm.mask = !this.vm.mask;
        },
        backMain(item) {
            this.vm.search.main = item.name;
            this.searchStatu();
        },
        link(index) {
            switch (index) {
                case 0:
                    this.$router.back();
                    break;
                case 1:
                    this.$router.back();
                    break;
                case 2:
                    this.$router.back();
                    break;
                case 3:
                    this.$router.back();
            }
        },
        // 清除显示的员工
        clearSearch() {
            this.vm.search.main = null;
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile.less';
.container {
    background: @bg-gray;
    .mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: @color-black;
        opacity: .5;
        z-index: 2;
    }
    .top-bar {
        border-bottom: 1px solid @border;
        position: relative;
        z-index: 3;
        background: @white;
        .bar-btn {
            padding: @l16 * 2 0;
            color: @extra-light-black;
            .icon-close-grey {
                color: @dark-gray;
            }
        }
        .see-data {
            color: @color-primary;
        }
        .border-r {
            border-right: 1px solid @border;
        }
        .icon {
            font-size: @fs36;
            color: @color-primary;
        }
        .icon-close {
            color: @color-black;
        }
        .bar-text {
            font-size: @fs28;
            margin-left: @fs16;
        }
        .search-input {
            position: relative;
            background: @white;
            input {
                font-size: @fs28;
            }
        }
        .icon-margin {
            margin: 0 @l16*2;
        }
        .employee-list {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: @white;
            border-top: 1px solid @border;
            max-height: 220px;
            overflow-y: scroll;
            overflow-x: hidden;
        }
        .employee-list li {
            padding: @l16 * 2;
            color: @color-black;
            font-size: @fs28;
            border-bottom: 1px solid @border;
        }
    }
    .placeholder {
        height: @l24;
        background: @white;
    }
    .dynamics {
        background: @bg-gray;
        padding-bottom: 59px;
        .div-box {
            background: @white;
            padding: 0 @l16;
            padding-top: @l16 * 2;
            margin-bottom: 2 * @l16;
            position: relative;
            .title {
                position: relative;
                .view {
                    display: block;
                    width: 50.5px;
                    height: 50.5px;
                    background: @color-black;
                    border-radius: 100%;
                    overflow: hidden;
                    margin-right: @l16;
                    img[lazy=loading] {
                        max-width: 100%;
                        max-height: 100%;
                        min-height: 100%;
                        max-width: 100%;
                    }
                }
                h3 {
                    font-size: @fs24;
                    font-weight: normal;
                    color: @extra-light-black;
                }
                img[lazy=loading] {
                    display: block;
                    max-height: 100%;
                    max-width: 100%;
                }
            }
            .main-text {
                font-size: @fs24;
                color: @gray;
                margin: @l16 * 2 0;
            }
            .main-img {
                span {
                    width: 106.5px;
                    height: 110.95px;
                    margin-bottom: 2 * @l16;
                    flex-wrap: wrap;
                    overflow: hidden;
                    img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
            }
            .text-type {
                border: 1px solid @border;
                border-radius: 5px;
                right: 0;
                padding: @l8;
                span {
                    font-size: @fs24;
                    color: @gray;
                }
            }
            .box-bottom {
                padding-bottom: 2 * @l16;
                span {
                    color: @extra-light-gray;
                }
                a {
                    color: #4E4B73;
                }
            }
        }
    }
}
</style>
