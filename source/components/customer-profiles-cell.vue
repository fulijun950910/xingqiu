<template>
    <div class="profiles-cell" layout="row" layout-align="space-between start">
        <div class="ava-box">
            <img :src="value.avatarId | mSrc(80, 80, require(`assets/imgs/${gender[value.gender || 0]}.png`))" :alt="value.name">
        </div>
        <div flex class="content-box">
            <div class="info" layout="row" layout-align="space-between center">
                <div>
                    <p class="name fwb">{{value.name || '-'}}</p>
                    <p v-if="$store.getters.permissionStoreAll" class="ft-light dark-gray">{{value.mobile}}</p>
                    <p v-else class="ft-light dark-gray">{{value.mobile | mobile(true)}}</p>
                </div>
                <div class="show">
                    <p class="ft-light dark-gray text-right">上次消费</p>
                    <p class="text-right" v-if="value.order.lastConsumeDate">{{moment(value.order.lastConsumeDate).fromNow()}}</p>
                    <p class="text-right" v-else>未消费</p>
                </div>
            </div>
            <div class="cost" :class="{show: show}" @click.stop="$emit('update:show', !show)">
                <p>
                    <span class="back-golden"><m-icon xlink="#icon-huangguan"/></span> {{value.gradeName || '无会员等级'}} <span class="pull-right">更多 <m-icon :xlink="show?'#icon-arrow-up':'#icon-arrow-down'"/></span>
                </p>
                <p v-if="value.hasCard"><span class="back-golden"><m-icon xlink="#icon-card"/></span>
                    <span v-if="value.hasCard == 2">{{'已办卡客户'}}</span>
                    <span v-else>{{'未办卡客户'}}</span>
                </p>
                <p v-if="value.order.lastConsumeDate">
                    <span class="back-golden"><m-icon xlink="#icon-cost"/></span> 
                    {{moment(value.order.lastConsumeDate).fromNow()}}消费过
                </p>
                <p v-if="value.returnVisitLastDate">
                    <span class="back-golden"><m-icon xlink="#icon-telephone"/></span> 
                    {{ moment(value.returnVisitLastDate).fromNow() }}回访过
                </p>
                <p v-if="value.memberTagList">
                    <span class="back-golden"><m-icon xlink="#icon-tag-alt"/></span> 
                    {{value.memberTagList.map(x=>{return x.tagName}).slice(0, 4).join(' ')}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'customer-profiles-cell',
    props: {
        value: {
            type: Object
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            gender: ['avatar', 'male', 'female', 'avatar'],
            moment
        };
    },
    methods: {
    }
};
</script>

<style lang="less">
    @import '~styles/_agile.less';

    .profiles-cell {
        border-bottom: 1px solid #eee;
        .ava-box {
            padding: 12px;
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
        }
        .content-box {
            .info {
                border-bottom: 1px solid #eee;
                padding: 8px 12px 8px 0;
                .name {
                    font-size: 16px;
                }
            }
            .cost {
                padding: 0 12px 0 0;
                margin: 8px 0;
                height: 44px;
                overflow: hidden;
                p {
                    color: @extra-light-black;
                    font-size: 12px;
                    line-height: 20px;
                    margin-top: 4px;
                    .back-golden {
                        margin-right: 4px;
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        line-height: 14px;
                        border-radius: 4px;
                        background-color: @golden;
                        text-align: center;
                        .icon {
                            vertical-align: middle;
                            color: white;
                        }
                    }
                    &:first-child {
                        margin: 0;
                    }
                }
                &.show {
                    height: auto;
                }
            }
        }
    }
</style>
