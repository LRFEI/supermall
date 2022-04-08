<template>
    <div class="comment-info">
      <div class="title">
        <span class="user-comment">用户评价</span>
        <span>更多</span>
      </div>
      <div class="comment">
        <div class="comment-item"
             v-for="(item, index) in commentInfo.list"
             :key="index">
             <div class="comment-top">
              <img :src="item.user.avatar">
              <span class="uname">{{item.user.uname}}</span>
             </div>
             <div class="comment-middle">
               {{item.content}}
             </div>
             <div class="comment-bottom">
               <span class="comment-time">
                 {{item.created | timeFilter}}
               </span>
               <span class="style-info">
                 {{item.style}}
               </span>
             </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'DetailCommentInfo',
    props:{
      commentInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    filters:{
      //将时间戳转化成标准时间
      timeFilter:function (value) {
        let newDate = new Date()
        let time = newDate.setTime(value * 1000)
        return newDate.toLocaleDateString(time)
      }
    }
};
</script>

<style scoped>
.comment-info{
  padding: 20px 15px;
  border-top: 4px solid rgba(100, 100, 100, .1);
  border-bottom: 4px solid rgba(100, 100, 100, .1);
}
.title{
  padding: 0 0 10px 0;
  border-bottom: 1px solid rgba(100, 100, 100, .2);
  display: flex;
}
.title .user-comment{
  flex: 1;
}
.comment{
  padding-top: 15px;
}
.comment-top{
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}
.comment-top img{
  width: 32px;
  height: 32px;
}
.comment-top .uname{
  padding-left: 15px;
}
.comment-middle{
  font-size: 14px;
  padding-bottom: 10px;
}
</style>
