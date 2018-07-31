<template>
    <div class="customer-manage" v-title="'顾客中心'">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'customer-manage',
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

.customer-manage {
    font-size: 14px;
    
}
</style>
