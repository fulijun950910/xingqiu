<template>
    <div v-title="'服务记录'" class="service-record-list">
        <div class="header">
            <div class="text-center">
                <p class="top-title">本周服务</p>
            </div>
            <div layout="row" class="option-panel">
                <div class="text-center" :class="{ 'option-selected': query.type == 1 }" flex @click="changeType(1)">
                    <p>45</p>
                    <p>待记录</p>
                </div>
                <span class="interval-line"></span>
                <div class="text-center" :class="{ 'option-selected': query.type == 2 }" flex @click="changeType(2)">
                    <p>45</p>
                    <p>已记录</p>
                </div>
            </div>
        </div>
        <!-- <ul @click="goEdit($event)">
            <li title="1">服务小计列表项1</li>
            <li title="2">服务小计列表项2</li>
        </ul> -->
    </div>
</template>
<script>
export default {
    name: 'service-record-list',
    components: {},
    data() {
        return {
            query: {
                type: 1
            }
        };
    },
    mounted() {},
    methods: {
        loadData() {
            // TODO: 加载数据
        },
        changeType(type) {
            this.query.type = type;
            this.loadData();
        },
        goEdit(event) {
            this.$router.push({
                name: 'service-record-edit',
                params: {
                    recordId: event.target.title
                }
            });
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.service-record-list {
    min-height: 100%;
    background-color: @color-bg;
    .header {
        background-image: linear-gradient(-135deg, #943FD2 4%, #C700CB 82%);
        .top-title {
            color: @white;
            line-height: 1;
            font-size: @fs28;
            margin: @l40 auto;
            text-align: center;
            position: relative;
            display: inline-block;
            .line {
                content: '';
                width: @l32;
                opacity: 0.5;
                height: @l8 / 2;
                position: absolute;
                top: (@fs28 - @l8) / 2;
                background-color: @white;
            }
            &:after {
                .line;
                left: -@l32 - @l16;
            }
            &:before {
                .line;
                right: -@l32 - @l16;
            }
        }
        .option-panel {
            color: @white;
            font-size: @fs32;
            div {
                padding: @l32 0;
            }
            p {
                opacity: 0.5;
            }
        }
        .option-selected {
            position: relative;
            p {
                opacity: 1;
            }
            &:after {
                left: 50%;
                content: '';
                height: @l8;
                width: 60px;
                bottom: 0px;
                position: absolute;
                background-color: @white;
                transform: translateX(-50%);
            }
        }
        .interval-line {
            width: 1px;
            /*no*/
            max-width: 1px;
            /*no*/
            margin: @l32 0;
            background-color: @white;
        }
    }
}
</style>
