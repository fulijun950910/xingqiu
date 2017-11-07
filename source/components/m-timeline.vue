<template>
    <div class="m-timeline">
        <div class="line-node" v-for="(node, index) in dataList" :key="index">
            <p class="year-block"><strong class="label-year">{{node.year}}</strong> </p>
            <div v-for="(month, index) in node.list" :key="index">
                <p class="month-block"><span class="label-month">{{month.month+1}}月</span></p>
                
                <div class="day-block" v-for="(day, index) in month.list" :key="index" layout="row" layout-align="space-between start">
                    <div class="label" layout="row" layout-align="space-between start">
                        <p class="label-day" flex>{{day.time | day}}</p>
                        <div class="line">
                            <div class="ver-line"></div>
                            <span class="dot">●</span>
                        </div>
                    </div>
                    <div class="block" flex>
                        <span class="pop-left"></span>
                        <p class="name mgb4">技师：{{day.name}}</p>
                        <p class="desc ft-light ft12 dark-gray tidt2">{{day.desc}}</p>
                        <div class="image" layout="row" layout-align="start start" flex-wrap="wrap">
                            <img v-for="(img, index) in day.images" :key="index" :src="img | mSrc(80, 80, require('assets/imgs/nullimg.jpg'))" @click="showNativeImg(img)" alt="">
                        </div>
                        <p class="items dark-gray ft12">
                            <m-icon xlink="#icon-item"/>
                            <span v-for="(item, index) in 2" :key="index">水光针<span v-show="index < 1">、</span></span>
                        </p>
                    </div>
                </div>
                <m-gallery v-model="currentImg" :show.sync="showCurrentImg"></m-gallery>
            </div>
        </div>
        
    </div>
</template>

<script>
/**
 * values: 列表数据
 * sort: 是否按时间排序
 * sortType: 排序类型（true：升序，false：降序）
 */
import knife from 'vendor/knife';
import mGallery from 'components/m-gallery';
export default {
    name: 'm-timeline',
    props: {
        values: {
            type: Array,
            require: true
        },
        sort: {
            type: Boolean,
            default: false
        },
        sortType: {
            type: Boolean,
            default: false
        }
    },
    components: {
        mGallery
    },
    data() {
        return {
            currentImg: null,
            showCurrentImg: false
        };
    },
    mounted() {
    },
    computed: {
        dataList() {
            if (this.values) {
                var dataList = knife.deepCopy(this.values);
                // 排序
                if (this.sort) {
                    dataList.sort((a, b) => { return (Date.parse(a.time) > Date.parse(b.time)) == this.sortType; });
                }
                return this.toTree(dataList);
            } else {
                return [];
            }
        }
    },
    methods: {
        // list 2 tree
        toTree(list) {
            let yearArr = [];
            let tempArr = [];
            let yearList = list.map(x => {
                return new Date(x.time.replace(/\-/g, '/')).getFullYear();
            });
            yearList.forEach(x => {
                if (!tempArr.includes(x)) {
                    tempArr.push(x);
                }
            });
            tempArr.forEach(year => {
                let yearObj = {
                    year: year
                };
                let monthArr = [];
                list.forEach(m => {
                    if (year == new Date(m.time.replace(/\-/g, '/')).getFullYear() && !monthArr.map(k => { return k.month; }).includes(new Date(m.time.replace(/\-/g, '/')).getMonth())) {
                        let monthObj = {
                            month: new Date(m.time.replace(/\-/g, '/')).getMonth()
                        };
                        let dayArr = [];
                        list.forEach(d => {
                            if (year == new Date(d.time.replace(/\-/g, '/')).getFullYear() && new Date(m.time.replace(/\-/g, '/')).getMonth() == new Date(d.time.replace(/\-/g, '/')).getMonth()) {
                                dayArr.push(d);
                            }
                        });
                        monthObj.list = dayArr;
                        monthArr.push(monthObj);
                    }
                });
                yearObj.list = monthArr;
                yearArr.push(yearObj);
            });
            return yearArr;
        },
        showNativeImg(img) {
            this.currentImg = img;
            this.showCurrentImg = true;
        }
    },
    filters: {
        year(val) {
            return new Date(val.replace(/\-/g, '/')).getFullYear();
        },
        month(val) {
            return new Date(val.replace(/\-/g, '/')).getMonth() + 1;
        },
        day(val) {
            return val.formatDate('MM.dd');
        }
    }
};
</script>

<style lang="less">
    @import '~styles/_agile.less';

    .mgb4 {
        margin-bottom: 4px;
    }
    .m-timeline {
        .line-node {
            padding: 0;
            .year-block {
                .label-year {
                    float: left;
                    font-size: 16px;
                    height: 30px;
                    line-height: 30px;
                }
            }
            .month-block {
                width: 80px;
                text-align: right;
                .label-month {
                    text-align: center;
                    display: inline-block;
                    font-size: 12px;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    border-radius: 50%;
                    background-color: @color-tiffany-blue;
                    color: white;
                }
            }
            .day-block {
                position: relative;
                .label {
                    width: 80px;
                    height: 100%;
                    .label-day {
                        margin-top: 18px;
                        text-align: right;
                        line-height: 18px;
                    }
                    .line {
                        width: 30px;
                        height: 100%;
                        text-align: center;
                        .ver-line {
                            display: inline-block;
                            position: absolute;
                            width: 0;
                            height: 100%;
                            border: none;
                            overflow: hidden;
                            border-right: 2px solid @color-tiffany-blue;
                            background-color: @color-tiffany-blue;
                        }
                        .dot {
                            top: 18px;
                            font-size: 14px;
                            position: absolute;
                            margin-left: -9px;
                            width: 18px;
                            height: 18px;
                            line-height: 16px;
                            border: 1px solid @color-tiffany-blue;
                            color: @color-tiffany-blue;
                            box-sizing: border-box;
                            text-align: center;
                            display: inline-block;
                            border-radius: 50%;
                            background-color: white;
                        }
                    }
                }
                .block {
                    margin-left: 12px;
                    margin-bottom: 12px;
                    height: auto;
                    border-radius: 5px;
                    position: relative;
                    box-shadow: -1px 1px 4px 0 rgba(183,183,183,0.50);
                    padding: 12px;
                    background-color: white;
                    .desc {
                        margin-bottom: 8px;
                    }
                    .image {
                        img {
                            width: 70px;
                            height: 70px;
                            margin-bottom: 8px;
                            margin-right: 8px;
                        }
                    }
                    .pop-left {
                        border: none;
                        width: 16px;
                        height: 16px;
                        position: absolute;
                        top: 18px;
                        left: -8px;
                        box-shadow: -1px 1px 2px 0 rgba(183,183,183,0.50);
                        z-index: 1;
                        transform: rotate(45deg);
                        background-color: white;
                    } 
                }
            }
        }
    }
</style>

