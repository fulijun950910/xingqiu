<template>
<div class="directive">
   <div class="top-search" layout="row" layout-align="center center">
            <div class="back" @click="goBack">
            <m-icon xlink="#icon-huabanfuben17" class="fs24"></m-icon>
            </div>
            <m-top-search class="search-input text-center" v-model="currentValue" @keyup.enter="submit" :placeholder="placeholder"></m-top-search>
        </div>
</div>
        
</template>
<script>
import mTopSearch from 'components/m-top-search';
import mIcon from 'components/m-icon';
export default {
    name: 'shop-search',
    components: {
        mIcon,
        mTopSearch
    },
    data() {
        return {
            value: null
        };
    },
    props: {
        placeholder: {
            type: String,
            default: ''
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        submit() {
            this.$emit('search', this.currentValue);
        }
    },
    watch: {
        currentValue(newValue, oldValue) {
            if (newValue != oldValue) {
                this.value = newValue;
            }
        }
    },
    computed: {
        currentValue: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
    // 头部搜索
    .directive{
    .top-search{
        .back{
            padding: 20px 20px 20px 0;;
        }
        .m-top-search{
            padding:10px 0;
            padding-left: 0;
            background-color: white;
            .input-panel{
                border: none;
                background: #F2F3F8;
                border-radius: 20px;
                input{
                text-align: center;                    
                }
                input[placeholder]{
                    color: @extra-shadow;
                    padding:10px 0;
                }
            }
        }
        
    }
    }

</style>

