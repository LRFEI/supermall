<template>
  <swiper class="swiper">
    <swiper-item v-for="item in topImages" class="swiper-item">
      <img :src="item" @load="dimgLoad">
    </swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'
  export default {
    name: 'DetailSwiper',
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      dimgLoad(){
        this.$emit('dimgLoad')
      }
    },
};
</script>

<style scoped>
  .swiper{
    height: 300px;
    overflow: hidden;
  }
</style>
