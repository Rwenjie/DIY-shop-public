<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/4/11
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/4/11
 -->

<template>

    <div class="store-list-item">
            <el-card :body-style="{ padding: '0', cursor: 'pointer', border: '1px black solid'}">
                <div class="card-image"><slot name="item-image"/></div>
                <div><slot name="item-text"/></div>
                <div><slot name="item-button"/></div>
            </el-card>

        </div>


</template>

<script>
    export default {
        name: "StoreListItem",
        methods: {

        }

    }
</script>

<style scoped>
    .store-list-item{
        width: 230px;
        margin: 7px 10px;

    }
    .card-image{
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
    }
</style>