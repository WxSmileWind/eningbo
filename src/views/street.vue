<template>
    <div>
        <el-dialog top="50px" title="统计分析" :visible.sync="showtj" :modal="true" :modal-append-to-body='false' width="1200px" >
            <div style="height:850px;width:100%;z-index:9999; ">
                <div id="tjj" style="width: 800px;height: 600px;">

                </div>
            </div>
        </el-dialog>
        <input type="button" value="aa" @click="bindarea('27561f2b-a420-45e7-a851-b01dba52687e')"/>
    </div>

</template>

<script>
    import index from '@/api/index';
    import {Api} from '@/api/api';
    export default {
        name: "street",
        data() {
            return {
                showtj:false,
                loading:true,
                config:{
                    data: [
                        {
                            name: '周口',
                            value: 55
                        },
                        {
                            name: '南阳',
                            value: 120
                        },
                        {
                            name: '西峡',
                            value: 78
                        },
                        {
                            name: '驻马店',
                            value: 66
                        },
                        {
                            name: '新乡',
                            value: 80
                        }
                    ]
                }
            }
        },
        created() {
           // this.bindarea('27561f2b-a420-45e7-a851-b01dba52687e');
        },
        methods:{
            async bindarea(threetype){
                this.showtj=true;
                console.log("区县++++++++++++++threetype:",threetype);
                //三类-年月统计
                let {data:threetypeqx} = await index.fetchData_get(Api.eventdx.threetypeqx,{"threetype":threetype});
                let datalist=JSON.parse(threetypeqx);


                this.$nextTick(() => {

                    //同步环比
                    let echarts = require('echarts');
                    // 基于准备好的dom，初始化echarts实例
                    let myChart = echarts.init(document.getElementById('tjj'));
                    let colors = ['#5793f3', '#d14a61', '#675bba'];
                    let legenddata=[];
                    let seriesdata=[];

                    let source=[
                        ['eventyear', '2019', '2020']
                    ];
                    datalist.map(item=>{
                        let obj={...item};
                        legenddata.push(item.qxname);
                        // seriesdata.push({value:item.EventCount,name:item.qxname});
                        seriesdata.push({type: 'line', smooth: true, seriesLayoutBy: 'row'});
                        let datavalue=item.qxname+",";


                        for(let z=1;z<=2;z++)
                        {
                            datavalue+=parseInt(Math.random(10,30)*10)+",";
                        }
                        datavalue=datavalue.substring(0,datavalue.length-1).split(',');
                        source.push(datavalue);
                    });
                    seriesdata.push({
                        type: 'pie',
                        id: 'pie',
                        radius: '35%',
                        center: ['50%', '35%'],
                        label: {
                            formatter: '{b}: {@2019}件 ({d}%)'
                        },
                        color: [ '#bda29b', '#ca8623','#749f83','#91c7af','#d38265','#639fa7','#ff0101','#c33531','#f3f3f3','#63ecff','#63d053','#d7d1ed','#8d017e','#5b008c','#fffe27','#ff9f02','#008222' ],
                        encode: {
                            itemName: 'eventyear',
                            value: '2019',
                            tooltip: '2019'
                        }
                    });
                    console.log("+++++++++++++++source:",JSON.stringify(source));


                    myChart.setOption(
                        {
                            legend: {
                                icon:'roundRect',
                                type: 'scroll',
                                top: 10,
                                textStyle:{
                                    color:'#fff'
                                }
                            },
                            dataset: {
                                source:source
                            },
                            tooltip: {
                                trigger: 'axis',
                                showContent: false
                            },
                            xAxis: {
                                type: 'category',
                                axisTick: {
                                    alignWithLabel: true,
                                    interval:0,
                                    lineStyle:{
                                        color:'#ffffff',
                                        width:1,
                                        type:'solid',
                                    }
                                },
                                axisLine: {
                                    onZero: true,
                                    lineStyle: {
                                        color: '#fff'
                                    }
                                },
                            },
                            yAxis: {
                                gridIndex: 0,
                                axisLine: {
                                    onZero: true,
                                    lineStyle:{
                                        color:'#fff'
                                    }
                                },
                            },
                            grid: {top: '65%'},
                            color: [ '#bda29b', '#ca8623','#749f83','#91c7af','#d38265','#639fa7','#ff0101','#c33531','#f3f3f3','#63ecff','#63d053','#d7d1ed','#8d017e','#5b008c','#fffe27','#ff9f02','#008222' ],
                            series:seriesdata
                            // series: [
                            //     // {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                            //     // {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                            //
                            //     // {
                            //     //     type: 'pie',
                            //     //     id: 'pie',
                            //     //     radius: '35%',
                            //     //     center: ['50%', '35%'],
                            //     //     label: {
                            //     //         formatter: '{b}: {@2019}件 ({d}%)'
                            //     //     },
                            //     //     color: [ '#bda29b', '#ca8623','#749f83','#91c7af','#d38265','#639fa7','#2f4553','#c33531','#f3f3f3','#63ecff','#63d053','#d7d1ed','#8d017e','#5b008c','#fffe27','#ff9f02','#008222' ],
                            //     //     encode: {
                            //     //         itemName: 'eventyear',
                            //     //         value: '2019',
                            //     //         tooltip: '2019'
                            //     //     }
                            //     // }
                            // ]
                        }
                    );
                    myChart.on('updateAxisPointer', function (event) {
                        let xAxisInfo = event.axesInfo[0];
                        if (xAxisInfo) {
                            let dimension = xAxisInfo.value + 1;
                            myChart.setOption({
                                series: {
                                    id: 'pie',
                                    label: {
                                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                                    },
                                    encode: {
                                        value: dimension,
                                        tooltip: dimension
                                    }
                                }
                            });
                        }
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
        }
    }
</script>

<style lang="scss" scoped>
    .main{
        background-color: black;
    }
</style>