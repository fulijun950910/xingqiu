<template>
    <div class="Latedetail" v-title="'个人记录'">
        <div class="main">
            <div class="top" layout="row" layout-align="space-between start">
                <div class="info" layout="row" layout-align="start center">
                    <img class="img" :src="require('assets/imgs/avatar.png')" alt="">
                    <div layout="column" class="m-l-2">
                        <span class="fs28 fwb">周树人</span>
                        <span class="fs28 extra-black fwb5">店长</span>
                    </div>
                </div>
                <m-icon link="icon-gengduoicon"></m-icon>
            </div>
            <div class="mt24 d1">
                <p class="fs26 color-black fwb5 m-b-4">本月异常出勤 <span class="fwb fs32">4天</span><span class="fs26 fwb5" style="color:#AEB7CC">(上月异常出勤两天)</span></p>
                <div class="Proportion" layout=row>
                    <span class="s1">
                        <div class="a"></div>
                    </span>
                    <span></span>
                </div>
            </div>
            <div class="InfoList">
                <div v-for="(item,index) in detailList" :key="item.index" >
                    <div class="list" layout="row" layout-align="space-between center" @click.stop="showHide(index)">
                        <p class="fs28 fwb5">{{item.name}}</p>
                        <div layout=row layout-align="center center">
                            <div class="m-r-2 fs28 fwb" style="color:#F76A24;text-align:end" layout-align="end end">
                                <span>{{item.frequency}}</span>
                                <p class="fs24 extra-light-black">{{item.time}}</p>
                            </div>
                            <p ref="arrow"><m-icon link='icon-arrow-down'></m-icon></p>
                        </div>
                    </div>
                    <div ref="box" class="box" style="display:none">
                        <div class="content" v-for="(item2,index2) in item.child" :key="index2">
                            <div layout='row' layout-align="start start">
                                <span class="s1 m-r-2 m-t-2"></span>
                                <div>
                                    <p class="p1 m-b-1">{{item2.day}}<span class="m-l-2">{{item2.time}}</span></p>
                                    <p class="fs26 fwb5 extra-light-black">{{item2.state}}</p>
                                </div>
                            </div>
                            <p class="state">改为正常</p>
                        </div>
                    </div>
                </div>
                <p class="p" style="color:#aaa">本月考勤尚未结束</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Latedetail',
    data() {
        return {
            detailList: [
                {
                    name: '出勤天数',
                    frequency: 20,
                    time: '100分钟',
                    child: [
                        {
                            day: '2018.6.66',
                            time: '9:30',
                            state: '迟到'
                        },
                        {
                            day: '2018.6.66',
                            time: '9:30',
                            state: '迟到'
                        }
                    ]
                },
                {
                    name: '迟到次数',
                    frequency: 6,
                    time: '66分钟',
                    child: [
                        {
                            day: '2018.9.10',
                            time: '9:30',
                            state: '迟到'
                        },
                        {
                            day: '2018.9.10',
                            time: '9:30',
                            state: '迟到'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        showHide(index) {
            if (this.$refs.box[index].style.display === 'none') {
                this.$refs.arrow[index].style.transform = 'rotateX(0deg)';
                this.$refs.box[index].style.display = 'block';
            } else {
                this.$refs.arrow[index].style.transform = 'rotateX(180deg)';
                this.$refs.box[index].style.display = 'none';
            }
        }
    }
};
</script>
<style lang="less">
@import '~@/styles/_agile';
.Latedetail {
    .ml20{
        margin-left: 20px;
    }
    .fwb5 {
        font-weight: 500;
    }
    .mt24 {
        margin-top: 24px;
    }
    background: #F5F5F5;
    min-width: 100vw;
    min-height: 100vh;
    padding-top: 12px;
    .main {
        width: 92%;
        margin: 0 auto;
        border-radius: 4px;
        background: @white;
        .top{
            padding: 16px 18px 0 20px;
        }
        .img{
            width: 56px;
            height: 56px;
            border-radius: 50%;
        }
        .d1 {
            border-bottom: 1px solid #eee; /*no*/
            padding-bottom: 18px;
            padding-left: 20px;
            padding-right: 18px;
            .Proportion {
                height:8px;
                background:rgba(229,229,231,1);
                border-radius:4px;
                .s1 {
                    width:(10/31)*100%;
                    background:linear-gradient(135deg,rgba(180,77,206,1) 0%,rgba(156,29,171,1) 100%);
                    box-shadow:0px 2px 9px 0px rgba(164,58,142,0.35);
                    border-radius:4px;
                    position: relative;
                    .a::before{
                        content:'';
                        position:absolute;
                        width: 15px;
                        top:0;
                        bottom:0;
                        right:-5px;
                        z-index:1;
                        background:@white;
                        box-shadow:0px 2px 9px 0px rgba(255,255,255,1);
                        transform:skew(-60deg);
                    }
                }
            }
        }
        .InfoList {
            padding: 6px 20px 16px 20px;
            .list {
                padding: 11px 0 11px 0;
                border-bottom: 1px solid #eee; /*no*/
            }
            .p {
                text-align: center;
                margin-top: 37px;
                margin-bottom: 4px;
            }
            .box {
                .content {
                    border-bottom:1px solid #eeeeee;
                    position: relative;
                    padding: 12px;
                    background: #F5F5F5;
                    .s1 {
                        width:5px;
                        height:5px;
                        background: #aaaaaa;
                    }
                    .p1 {
                        font-size: 14px;
                        font-weight: 500;
                    }
                    .state {
                        position: absolute;
                        width: 60px;
                        height: 20px;
                        line-height: 17px;
                        text-align: center;
                        border:1px solid rgba(180,77,206,0.3);
                        background:rgba(180,77,206,0.1);
                        font-size: 12px;
                        color: #B44DCE;
                        right: 15px;
                        bottom: 12px;
                    }
                }
            }
        }
    }
}
</style>
