<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" />
      <scroll class="content" ref="dScroll">
        <detail-swiper :topImages="topImages" @dimgLoad="dimgLoad" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
        <detail-goods-info :detail-info="detailInfo" @listImgLoad="listImgLoad" />
        <detail-goods-params :goods-param="goodsParam" />
        <detail-comment-info :comment-info="commentInfo" />
        <detail-comment-info :comment-info="commentInfo" />
      </scroll>
    </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailGoodsParams from './childComps/DetailGoodsParams.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import { getDetail, Goods, Shop, GoodsParam } from '../../network/detail.js'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailGoodsParams,
      DetailCommentInfo,
      Scroll
    },
    data() {
        return {
          id:null,
          topImages:[],
          goods:{},
          shop:{},
          detailInfo:{},
          goodsParam:{},
          commentInfo:{}
        };
    },
    created() {
      //1.保存传入的id
      this.id = this.$route.params.id
      //2.根据id请求详细数据
      getDetail(this.id).then(res => {
        //1.获取数据
        console.log(res)
        const data = res.result
        //2.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages
        //3.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //4.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        //5.获取商品详情信息
        this.detailInfo = data.detailInfo
        //6.获取商品参数信息
        this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //7.获取评论信息
        this.commentInfo = data.rate
      })
    },
    computed: {
    },
    methods: {
      dimgLoad(){
        this.$refs.dScroll.refresh()
      },
      listImgLoad(){
        this.$refs.dScroll.refresh()
      }
    },
};
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  overflow: hidden;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100vh - 44px);
}
</style>
