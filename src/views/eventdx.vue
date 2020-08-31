 <template>
    <div class="main">
        <div class="main_h">
            <div @click="showmenu()" class="left_menu">
                 <img title="面板导航" class="icon_menu" src="../assets/imgs/left_menu.png" style="width:50px;"/>
            </div>
            <img v-show="showleftmenu" class="animated fadeInLeft menu_arror" src="../assets/imgs/left_arror.png"/>
            <div v-show="showleftmenu" class="animated fadeInLeft menu_list">
                 <ul>
                     <li><a href="http://10.68.129.154:8119/BigScreen/Home/Index?area=1905f614-ea89-44fc-9f7c-76b4602aea67" target="_parent">可视化看板</a></li>
                     <li><a href="http://10.68.129.154:8119/BigScreen/Home/Contact?area=1905f614-ea89-44fc-9f7c-76b4602aea67" target="_parent">疫情大屏</a></li>
                     <li><a href="http://10.68.129.154:8119/BigScreen/Home/About?area=1905f614-ea89-44fc-9f7c-76b4602aea67" target="_parent">矛盾纠纷大屏</a></li>
                 </ul>
            </div>
            <div class="animated fadeInDown center">
                <img class="logo" src="../assets/imgs/center_logo.png"/>
                <span class="title">宁波市社会治理【典型事件】</span>
            </div>
            <div class="animated fadeInRight right_timeline">
                <img class="logo" src="../assets/imgs/cal.png" style="height: 26px;margin-top: 12px; display: block;float:left;"/>
                <span style="display: block;float:left;margin-left: 10px;"> {{nowdate}}</span>
            </div>
        </div>
        <div class="main_c">
            <div class="hotWords">
                <div class="l_title">
                    <el-radio-group v-model="tabPosition" style="margin-left:50px;margin-top: 10px; ">
                        <el-radio-button label="reci">热词排行</el-radio-button>
                        <el-radio-button label="leibie">类别排行</el-radio-button>
                    </el-radio-group>
                </div>
                <el-divider><i class="el-icon-s-data"></i></el-divider>
                <div :style="tabPosition==='reci'?'display:block':'display:none'" class="animated bounceInDown" id="left_reci">
                    <el-tabs v-model="activeName" type="card" >
                        <el-tab-pane style="color:white;" label="月" name="month">
                            <!--热词排行 月 m-->
                            <el-card @mouseover.native="MoveOnLeftCards($event)" @mouseout.native="MoveOutLeftCards($event)"
                                     @click.native="changeleftCards($event,item.EventSmallType,'m','EventSmallType')" v-for="(item,index) in hotlist" :key="index"
                                     :body-style="leftCardNon" shadow="always">
                                <span :style="getTopThreeColor(item.id)" class="hot_icon_left">&nbsp;</span>
                                <span class="hot_icon_id">{{item.id}}</span>
                                <span class="hot_icon_content">{{item.name}}</span>
                                <span class="hot_icon_right" style="">{{item.count}}起</span>
                            </el-card>
                        </el-tab-pane>
                        <el-tab-pane label="季" name="season">
                            <!--热词排行 季 q-->
                            <el-card @mouseover.native="MoveOnLeftCards($event)" @mouseout.native="MoveOutLeftCards($event)"
                                     @click.native="changeleftCards($event,item.EventSmallType,'q','EventSmallType')" v-for="(item,index) in jhotlist" :key="index"
                                     :body-style="leftCardNon" shadow="always">
                                <span :style="getTopThreeColor(item.id)" class="hot_icon_left">&nbsp;</span>
                                <span class="hot_icon_id">{{item.id}}</span>
                                <span class="hot_icon_content">{{item.name}}</span>
                                <span class="hot_icon_right" style="">{{item.count}}起</span>
                            </el-card>
                        </el-tab-pane>
                        <el-tab-pane label="年" name="year">
                            <!--热词排行 年 y-->
                            <el-card @mouseover.native="MoveOnLeftCards($event)" @mouseout.native="MoveOutLeftCards($event)"
                                     @click.native="changeleftCards($event,item.EventSmallType,'y','EventSmallType')" v-for="(item,index) in nhotlist" :key="index"
                                     :body-style="leftCardNon" shadow="always">
                                <span :style="getTopThreeColor(item.id)" class="hot_icon_left">&nbsp;</span>
                                <span class="hot_icon_id">{{item.id}}</span>
                                <span class="hot_icon_content">{{item.name}}</span>
                                <span class="hot_icon_right" style="">{{item.count}}起</span>
                            </el-card>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div :style="tabPosition==='leibie'?'display:block':'display:none'" class="animated bounceInDown" id="left_leibie">
                    <el-tabs v-model="tyactiveName" type="card" >
                        <el-tab-pane style="color:white;" label="月" name="month">
                            <!--类别排行 月-->
                            <el-card @mouseover.native="MoveOnLeftCards($event)" @mouseout.native="MoveOutLeftCards($event)"
                                     @click.native="changeleftCards($event,item.EventType,'m','EventType')" v-for="(item,index) in leibielist" :key="index"
                                     :body-style="leftrightCardNon" shadow="always">
                                <span :style="getTopThreeColor(item.id)" class="hot_icon_left">&nbsp;</span>
                                <span class="hot_icon_id">{{item.id}}</span>
                                <span class="hot_icon_content">{{item.name}}</span>
                                <span class="hot_icon_right" style="width:80px">{{item.count}}件</span>
                            </el-card>
                        </el-tab-pane>
                        <el-tab-pane label="季" name="season">
                            <!--类别排行 季-->
                            <el-card @mouseover.native="MoveOnLeftCards($event)" @mouseout.native="MoveOutLeftCards($event)"
                                     @click.native="changeleftCards($event,item.EventType,'m','EventType')" v-for="(item,index) in jleibielist" :key="index"
                                     :body-style="leftrightCardNon" shadow="always">
                                <span :style="getTopThreeColor(item.id)" class="hot_icon_left">&nbsp;</span>
                                <span class="hot_icon_id">{{item.id}}</span>
                                <span class="hot_icon_content">{{item.name}}</span>
                                <span class="hot_icon_right" style="width:80px">{{item.count}}件</span>
                            </el-card>
                        </el-tab-pane>
                        <el-tab-pane label="年" name="year">
                            <!--类别排行 年-->
                            <el-card @mouseover.native="MoveOnLeftCards($event)" @mouseout.native="MoveOutLeftCards($event)"
                                     @click.native="changeleftCards($event,item.EventType,'m','EventType')" v-for="(item,index) in nleibielist" :key="index"
                                     :body-style="leftrightCardNon" shadow="always">
                                <span :style="getTopThreeColor(item.id)" class="hot_icon_left">&nbsp;</span>
                                <span class="hot_icon_id">{{item.id}}</span>
                                <span class="hot_icon_content">{{item.name}}</span>
                                <span class="hot_icon_right" style="width:80px">{{item.count}}件</span>
                            </el-card>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="container">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <!-- 事件卡片内容区域 -->
                            <div class="swiper-slide-content">
                                <!--图片卡片轮播-->
                                <!--<el-badge  class="card_left_top animated bounce duration-2s faster" v-for="(o, index) in 8" :key="o" value=" 城市管理 | 2图 " >-->
                                    <!--事件列表卡片-->
                                    <el-card  v-for="(o, index) in itemlist" :key="index" @mouseover.native="MoveOnCards($event)"
                                             @mouseout.native="MoveOutCards($event)"
                                             :body-style="rightCardNon">
                                        <div class="card_tip">
                                            <img src="../assets/imgs/timeline.png"  style="width: 20px;display: block;float:left; margin-top: 5px;margin-left: 5px;"/>
                                            <span class="card_tip_left"> {{o.date}}</span>
                                            <span class="card_tip_right">[{{o.type}}]{{o.imgcount}}图 </span>
                                        </div>
                                        <div class="card_close">
                                            <img v-show="o.eventStatus" src="../assets/imgs/Nshgb.png" style="width:100px;"/>
                                        </div>
                                        <el-image
                                                lazy
                                                style="width: 300px; height: 260px"
                                                :src="o.topimg"
                                                ></el-image>
                                        <div>
                                            <span class="event_content" > <img v-show="o.location" src="../assets/imgs/dw.png" style="width: 20px;"/>{{o.content}}</span>
                                            <!--infinite:动画循环；duration:动画持续时间；delay:启动动画时间间隔；faster：速度快慢-->
                                            <div class="bottom clearfix">
<!--                                                <el-divider style="margin:0;" content-position="left">评分</el-divider>-->
<!--                                                <el-rate-->
<!--                                                        v-model="o.pf"-->
<!--                                                        disabled-->
<!--                                                        show-score-->
<!--                                                        text-color="#ff9900"-->
<!--                                                        score-template="{value}">-->
<!--                                                </el-rate>-->
                                                <el-divider style="margin:0;" content-position="left">标签</el-divider>

