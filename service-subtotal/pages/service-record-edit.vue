<template>
    <div>
        <!-- 服务小计编辑 -->
        <record-edit :model="dataModel" :type="1"></record-edit>
    </div>
</template>
<script>
import recordEdit from './module/record-edit.vue';
export default {
    name: 'service-record-edit',
    components: {
        recordEdit
    },
    data() {
        return {
            dataModel: {
                id: 138239242342,
                merchantId: 138239242342,
                storeId: 123322333547,
                content: '土豪的客户',
                imageIds: '1022836234,19344397394',
                type: 1, // 1=小计，2=客户关怀
                employeeId: 138239242342,
                employeeName: '张及时',
                memberId: 19344397394,
                memberName: '李老板',
                orderId: 19344397394,
                tags: '1022836234,19344397394',
                remind: 1, // 0=不提醒，1=提醒
                remindTime: '2017-07-01 00:00:00', // remind=1时必传
                remindContent: '李老板今天要来做项目' // remind=1时必传
            }
        };
    },
    methods: {}
};
</script>
<style lang="less">
@import '~styles/_agile.less';
</style>
