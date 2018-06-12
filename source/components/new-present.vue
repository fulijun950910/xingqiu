<template>
    <div class="new-present" :class="{'showShack':showMask}" >
        <div class="mask" @click.stop="hideMask"></div>
      <div class="new-get get-size" v-if="adsDetail.code == 'home_001'">
          <!-- 第一次进入 -->
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
      <div class="always get-size" v-if="adsDetail.code == 'home_002'">
          <img :src="require('assets/imgs/integral-mall/normal-in-5.png')" class="line" alt="">
          <img :src="require('assets/imgs/integral-mall/normal-in-4.png')" class="loading-circle" alt="">
          <!-- 任意用户进入 -->
          <div class="notice-text" layout="row" layout-align="center center">
              <img :src="require('assets/imgs/integral-mall/normal-in-3.png')" alt="">
          </div>
          <div class="notice-btn" layout="row" layout-align="center center" @click="toLink(1)">
              <span class="notice-gift">
                  <img class="btn-img" :src="require('assets/imgs/integral-mall/normal-in-6.png')" alt="">
              </span>
             <img class="btn-img" :src="require('assets/imgs/integral-mall/normal-in-2.png')" alt="">
          </div>
          <div class="bottom-text color-white" layout="row" layout-align="center center" @click="toLink(2)">
              立即兑换好礼 》
          </div>

      </div>
    </div>
</template>
<script>
    import api_party from 'services/api.party';
    export default {
        data() {
            return {};
        },
        props: {
            showMask: {
                type: Boolean,
                default: false
            },
            adsDetail: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        methods: {
            hideMask() {
                this.hideAsd();
            },
            animate() {
                this.showShack = true;
            },
            toUse() {
                // 链接到使用
                location.href = '/service/integral-mall.html#/recharge-message';
            },
            toLink(type) {
                switch (Number(type)) {
                    case 1:
                        location.href = `${this.$rootPath}integral-mall.html#/rule-entry`;
                        break;
                    case 2:
                        location.href = `${this.$rootPath}integral-mall.html#/recharge-message`;
                        break;
                }
            },
            hideAsd() {
                let parameter = {
                    partyId: this.$store.state.party.partyId,
                    userId: this.$store.state.party.id,
                    adsId: this.adsDetail.id
                };
                api_party.notShowAds(parameter).then(msg=> {
                    let tempLocal = JSON.parse(localStorage.getItem('employee'));
                    tempLocal.party.adsList = [];
                    localStorage.setItem('employee', JSON.stringify(tempLocal));
                    this.$store.commit('UPDATE_LOCAL');
                    console.log(this.$store.state.party);
                    this.$emit('hideMask');
                }, msg=> {

                });
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
    .mask{
        position: fixed;
        background: rgba(0,0,0,.5);
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }
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
    .get-size{
        position: absolute;
        width: 280px;
        height: 360px;
        left: 50%;
        top:50%;
        margin-left: -140px;
        margin-top: -180px;
        transition: all ease .8s;

    }
    .new-get{
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
    .always{
        padding: 50px 0;
        background: url('~assets/imgs/integral-mall/normal-in-1.png');
        background-size: 100% 100%;
        position: relative;
        .notice-text{
            img{
                height: 100px;
                width: auto;
            }
        }
        .notice-btn{
            position: relative;       
            margin-top: 70px;     
            .btn-img{
                width: 70%;
                height: auto;
                position: relative;
                z-index: 2;
            }
            .notice-gift{
                position: absolute;
                width: 120px;
                height: auto;
                left: 50px;
                top:-75px;
                z-index: 1;
            }

        }
        .loading-circle{
            width: 25px;
            height: auto;
            position: absolute;
            bottom: 115%;
        }
        .line{
            bottom: 85%;
            width: 15px;
            height: auto;
            position: absolute;
            left: 40px;
        }
    }
}
.new-present.showShack {
    transform: translateY(0); 
    .new-get{
        transform: translateX(-140px) translateY(-180px);
    }
} 
</style>

