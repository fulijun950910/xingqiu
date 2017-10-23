<template>
    <div class="profiles-cell" layout="row" layout-align="space-between start">
        <div class="ava-box">
            <img  :src="value.avaId | mSrc(80, 80, require('assets/imgs/avatar.png'))" alt="">
        </div>
        <div flex class="content-box">
            <div class="info" layout="row" layout-align="space-between center">
                <div>
                    <p class="name fwb">李慧珍</p>
                    <p class="ft-light dark-gray">{{'15212349832' | mobile}}</p>
                </div>
                <div class="show">
                    <p class="ft-light dark-gray text-right">上次消费</p>
                    <p>{{moment().calendar()}}</p>
                </div>
            </div>
            <div class="cost" :class="{show: show}">
                <p><m-icon class="color-golden" xlink="#icon-arrow-up"/> {{'普通会员'}} <span class="pull-right" @click.stop="$emit('update:show', !show)">更多 <m-icon :xlink="show?'#icon-arrow-up':'#icon-arrow-down'"/></span></p>
                <p><m-icon class="color-golden" xlink="#icon-arrow-up"/> {{'一个月未消费'}}</p>
                <p><m-icon class="color-golden" xlink="#icon-arrow-up"/> {{'普通会员'}}</p>
                <p><m-icon class="color-golden" xlink="#icon-arrow-up"/> {{'一个月未消费'}}</p>
                <p><m-icon class="color-golden" xlink="#icon-arrow-up"/> {{'普通会员'}}</p>
                <p><m-icon class="color-golden" xlink="#icon-arrow-up"/> {{'一个月未消费'}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';    // eslint-disable-line
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
            moment
        };
    },
    methods: {
    }
};
</script>

<style lang="less">
    @import '~styles/_agile.less';
    @golden: #ddc593;
    .color-golden {
        color: @golden;
    }
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
                height: 40px;
                overflow: hidden;
                p {
                    color: @extra-light-black;
                    font-size: 12px;
                    height: 20px;
                    line-height: 20px;
                    margin: 0;
                }
                &.show {
                    height: auto;
                }
            }
        }
    }
</style>
