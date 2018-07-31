<template>
    <div class="customer-detail" v-title="'顾客档案'">
        <!-- 顾客信息 -->
        <div class="profile">
            <img class="avatar" src="" alt="">
        </div>
        
        <!-- 顾客信息 -->
        <div class="profile">

        </div>

        <!-- 顾客信息 -->
        <div class="profile">

        </div>


    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    name: 'customer-detail',
    props: {},
    components: {},
    computed: {
        ...mapState({
        }),
        ...mapGetters({
        })
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {}
};
</script>
<style lang="less">
@import '~styles/_agile';

.customer-detail {
    .profile {
        .avatar {
            width: 80px;
            height: 80px;
        }
    }
}
</style>
