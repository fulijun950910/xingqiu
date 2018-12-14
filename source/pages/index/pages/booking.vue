<template>
    <div v-title="'预约1'">
        <div class="bookingBox">
            <div class="mainBox">
                <div class="avatarBox">
                    <img  :src="data.memberAvatarId | nSrc(require('assets/imgs/avatar.png'))"/>
                </div>
                <div class="text-center">
                    <div class="text-right editBtnBox">
                        <span v-if="state == 1" @click="changeState(2)" class="editBtn"><m-icon link="icon-edit"></m-icon> 编辑</span>
                    </div>
                    <div>{{data.name}}</div>
                    <div class="fs24 color-gray"><a class="color-gray" :href="'tel:'+data.phone"><m-icon class="fs24 color-gray" link="icon-tel-alt"></m-icon> {{data.phone}}</a></div>
                </div>
                <div class="editBox">
                    <div class="textCell dateBox" layout="row" layout-align="start start">
                        <div class="">预约日期&emsp;</div>
                        <input :disabled="state!=2" flex type="date" v-model="bookingDate.date"/>
                        <div class="dateBoxCell" v-if="state == 2"><m-icon class="light-gray" link="icon-right-bold"></m-icon></div>
                    </div>
                    <div @click="slectView(1)" class="textCell" layout="row" layout-align="start start">
                        <div class="">到店时间&emsp;</div>
                        <div flex class="color-gray">{{bookingDate.startTime}}</div>
                        <div v-if="state == 2"><m-icon class="light-gray" link="icon-right-bold"></m-icon></div>
                    </div>
                    <div @click="slectView(2)" class="textCell" layout="row" layout-align="start start">
                        <div class="">预计结束&emsp;</div>
                        <div flex class="color-gray">{{bookingDate.endTime}}</div>
                        <div v-if="state == 2"><m-icon class="light-gray" link="icon-right-bold"></m-icon></div>
                    </div>
                    <div @click="slectView(3)" class="textCell" layout="row" layout-align="start start">
                        <div class="">预约门店&emsp;</div>
                        <div flex class="color-gray">{{data.storeId | getName(storeList)}}</div>
                        <div v-if="state == 2"><m-icon class="light-gray" link="icon-right-bold"></m-icon></div>
                    </div>
                    <div @click="slectView(5)" class="textCell" layout="row" layout-align="start start">
                        <div class="">预约内容&emsp;</div>
                        <div flex class="color-gray">
                            <cell-tag :options="bookingDate.itemList"></cell-tag>
                        </div>
                        <div v-if="state == 2"><m-icon class="light-gray" link="icon-right-bold"></m-icon></div>
                    </div>
                    <div @click="slectView(4)" class="textCell" layout="row" layout-align="start start">
                        <div class="">预约人数&emsp;</div>
                        <div flex class="color-gray">{{data.memberCount | getName(memberCountList)}}</div>
                        <div v-if="state == 2"><m-icon class="light-gray" link="icon-right-bold"></m-icon></div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start start">
                        <div class="">预约备注&emsp;</div>
                        <div flex class="color-gray">{{data.information}}</div>
                    </div>

                </div>

            </div>

            <div>
                <div v-if="state == 1">
                    <button @click="submit(1)" class="btn subBtn">确认预约</button>
                    <button @click="submit(2)" class="btn color-gray">取消预约</button>
                </div>
                <div v-else-if="state == 2">
                    <button @click="update()" class="btn subBtn">保存更新</button>
                    <button @click="init()" class="btn color-gray">返回</button>
                </div>
                <div v-else-if="state == 3">
                    <button class="btn color-gray">已确认</button>
                </div>
                <div v-else-if="state == 4">
                    <button class="btn color-gray">已成功</button>
                </div>
                <div v-else-if="state == 5">
                    <button class="btn color-gray">已作废</button>
                </div>
                <div v-else-if="state == 6">
                    <button class="btn color-gray">已取消</button>
                </div>
            </div>
        </div>
        <popup-right v-model="showView">
            <popup-right-list v-if="selectIndex==1"  :options="timeList"  title="选择到店时间" v-model="bookingDate.startTime"></popup-right-list>
            <popup-right-list v-if="selectIndex==2"   :options="timeList"  title="选择预计结束时间" v-model="bookingDate.endTime"></popup-right-list>
            <popup-right-list v-if="selectIndex==3" @change="storeChange" v-model="data.storeId"  :options="storeList"  title="选择门店" ></popup-right-list>
            <popup-right-list v-if="selectIndex==4"   :options="memberCountList"  title="选择预约人数" v-model="data.memberCount"></popup-right-list>
            <popup-right-load-list v-if="selectIndex==5" :type="1" :multiple="true"  title="选择项目" v-model="bookingDate.itemList"></popup-right-load-list>
        </popup-right>
    </div>
