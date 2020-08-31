import Vuex from 'vuex';
import Vue from "vue";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        //这里放全局参数
        demoValue: {
            name:'test',
            num:10
        }
    },
    mutations: {
        //这里是set方法
        setDemoValue(state, demoValue) {
            state.demoValue = demoValue
        },
        setNumIs5(state, demoValue){
            state.demoValue.num = 5
        }
    },
    getters: {
        //get方法
        getDemoValue: state => state.demoValue
    },
    actions: {
        setNum(content){  // 增加setNum方法，默认第一个参数是content，其值是复制的一份store
            return new Promise((resolve)=>{  // 返回一个promise，我们模拟一个异步操作，1秒后修改num为5
                setTimeout(()=>{
                    content.commit('setNumIs5')
                    resolve()
                },1000)
            })
        }
    },
    modules: {
        //这里是我自己理解的是为了给全局变量分组，所以需要写提前声明其他store文件，然后引入这里
    }
});