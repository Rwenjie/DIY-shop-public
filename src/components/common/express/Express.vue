<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/3/7
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/3/7
 -->

<template>
    <div id="express">
        <el-input v-model="expressId" placeholder="请输入订单号"></el-input>
        <el-button @click="doExpress">查询</el-button>

        <div class="taskPlan" :model="taskPlanTimeForm" ref="taskPlanTimeForm">
            <iframe :src="trailInfor.trailUrl" frameborder="0" id="iframeBox" class="expMap"></iframe>
        </div>

        <el-timeline>
            <el-timeline-item
                    v-for="(activity, index) in trailInfor.data"
                    :key="index"
                    :timestamp="activity.time" placement="top">
                {{activity.context}}
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
    import {expressDetail} from 'network/express';
    export default {
        name: "Express",
        components: {
        },
        data() {
            return {
                expressId: "",
                trailInfor: {
                    trailUrl: "",
                    arrivalTime: "",
                    totalTime: "",
                    message: "",
                    nu: "",
                    isCheck: "",
                    com: "",
                    status: "",
                    data: [
                        {
                            time: "",
                            context: "",
                            ftime: "",
                            areaCode: "",
                            areaName: "",
                            status: "",
                        },
                    ]
                },
                activities: [{
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, {
                    content: '创建成功',
                    timestamp: '2018-04-11'
                }]
            }
        },
        methods: {
            //查询物流信息
            doExpress() {
                console.log("查询快递");
                expressDetail().then(res => {
                    console.log(res);
                    this.trailInfor.data.push(...res.data.data.list);
                    this.trailInfor.trailUrl = res.data.data.trailUrl;
                    this.trailInfor.com = res.data.data.com;
                    this.trailInfor.totalTime = res.data.data.TotalTime;
                    this.trailInfor.nu = res.data.data.nu;
                    console.log(res.data.data.data);
                    console.log(this.trailInfor.data);
                })
            }
        }

    }
</script>

<style scoped>

    .expMap{
        width: 1000px;
        height: 360px;
    }
</style>