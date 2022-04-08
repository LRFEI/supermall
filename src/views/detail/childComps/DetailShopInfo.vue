<template>
    <div class="shop-info">
      <div class="shop-top">
        <img :src="shop.logo">
        <span class="title">{{shop.name}}</span>
      </div>
      <div class="shop-middle">
        <div class="shop-middle-item shop-middle-left">
          <div class="info-sells">
            <div class="sells-count">
              {{shop.sells | sellCountFilter}}
            </div>
            <div class="text">总销量</div>
          </div>
          <div class="info-goods">
            <div class="goods-count">
              {{shop.goodsConut}}
            </div>
            <div class="text">全部宝贝</div>
          </div>
        </div>
        <div class="shop-middle-item shop-middle-right">
          <table>
            <tr v-for="(item, index) in shop.score" :key="index">
              <td>{{item.name}}</td>
              <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
              <td class="better" :class="{'better-more':item.isBetter}">
                <span>{{item.isBetter ? '高' : '低'}}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="shop-bottom">
        <span class="enter-shop">进店逛逛</span>
      </div>
    </div>
</template>

<script>
export default {
    name: 'DetailShopInfo',
    props:{
      shop:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    filters:{
      sellCountFilter: function (value) {
        if (value < 10000) return value
        return (value/10000).toFixed(1) + '万'
      }
    }
};
</script>

<style scoped>
.shop-info{
  padding: 10px 10px 20px;
  border-bottom: 4px solid rgba(100, 100, 100, .1);
}
.shop-top{
  padding: 6px 10px 10px 4px;
}
.shop-top img{
  width: 60px;
  height: 60px;
  border: 3px solid rgba(100, 100, 100, .1);
  border-radius: 50%;
  margin-right: 8px;
}
.shop-top .title{
  display: inline-block;
  position: relative;
  top: -20px;
}
.shop-middle{
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
}
.shop-middle-left{
  display: flex;
  border-right: 1px solid rgba(100, 100, 100, .5);
}
.info-sells{
  margin-right: 25px;
}
.sells-count{
  margin-bottom: 5px;
}
.info-goods{
  margin-right: 40px;
}
.goods-count{
  margin-bottom: 5px;
}
.text{
  font-size: 14px;
}
table{
  border-spacing: 5px 10px;
}
td{
  font-size: 14px;
}
.shop-middle-right table tr td{
  padding: 0 4px;
}
.score{
  color: green;
}
.score-better{
  color: red;
}
.better{
  background: green;
  color: #fff;
}
.better-more{
  background: red;
  color: #fff;
}
.shop-bottom{
  padding-top: 20px;
  text-align: center;
}
.shop-bottom .enter-shop{
  background: rgba(100, 100, 100, .2);
  border-radius: 20px;
  font-size: 14px;
  padding: 5px 20px;
}
</style>
