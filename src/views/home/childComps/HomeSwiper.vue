<template>
  <Swiper>
    <SwiperItem v-for="item in banners" class="swiper-item">
      <a :href="item.link">
        <img :src="item.image" @load="swiperImage">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'

  export default {
    name: 'HomeSwiper',
    props: {
      banners: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      return {
        isLoad:false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      swiperImage(){
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    },
  };
</script>

<style scoped>

</style>
