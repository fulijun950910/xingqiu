<template>
    <div class="edite-address">
        <div class="edite-title fs40 color-black fwb">
            {{title}}
        </div>
        <div class="form-con">
        <mt-field label="收货人" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="联系电话" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="所在地区" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="详细地址" placeholder="请输入用户名" v-model="username"></mt-field>
        </div>
        <mt-picker value-key="name" :visibleItemCount="visibleItemCount" :slots="slots" @change="onValuesChange"></mt-picker>
    </div>
</template>
<script>
import { Field, Picker } from 'mint-ui';
import Vue from 'vue';
import api_party from 'services/api.party';
Vue.component(Field.name, Field);
Vue.component(Picker.name, Picker);
export default {
    data() {
        return {
            username: null,
            title: '编辑收货地址',
            slots: [
                {
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                },
                {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                },
                {
                    flex: 1,
                    values: [],
                    className: 'slot3',
                    textAlign: 'center'
                }
            ],
            visibleItemCount: 5,
            provice: []
        };
    },
    methods: {
        onValuesChange(picker, values) {
            // this.loadCity(values[0].code);
        },
        loadProvince() {
            api_party.getProvince().then(msg=> {
                this.provice = msg.data;
                msg.data.map((item, index)=> {
                    this.slots[0].values.push({name: item.name, code: item.code});
                });
            }, msg=> {

            });
        },
        loadCity(code) {
            api_party.getCity(code).then(msg=> {
                msg.data.map((item, index)=> {
                    this.slots[2].values.push(item.name);
                });
            }, msg=> {

            });

        }
    },
    mounted() {
        this.loadProvince();
    }
};
</script>

<style lang="less" scoped>
@import '~styles/_style';
.edite-address {
    padding: 30px 15px;
    .edite-title{
        margin-bottom: 25px;
    }
    .form-con{
        .mint-cell.mint-field{
            background: @extra-light-gray;
            margin-bottom: 10px;
            border-radius: 7px;
             color: @color-black;
             font-size: 15px;
            .mint-cell-title{
                color: @color-black;
            }
        }
    }
}
</style>
