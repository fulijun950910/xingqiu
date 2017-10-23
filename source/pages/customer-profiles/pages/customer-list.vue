<template>
    <div class="customer-list">
        <!--筛选栏-->
        <div class="filter-box" layout="row" layout-align="space-between center">
            <div flex="33" class="sort bdr-right" @click.stop="showSort = true" layout="row" layout-align="center center"> 
                <p class="no-wrap">{{sortSlots[currSort]}}</p><m-icon flex="20" xlink="#icon-triangle-down"/>
            </div>
            <div flex class="filter bdr-right" @click.stop="showFilter = true">筛选 <m-icon xlink="#icon-filter"/></div>
            <div flex class="search" @click.stop="showSearch = true">搜索 <m-icon xlink="#icon-search"/></div>
            <!--搜索框-->
            <!--<auto-searchbar :visiable.sync="vm.search.show" :employeeList="vm.employeeList" @change="getEmployeeList" @itemClick="employeeClick" :searchText="vm.search.text"></auto-searchbar>-->
        </div>
        <mt-popup v-model="showSort" position="top" class="popup-bottom ft-light">
            <p v-for="(item, index) in sortSlots" :key="index" @click.stop="currSort = index"
            layout="row" layout-align="space-between center" :class="{active: (currSort == index)}">
                <span>{{item}}</span> <m-icon v-show="currSort == index" xlink="#icon-check"/>
            </p>
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
export default {
    name: 'customer-list',
    components: {
        customerProfilesCell,
        autoSearchbar
    },
    data() {
        return {
            demoVal: {
                avaId: null,
                show: false
            },
            vm: {
                employeeList: [],
                search: {
                    statu: false,
                    show: false,
                    text: '',
                    main: ''
                },
                flex: 25,
                mask: false,
                pickerValue: '',
                selectedStoreId: this.$route.query.storeId,
                timeInterval: {},
                returnVisit: 321321,
                record: 3321,
                valued: 3213,
                unvalued: 3511
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
        }
    }
};
</script>
<style lang="less">
    @import '~styles/_agile.less';
    
    .customer-list {
        font-size: 14px;
        padding-top: 50px;
        .filter-box {
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
        
    }

</style>
