<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/4/11
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/4/11
 -->

<template>
    <div class="store-list" style="padding: 0 15px;
                       display: flex;
                       flex-wrap: wrap;
                       justify-content: flex-start">
            <slot/>
    </div>




<!--        <el-row style="padding: 0 15px;
                       display: flex;
                       justify-content: space-around">

            <el-col :span="4" v-for="(o) in 5 " :key="o">
                <el-card :body-style="{ padding: '10px', cursor: 'pointer' }">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                    <div style="padding: 14px;">
                        <span>好吃的汉堡</span>
                        <div class="bottom">
                            <time class="time">{{ currentDate }}</time>
                            <el-button type="text" class="button">操作按钮1</el-button>
                            <el-button type="text" class="button">操作按钮2</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>-->

</template>

<script>

    export default {
        name: "StoreList",
        components: {

        },

    }
</script>

<style scoped>
</style>