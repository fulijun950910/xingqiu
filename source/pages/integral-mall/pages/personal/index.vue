<template>
    <div class="personal-container" v-title="'我的星球'">
        <div class="top-detail" layout="column" layout-align="space-between center" flex>
            <div class="person-describtion" layout="row" layout-align="space-between center" flex>
                                <div>
                    <div class="fs34 color-white font-60">Hi,{{dataModel.name}}</div>
                </div>
                <div class="m-r-2">
                    <div class="img-con">
                        <img :src="dataModel.avatarFileId | nSrc(require('assets/imgs/female.png'))" alt="">
                        <file @click="changeAvatar" v-model="logoImage" :proportion="{w:1, h:1}"></file>
                    </div>
                </div>
            </div>
            <div class="bottom-detail" layout="row" layout-align="start center" flex>
                <div flex="70" layout="column">
                    <div  class="color-white fs30 doudou">
                        <span class="color-white">{{data.doudouBalance}}</span> 美豆豆
                    </div>
                    <!-- <div layout="row" layout-align="start center" class="color-white">- 可提取{{data.doudouPresent}}个美豆豆</div> -->
                    <div  class="fs24 color-white  m-t-1" @click="goPayNotes">查看收支明细 ></div>                    
                </div>
                <div flex="30" class="start-play" layout-align="start center">
                    <div flex></div>
                    <span @click="goRuleEntry" class="fs28 color-white text-center">开始玩转</span>
                </div>
            </div>
        </div>
        <div class="list-personal" flex>
            <div layout="row" class="item" layout-align="space-between center">
                <span class="color-black fs28"><m-icon class="color-gray fs30" xlink="#icon-shenfen"></m-icon>登入账号身份</span>
                <span class="color-gray">{{party.userType | userType}}</span>
            </div>
            <div layout="row" class="item" layout-align="space-between center" @click="routeTo(3)">
                <span class="color-black fs28"><m-icon class="color-gray fs30" xlink="#icon-wodedingdan"></m-icon>我的订单</span>
                <span class="color-gray right-icon text-right"><m-icon xlink="#icon-zuojiantou"></m-icon></span>
            </div>
            <div layout="row" class="item" layout-align="space-between center" @click="routeTo(9)">
                <span class="color-black fs28"><m-icon class="color-gray fs30" xlink="#icon-navicon-cgdh"></m-icon>我的采购单</span>
                <span class="color-gray right-icon text-right"><m-icon xlink="#icon-zuojiantou"></m-icon></span>
            </div>
            <div layout="row" class="item" layout-align="space-between center" @click="routeTo(8)">
                <span class="color-black fs28"><m-icon class="color-gray fs30" xlink="#icon-jieshao"></m-icon>推荐商户列表</span>
                <span class="color-gray right-icon text-right"><m-icon xlink="#icon-zuojiantou"></m-icon></span>
            </div>
            <div layout="row" class="item" layout-align="space-between center" @click="routeTo(4)">
                <span class="color-black fs28"><m-icon class="color-gray fs30" xlink="#icon-gerenxinxi"></m-icon>个人信息</span>
                <span class="color-gray right-icon text-right"><m-icon xlink="#icon-zuojiantou"></m-icon></span>
            </div>
            <div layout="row" class="item" layout-align="space-between center" @click="routeTo(5)">
                <span class="color-black fs28"><m-icon class="color-gray fs30" xlink="#icon-wodedizhi"></m-icon>我的地址</span>
                <span class="color-gray right-icon text-right"><m-icon xlink="#icon-zuojiantou"></m-icon></span>
            </div>
            <div layout="row" class="item" layout-align="space-between center" @click="routeTo(6)">
                <span class="color-black fs28"><m-icon class="color-gray fs30" xlink="#icon-kefu"></m-icon>客服</span>
                <span class="color-gray right-icon text-right"><m-icon xlink="#icon-zuojiantou"></m-icon></span>
            </div>
            <div layout="row" class="item" layout-align="space-between center" @click="routeTo(7)">
                <span class="color-black fs28"><m-icon class="color-gray fs30" xlink="#icon-11"></m-icon>修改密码</span>
                <span class="color-gray right-icon text-right"><m-icon xlink="#icon-zuojiantou"></m-icon></span>
            </div>
            <div layout="row" class="item" layout-align="space-between center" @click="signOut()">
                <span class="color-black fs28"><m-icon class="color-gray fs30" xlink="#icon-tuichu"></m-icon>退出登陆</span>
                <span class="color-gray right-icon"></span>
            </div>
        </div>
        <div class="bottom-tab color-gray" layout="row" layout-align="start center">
            <div layout="column" flex="50" @click="routeTo(1)" layout-align="center center" class="item">
                <div><m-icon class="icon "  xlink="#icon-yuzhouxingqiu-21"></m-icon></div>
                <div>首页</div>
            </div>
            <div layout="column" flex="50" @click="routeTo(2)" layout-align="center center" class="item act">
                <div><m-icon class="icon "  xlink="#icon-xingming"></m-icon></div>
                <div>我的</div>
            </div>
        </div>
        <customer-service v-if="showService"></customer-service>
    </div>
