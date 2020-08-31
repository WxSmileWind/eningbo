
//测试环境
const baseURL = "http://10.68.129.143/reporttest/dpnew/";
//const baseURL="http://18.125.71.1:10011/hj-server/";
//const baseURL_FWDT = "http://115.238.154.91:8085/kjcy-servicehall/";


export const Api = {
    //典型事件接口
    eventdx:{
        tianyi_lb_top:baseURL+"/type.ashx",               //天翼类别top
        zhongxin_lb_top:baseURL+"/smalltype.ashx",        //中心二类类别top
        threetypeqx:baseURL+"/threetypeqx.ashx",          //三类-区县统计
        threetypemonth:baseURL+"/threetypemonth.ashx",    //三类-年月统计
        eventinfo:baseURL+"/eventinfo.ashx",              //事件详情接口
        threetypeevents:baseURL+"/threetypeevents.ashx",  //三类-事件top10
        smalltypeevents:baseURL+"/smalltypeevents.ashx",  //中心二类事件筛选接口
        typeevents:baseURL+"/typeevents.ashx",            //天翼类别事件筛选接口
        opinion:baseURL+"/opinion.ashx"                   //舆情
    },
    test:{
        test1:baseURL+"userlist"
    }

};
window.Api = Api;