</template>
<script>
import Vue from 'vue';
import popupRight from 'components/popup-right';
import popupRightList from 'components/popup-right-list';
import popupRightLoadList from 'components/popup-right-load-list';
import api_booking from 'services/api.booking';
import cellTag from 'components/cell-tag';
export default {
    name: '',
    data() {
        return {
            state: 1, // 1 查看 2 编辑 3.已确认 4.已成功 5.已作废 6.已取消
            value: null,
            showPopup: false,
            pickerVisible: true,
            showView: false,
            selectIndex: 1,
            storeList: this.$store.state.storeList,
            timeList: [
                {
                    name: '00:00',
                    value: 1
                },
                {
                    name: '00:00',
                    value: 1
                }
            ],
            memberCountList: [
                { name: '1人', value: 1 },
                { name: '2人', value: 2 },
                { name: '3人', value: 3 },
                { name: '4人', value: 4 },
                { name: '5人', value: 5 },
                { name: '6人', value: 6 },
                { name: '7人', value: 7 },
                { name: '8人', value: 8 }
            ],
            bookingDate: {
                date: null,
                startTime: null,
                endTime: null,
                itemList: []
            },
            data: {
            }
        };
    },
    components: {
        'popup-right': popupRight,
        'popup-right-list': popupRightList,
        'popup-right-load-list': popupRightLoadList,
        'cell-tag': cellTag
    },
    mounted() {
        this.init();
    },
    methods: {
        slectView(index) {
            if (this.state == 2) {
                this.selectIndex = index;
                this.showView = true;
            }
        },
        changeState(state) {
            this.state = state;
        },
        storeChange() {
            this.bookingDate.startTime = null;
            this.bookingDate.endTime = null;
            this.queryStore(this.data.storeId);
        },
        init() {
            this.$indicator.open();
            let data = {
                id: this.$route.params.id
            };
            if (window.location.search) {
                data.search = window.location.search;
            };
            api_booking.getAppointment(data).then(res => {
                this.$indicator.close();
                if (!res.success) {
                    this.$toast(res.message);
                    return;
                }
                this.data = res.data;
                this.bookingDate.itemList = [];
                this.data.itemVos.forEach(item => {
                    this.bookingDate.itemList.push({
                        value: item.itemId,
                        name: item.name,
                        saleType: item.type,
                        sellingPrice: item.price
                    });
                });
                this.bookingDate.startTime = Vue.filter('amDateFormat')(this.data.startTime, 'HH:mm');
                this.bookingDate.endTime = Vue.filter('amDateFormat')(this.data.endTime, 'HH:mm');
                this.bookingDate.date = Vue.filter('amDateFormat')(this.data.startTime, 'YYYY-MM-DD');
                this.queryStore(this.data.storeId);
                if (this.data.status == 1) {
                    this.state = 1;
                } else if (this.data.status == 2) {
                    this.state = 3;
                } else if (this.data.status == 3) {
                    this.state = 4;
                } else if (this.data.status == 4) {
                    this.state = 5;
                } else if (this.data.status == 5) {
                    this.state = 6;
                }
            });
        },
        queryStore(storeId) {
            this.$indicator.open();
            api_booking.getStoreInfo(storeId).then(res => {
                if (!this.$store.getters.merchantId || res.data.merchantId != this.$store.getters.merchantId) {
                    window.location.href = this.$signLocation;
                };
                this.$indicator.close();
                let dataList = [];
                let start_time = new Date(Vue.filter('amDateFormat')(this.data.startTime, 'YYYY/MM/DD') + ' ' + res.data.appoinmentTimeStart + ':00');
                let end_time;

                if (res.data.appoinmentTimeEnd.slice(0, 2) >= 24) {
                    res.data.appoinmentTimeEnd = (res.data.appoinmentTimeEnd.slice(0, 2) % 24) + ':' + res.data.appoinmentTimeEnd.slice(-2);
                    end_time = new Date(Vue.filter('amDateFormat')(new Date(Vue.filter('amDateFormat')(this.data.startTime, 'YYYY/MM/DD')).setDate(new Date(Vue.filter('amDateFormat')(this.data.startTime, 'YYYY/MM/DD')).getDate() + 1), 'YYYY/MM/DD') + ' ' + res.data.appoinmentTimeEnd + ':00');
                } else {
                    end_time = new Date(Vue.filter('amDateFormat')(this.data.startTime, 'YYYY/MM/DD') + ' ' + res.data.appoinmentTimeEnd + ':00');
                }
                // 计算差值
                let date = end_time.getTime() - start_time.getTime();
                let minute = Math.floor(date / (60 * 1000));
                let count = (minute / 30);
                for (let i = 0; i <= count; i++) {
                    dataList.push({
                        name: Vue.filter('amDateFormat')(start_time, 'HH:mm'),
                        value: Vue.filter('amDateFormat')(start_time, 'HH:mm')
                    });
                    start_time.setMinutes(start_time.getMinutes() + 30);
                }
                this.timeList = dataList;
            });
        },
        update() {
            let itemList = [];
            this.data.startTime = Vue.filter('amDateFormat')(this.bookingDate.date, 'YYYY-MM-DD') + ' ' + this.bookingDate.startTime + ':00';
            this.data.endTime = Vue.filter('amDateFormat')(this.bookingDate.date, 'YYYY-MM-DD') + ' ' + this.bookingDate.endTime + ':00';
            if (new Date(this.data.startTime) > new Date(this.data.endTime)) {
                this.$toast('预计结束时间不得早于到店时间');
                return;
            }
            this.bookingDate.itemList.forEach(item => {
                itemList.push({
                    itemId: item.value,
                    name: item.name,
                    type: item.saleType,
                    price: item.sellingPrice
                });
            });
            this.data.itemVos = itemList;
            api_booking.updateAppointment(this.data).then(res => {
                this.changeState(1);
                this.$toast('修改成功');
            });
        },
        submit(type) {
            api_booking.submitAppointment(this.$route.params.id, type).then(res => {
                this.$toast('修改成功');
                this.init();
            });
        }
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_agile';
@color-link:#7386b6;
.bookingBox{
    min-height:100vh;
    padding: 60px 20px 0;
    background:@bg-gray;
    .dateBox{
        position:relative;
        .dateBoxCell{
            position:absolute;
            top:12px;
            right:0;
        }
        input{
            position: relative;
            z-index: 2;
        }
    }
    .avatarBox{
        position:absolute;
        top:0;
        left:50%;
        margin-top:-35px;
        margin-left:-35px;
        img{
            width:70px;
            height:70px;
            border-radius:50%;
        }
    }
    .mainBox{
        background:#fff;
        border-radius:2px;
        border:1px solid @border-gay;
        padding:4px;
        position:relative;
    }
    .editBtnBox{
        height:32px;
    }
    .editBtn{
        background:@bg-gray;
        color:@color-link;
        font-size: @fs24;
        border-radius:2px;
        padding:4px 10px;
        display:inline-block;
    }

    .editBox{
        margin:10px;
    }
    .textCell{
        padding:10px 0;
        &:not(:first-child){
            border-top:1px solid @border-gay;
        }
    }
    .btn{
        width:100%;
        border-radius: 2px;
        padding:8px 0;
        margin-top:15px;
        background:transparent;
    }
    .subBtn{
        color:#fff;
        background:@color-primary;
    }
}
.popup{
    height: 70%;
    width: 100%;
    .popup-box{

    }
}
</style>
