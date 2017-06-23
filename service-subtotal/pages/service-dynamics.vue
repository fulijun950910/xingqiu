<template>
    <div class="container" :class="{active:vm.mask}">
        <div class="mask" v-if="vm.mask" v-on:click="searchStatu()">
        </div>
        <div class="mask" v-if="swipe.show" v-on:click="imgHide()">
        </div>
        <div class="top-bar" :class="{active:swipe.show}">
            <div layout="row" layout-align="start center" flex v-if="vm.search.show">
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
                <a class="bar-btn see-data" layout="row" layout-align="center center" flex @click="$router.push({name: 'data-view'})">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shuju"></use>
                    </svg>
                    <span class="bar-text">查看数据</span>
                </a>
            </div>
            <div class="search-input bar-btn" v-if="vm.search.statu">
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
                            <img  :src="require('assets/imgs/service.png')" alt="">
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
                <div class="main-img" layout="row" layout-align="start center" flex-wrap="wrap">
                    <span flex="30" v-for="(index,i) in 3" :key="index" v-on:click="scaleImg(index)">
                        <img  :src="require('assets/imgs/huan.png')" alt="">
                    </span>
                </div>
                <div class="box-bottom" flex layout="row" layout-align="start center">
                    <span>{{vm.testTime | fromnow}}</span>
                    <span flex></span>
                    <a>查看详情</a>
                </div>
            </div>
        </div>
        <bottom-menu @click="link" :flex="vm.flex"></bottom-menu>
        <!-- 图片放大 -->
        <mt-swipe :auto="0" v-if="swipe.show" :showIndicators="false" :continuous="false" :defaultIndex="swipe.index" v-on:click="scaleImg(index)">
            <mt-swipe-item v-for="(i,index) in 6" :key="index">{{index}}</mt-swipe-item>
        </mt-swipe>
        <!-- 下部时间选择 -->
        <template>
            <mt-datetime-picker ref="picker" type="datetime" v-model="vm.pickerValue" @confirm="handleConfirm">
            </mt-datetime-picker>
        </template>
        <!-- 底部门店显示 -->
        <m-picker v-model="storePickerVisible" :slots="slots" :selected-item.sync="selectedStore" value-key="name" @confirm="changeStore"></m-picker>
        <!-- 底部状态显示 -->
        <m-picker v-model="statusPickerVisible" :slots="status" :selected-item.sync="selectedstatus" value-key="name" @confirm="changestatus"></m-picker>
        <!-- 编辑 -->
        <div class="btn-fixed btn-edit" @click="$router.push({name:'member-maintain'})">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-edit"></use>
            </svg>
        </div>
        <div class="btn-fixed btn-go-top" v-on:click="toTop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-top"></use>
            </svg>
        </div>

    </div>
