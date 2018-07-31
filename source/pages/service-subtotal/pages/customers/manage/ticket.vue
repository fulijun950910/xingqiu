<template>
    <div class="customer-manage-ticket">
        <!-- 添加标签 -->
        <div class="head">
            
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'customer-manage-ticket',
    components: {
    },
    computed: {
        ...mapState({
        }),
        ...mapGetters({
        })
    },
    data() {
        return {
        };
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style lang="less">
@import '~styles/_agile';

.customer-manage-ticket {
    font-size: 14px;
    .head {
        padding: 20px 0 16px 0;
    }
}
</style>
