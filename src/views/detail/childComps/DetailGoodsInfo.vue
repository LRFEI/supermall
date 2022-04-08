<template>
    <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
      <div class="info-desc clear-fix">
        <div class="start"></div>
        <div class="desc">{{detailInfo.desc}}</div>
        <div class="end"></div>
      </div>
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
      <div class="info-list">
        <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index"
         :src="item" @load="listImgLoad">
      </div>
    </div>
</template>

<script>
export default {
    name: 'DetailGoodsInfo',
    props:{
      detailInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data() {
      return {
        counter:0,
        imgLength:0
      }
    },
    methods: {
      listImgLoad(){
        //判断，当所有图片全部加载完成之后，只发送一次事件就可以了
        // if (++this.counter === this.imgLength) {
        //   this.$emit('listImgLoad')
        // }
        this.$emit('listImgLoad')
      }
    },
    watch:{
      detailInfo(){
        this.imgLength = this.detailInfo.detailImage[0].list.length
      }
    }
};
</script>

<style scoped>
.goods-info{
  padding: 20px 8px 10px;
  border: 6px solid rgba(100, 100, 100, .1);
}
.info-desc{
  padding: 0 10px;
}
.info-desc .start{
  width: 35%;
  border-top: 2px solid rgba(100, 100, 100, .3);
  padding: 0 0 15px 0;
}
.info-desc .end{
  width: 35%;
  border-bottom: 2px solid rgba(100, 100, 100, .3);
  padding: 0 0 15px 0;
  float: right;
}
.info-desc .desc{
  font-size: 14px;
}
.info-list img{
  max-width: 100%;
  height: auto;
}
.info-key{
  padding: 15px 10px 10px;
  font-size: 15px;
  font-weight: bold;
}
</style>
