<template>
    <div class="customer-detail" v-title="'顾客档案'">
        <!-- 顾客信息 -->
        <div class="profile text-center">
            <img class="avatar round m-b-1" :src="currentCustomer.avatarId | mSrc2" alt="">
            <p class="name">{{ currentCustomer.name }}</p>
            <p class="phone color-gray m-b-4">{{ currentCustomer.phone | phone }} <m-icon xlink="#icon-tel-alt"/></p>
            <p class="color-gray">
                <span v-for="item in tags" :key="item.id">
                    {{ item.tagName }} <span class="p-l-1 p-r-1">·</span>
                </span>
                <span class="extra-light-black" @click="moreTags">更多 <m-icon xlink="#icon-weibiaoti34"/></span>
            </p>
        </div>
        
        <!-- 顾客中心：打标签、编组、发短信、发券 -->
        <div class="info" layout="row" layout-align="space-around center">
            <div class="item">
                <p class="m-b-2">
                    <span class="border round"><m-icon xlink="#icon-tag-alt"/></span>
                </p>
                <p>打标签</p>
            </div>
            <div class="item">
                <p class="m-b-2">
                    <span class="border round"><m-icon xlink="#icon-add"/></span>
                </p>
                <p>编组</p>
            </div>
            <div class="item">
                <p class="m-b-2">
                    <span class="border round"><m-icon xlink="#icon-add"/></span>
                </p>
                <p>发短信</p>
            </div>
            <div class="item">
                <p class="m-b-2">
                    <span class="border round"><m-icon xlink="#icon-add"/></span>
                </p>
                <p>发券</p>
            </div>
        </div>

        <!-- 跟进目录 -->
        <div class="follow-up">
            <h5 layout="row" layout-align="space-between center">
                <span class="fs40">跟进目录</span>
                <span class="color-primary"><m-icon xlink="#icon-add"/></span>
            </h5>
            <div class="content-block" v-if="timeDataList && timeDataList.length">
                <m-timeline :values="timeDataList"></m-timeline>
            </div>
        </div>


    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import mTimeline from 'components/m-timeline';

export default {
    name: 'customer-detail',
    props: {
        customerId: {
            required: true
        }
    },
    components: {
        mTimeline
    },
    computed: {
        ...mapState({
            currentCustomer: state => state.customers.currentCustomer
        }),
        ...mapGetters({
        }),
        tags() {
            return this.currentCustomer.tags || [];
        }
    },
    data() {
        return {
            timeDataList: []
        };
    },
    mounted() {
        this.$store.dispatch('customers/LOAD_CURRENT_CUSTOMER', this.customerId);
    },
    methods: {
        moreTags() {
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';

.customer-detail {
    border-top: 1px solid #eee;
    font-size: 14px;
    .profile {
        padding: 20px 0 16px 0;
        .avatar {
            display: inline-block;
            vertical-align: middle;
            width: 80px;
            height: 80px;

        }
        .name {
            font-size: 20px;
            color: @color-black;
            height: 28px;
            line-height: 28px;
        }
    }
    .info {
        margin: 0 12px;
        margin-bottom: 16px;
        padding: 12px 4px;
        background:rgba(255,255,255,1);
        box-shadow:0px 5px 33px 0px rgba(183,183,183,0.25);
        border-radius:4px;
        .item {
            text-align: center;
            .border {
                color: @color-primary;
                display: inline-block;
                width: 44px;
                height: 44px;
                line-height: 46px;
                border: 1px solid #eee;
                .icon {
                    font-size: 24px;
                }
            }
        }
    }
    .follow-up {
        background-color: white;
        padding: 12px;
        h5 {
            margin: 0;
        }
        .content-block {
            padding: 12px;
            .item {
                border: 1px solid #eee;
                border-radius: 4px;
                padding: 8px 12px;
                margin: 12px;
                line-height: 24px;
            }
        }
    }

}
</style>