</template>
<script>
    import api_party from 'services/api.party';
    import api_file from 'services/api.file';
    import file from 'components/file-slice';
    import customerService from 'components/integral-mall/customer-service';
    export default {
        data() {
            return {
                employee: JSON.parse(localStorage.getItem('employee')),
                data: {},
                logoImage: {},
                dataModel: {},
                showService: false,
                party: this.$store.state.party
            };
        },
        components: {
            file,
            customerService
        },
        methods: {
            load() {
                api_party.doudouAccount(this.employee.party.partyId).then(msg => {
                    this.data = msg.data;
                }, msg => {
                });
            },
            loadEmployeeData() {
                this.$indicator.open();
                api_party.getEmployee(this.$store.state.user.id).then(res => {
                    this.$indicator.close();
                    this.dataModel = res.data;
                    this.$store.state.employeeData = this.dataModel;
                    console.log(this.$store.state);
                });
                api_party.getAccount(this.$store.state.party.partyId).then(res => {
                    this.blanceTotal = res.data.doudouBalance;
                });

            },
            async changeAvatar(data) {
                let resData = await api_file.uploadImage(data);
                console.log(resData);
                let empData = {
                    id: this.dataModel.id,
                    userId: this.dataModel.userId,
                    avatarFileId: resData.data
                };
                api_party.changeEmpData(empData).then(res => {
                    this.loadEmployeeData();
                });
            },
            goPayNotes() {
                window.location.href = `${this.$rootPath}index.html#/payNotes/${this.data.id}`;
            },
            goRuleEntry() {
                this.$router.push({name: 'rule-entry'});
            },
            routeTo(type) {
                switch (Number(type)) {
                    case 1:
                        location.href = `${this.$rootPath}index.html#/main`;
                        break;
                    case 2:
                        this.$router.push('/personal');
                        break;
                    case 3:
                        this.$router.push('/order-list');
                        break;
                    case 4:
                        location.href = `${this.$rootPath}index.html#/userinfo`;
                        break;
                    case 5:
                        this.$router.push('/address-list/view');
                        break;
                    case 6:
                        this.showService = !this.showService;
                        break;
                    case 7:
                        this.$router.push('/change-pwd');
                        break;
                    case 8:
                        this.$router.push('/supplier-list');
                        break;
                    case 9:
                        this.$router.push('/b2b-order-list');
                        break;
                };
            },
            signOut() {
                let data = {
                    employeeId: this.$store.state.user.id,
                    userId: this.$store.state.user.userId
                };
                this.$indicator.open();
                api_party.unbind(data).then(res => {
                    this.$indicator.close();
                    localStorage.clear();
                    window.location.href = this.$signLocation;
                });
            }
        },
        mounted() {
            this.load();
            this.loadEmployeeData();
        }
    };
</script>

<style lang="less" scoped>
    @import '~styles/_style';

    .personal-container {
        .font-60{
            font-size: 34px;
        }
        position: relative;
        padding-bottom: 60px;
        .top-detail {
            background: url("~assets/imgs/integral-mall/344228931888025978.png") no-repeat top center;
            background-size: 100% 100%;
            // height: 355px;
            width: 100%;
            padding: 20px 15px;
            .link-box{
                background: rgba(255,255,255,0.2);
                border-radius: 1em;
                padding: 2px 8px;
            }
            .to-pay-detail {
                display: inline-block;
                padding-top: 15px;
            }
            .img-con {
                width: 60px;
                height: 74px;
                border-radius: 14px;
                border:1px solid @border-gay;
                overflow: hidden;
                display: block;
                position: relative;
                img{
                    height: 100%;
                    width: auto;
                }
            }
            .person-describtion {
                width: 100%;
                margin-bottom: 100px
            }
            .bottom-detail {
                width: 100%;
                margin-bottom: 40px;
                .doudou {
                    span {
                        font-size: 32px;
                    }
                }
                .start-play {
                    span {
                        display: block;
                        width: 80px;
                        height: 44px;
                        line-height: 44px;
                        background: linear-gradient(135deg, #FBCF66, #FE5B68);
                        box-shadow: 2px 2px #fff;
                        border-radius: 7px;
                    }
                }
            }
        }
        .list-personal {
            padding: 12px 15px;
            .item {
                padding: 16px 0;
                border-bottom: 1px solid @border-gay;
                span {
                    .icon {
                        display: inline-block;
                        margin-right: 10px;
                    }
                }
                  .right-icon{
                        margin-left: 5px;
                        .icon{
                            margin-right: 0;
                        }
                    }
            }

        }
        .bottom-tab {
            border-top:1px solid @border-gay;
            position: fixed;
            bottom:0;
            left:0;
            width:100%;
            background:@white;
            .item{
                padding:@l8;
                .icon{
                    font-size:@fs48;
                }
                &.act{
                    color: #EF668A;
                }
            }
        }
    }
</style>


