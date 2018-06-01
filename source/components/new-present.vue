<template>
    <div class="new-present" :class="{'showShack':showShack}" @click.stop="hideMask">
      <div class="new-get">
          <span class="money">
              <img class="img-auto" :src="require('assets/imgs/integral-mall/money-icon.png')" alt="">
          </span>
          <div layout="column" class="new-out-con" layout-align="center center">
              <div class="text">
                  <img class="img-auto" :src="require('assets/imgs/integral-mall/present-text.png')" alt="">
              </div>
              <div class="click-now">
                  <span class="click-wallet">
                         <img class="img-auto" :src="require('assets/imgs/integral-mall/red-packeg.png')" alt="">     
                  </span>
                  <img @click="toUse" class="img-auto" :src="require('assets/imgs/integral-mall/use-now.png')" alt="">                  
              </div>
          </div>
      </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                showShack: false
            };
        },
        props: {
            showMask: {
                type: Boolean,
                default: false

            }
        },
        methods: {
            hideMask() {
                this.$emit('hideMask');
                this.showShack = false;
            },
            animate() {
                this.showShack = true;
            },
            toUse() {
                // 链接到使用
                location.href = '/service/integral-mall.html#/recharge-message';
            }
        },
        mounted() {
            if (this.showMask) {
                setTimeout(()=> {
                    this.animate();
                }, 0);
            };
        }
    };
    
</script>

<style lang="less" scoped>
.new-present{
    .img-auto{
        width: 100%;
        height: auto;;
    }
    position: fixed;
    background: transparent;
    transition: all ease .5s;
    width: 100%;
    height: 100%;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    transform: translateY(-100%);
    transition: all ease .3s;
    .new-get{
        position: absolute;
        width: 280px;
        height: 360px;
        left: 50%;
        top:50%;
        transform: translateX(-140px) translateY(-720px);
        transition: all ease .8s;
        background: url('~assets/imgs/integral-mall/present-bg.png');
        background-size: 100% 100%;
        .money{
            display: block;
            width: 70px;
            height: 70px;
            position: absolute;
            right: -15px;
            top: -35px;
        }
        .new-out-con{
            .text{
                margin: 50px 30px 37.5px 30px;
            }
            .click-now{
                width: 160px;
                height: 80px;
                margin-top: 35px;
                position: relative;
                img{
                    position: relative;
                    z-index: 2;
                }
                .click-wallet{
                    position: absolute;
                    width: 90px;
                    height: 45px;
                    z-index: 1;
                    top:-28px;
                    left: 25px;
                }
            }
        }
    }
}
.new-present.showShack {
    background: rgba(0,0,0,.5);   
    transform: translateY(0); 
    .new-get{
        transform: translateX(-140px) translateY(-180px);
    }
} 
</style>