</template>
<script>
// 引用底部的菜单
import Vue from 'vue';
import $ from 'jquery';
import moment from 'moment';
import {
    DatetimePicker
} from 'mint-ui';
import {
    Lazyload
} from 'mint-ui';
import bottomMenu from 'components/bottom-menu';
import mPicker from 'components/m-picker';
Vue.use(Lazyload);
import {
    Swipe,
    SwipeItem
} from 'mint-ui';
export default {
    name: 'service-dynamics',
    components: {
        bottomMenu,
        mPicker,
        [DatetimePicker.name]: DatetimePicker,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem
    },

    data() {
        return {
            storePickerVisible: false,
            statusPickerVisible: false,
            slots: [],
            selectedStore: {},
            selectedstatus: {},
            status: [{
                flex: 1,
                values: [{
                    name: '客户关怀',
                    value: 1
                }, {
                    name: '服务小计',
                    value: 2
                }],
                className: 'slot1',
                textAlign: 'center',
                defaultIndex: 0
            }],
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
                    statu: false,
                    show: true,
                    text: '测试文字',
                    main: ''
                },
                flex: 25,
                mask: false,
                pickerValue: '',
                testTime: moment('2017-06-23 13:59:30')
            },
            swipe: {
                index: '',
                show: false
            }
        };
    },
    methods: {
        // 显示/隐藏搜索详情
        searchStatu() {
            this.vm.mask = !this.vm.mask;
            this.vm.search.statu = !this.vm.search.statu;
            this.vm.search.show = !this.vm.search.show;
        },
        maskHide() {
            this.vm.mask = false;
            this.vm.search.statu = false;
            this.vm.search.show = false;
        },
        backMain(item) {
            this.vm.search.main = item.name;
            this.searchStatu();
        },
        link(index, item) {
            switch (index) {
                case 0:
                    this.$router.go(-1);
                    break;
                case 1:
                    this.storePickerVisible = true;
                    break;
                case 2:
                    this.openPicker();
                    break;
                case 3:
                    this.statusPickerVisible = true;
            }
        },
        // 清除显示的员工
        clearSearch() {
            this.vm.search.main = null;
        },
        // 点击返回顶部
        toTop() {
            $('.container').animate({
                scrollTop: 0
            }, 500);
        },
        openPicker() {
            this.$refs.picker.open();
        },
        imgHide() {
            this.vm.mask = false;
            this.swipe.show = false;

        },
        scaleImg(index) {
            this.swipe.show = !this.swipe.show;
            this.swipe.index = index;
        },
        handleConfirm(date) {
            console.log(moment(date).fromNow());
        },
        changeStore(item) {
            this.selectedStore = item[0];
            // this.loadData();
        },
        changestatus(item) {
            this.selectedstatus = item[0];
            console.log(item);
        }
    },
    mounted() {
        let tempStores = this.$store.state.storeList;
        let tempIndex = 0;
        this.slots.push({
            flex: 1,
            values: tempStores,
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: tempIndex
        });
    }
};
</script>
<style lang="less">
@import '~styles/_agile.less';
.container {
    background: @color-bg;
    min-height: 100%;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    position: relative;
    -webkit-overflow-scrolling: touch;
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
        border-bottom: 1px solid @light-gray;
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
            border-right: 1px solid @light-gray;
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
            border-top: 1px solid @light-gray;
            max-height: 220px;
            overflow-y: scroll;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
        }
        .employee-list li {
            padding: @l16 * 2;
            color: @color-black;
            font-size: @fs28;
            border-bottom: 1px solid @light-gray;
        }
    }
    .active {
        z-index: 1;
    }
    .placeholder {
        height: @l24;
        background: @white;
    }
    .dynamics {
        background: @color-bg;
        padding-bottom: 59px;
        .div-box {
            background: @white;
            padding: 0 @l16 * 2;
            padding-top: @l16 * 2;
            margin-top: 2 * @l16;
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
                    margin-right: 5%;
                    img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
                span:nth-of-type(3n) {
                    margin-right: 0;
                }
            }
            .text-type {
                border: 1px solid @light-gray;
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
                    color: @light-gray;
                }
                a {
                    color: #4E4B73;
                }
            }
            &:first-child {
                margin-top: 0;
            }
        }
    }
    .btn-fixed {
        position: fixed;
        border-radius: 50%;
        text-align: center;
        z-index: 1;
        &.btn-edit {
            bottom: 40vw;
            right: 5vw;
            height: 14vw;
            line-height: 14vw;
            width: 14vw;
            font-size: @fs48;
            background-color: @color-primary;
            color: white;
            box-shadow: 0 0 15px 1px fade(@color-primary, 50%);
        }
        &.btn-go-top {
            font-size: @fs40;
            bottom: 25vw;
            right: 7vw;
            height: 10vw;
            line-height: 10vw;
            width: 10vw;
            background-color: @light-gray;
            color: white;
            box-shadow: 0 0 15px 1px @light-gray;
        }
    }
    .mint-swipe {
        height: 300px;
        position: fixed;
        background: @color-black;
        z-index: 3;
        width: 100%;
        color: #fff;
        top: 50%;
        margin-top: -150px;
    }
}

.active {
    overflow-y: hidden;
}
</style>
