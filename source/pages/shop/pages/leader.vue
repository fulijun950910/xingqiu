<template>
    <div class="leaser-page">
       <div class="top-title" layout="column" layout-align="center center">
           <h3>美博汇</h3>
           <p>Demo</p>
       </div>
       <div class="phone" @click="toIndex()">
           <img :src="require('assets/imgs/shop/phone.png')" alt="">
       </div>
       <div class="bottom">
           <p>程序猿正在加速开发中，敬请期待</p>
       </div>
       <div class="mask" layout="column" layout-align="center center" v-if="showmask">
           <div class="notice" @click="toIndex">
               <h3>欢迎使用</h3>
            <div class="start" layout="row" layout-align="center center">
                开始体验
                <m-icon link="icon-huaban2"></m-icon>
            </div>
           </div>
       </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showmask: false
        };
    },
    methods: {
        toIndex() {
            this.$router.push('/index');
        }
    },
    mounted() {
        setTimeout(() => {
            this.showmask = true;
        }, 1500);
    }
};
</script>
<style lang="less">
      .leaser-page{
          width: 100%;
          height: 100%;
          overflow: hidden;
          background:url('~assets/imgs/shop/leader-bg.jpg');
          background-size:100% 100%;
          .top-title{
              padding: 10px 0 10px 0;
              margin-bottom:10px;
              h3{
                  color: white;
                  font-size: 31px;
                  line-height: normal;
              }
              p{
                  font-size: 15px;
                  color: white;
                  line-height: normal;
                //   margin-top: 5px;
                  letter-spacing:4px;
              }
          }
          .phone{
              img{
                  width: 100%;
                  height: auto;
                  margin-top: -35px;
              }
          }
          .bottom{
              margin-top: -30px;
              p{
                  color: white;
                  font-size: 12px;
                  text-align: center;
              }
          }
          .mask{
             position: fixed;
             z-index: 9999;
             top:0;
             bottom:0;
             left: 0;
             right: 0;
             background: rgba(0,0,0,0.8);
             .notice{
                 text-align: center;
                 h3{
                     font-size: 18px;
                     font-weight: normal;
                     color: white;
                     margin-bottom: 16px;
                 }
                 .start{
                     padding: 10px 15px;
                     border: 1px solid white;
                     font-size: 27px;
                     color: white;
                     position: relative;
                     .icon{
                         font-size: 60px;
                         color:white;
                         position: absolute;
                         animation: tiao 3s infinite;
                     }
                 }
             }
          }
      }
      @keyframes tiao {
          0% {
              transform: translateY(50px) rotate(-30deg);
          }
          100% {
              transform: translateY(0) rotate(-30deg);
          }
      }
</style>
