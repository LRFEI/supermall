<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl2"
                 class="tab-control"
                 v-show="isTabControlFixed" />

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control
                  :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl" />
        <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 在我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符，才能进行监听 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView.vue'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'

  import { getHomeMultidata, getHomeGoods } from '../../network/home.js'
  import { debounce } from 'common/utils.js'

  export default {
    name: 'Home',
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data () {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] }
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabControlFixed:false,
        //保存离开home页时的位置信息
        saveY:0
      };
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created () {
      //1.请求首页多个数据
      this.getHomeMultidataMethod()

      //2.请求首页商品数据
      this.getHomeGoodsMethod('pop')
      this.getHomeGoodsMethod('new')
      this.getHomeGoodsMethod('sell')
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh)
      //1.通过事件总线监听商品图片加载完成
      this.$bus.$on('itemImageLoad',() => {
        if (this.$refs.scroll != null && this.$refs != undefined) {
          refresh()
        }
      })

      //2.获取tabControl的offsetTop
      // 所有的组件都有一个属性：$el-->用于获取组件中的元素
      // this.tabOffsetTop = this.$refs.tabControl.$el
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
    },
    methods: {
      /**
       * 事件监听方法
       */
       tabClick(index){
         switch (index) {
           case 0:
             this.currentType = 'pop'
             break;
           case 1:
             this.currentType = 'new'
             break;
           case 2:
             this.currentType = 'sell'
             break;
         }
         this.$refs.tabControl2.currentIndex = index
         this.$refs.tabControl.currentIndex = index
       },
       backClick(){
         this.$refs.scroll.scrollTo(0,0,500)
       },
       contentScroll(position){
        //控制回到顶部按钮的显隐
        this.isShowBackTop = (-position.y) > 1000

        //判断tabControl何时吸顶
        this.isTabControlFixed = (-position.y) > this.tabOffsetTop
       },
       loadMore(){
        //  console.log("上拉加载更多")
         this.getHomeGoodsMethod(this.currentType)
       },
       swiperImageLoad(){
         //监听图片加载完成事件
          if (this.$refs.scroll != null && this.$refs != undefined) {
            debounce(this.$refs.scroll.refresh)()
          }
          this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
       },
      /**
       * 网络请求相关方法
       */
      getHomeMultidataMethod () {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },

      getHomeGoodsMethod (type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          //将res数组中的数据使用push...的方法依次取出，然后放入数组
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //更多数据请求完成之后，调用完成加载，后续才能继续请求更多数据
          this.$refs.scroll.finishPullUp()
        })
      }
    },
  };
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    /* 100vh:表示100%的视口高度 */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }

  .content{
    /* height: 500px; */
    overflow: hidden;
    /* 绝对定位：子绝父相   子元素绝对定位，父元素要相对定位 */
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>
