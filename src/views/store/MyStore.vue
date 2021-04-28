<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/4/11
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/4/11
 -->

<template>
    <div>
        <router-view>

        </router-view>

    </div>
</template>

<script>
    export default {
        name: "MyStore",
        components: {
        },
        methods: {

        }
    }
</script>

<style scoped>

    .image img .store-list-item{
        width: 230px;
        height: 200px;
    }

    .time {
        font-size: 13px;
        color: #999;

    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .button {
        border: black;
        padding: 0;
        min-height: auto;
    }

    .image {
        width: 100%;
        height: 100%;
    }
</style>