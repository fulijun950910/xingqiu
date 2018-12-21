<template>
    <div class="danxuan">
        <div @click="choseAll">
            <m-icon :class="{'color-primary' : isChecked}" :link ="isChecked ? 'icon-xuanzhong' : 'icon-weixuanzhong'"></m-icon>
            <span>全选</span>
        </div>
        <div class="list" v-for="(item,index) in list" :key="index" @click="choseOne(item)">
            <m-icon :class="{'color-primary' : item.selected}" :link = "item.selected ? 'icon-xuanzhong' : 'icon-weixuanzhong'"></m-icon>
            <p>{{item.name}}</p>
            <span>{{item.price}}</span>
            <span>{{item.count}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dan',
    data() {
        return {
            list: [
                {
                    name: '香蕉', peice: 29, count: 2
                },
                {
                    name: '苹果', peice: 29, count: 2
                },
                {
                    name: '柚子', peice: 29, count: 2
                }
            ]
        };
    },
    methods: {
        choseAll() {
            let selected = this.isChecked;
            this.list.forEach(val => {
                this.$set(val, 'selected', !selected);
            });
        },
        choseOne(item) {
            this.$set(item, 'selected', !item.selected);
        }
    },
    computed: {
        review() {
            return this.list.filter(val => val.selected);
        },
        isChecked() {
            return this.review.length && this.review.length === this.list.length;
        }
    }
};

</script>
