<template>
    <div class="customer-list">
        <!--筛选栏-->
        <div class="top-filter-box" layout="row" layout-align="space-between center">
            <div flex="33" class="sort bdr-right" @click.stop="showSort = true" layout="row" layout-align="center center"> 
                <p class="no-wrap">{{sortSlots[currSort]}}</p><m-icon flex="20" xlink="#icon-triangle-down"/>
            </div>
            <div flex class="filter bdr-right" @click.stop="showFilter = true">筛选 <m-icon xlink="#icon-filter"/></div>
            <div flex class="search" @click.stop="showSearch = true">搜索 <m-icon xlink="#icon-search"/></div>
        </div>

        <!--排序-->
        <mt-popup class="popup-bottom ft-light" v-model="showSort" position="top">
            <p v-for="(item, index) in sortSlots" :key="index" @click.stop="currSort = index"
            layout="row" layout-align="space-between center" :class="{active: (currSort == index)}">
                <span>{{item}}</span> <m-icon v-show="currSort == index" xlink="#icon-check"/>
            </p>
        </mt-popup>

        <!--筛选-->
        <mt-popup class="popup-bottom filter-box" v-model="showFilter" position="top">
            <div class="category">
                <p class="title">顾客分类</p>
                <p class="ft-light">
                    <span v-for="(item, index) in customerFilterSlots.category" :key="index">
                        {{item.label}}
                    </span>
                </p>
            </div>
            <div class="zombie">
                <p class="title">休眠客户</p>
                <p class="ft-light">
                    <span @click.stop="index" v-for="(item, index) in customerFilterSlots.zombie" :key="index">
                        {{item.label}}
                    </span>
                </p>
            </div>
            <div class="more">
                <p class="title">更多筛选</p>
                <p class="ft-light">
                    <span v-for="(item, index) in customerFilterSlots.more" :key="index">
                        {{item.label}}
                    </span>
                </p>
            </div>
            <div class="operate">
                <button>重置选项</button>
                <button class="color-primary">确定</button>
            </div>
        </mt-popup>

        <!--搜索-->
        <mt-popup class="popup-bottom search-box" v-model="showSearch" position="top">
            <div layout="row" layout-align="start center" class="search-main">
                <svg class="icon color-primary" aria-hidden="true" flex>
                    <use xlink:href="#icon-search"></use>
                </svg>
                <input flex="70" type="text" placeholder="会员号/手机号/姓名" v-model="keyword" @input="keywordChange"/>
                <svg class="icon color-black" aria-hidden="true" flex @click.stop="showSearchReset">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
            <div class="zombie">
                <p class="title" v-for="(item, index) in profilesList" :key="index">休眠客户</p>
            </div>
        </mt-popup>
        
        <!--档案列表-->
        <div class="profiles-box">
            <customer-profiles-cell @click.native="toDetail(item)" v-for="(item, index) in 10" :key="index" :value="demoVal" :show.sync="demoVal.show"></customer-profiles-cell>
        </div>
    </div>
</template>
<script>
import customerProfilesCell from 'components/customer-profiles-cell';
import autoSearchbar from 'components/auto-search-bar';
import knife from 'vendor/knife';
export default {
    name: 'customer-list',
    components: {
        customerProfilesCell,
        autoSearchbar
    },
    data() {
        return {
            keyword: '',
            profilesList: [],
            demoVal: {
                avaId: null,
                show: false
            },
            showSort: false,
            showFilter: false,
            showSearch: false,
            sortSlots: [
                '默认排序',
                '最后到店时间从远到近',
                '最后到店时间从进到远',
                '未回访时间从近到远',
                '未回访时间从远到近'
            ],
            customerFilterSlots: {
                category: [{
                    label: '我服务过的',
                    value: '0'
                }, {
                    label: '分配给我的',
                    value: '1'
                }],
                zombie: [{
                    label: '15天未到店',
                    value: '0'
                }, {
                    label: '三个月内未到店',
                    value: '1'
                }, {
                    label: '三个月以上未到店',
                    value: '2'
                }],
                more: [{
                    label: '未办卡客户',
                    value: '0'
                }, {
                    label: '已办卡客户',
                    value: '1'
                }, {
                    label: '三个月以上未到店',
                    value: '2'
                }]
            },
            currSort: 0
        };
    },
    methods: {
        toDetail(item) {
            this.$router.push({
                name: 'detail',
                params: {
                    customerId: item
                }
            });
        },
        keywordChange: knife.debounce(function(arg) {
            console.log(this.keyword);
        }, 300),
        employeeClick() {

        },
        getList() {

        },
        showSearchReset() {
            this.showSearch = false;
            this.keyword = '';
            this.profilesList.splice(0);
        }
    }
};
</script>
<style lang="less">
    @import '~styles/_agile.less';
    
    .customer-list {
        font-size: 14px;
        padding-top: 50px;
        .top-filter-box {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 50px;
            background: #FFFFFF;
            box-shadow: 0 1px 8px 0 rgba(142,142,142,0.50);
            &>div {
                text-align: center;
                line-height: 28px;
            }
            .bdr-right {
                border-right: 1px solid #eee;
            }
            .icon {
                margin-left: 2px;
            }
        }
        .profiles-box {
        }
        .popup-bottom {
            p {
                color: #555;
                padding: 0 12px;
                line-height: 45px;
                border-bottom: 1px solid #eee;
                .icon {
                    color: #B44DCE;
                }
            }
            .active {
                color: #333;
                font-weight: bold;
            }
        }
        .filter-box {
            p {
                line-height: 28px;
                border: none;
                span {
                    display: inline-block;
                    border: 1px solid #eee;
                    border-radius: 2px;
                    padding: 4px 12px;
                    margin: 0 12px 8px 0;
                }
                &.title {
                    line-height: 24px;
                    margin-bottom: 8px;
                }
            }
            & > div {
                border-bottom: 1px solid #eee;
                padding: 8px 0;
            }
            .operate {
                padding: 12px 0;
                text-align: center;
                button {
                    background-color: white;
                    border: 1px solid #333;
                    border-radius: 2px;
                    padding: 8px 16px;
                    &.color-primary {
                        margin-left: 16px;
                        width: 60%;
                        border: 1px solid @color-primary;
                        background-color: @color-primary;
                        color: white;
                    }
                }
            }
        }
        .search-box {
            .search-main {
                height: 50px;
                border-bottom: 1px solid #eee;
                .icon {
                    font-size: 18px;
                }
                input {
                    padding: 8px 0;
                    border-right: 1px solid #eee;
                }
            }
        }
        
    }

</style>