<!--                                                <el-badge :value="12" class="item">-->
<!--                                                    <el-button size="small">评论</el-button>-->
<!--                                                </el-badge>-->
                                                <!-- <el-badge class="item bq animated fadeInDown duration-2s delay-1s faster" value="3">
                                                    <el-tag
                                                            type="warning">广场
                                                    </el-tag>
                                                </el-badge>-->
                                                <el-badge style="float:left;" :value="o.EventThreeTypeNameCount" class="item">
                                                  <el-button @click="showthreeinfo(o.EventThreeType,o.datestr,o.EventThreeTypeName)"  class="tags" size="small">{{o.EventThreeTypeName}}</el-button>
                                                </el-badge>
                                                <div v-show="o.head" style="float:left;height:30px; margin-left: 5px;">
                                                     <img src="../assets/imgs/head.png" style="height:30px;"/>
                                                </div>
                                                <div v-show="o.tj" style="float:left;height:30px; margin-left: 5px;">
                                                    <img src="../assets/imgs/tj.png" style="height:30px;"/>
                                                </div>
                                                <el-button @click="showinfo(o.id)" style="float:right" class="showinfo" icon="el-icon-s-grid" size="small">
                                                    事件详情
                                                </el-button>
                                            </div>
                                        </div>
                                    </el-card>
                                <!--</el-badge>-->
                            </div>
                        </div>
                        <div v-for="(item,index) in itemdiv" class="swiper-slide">
                            <!-- 事件卡片内容区域 -->
                            <div v-if="item.itempageshow" class="swiper-slide-content">
                                <!--事件列表卡片-->
                                <el-card   v-for="(o, index) in item.itemlist" :key="index" @mouseover.native="MoveOnCards($event)"
                                          @mouseout.native="MoveOutCards($event)"
                                          :body-style="rightCardNon">
                                    <div class="card_tip">
                                        <img src="../assets/imgs/timeline.png"  style="width: 20px;display: block;float:left; margin-top: 5px;margin-left: 5px;"/>
                                        <span class="card_tip_left"> {{o.date}}</span>
                                        <span class="card_tip_right">[{{o.type}}]{{o.imgcount}}图 </span>
                                    </div>
                                    <div class="card_close">
                                        <img v-show="o.eventStatus" src="../assets/imgs/Nshgb.png" style="width:100px;"/>
                                    </div>
                                    <el-image

                                            style="width: 300px; height: 260px"
                                            :src="o.topimg"
                                    ></el-image>
                                    <div>
                                        <span class="event_content" > <img v-show="o.location" src="../assets/imgs/dw.png" style="width: 20px;"/>{{o.content}}</span>
                                        <!--infinite:动画循环；duration:动画持续时间；delay:启动动画时间间隔；faster：速度快慢-->
                                        <div class="bottom clearfix">
