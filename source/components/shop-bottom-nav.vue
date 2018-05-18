<template>
    <div class="bottom-nav-con" layout="row" layout-align="space-around
 center">
     <div flex class="nav text-center" :class="{active:item.active}" v-for="(item,index) in menu" :key="item.value" @click="toLink(item)" layout="column" layout-align="center center">
           <m-icon :xlink="item.icon" class="fs24"></m-icon>
           <span>{{item.name}}</span>
     </div>
    </div>
</template>
<script>
export default {
    name: 'botton-nav-con',
    data() {
        return {
            menu: [
                {
                    name: '首页',
                    icon: '#icon-huabanfuben15',
                    value: 1,
                    active: false
                },
                {
                    name: '商城',
                    icon: '#icon-huabanfuben19',
                    value: 2,
                    active: false
                },
                {
                    name: '咨询',
                    icon: '#icon-huabanfuben18',
                    value: 3,
                    active: false
                },
                {
                    name: '个人',
                    icon: '#icon-huabanfuben16',
                    value: 4,
                    active: false
                }
            ]
        };
    },
    props: {
        activeType: {
            type: String,
            default: ''
        }
    },
    methods: {
        toLink(item) {
            var url = '';
            switch (item.value) {
                case 1:
                    url = '/index';
                    break;
                case 2:
                    url = '/mall';
                    break;
                case 3:
                    url = '/news';
                    break;
                case 4:
                    url = '/personal';
                    break;
            };
            this.$router.push(url);
        }
    },
    mounted() {
        this.menu.map((item1, index1) =>{
            if (item1.value == this.activeType) {
                item1.active = true;
            }
        });
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_agile';
.bottom-nav-con{
    padding: 10px 20px 0 20px;
    background: white;
    z-index: 999;
    .nav{
        text-align: center;
         color: #AAAAAA;
        .icon{
            font-size: 20px;
            display: inline-block;
        }
        span{
            font-size: 12px;
        }
    }
    .nav.active{
        .icon{
            color:#8C5EE5;
        }
        // span{
        //     color:#8C5EE5;
        // }
    }
}
</style>

