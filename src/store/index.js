import Vue from 'vue'
import Vuex from 'vuex'

//1.安装Vuex插件
Vue.use(Vuex)

//2.创建对象
const store = new Vuex.Store({
    state: {
        counter: 100
    },
    mutations: {
        //定义方法
        //state：参数，就是上面的state对象
        increment (state) {
            state.counter++;
        },
        decrement (state) {
            state.counter--;
        },
        changeCounter (state) {
            state.counter = 1000
        }
    },
    getters: {

    },
    actions: {
        //context:默认属性，这里是上下文的意思
        aUpdataInfo (context) {
            //异步操作
            setTimeout(() => {
                //这里的context相当于store对象
                //所以可以使用context.commit进行提交
                context.commit('changeCounter')
            }, 1000);
        }
    }
})
//3.导出store
export default store