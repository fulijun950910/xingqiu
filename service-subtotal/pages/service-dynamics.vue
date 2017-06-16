<template>
    <div>
        <div class="top-bar">
            <div layout="row" layout-align="start center" flex v-if="false">
                <a class="bar-btn border-r" layout="row" layout-align="center center" flex>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-search2"></use>
                    </svg>
                    <span class="bar-text">搜索</span>
                </a>
                <a class="bar-btn" layout="row" layout-align="center center" flex>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shuju"></use>
                    </svg>
                    <span class="bar-text">查看数据</span>
                </a>
            </div>
            <div class="search-input bar-btn" v-if="true">
                <div layout="row" layout-align="start center" flex>
                    <svg class="icon icon-margin" aria-hidden="true" flex>
                        <use xlink:href="#icon-search2"></use>
                    </svg>
                    <input flex="70" type="text" name="search-text" placeholder="搜索员工/工号">
                    <svg class="icon icon-close icon-margin" aria-hidden="true" flex>
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
                <ul class="employee-list">
                    <li>高拾得华</li>
                </ul>
            </div>
        </div>
        <div class="dynamics">
        </div>
    </div>
</template>
<script>
export default {
    name: 'service-dynamics',
    components: {},
    data() {
        return {};
    },
    methods: {}
};
</script>
<style lang="less">
.top-bar {
    border-bottom: 1px solid @border;
    position: relative;
    .bar-btn {
        padding: @l16 * 2 0;
    }
    .border-r {
        border-right: 1px solid @border;
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
        min-height: 200px;
        background: @white;
        border-top: 1px solid @border;
    }
    .employee-list li {
        padding: @l16 * 2;
        color: @color-black;
        font-size: @fs28;
        border-bottom: 1px solid @border;
    }
}

.dynamics {
    min-height: 700px;
}

@import '~styles/_agile.less';
</style>