<!--                                            <el-divider style="margin:0;" content-position="left">评分</el-divider>-->
<!--                                            <el-rate-->
<!--                                                    v-model="o.pf"-->
<!--                                                    disabled-->
<!--                                                    show-score-->
<!--                                                    text-color="#ff9900"-->
<!--                                                    score-template="{value}">-->
<!--                                            </el-rate>-->
                                            <el-divider style="margin:0;" content-position="left">标签</el-divider>

                                            <!--                                                <el-badge :value="12" class="item">-->
                                            <!--                                                    <el-button size="small">评论</el-button>-->
                                            <!--                                                </el-badge>-->
                                            <!-- <el-badge class="item bq animated fadeInDown duration-2s delay-1s faster" value="3">
                                                <el-tag
                                                        type="warning">广场
                                                </el-tag>
                                            </el-badge>-->
                                            <el-badge style="float:left;" :value="o.EventThreeTypeNameCount" class="item">
                                                <el-button @click="showthreeinfo(o.EventThreeType,o.datestr,o.EventThreeTypeName)"  class="tags" size="small">{{o.EventThreeTypeName}}</el-button>
                                            </el-badge>
                                            <div v-show="o.head" style="float:left;height:30px; margin-left: 5px;">
                                                <img src="../assets/imgs/head.png" style="height:30px;"/>
                                            </div>
                                            <div v-show="o.tj" style="float:left;height:30px; margin-left: 5px;">
                                                <img src="../assets/imgs/tj.png" style="height:30px;"/>
                                            </div>
                                            <el-button @click="showinfo(o.id)" style="float:right" class="showinfo" icon="el-icon-s-grid" size="small">
                                                事件详情
                                            </el-button>
                                        </div>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </div>
                    <!-- 如果需要分页器 -->
                    <!--   <div class="swiper-pagination" ></div>-->
                    <!-- 如果需要导航按钮 -->
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
                <!-- 事件详情弹出框 -->
                <el-dialog  element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.8)" v-loading.fullscreen.lock="fullscreenLoading" @close="closeDialog" top="50px" title="事件详情" :visible.sync="showevent" :modal="true" :modal-append-to-body='false' width="1200px" >
                    <div style="height:900px;  ">
                        <!--<el-divider class="whitedivider"><i class="el-icon-mobile-phone"></i>事件详情</el-divider>-->
                        <div class="dialog_right">
                            <!--                                <el-divider content-position="left">事件类型&上报时间</el-divider>-->
                            <p class="content_lx">事件类型:{{iteminfo.type}}             上报时间:{{iteminfo.sbsj}}</p>
                            <!--<p class="content_sbsj">{{iteminfo.sbsj}}</p>-->
                            <!--                                <el-divider content-position="left">上报时间</el-divider>-->
                            <el-divider content-position="left">事件描述</el-divider>
                            <p class="content_con">
                                {{iteminfo.content}}</p>
                            <el-divider content-position="left">网格信息</el-divider>
                            <p class="content_wg">{{iteminfo.area+' '+iteminfo.wg+' '+iteminfo.wgname}}<span><a
                                    target="map"
                                    :href="iteminfo.wgmapurl"><img
                                    src="../assets/imgs/map_gj.png" style="height:20px;"></a></span></p>
                        </div>
                        <div class="dialog_center">
                            <el-timeline>
                                <el-timeline-item
                                        v-for="(activity, index) in iteminfo.activities"
                                        :key="index"
                                        :icon="activity.icon"
                                        :type="activity.type"
                                        :color="activity.color"
                                        :size="activity.size"
                                        :timestamp="activity.timestamp">
                                    {{activity.content}}
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                        <div v-html="iteminfo.mapiframe" class="dialog_left">
                        </div>
                        <div class="yqnews">
                            <span class="yq_left">最新舆情</span>
                            <div  class="yq_content">
                                <!--舆情信息滚动区域-->
                                <PaoMaDeng ref="paomadeng" :content="arr">
                                    <div style='float:left;padding-right:15px;' v-for="(item, index) in arr" :key="index">
                                        <span :title="item.content" :data-id="item.id" onclick="OpenYqInfo(this)" style="line-height: 40px;cursor:pointer;" >{{item.title+' ['+item.date+'] '+'; '}}</span>
                                    </div>
                                </PaoMaDeng>
                            </div>
                        </div>
                        <div style="height:400px;width:100%;float:left;margin-top: 20px; ">
                            <el-carousel :interval="4000" type="card" height="400px">
                                <el-carousel-item v-for="(item,index) in iteminfo.imgitems" :key="index">
                                    <!-- <h3 class="medium">{{ item }}</h3>-->
                                    <el-image
                                            fit="scale-down"
                                            :title="item.title"
                                            style="width: 480px; height: 400px;"
                                            :src="item.src"
                                    ></el-image>
                                    <div style="position: absolute;height:30px;width:100px;background-color: black;top:0px;line-height: 30px;color:white;">
                                        {{item.title}}
                                    </div>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                </el-dialog>
                <!-- 三类统计分析弹出框 -->
                <el-dialog  element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.8)" v-loading.fullscreen.lock="fullscreenLoading" top="50px" :title="tjdialogname" :visible.sync="showtj" :modal="true" :modal-append-to-body='false' width="1200px" >
                    <div style="height:850px;width:100%;z-index:9999; ">
                        <div style="height: 400px;width:1180px;">
                            <div id="tbhb_tb">
                            </div>
                            <div id="bt_tb">
                            </div>
                        </div>
                        <el-divider class="whitedivider"><i class="el-icon-mobile-phone"></i>  相关事件top10</el-divider>
                        <!--新的相册切换-->
                        <el-carousel :interval="5000" arrow="always" height="360px" indicator-position="outside">
                            <el-carousel-item  v-for="(item,index) in eventimgitemsfor" :key="index" >
                                <div v-for="(items,index) in item.itemlist" style="width:30%;height:360px;float:left;position: relative; margin-left: 2%; border: 2px solid #dfdfdf; border-radius: 10px;">
                                    <el-image

                                            :title="items.title"
                                            style="width: 100%; height: 100%; border-radius: 10px; display: block;"
                                            :src="items.src"
                                    ></el-image>
                                    <div @click="showinfo(items.id)" style="cursor:pointer; position: absolute;height:30px;width:100%;background-color: black;bottom:0px;line-height: 30px;color:white; opacity: 0.8;border-radius: 10px;">
                                        {{items.title}}
                                    </div>
                                    <div style="position:absolute;height:30px;width:160px;top:0px;left:0px;background-color: black;opacity: 0.8; line-height:30px; color:white;border-radius: 10px;">
                                        {{items.date}}
                                    </div>
                                    <div style="position:absolute;height:30px;width:160px;top:0px;right:0px;background-color: black;opacity: 0.8; line-height:30px; color:white;border-radius: 10px;">
                                        {{items.type}}-[{{items.EventThreeTypeName}}]
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>

                        <!--老的相册切换-->
                        <!-- <el-carousel :interval="4000" type="card" height="360px">
                            <el-carousel-item v-for="(item,index) in eventimgitems" :key="index">
                                &lt;!&ndash; <h3 class="medium">{{ item }}</h3>&ndash;&gt;
                                <el-image
                                        fit="scale-down"
                                        :title="item.title"
                                        style="width: 590px; height: 360px;"
                                        :src="item.src"
                                ></el-image>
                                <div @click="showinfo(item.id)" style="position: absolute;height:30px;width:600px;background-color: black;bottom:0px;line-height: 30px;color:white; opacity: 0.8;">
                                    [{{item.type}}]-{{item.title}}
                                </div>
                                <div style="position:absolute;height:30px;width:200px;top:0px;left:0px;background-color: black;opacity: 0.8; line-height:30px; color:white;">
                                    {{item.date}}
                                </div>
                                <div style="position:absolute;height:30px;width:200px;top:0px;right:0px;background-color: black;opacity: 0.8; line-height:30px; color:white;">
                                    {{item.wg}}
                                </div>
                            </el-carousel-item>
                        </el-carousel>-->
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
    //接口调用文件
    import index from '@/api/index';
    //接口配置文件
    import {Api} from '@/api/api';
    import moment from "moment";
    import Swiper from 'swiper';
    import PaoMaDeng from "@/components/paomadeng.vue";
    export default {
        components: {
            PaoMaDeng //舆情滚动子组件
        },
        name: "eventdx",
        data() {
            return {
                flag:0,              //暂无作用
                arr: [],             //舆情滚动条
                nowdate:'',          //右上角当前时间
                showleftmenu:false,  //左上角导航
                showtj:false,        //三类统计分析弹框
                showevent:false,     //事件详细内容弹框
                activeName:'month',  //热词排行，切换选项卡 默认 月
                tyactiveName:'month',//类型排行，切换选项卡 默认 月
                tabPosition: 'reci', //左侧顶部切换选项卡
                leftCardNon: { background:'#2f4553',padding: '20px',float:'left',cursor:'pointer',color:'white' },
                rightCardNon:{ padding: '19px',width:'300px',float:'left',cursor:'pointer',background:'inherit',border:'solid 1px #94d4f8'},
                leftrightCardNon: { width:'280px',background:'#2f4553',padding: '5px',float:'left',cursor:'pointer',color:'white' },
                firsttype:'',    //初次加载获取到的热词排行二类top1的id
                hotlist:[],      //月 热词排行
                jhotlist:[],     //季 热词排行
                nhotlist:[],     //年 热词排行
                leibielist:[],   //月 类别排行
                jleibielist:[],  //季 类别排行
                nleibielist:[],  //年 类别排行
                //value: 3,
                currentDate: new Date().toLocaleDateString(),
                isCollapse:true,
                itemlist:[],   //右侧事件列表
                itempplist:[], //用于分页块
                itempage:false,//用于分页块是否显示
                itemdiv:[],  //右侧除第一页外分页块div数组
                iteminfo:{
                    id:'aaa',
                    content:'（居民说事）8月1日早，家住西澄河路53号居民陈冬女老人前来社区举报：28号晚7点左右，自己从家中前往公园西门旁边的洗脚的店的路上（广场路）碰到一个穿着时髦40岁左右的女子，跟老人搭讪。实质内容就是宣传法轮功邪教内容，还给老人留下一张字条，内容就是宣传法轮功。老人由于年事已高，又不知道该怎么处置，未第一时间来社区举报，她今天来就想让社区帮忙处理。',
                    sbsj:'2020-08-06',
                    type:'矛盾纠纷',
                    imgitems:[
                        {title:"处置前图片",src:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2525576107,3579471363&fm=15&gp=0.jpg"},
                        {title:"处置前图片",src:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2116973228,1421477263&fm=26&gp=0.jpg"},
                        {title:"处置后图片",src:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=899052674,2044240737&fm=26&gp=0.jpg"},
                    ],
                    activities: [
                        {
                        content: '【网格上报】',
                        timestamp: '2020-08-04 11:37:33',
                        size: 'large',
                        type: 'primary',
                        icon: 'el-icon-more'
                    }, {
                        content: '【村/社区上报】',
                        timestamp: '2020-08-04 14:23:48',
                        color: '#0bbd87'
                    }, {
                        content: '【镇街职能办受理】',
                        timestamp: '2020-08-04 14:27:58',
                        color: '#cd5e8f'
                    }, {
                        content: '【镇街职能办办结】锦屏街道，安监办，社区等工作人员到现场指导，后经与其父亲沟通后协同劝解，化险为夷。',
                        timestamp: '2020-08-04 16:27:58',
                        color: '#d13c7e'
                    },
                        {
                            content: '【网格关闭】',
                            timestamp: '2020-08-05 09:27:58'
                        },
                        {
                            content: '【网格关闭】',
                            timestamp: '2020-08-05 12:27:58'
                        }
                    ],
                    area:'鄞州区',
                    wg:'钟公庙街道后庙社区半岛名邸2',
                    wgname:'蔺方英',
                    wgmapurl:'http://10.19.181.153/pubgis/map.jsp?config=screen&amp;loginName=8a93351957cda5740157db93e4ae7617&amp;orgType=134&amp;orgUid=001006023004003&amp;locateCoord=121.54509340478788,29.83097754863277&amp;canEdit',
                    mapiframe:'<iframe id="gisIframe" frameborder="0" scrolling="no"\n' + '                                        src="http://10.19.181.153/pubgis/flex/map.html?wmode=opaque&amp;coordinatex=121.54509340478788&amp;coordinatey=29.83097754863277&amp;config=config-locate.xml"\n' +'                                        width="300px" height="385px"></iframe>'
                },//事件详情
                eventimgitems:[
                    {title:"事件描述内容一",src:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2525576107,3579471363&fm=15&gp=0.jpg"},
                    {title:"事件描述内容二",src:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2116973228,1421477263&fm=26&gp=0.jpg"},
                    {title:"事件描述内容三",src:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=899052674,2044240737&fm=26&gp=0.jpg"},
                ],  //三类事件top10
                eventimgitemsfor:[],
                fullscreenLoading: false, //loading 标记
                mySwiper:null,             //相册滑动对象
                tjdialogname:'统计分析'
            }
        },
        async created() {
            //将vue方法转换为js原生方法
            let _this = this;
            //将vue申明的方法复制给原生js方法，用于onclick方式原生调用
            window.OpenYqInfo = _this.OpenYqInfo;
            //动态获取当前时间
            setInterval(this.getNow, 1000);
            //提交设置store下的DemoValue值
            //this.$store.commit('setDemoValue', value);
            //$store.getters获取全局变量
            //console.log("####################getDemoValue-name:", this.$store.getters.getDemoValue.name);
            // console.log('旧值---' + this.$store.state.demoValue.num);
            // await this.$store.dispatch('setNum');   // actions使用dispatch进行触发，就像mutation使用commit触发一样
            // console.log('新值---' + this.$store.state.demoValue.num);
            //左侧-中心二类排行
            await this.bindrc_month();
            this.bindrc_q();
            this.bindrc_y();
            //左侧-天翼类别排行
            this.bindlb_m();
            this.bindlb_q();
            this.bindlb_y();
            this.changeleftCards(1,this.firsttype,'m','EventSmallType');
        },
        mounted() {
        },
        filters: {
            dateTimeFmt: function (value) {
                if (!value) {
                    return ''
                }
                var date = new Date(value)
                var month = date.getMonth() + 1
                var day = date.getDate()
                if (month < 10) {
                    month = '0' + month
                }
                if (day < 10) {
                    day = '0' + day
                }
                var hh = date.getHours()
                var mm = date.getMinutes()
                var ss = date.getSeconds()
                if (hh < 10) {
                    hh = '0' + hh
                }
                if (mm < 10) {
                    mm = '0' + mm
                }
                if (ss < 10) {
                    ss = '0' + ss
                }
                return date.getFullYear() + '-' + month + '-' + day
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            //点击左侧排行调用事件筛选接口
            async changeleftCards(e,type,date,tag){
                let itemplist=[];
                let that=this;
                that.itemdiv=[];
                console.log("+++++++++++++++type:",type);
                console.log("+++++++++++++++date:",date);
                console.log("++++++++++++++tag:",tag);
                console.log("++++++++++++++进入鼠标移上事件");
                if (tag === 'EventSmallType') {
                    let {data: event_list, total: counts} = await index.fetchData_get(Api.eventdx.smalltypeevents, {
                        "smalltype": type,
                        datestr: date,
                        pageindex: 1,
                        pagesize: 8
                    });
                    let datalist = event_list;
                    let total = counts;
                    console.log("+++++++total:", total);
                    if (datalist.length > 0) {
                        let pages = parseInt(total / 8);
                        let pagesys = total % 8;
                        if (total >= 8 && pagesys != 0) {
                            pages = pages + 1;
                        } else if (total > 0 && total < 8) {
                            pages = 1;
                        }
                        if (pages === 1) {
                            for (let j = 0; j < datalist.length; j++) {
                                itemplist.push({
                                    id: datalist[j].id,
                                    content: datalist[j].事件描述,
                                    date: datalist[j].上报时间,
                                    type: datalist[j].事件类型,
                                    imgcount: datalist[j].处置前图片.split('|').length + datalist[j].处置后图片.split('|').length,
                                    eventStatus: datalist[j].事件状态 === '网格关闭' ? true : false,
                                    location: datalist[j].X坐标.length > 0 ? true : false,
                                    pf: 5,
                                    topimg: datalist[j].处置前图片.split('|')[0],
                                    EventThreeTypeName: datalist[j].EventThreeTypeName,
                                    EventThreeType: datalist[j].EventThreeType,
                                    EventThreeTypeNameCount: datalist[j].EventCount,
                                    datestr: date,
                                    head:datalist[j].是否头条===1?true:false,
                                    tj:datalist[j].是否推荐===1?true:false
                                });
                            }
                        } else {
                            for (let i = 0; i < pages; i++) {
                                if (i === 0) {
                                    let startindex = i * 8;
                                    let endindex = (i + 1) * 8 - 1;
                                    for (let j = startindex; j <= endindex; j++) {
                                        itemplist.push({
                                            id: datalist[j].id,
                                            content: datalist[j].事件描述,
                                            date: datalist[j].上报时间,
                                            type: datalist[j].事件类型,
                                            imgcount: datalist[j].处置前图片.split('|').length + datalist[j].处置后图片.split('|').length,
                                            eventStatus: datalist[j].事件状态 === '网格关闭' ? true : false,
                                            location: datalist[j].X坐标.length > 0 ? true : false,
                                            pf: 5,
                                            topimg: datalist[j].处置前图片.split('|')[0],
                                            EventThreeTypeName: datalist[j].EventThreeTypeName,
                                            EventThreeType: datalist[j].EventThreeType,
                                            EventThreeTypeNameCount: 5,
                                            datestr: date,
                                            head:datalist[j].是否头条===1?true:false,
                                            tj:datalist[j].是否推荐===1?true:false
                                        });
                                    }
                                } else {
                                    that.itemdiv.push({
                                        itempageshow: false,
                                        itemlist: []
                                    });
                                }
                            }
                        }
                    }
                } else if (tag === 'EventType') {
                    let {data: event_list, total: counts} = await index.fetchData_get(Api.eventdx.typeevents, {
                        "type": type,
                        datestr: date,
                        pageindex: 1,
                        pagesize: 8
                    });
                    let datalist = event_list;
                    let total = counts;
                    if (datalist.length > 0) {
                        let pages = parseInt(total / 8);
                        let pagesys = total % 8;
                        if (total >= 8 && pagesys != 0) {
                            pages = pages + 1;
                        } else if (total > 0 && total < 8) {
                            pages = 1;
                        }
                        if (pages === 1) {
                            for (let j = 0; j < datalist.length; j++) {
                                //console.log("++++++++++++++datalist[j]:",datalist[j]);
                                itemplist.push({
                                    id: datalist[j].id,
                                    content: datalist[j].事件描述,
                                    date: datalist[j].上报时间,
                                    type: datalist[j].事件类型,
                                    imgcount: datalist[j].处置前图片.split('|').length + datalist[j].处置后图片.split('|').length,
                                    eventStatus: datalist[j].事件状态 === '网格关闭' ? true : false,
                                    location: datalist[j].X坐标.length > 0 ? true : false,
                                    pf: 5,
                                    topimg: datalist[j].处置前图片.split('|')[0],
                                    EventThreeTypeName: datalist[j].EventThreeTypeName,
                                    EventThreeType: datalist[j].EventThreeType,
                                    EventThreeTypeNameCount: 5,
                                    datestr: date,
                                    head:datalist[j].是否头条===1?true:false,
                                    tj:datalist[j].是否推荐===1?true:false
                                });
                            }
                        } else {
                            for (let i = 0; i < pages; i++) {
                                if (i === 0) {
                                    let startindex = i * 8;
                                    let endindex = (i + 1) * 8 - 1;
                                    for (let j = startindex; j <= endindex; j++) {
                                        //console.log("++++++++++++++datalist[j]:",datalist[j]);
                                        itemplist.push({
                                            id: datalist[j].id,
                                            content: datalist[j].事件描述,
                                            date: datalist[j].上报时间,
                                            type: datalist[j].事件类型,
                                            imgcount: datalist[j].处置前图片.split('|').length + datalist[j].处置后图片.split('|').length,
                                            eventStatus: datalist[j].事件状态 === '网格关闭' ? true : false,
                                            location: datalist[j].X坐标.length > 0 ? true : false,
                                            pf: 5,
                                            topimg: datalist[j].处置前图片.split('|')[0],
                                            EventThreeTypeName: datalist[j].EventThreeTypeName,
                                            EventThreeType: datalist[j].EventThreeType,
                                            EventThreeTypeNameCount: datalist[j].EventCount,
                                            datestr: date,
                                            head:datalist[j].是否头条===1?true:false,
                                            tj:datalist[j].是否推荐===1?true:false
                                        });
                                    }
                                } else {
                                    that.itemdiv.push({
                                        itempageshow: false,
                                        itemlist: []
                                    });
                                }

                            }
                        }


                        // this.itemdiv = pages-1;
                        //console.log("+++++++++++++++++itemdiv:", this.itemdiv);
                        //console.log("+++++++++++++++++datalist:", datalist);
                    }
                }
                this.flag=this.flag+1;
                this.itemlist=JSON.parse(JSON.stringify(itemplist));
                await this.initSwipercards(tag,type,0,date);
            },
            MoveOnLeftCards(e){
                e.currentTarget.classList.add('lefton');
            },
            MoveOutLeftCards(e){
                e.currentTarget.classList.remove('lefton');
            },
            MoveOnCards(e){
                e.currentTarget.classList.add('lefton');
               // let CardBottom=e.currentTarget.querySelector(".bottom");
               // CardBottom.classList.add("animated","bounce","duration-2s","faster");
            },
            MoveOutCards(e){
                e.currentTarget.classList.remove('lefton');
               // let CardBottom=e.currentTarget.querySelector(".bottom");
               // CardBottom.classList.remove("animated","bounce","duration-2s","faster");

            },
            getTopThreeColor(obj){
                switch (obj) {
                    case 1:
                        return 'background-color: red;color:white;';
                    case 2:
                        return 'background-color:#f6944b;color:white;';
                    case 3:
                        return 'background-color:#f4f64b;color:gray;';
                        default:
                            return 'background-color:#4bf67f;color:white;';
                }
            },
            async showinfo(id){

                this.fullscreenLoading=true;
                this.iteminfo=[];
                this.showevent=true;
                await this.bindyq(id);
                await this.bindeventinfo(id);

                this.fullscreenLoading=false;
                console.log("xxxxxxxxxxxxxx点击进入事件详情接口");
            },
            async showthreeinfo(id,date,typename){
                //console.log()
                console.log("+++++++++++++typename:",typename);
                if(typename==null||id==undefined){
                    this.$message({
                        message: '抱歉，无归属三类，无法分析。',
                        type: 'warning'
                    });
                    return;
                }
                this.tjdialogname='三类名称：【'+typename+'】统计分析';
                this.fullscreenLoading=true;
                this.showtj=true;
                await this.bindthreetypeeventtop(id,date);
                await this.bindtbhb(id);
                await this.bindarea(id);
                this.fullscreenLoading=false;
            },
            //三类-年月统计
            async bindtbhb(threetype) {
                console.log("年月++++++++++++++threetype:",threetype);

                //三类-年月统计
                let {data:threetypemonth} = await index.fetchData_get(Api.eventdx.threetypemonth,{"threetype":threetype});
                console.log("+++++++++++++++threetypemonth:",threetypemonth);



                this.$nextTick(() => {
                    //同步环比
                    let echarts = require('echarts');
                    // 基于准备好的dom，初始化echarts实例
                    let myChart = echarts.init(document.getElementById('tbhb_tb'));
                    let colors = ['#ffffff', '#d14a61','#5db75d','#61edfe'];
                    // let legend_data=[
                    //     {
                    //         name: '2020 事件量',
                    //         // 强制设置图形为圆。
                    //         icon: 'circle',
                    //         // 设置文本为红色
                    //         textStyle: {
                    //             color: '#fff'
                    //         }
                    //     },
                    //     {
                    //         name: '2019 事件量',
                    //         // 强制设置图形为圆。
                    //         icon: 'circle',
                    //         // 设置文本为红色
                    //         textStyle: {
                    //             color: '#d14a61'
                    //         }
                    //     }
                    // ];
                    let legend_data=[];

                    // let xAxis_data1=['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12'];
                    // let xAxis_data2=['2020-1', '2020-2', '2020-3', '2020-4', '2020-5', '2020-6', '2020-7', '2020-8', '2020-9', '2020-10', '2020-11', '2020-12'];
                    let xAxis_data1=[];
                    let xAxis_data2=[];


                    let xAxis_data=[];
                    let seriesdata=[];

                    if(threetypemonth.length>0)
                    {
                        threetypemonth.forEach(item=>{
                            console.log("++++++++++++++item.data.length:",item.data.length);
                            if(item.data.length>0){
                                let datas=[];
                                let datasname=[];

                                legend_data.push({
                                        name: item.year+' 事件量',
                                        // 强制设置图形为圆。
                                        icon: 'circle',
                                        // 设置文本为红色
                                        textStyle: {
                                            color: '#fff'
                                        }
                                    }
                                );



                                item.data.forEach(item1=>{
                                    datas.push(item1.EventCount);
                                    datasname.push(item1.DateStr);
                                });


                                seriesdata.push(
                                    {
                                        name: item.year+' 事件量',
                                        type: 'line',
                                        xAxisIndex: 1,
                                        symbol:'triangle',//线条中每个点的样式
                                        symbolSize:10,     //线条中每个点的大小
                                        smooth: true,
                                        data: datas
                                    }
                                );


                            }
                        });
                    }

                    console.log("+++++++++++++legend_data:",legend_data);
                    console.log("+++++++++++++seriesdata:",seriesdata);

                   // let series_data1=[3, 5, 11, 18, 48, 69, 222, 0, 0, 0, 0, 0];
                   // let series_data2=[2, 5, 9, 26, 28, 70, 175, 182, 48, 18, 6, 2];
                    // console.log("处理前++++++++++++++++legend_data:",legend_data);
                    // // map,return产生新对象数组不影响原数组
                    // legend_data=legend_data.map(item=>{
                    //     // ...将整个对象引入到新的对象中,直接赋值会改变原有的对象数组值
                    //     let obj = {...item};
                    //     obj.name=obj.name;
                    //     return obj
                    // });
                    // console.log("处理后++++++++++++++++legend_data:",legend_data);
                    myChart.setOption(
                        {
                            title: {
                                text: '时间分布',
                                textStyle:{
                                    color: '#ffffff',
                                },
                                // 分别设置四个方向的内边距
                                padding: [
                                    8,  // 上
                                    10, // 右
                                    5,  // 下
                                    10, // 左
                                ]
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: legend_data,
                                textStyle:{
                                    color: '#ffffff',
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'category',
                                axisLabel:{
                                    color:'#fff'
                                },
                                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月']
                            },
                            yAxis: {
                                type: 'value',
                                axisLabel:{
                                    color:'#fff'
                                },
                            },
                            color:colors,
                            series: [
                                {
                                    name: '2020 事件量',
                                    type: 'line',

                                    symbol:'triangle',//线条中每个点的样式
                                    symbolSize:10,     //线条中每个点的大小
                                    smooth: true,
                                    data: [10,20,33,56,34,22,88,19,20,11,11,12]
                                },
                                {
                                    name: '2019 事件量',
                                    type: 'line',

                                    symbol:'triangle',//线条中每个点的样式
                                    symbolSize:10,     //线条中每个点的大小
                                    smooth: true,
                                    data: [8,55,2,1,5,6,10,55,33,12,9,3]
                                }
                            ]
                        }
                    );



                })
            },
            //三类-区域统计
            async bindarea(threetype){
                console.log("区县++++++++++++++threetype:",threetype);
                //三类-区域统计
                let {data:threetypeqx} = await index.fetchData_get(Api.eventdx.threetypeqx,{"threetype":threetype});
                let datalist=threetypeqx;


                this.$nextTick(() => {
                    //同步环比
                    let echarts = require('echarts');
                    // 基于准备好的dom，初始化echarts实例
                    let myChart = echarts.init(document.getElementById('bt_tb'));

                    let legenddata=[];

                    let colors=['#bda29b','#ca8623','#749f83','#91c7af','#d38265','#61a0a9','#c33531','#f3f3f3','#4277a3','#5bb85d','#f0cdd1','#96d069','#60ecf9','#cb3398','#a05051','#fdff01'];

                    myChart.setOption({
                        baseOption: {
                            timeline: {
                                // y: 0,
                                axisType: 'category',
                                // realtime: false,
                                // loop: false,
                                autoPlay: true,
                                currentIndex: 1,
                                playInterval: 5000,
                                lineStyle:{
                                    color:'#ffffff'
                                },
                                label:{
                                    color:'#ffffff'
                                },
                                controlStyle:{
                                    color:'#ffffff',
                                    borderColor:'#ffffff',
                                    borderWidth:1,
                                    itemSize:30
                                },
                                // controlStyle: {
                                //     position: 'left'
                                // },
                                data: ['2019', '2020']
                            },
                            title: {
                                subtext: ''
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b} : {c}件 ({d}%)'
                            },

                            legend: {
                                type: 'scroll',
                                left: 140,
                                orient: 'horizontal',
                                textStyle:{
                                  color:'#ffffff'
                                },
                                pageIconColor:{
                                    color:'#c33531'
                                },
                                pageIconInactiveColor :{
                                    color:'#fff'
                                },
                                pageTextStyle:{
                                  color:'#ffffff'
                                },
                                x: 'right',
                                data: ['海曙区', '鄞州区', '江北区','奉化区','宁海县','象山县','余姚市'],
                            },
                            calculable: true,
                            data:['2019', '2020']
                        },
                        options: [
                            {
                                title: {
                                    text: '2019年区县统计',
                                    textStyle:{
                                        color:'#ffffff'
                                    }
                                },
                                color:colors,
                                series: [
                                    {
                                        name: '2019',
                                        type: 'pie',
                                        radius: [70, 100],
                                        center: ['50%', '50%'],
                                        selectedMode: 'single',
                                        data: [
                                            {
                                                name: '海曙区',
                                                value: 50
                                            }, {
                                                name: '鄞州区',
                                                value: 10
                                            }, {
                                                name: '江北区',
                                                value: 40
                                            }, {
                                                name: '奉化区',
                                                value: 33
                                            }, {
                                                name: '宁海县',
                                                value: 23
                                            }, {
                                                name: '象山县',
                                                value: 19
                                            }, {
                                                name: '余姚市',
                                                value: 9
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                title: {
                                    text: '2020年区县统计',
                                    textStyle:{
                                        color:'#ffffff'
                                    }
                                },
                                color:colors,
                                series: [
                                    {
                                        name: '2020',
                                        type: 'pie',
                                        radius: [70, 100],
                                        center: ['50%', '50%'],
                                        selectedMode: 'single',
                                        data: [{
                                            name: '海曙区',
                                            value: 44
                                        }, {
                                            name: '鄞州区',
                                            value: 15
                                        }, {
                                            name: '江北区',
                                            value: 78
                                        },{
                                            name: '奉化区',
                                            value: 44
                                        },{
                                            name: '宁海县',
                                            value: 120
                                        },{
                                            name: '象山县',
                                            value: 55
                                        },{
                                            name: '余姚市',
                                            value: 39
                                        }
                                        ]
                                    }
                                ]
                            },
                        ]
                    });
                    myChart.on('click', function (params) {
                        console.log("+++++++++++++++params.name：",params.name);
                        console.log("+++++++++++++++params.seriesName：",params.seriesName);
                    });
                    // myChart.setOption(
                    //     {
                    //         title: {
                    //             text: '区域分布',
                    //             textStyle:{
                    //                 color: '#ffffff',
                    //             },
                    //             // 分别设置四个方向的内边距
                    //             padding: [
                    //                 8,  // 上
                    //                 10, // 右
                    //                 5,  // 下
                    //                 10, // 左
                    //             ]
                    //         },
                    //         tooltip: {
                    //             trigger: 'item',
                    //             formatter: '{a} <br/>{b} : {c} ({d}%)'
                    //         },
                    //         legend: {
                    //             type: 'scroll',
                    //             orient: 'vertical',
                    //             left: 10,
                    //             top: 30,
                    //             bottom: 10,
                    //             textStyle: {
                    //                 color: '#fff'
                    //             },
                    //             data: legenddata
                    //         },
                    //         toolbox: {
                    //             show: true,
                    //             feature: {
                    //                 mark: {show: true},
                    //                 dataView: {show: true, readOnly: false},
                    //                 magicType: {
                    //                     show: true,
                    //                     type: ['pie', 'funnel']
                    //                 },
                    //                 restore: {show: true},
                    //                 saveAsImage: {show: true}
                    //             }
                    //         },
                    //         series: [
                    //             {
                    //                 name: '区域分布',
                    //                 type: 'pie',
                    //                 radius: [80, 110],
                    //                 center: ['60%', '50%'],
                    //                 // roseType: 'radius',
                    //                 data: seriesdata
                    //             }
                    //         ]
                    //     }
                    // );

                })
            },
            showmenu(){
                this.showleftmenu=!this.showleftmenu;
            },
            getNow(){
                let date = new Date()
                let month = date.getMonth() + 1
                let day = date.getDate()
                let week=date.getDay()
                if (month < 10) {
                    month = '0' + month
                }
                if (day < 10) {
                    day = '0' + day
                }
                let hh = date.getHours()
                let mm = date.getMinutes()
                let ss = date.getSeconds()
                if (hh < 10) {
                    hh = '0' + hh
                }
                if (mm < 10) {
                    mm = '0' + mm
                }
                if (ss < 10) {
                    ss = '0' + ss
                }
                let weekName="";
                switch (week) {
                    case 0:
                        weekName="星期日";
                        break;
                    case 1:
                        weekName="星期一";
                        break;
                    case 2:
                        weekName="星期二";
                        break;
                    case 3:
                        weekName="星期三";
                        break;
                    case 4:
                        weekName="星期四";
                        break;
                    case 5:
                        weekName="星期五";
                        break;
                    case 6:
                        weekName="星期六";
                        break;
                        default:
                            break;
                }
                this.nowdate=date.getFullYear() + '-' + month + '-' + day+ ' ' + hh+ ':' + mm+ ':' + ss+' '+weekName
            },
            OpenYqInfo(obj){
                obj.classList.add('fontcolor');
                console.log("+++++++++++data-id", obj.getAttribute('data-id'));
                let item_no = this.arr.find((item) => item.id == obj.getAttribute('data-id'));
                console.log("++++++++++this.arr",this.arr);
                console.log("++++++++++item_no",item_no);
                this.$notify.info({
                    title: '舆情-' + item_no.date,
                    dangerouslyUseHTMLString: true,
                    duration: 10000,
                    onClose:()=>{
                        obj.classList.remove('fontcolor');
                        console.log("##############进入关闭函数")
                    },
                    message: '<strong> <i>' + item_no.title + '</i> </strong><hr/><p>' + item_no.content + '</p>'
                });
            },
            //热词排行-月数据接口
            async bindrc_month(){
                let {data:rc_month} = await index.fetchData_get(Api.eventdx.zhongxin_lb_top,{"datestr":'m'});
                let datalist=rc_month;
                if(datalist.length>0){
                    this.firsttype=datalist[0].EventSmallType;
                }
                datalist.map(item=>{
                    let obj={...item};


                    this.hotlist.push({id:obj.sortid,name:obj.EventSmallTypeName,count:obj.EventCount,EventSmallType:obj.EventSmallType});
                });
            },
            //热词排行-季数据接口
            async bindrc_q(){
                let {data:rc_q} = await index.fetchData_get(Api.eventdx.zhongxin_lb_top,{"datestr":'q'});
                let datalist=rc_q;
                datalist.map(item=>{
                    let obj={...item};
                    this.jhotlist.push({id:obj.sortid,name:obj.EventSmallTypeName,count:obj.EventCount,EventSmallType:obj.EventSmallType});
                });
            },
            //热词排行-年数据接口
            async bindrc_y(){
                let {data:rc_y} = await index.fetchData_get(Api.eventdx.zhongxin_lb_top,{"datestr":'y'});
                let datalist=rc_y;
                datalist.map(item=>{
                    let obj={...item};
                    this.nhotlist.push({id:obj.sortid,name:obj.EventSmallTypeName,count:obj.EventCount,EventSmallType:obj.EventSmallType});
                });
            },
            //天翼类别排行-月数据接口
            async bindlb_m(){
                let {data:rc_m} = await index.fetchData_get(Api.eventdx.tianyi_lb_top,{"datestr":'m'});
                let datalist=rc_m;
                datalist.map(item=>{
                    let obj={...item};
                    this.leibielist.push({id:obj.sortid,name:obj.EventTypeName,count:obj.EventCount,EventType:obj.EventType});
                });
            },
            //天翼类别排行-季数据接口
            async bindlb_q(){
                let {data:rc_q} = await index.fetchData_get(Api.eventdx.tianyi_lb_top,{"datestr":'q'});
                let datalist=rc_q;
                datalist.map(item=>{
                    let obj={...item};
                    this.jleibielist.push({id:obj.sortid,name:obj.EventTypeName,count:obj.EventCount,EventType:obj.EventType});
                });
            },
            //天翼类别排行-年数据接口
            async bindlb_y(){
                let {data:rc_y} = await index.fetchData_get(Api.eventdx.tianyi_lb_top,{"datestr":'y'});
                let datalist=rc_y;
                datalist.map(item=>{
                    let obj={...item};
                    this.nleibielist.push({id:obj.sortid,name:obj.EventTypeName,count:obj.EventCount,EventType:obj.EventType});
                });
            },
            //事件详情接口
            async bindeventinfo(id){
                let {data:event_info} = await index.fetchData_get(Api.eventdx.eventinfo,{"id":id});
                let datalist=event_info;
                this.iteminfo.id=datalist[0].id;
                this.iteminfo.content=datalist[0].事件描述;
                this.iteminfo.sbsj=datalist[0].上报时间;
                this.iteminfo.type=datalist[0].事件类型;
                //处置图片集
                this.iteminfo.imgitems=[];
                let czqimg=datalist[0].处置前图片.split('|');
                for(let j=0;j<czqimg.length;j++){
                        if(czqimg[j]!==''){
                            this.iteminfo.imgitems.push({title:'处置前图片',src:czqimg[j]});
                        }
                }
                let czhimg=datalist[0].处置后图片.split('|');
                for(let j=0;j<czhimg.length;j++){
                    if(czhimg[j]!==''){
                        this.iteminfo.imgitems.push({title:'处置后图片',src:czhimg[j]});
                    }
                }
                console.log("++++++++++++++++++id:",datalist[0].id);
                console.log("++++++++++++++++++处置流程:",datalist[0].处置流程);
                //处置流程
                this.iteminfo.activities=[];
                let activitieslist=datalist[0].处置流程.split('|');
                for(let z=0;z<activitieslist.length;z++){
                    if(activitieslist[z].length>0){
                        let columns=activitieslist[z].split('@');
                        if(z===0){
                            this.iteminfo.activities.push(
                                {
                                    content: '【'+columns[2]+columns[3]+'】'+columns[1]+'',
                                    timestamp: columns[4],
                                    size: 'large',
                                    type: 'primary',
                                    icon: 'el-icon-more'
                                }
                            );
                        }
                        else if(z===1){
                            this.iteminfo.activities.push(
                                {
                                    content: '【'+columns[2]+columns[3]+'】'+columns[1]+'',
                                    timestamp: columns[4],
                                    color: '#0bbd87'
                                }
                            );
                        }
                        else if(z===2){
                            this.iteminfo.activities.push(
                                {
                                    content: '【'+columns[2]+columns[3]+'】'+columns[1]+'',
                                    timestamp: columns[4],
                                    color: '#cd5e8f'
                                }
                            );
                        }
                        else{
                            this.iteminfo.activities.push(
                                {
                                    content: '【'+columns[2]+columns[3]+'】'+columns[1]+'',
                                    timestamp: columns[4],
                                }
                            );
                        }
                    }
                }

                this.iteminfo.area=datalist[0].地区;
                this.iteminfo.wg=datalist[0].网格;
                this.iteminfo.wgname=datalist[0].上报人;
                this.iteminfo.wgmapurl=datalist[0].轨迹;


                this.iteminfo.mapiframe='<iframe id="gisIframe" frameborder="0" scrolling="no" src="http://10.19.181.153/pubgis/flex/map.html?wmode=opaque&amp;coordinatex='+datalist[0].X坐标+'&amp;coordinatey='+datalist[0].Y坐标+'&amp;config=config-locate.xml"  width="300px" height="385px"></iframe>';


                //this.iteminfo.
            },
            //舆情接口
            async bindyq(id){
                this.arr=[];
                let {data:yq_list} = await index.fetchData_get(Api.eventdx.opinion,{"eventid":id});
                let datalist=yq_list;
                datalist.forEach(item=>{
                    this.arr.push(
                        {id:item.id,date:item.time,title:item.title,content:item.content},
                    );
                });
                // 调用子组件中的方法
                this.$refs.paomadeng.bindevents();
            },
            closeDialog(){
                //清空所有定时器
                this.$refs.paomadeng.clearall();
            },
            async initSwipercards(tag,type,isfirst,date){
                let that=this;
                this.$nextTick(()=> {
                    if(that.mySwiper!==null){
                        console.log("++++++++that.mySwiper对象进入销毁");
                        that.mySwiper.destroy(false);
                    }
                    that.mySwiper = new Swiper ('.swiper-container', {
                        // direction: 'vertical', // 垂直切换选项
                        touchRatio:0, //设置取消滑动
                        loop: false, // 循环模式选项
                        // 如果需要分页器
                        // pagination: {
                        //     el: '.swiper-pagination',
                        // },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        on:{
                            //Swiper左右点击触发
                            slideChange: async function () {
                                //设置事件分页接口数据接收对象
                                let itemplist = [];
                                that.itemlist = [];

                                console.log("++++++pageindex:", this.activeIndex);
                                if (tag === 'EventSmallType') {
                                    let {data: event_list} = await index.fetchData_get(Api.eventdx.smalltypeevents, {
                                        "smalltype": type,
                                        datestr:date,
                                        pageindex: this.activeIndex + 1,
                                        pagesize: 8
                                    });
                                    console.log("++++++++++++++event_list:",event_list);
                                    let datalist = event_list;
                                    datalist.forEach(item => {
                                        itemplist.push({
                                            id: item.id,
                                            content: item.事件描述,
                                            date: item.上报时间,
                                            type: item.事件类型,
                                            imgcount: item.处置前图片.split('|').length + item.处置后图片.split('|').length,
                                            eventStatus: item.事件状态 === '网格关闭' ? true : false,
                                            location: item.X坐标.length > 0 ? true : false,
                                            pf: 5,
                                            topimg: item.处置前图片.split('|')[0],
                                            EventThreeTypeName: item.EventThreeTypeName,
                                            EventThreeType: item.EventThreeType,
                                            EventThreeTypeNameCount: item.EventCount,
                                            datestr:date,
                                            head:item.是否头条===1?true:false,
                                            tj:item.是否推荐===1?true:false
                                        });
                                    });
                                    //将分页接口获取的数据重新赋值给itemlist
                                    if(this.activeIndex!==0)
                                    {
                                        that.itemdiv[this.activeIndex-1].itempageshow=true;
                                        that.itemdiv[this.activeIndex-1].itemlist=itemplist;
                                    }
                                    else
                                    {
                                        that.itemlist = itemplist;
                                    }
                                } else if (tag === 'EventType') {
                                    let {data: event_list} = await index.fetchData_get(Api.eventdx.typeevents, {
                                        "type": type,
                                        datestr:date,
                                        pageindex: this.activeIndex + 1,
                                        pagesize: 8
                                    });
                                    console.log("++++++++++++++event_list:",event_list);
                                    let datalist = event_list;
                                    datalist.forEach(item => {
                                        itemplist.push({
                                            id: item.id,
                                            content: item.事件描述,
                                            date: item.上报时间,
                                            type: item.事件类型,
                                            imgcount: item.处置前图片.split('|').length + item.处置后图片.split('|').length,
                                            eventStatus: item.事件状态 === '网格关闭' ? true : false,
                                            location: item.X坐标.length > 0 ? true : false,
                                            pf: 5,
                                            topimg: item.处置前图片.split('|')[0],
                                            EventThreeTypeName: item.EventThreeTypeName,
                                            EventThreeType: item.EventThreeType,
                                            EventThreeTypeNameCount: item.EventCount,
                                            datestr:date
                                        });
                                    });
                                    //将分页接口获取的数据重新赋值给itemlist
                                    if(this.activeIndex!==0){
                                        that.itemdiv[this.activeIndex-1].itempageshow=true;
                                        that.itemdiv[this.activeIndex-1].itemlist=itemplist;
                                    }
                                    else{
                                        that.itemlist = itemplist;
                                    }
                                }
                            }
                        }
                    });
                });
                 if(isfirst===0){
                     return;
                 }
            },
            //根据三类id获取事件top10
            async bindthreetypeeventtop(threetype,date){
                console.log("++++++++++++进入三类事件top10");
                this.eventimgitems=[];
                let {data:eventslist} = await index.fetchData_get(Api.eventdx.threetypeevents,{"threetype":threetype,datestr:date});
                let datalist=eventslist;
                datalist.map(item=>{
                    let obj={...item};
                    let title;
                    if(obj.事件描述.toString().length>36){
                        title=obj.事件描述.toString().substring(0,26)+"..";
                    }
                    else{
                        title=obj.事件描述.toString();
                    }
                    //obj.事件描述.toString()
                    this.eventimgitems.push(
                        {
                            id:obj.id,
                            type:obj.事件类型,
                            title:title,
                            date:obj.上报时间,
                            wg:obj.网格,
                            src:obj.处置前图片.split('|')[0],
                            EventThreeTypeName:obj.EventThreeTypeName
                        }
                    );
                   // this.nhotlist.push({id:obj.sortid,name:obj.EventSmallTypeName,count:obj.EventCount,EventSmallType:obj.EventSmallType});
                });
                this.eventimgitemsfor=[];
                if(this.eventimgitems.length>0&&this.eventimgitems.length<=2)
                {
                    let itemlist=[];
                    this.eventimgitems.forEach(item=>{
                        itemlist.push({
                            id:item.id,
                            type:item.type,
                            title:item.title,
                            date:item.date,
                            wg:item.wg,
                            src:item.src,
                            EventThreeTypeName:item.EventThreeTypeName
                        });
                   });
                    this.eventimgitemsfor.push({
                        itemlist:itemlist
                    });
                    //let pcount=int.Parse(this.eventimgitems.length/3);
                }
                else
                {
                    let pcount=parseInt(this.eventimgitems.length/3);
                    console.log("++++++++++++pcount：",pcount);
                    if(this.eventimgitems.length%3!==0)
                    {
                        pcount=pcount+1;
                    }
                    for(let i=0;i<pcount;i++)
                    {
                        let itemlist=[];
                        let startindex=i*3;
                        let endindex=i*3+2;
                        this.eventimgitems.slice(startindex,endindex+1).forEach(
                            item=>{
                                itemlist.push({
                                    id:item.id,
                                    type:item.type,
                                    title:item.title,
                                    date:item.date,
                                    wg:item.wg,
                                    src:item.src,
                                });
                            }
                        )
                        this.eventimgitemsfor.push({
                            itemlist:itemlist
                        });
                    }
                }
            }
        }
    };
</script>
 <!--classname不被替换，保留原有名称-->
 <style>
     /*elementui库·-个性化设置*/
     .el-tabs__nav{
         margin-left: 94px !important;
     }
     .el-dialog, .el-page li{
         background-color: #2c3e50 !important;
     }
     .icon_menu:hover{
         box-shadow: 15px 15px 14px rgba(50,50,50,0.4);
         transform: rotate(0deg) scale(1.2);
         -webkit-transform: rotate(0deg) scale(1.2);
         -moz-transform: rotate(0deg) scale(1.2);
         z-index: 2;
     }


     .el-tag{
         margin-right: 10px;
     }
     /*.el-card{
       width:300px;
       float:left;
       margin: 9px;
       opacity: 0.9;
     }*/
     .el-card{
         margin: 6px;
         border:none !important;
         background-color: inherit !important;
         float:left;
     }
     .el-divider--horizontal{
         margin: 17px 0 !important;
     }
     .el-divider__text{
         padding: 5px 20px !important;
     }
     .el-tag--warning{
         background-color: inherit !important;
         color:#f7ba2a !important;
         font-weight: bolder;
         font-size: 14px !important;
     }
     .el-divider__text{
         background-color: #2c3e50 !important;
         color:white !important;
     }
     .el-tabs__item{
         color:white !important;
         padding: 0 10px !important;
         margin-right: 0px !important;
     }
     .el-tabs__item.is-active{
         color:black !important;
         background-color: white;
     }
     .el-dialog__title{
         color:white !important;
     }
     .el-dialog__body{
         padding: 10px 10px !important;
     }
     .el-timeline-item{
         padding-bottom: 10px !important;
     }
 </style>
 <!--classname被替换，使用范围vue当前页-->
 <style lang="scss" scoped>
     .fontcolor{
         color:red;
         font-weight: bolder;
     }


     .swiper-button-prev {
         left: 0px;
     }

     .swiper-slide-content {
         width: 97%;
         height: 100%;
         margin-left: 2.6%;
     }

     .whitedivider {
         margin-top: 30px !important;
         margin-bottom: 30px !important;
     }

     #tbhb_tb {
         float: left;
         z-index: 9999;
         height: 400px;
         width: 584px;
         box-shadow: 0px 1px 3px 3px gray;
         border: solid 1px #f3f3f3;
         border-radius: 5px;
         color: white;
     }

     #bt_tb {
         float: left;
         height: 400px;
         width: 584px;
         color: white;
         margin-left: 8px;
         box-shadow: 0px 1px 3px 3px gray;
         border: solid 1px #f3f3f3;
         border-radius: 5px;
         z-index: 9999999999999;
     }

     .card_tip_left {
         float: left;
         margin-left: 5px;
     }

     .card_tip_right {
         float: right;
         margin-right: 5px;
     }

     .event_content {
         line-height: 25px;
         height: 100px;
         display: block;
         color: white;
         font-size: 1rem;
         overflow: hidden;

         text-align: left;
     }

     .content_lx {
         height: 40px;
         line-height: 40px;
         font-size: 16px;

         color: #990000;
         text-indent: 24px;
         font-family: "Microsoft YaHei UI";
     }

     .content_wg {
         color: #990000;
         text-indent: 24px;
         font-size: 16px;
         font-family: "Microsoft YaHei UI";
     }


     .content_sbsj {
         height: 34px;
         line-height: 34px;
         font-size: 18px;
         font-weight: bolder;
         color: #990000;
         text-indent: 25px;
     }

     .content_con {
         text-indent: 26px;
         line-height: 26px;
         color: #172740;
         font-size: 16px;
         font-family: "Microsoft YaHei UI";
     }


     .dialog_left {
         float: left;
         width: 300px;
         height: 375px;
         background-color: #dfdfdf;
         margin-left: 9px;
         border-radius: 5px;
         border: solid 1px #DFDFDF;
         box-shadow: 0px 1px 3px 3px gray;
         overflow: hidden;
     }

     .dialog_center {
         float: left;
         width: 350px;
         height: 355px;
         /*overflow: hidden;*/
         /*overflow-y: auto;*/
         text-align: left;
         margin-left: 9px;
         border: solid 1px #DFDFDF;
         border-radius: 5px;
         padding: 10px;
         background-color: #f3f3f3;
         box-shadow: 0px 1px 3px 3px gray;
     }

     .dialog_right {
         text-align: left;
         padding: 10px;
         float: left;
         width: 465px;
         height: 355px;
         background-color: #f3f3f3;
         box-shadow: 0px 1px 3px 3px gray;
         border: solid 1px #f3f3f3;
         border-radius: 5px;

         p {
             margin-block-start: 0.5em;
             margin-block-end: 0.5em;
         }
     }

     .yqnews {
         height: 40px;
         line-height: 40px;
         margin-top: 10px;
         width: 100%;
         float: left;
         background-color: #f3f3f3;
         box-shadow: 0px 1px 3px 3px gray;
         border: solid 1px #f3f3f3;
         border-radius: 5px;

         .yq_left {
             float: left;
             display: block;
             height: 40px;
             line-height: 40px;
             width: 80px;
             background-color: #b32b06;
             color: white;
             opacity: 0.8;
             border-radius: 5px;
             text-align: center;
             font-size: 1rem;
         }

         .yq_content {
             float: left;
             display: block;
             height: 40px;
             line-height: 40px;
             width: 1100px;
             text-align: left
         }
     }

     .el-carousel__item h3 {
         color: #475669;
         font-size: 14px;
         opacity: 0.75;
         line-height: 200px;
         margin: 0;
     }

     .el-carousel__item:nth-child(2n) {
         background-color: #61a0a9;
     }

     .el-carousel__item:nth-child(2n+1) {
         background-color: #61a0a9;
     }


     .item {
         margin-top: 0px;
         margin-right: 0px;
     }

     .card_tip {
         position: absolute;
         height: 30px;
         width: 300px;
         line-height: 30px;
         background-color: black;
         z-index: 9;
         margin-top: 0px;
         opacity: 0.5;
         color: white;
         font-size: 14px;
     }

     .card_close {
         position: absolute;
         height: 100px;
         width: 100px;
         margin-left: 0px;
         margin-top: 160px;
         z-index: 9;
         opacity: 0.8;
     }

     .xiaolei {
         line-height: 30px;
         width: 100%;
         min-height: 30px;
         height: 30px;
         color: white;
     }

     #left_reci {
         height: 900px;
         overflow: hidden;
         overflow-y: auto;
     }

     #left_leibie {
         height: 900px;
         overflow: hidden;
         overflow-y: auto;
     }

     /*设置 class为p_left的div滚动条样式*/
     #left_leibie::-webkit-scrollbar { //滚动条的宽度
         width: 5px;
         opacity: 0.6;
     }

     #left_leibie::-webkit-scrollbar-track { //滚动条凹槽的设置
         background-color: #ffffff;
         -webkit-border-radius: 2em;
         -moz-border-radius: 2em;
         border-radius: 2em;
     }

     #left_leibie::-webkit-scrollbar-thumb { //滚动条的设置
         background-color: #8c939d;
         -webkit-border-radius: 2em;
         -moz-border-radius: 2em;
         border-radius: 2em;
     }

     .bq {
         background-color: inherit;
     }

     .showinfo {
         background-color: inherit;
         color: white;
         font-size: 14px;
         font-weight: bolder;
     }

     .tags {
         border: none !important;
         background-color: #d0e7f5;
         color: #1692d9;
         font-weight: bolder;
         margin-left: 0px;
     }

     .hide {
         display: none;
     }

     .hot_icon_right {
         float: left;
         display: inline-block;
         width: 50px;
         line-height: 30px;
         text-align: center;
         text-indent: 5px;
     }

     .hot_icon_content {
         float: left;
         display: inline-block;
         width: 158px;
         line-height: 30px;
         background-color: gray;
         color: white;
     }

     .hot_icon_id {
         float: left;
         display: inline-block;
         width: 20px;
         margin-left: 5px;
         margin-right: 5px;
         line-height: 30px;
         text-align: center;

     }

     .lefton {
         background-color: #3c6a7e !important;
         opacity: 0.8;
     }

     .leftclickon {
         background-color: #2c3e50;
         color: white;
     }

     .time {
         font-size: 13px;
         color: #999;
     }

     .bottom {
         margin-top: 4px;
         line-height: 12px;
     }

     .button {
         padding: 0;
         float: right;
     }

     /*.image {*/
     /*    width: 300px;*/
     /*    display: block;*/
     /*}*/

     .clearfix:before,
     .clearfix:after {
         display: table;
         content: "";
     }

     .clearfix:after {
         clear: both
     }


     .swiper-slide {
         margin-top: 10px;
         /* box-shadow: 0px -2px 2px #c2d8fb;*/
         /*background-color: white;*/
     }

     .swiper-container {
         width: 1500px;
         height: 1000px;

     }

     .menu_left {
         position: fixed;
         left: 0px;
         top: 10px;
         text-align: left;
         z-index: 999;
     }

     .el-menu-vertical-demo:not(.el-menu--collapse) {
         width: 200px;
         min-height: 200px;
     }

     .main {
         width: 1920px;
         height: 1080px;
         position: relative;
         overflow: hidden;
         font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
         /*background: url(../assets/imgs/bg-shuidian.png) no-repeat center center;*/
         background: url(../assets/imgs/bg-shuidian.png) no-repeat center center;
         /*background: url(../assets/imgs/bg.jpg) no-repeat center center;*/
     }

     .main_h {
         /*position: relative;*/
         width: 1866px;
         height: 50px;
         line-height: 50px;
         position: absolute;
         margin-top: 10px;
         margin-left: 30px;
         color: #DFDFDF;
         font-weight: bolder;
         font-size: 1.6rem;
         background: url(../assets/imgs/logo_back_New.png) no-repeat 40% 40%;

         .left_menu {
             margin: 0px 0px 0px 0px;
             position: absolute;
             width: 50px;
             height: 50px;
             cursor: pointer;
         }

         .menu_arror {
             display: block;
             width: 30px;
             position: absolute;
             margin-left: 50px;
             margin-top: 10px;
         }

         .menu_list {
             position: absolute;
             margin: 0px 0px 0px 80px;
             width: 380px;
             height: 50px;
             line-height: 50px;
             background-color: #172740;
             border-radius: 5px;
             color: white;
         }

         .menu_list ul li {
             float: left;
             margin: 5px 0px 0px 5px;
             height: 40px;
             width: 120px;
             background-color: #43a6b2;
             border-radius: 5px;
         }

         .menu_list ul li a {
             color: white;
             font-size: 1.1rem;
             display: block;
             height: 40px;
             width: 120px;
             line-height: 40px;
         }

         .center {
             width: 570px;
             height: 50px;
             margin-left: 660px;
         }

         .logo {
             margin-left: 20px;
             float: left;
             display: block;
             height: 48px;
         }

         .title {
             float: left;
             display: block;
             height: 50px;
             width: 500px;
             text-align: center;
             font-size: 2.3rem;
             font-weight: normal;
         }

         .right_timeline {
             position: absolute;
             width: 320px;
             height: 50px;
             background-color: #2c3e50;
             right: 66px;
             top: 0px;
             color: white;
             font-size: 1rem;
             border-radius: 5px;

         }
     }


     .main_c {
         width: 1866px;
         height: 990px;
         margin-left: 30px;
         margin-top: 60px;
         position: absolute;
         /*background: url(../assets/imgs/bg-insd.png) no-repeat center center;*/
     }

     .l_title {


         font-weight: bolder;
         height: 50px;
         width: 100%;
         text-align: left;
         color: white;
     }

     .hot_icon_left {
         float: left;
         display: inline-block;
         width: 10px;
         background-color: #2c3e50;
         height: 30px;
         line-height: 30px;
         text-align: center;
     }

     .hotWords {
         float: left;
         width: 300px;
         height: 970px;
         margin-left: 0px;
         margin-top: 28px;
         background-color: #0c1a34;
         border-radius: 5px;
         box-shadow: black 5px 5px 5px;
     }

     .container {
         float: left;
         margin-left: 55px;
         margin-top: 10px;
         width: 1500px;
         height: 990px;


     }

     .left {
         float: left;
         margin-left: 20px;
         margin-top: 20px;
         width: 200px;
         height: 1030px;
         background-color: white;
         opacity: 0.3;
         border-radius: 5px;
         box-shadow: red 5px 5px 5px;
     }

     .right {
         float: left;
         margin-left: 20px;
         margin-top: 20px;
         width: 1640px;
         height: 1030px;
         background-color: white;
         opacity: 0.3;
         border-radius: 5px;
         box-shadow: red 5px 5px 5px;
     }
 </style>

