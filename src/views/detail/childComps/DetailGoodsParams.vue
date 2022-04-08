<template>
    <div class="goods-param" v-if="Object.keys(goodsParam).length !== 0">
      <table v-for="(table, index) in goodsParam.sizes"
             class="info-size" :key="index">
             <tr v-for="(tr, indey) in table" :key="indey">
               <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
             </tr>
      </table>
      <table class="info-param">
        <tr v-for="(info, index) in goodsParam.infos">
          <td class="info-param-key">{{info.key}}</td>
          <td class="info-param-value">{{info.value}}</td>
        </tr>
      </table>
      <div class="info-img" v-if="goodsParam.image.length !== 0">
        <img :src="goodsParam.image">
      </div>
    </div>
</template>

<script>
export default {
    name: 'DetailGoodsParams',
    props:{
      goodsParam:{
        type:Object,
        default(){
          return {}
        }
      }
    }
};
</script>

<style scoped>
.goods-param{
  padding: 20px 10px;
}
.goods-param table{
  width: 100%;
  border-collapse: collapse;
}
.goods-param table tr{
  border-bottom: 1px solid rgba(100, 100, 100, .3);
}
.goods-param table td{
  padding: 15px 10px;
}
.info-param-value{
  color: var(--color-high-text);
}
.info-img img{
  max-width: 100%;
  height: auto;
}
</style>
