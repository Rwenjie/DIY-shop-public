<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/4/21
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/4/21
 -->

<template>
    <div id="listing">
        <store-list>
            <store-list-item>
                <template v-slot:item-image >
                    <div class="item" @click="addGood">
                        <i class="el-icon-plus" style="font-size: xx-large; font-weight: 900;"></i>
                    </div>
                    <div class="item" @click="addGood">添加商品</div>

                </template>

                <template v-slot:item-text>
                    <div style="border: 1px black solid;
                                width: 100%;
                                height: 70px;">
                    </div>
                </template>
            </store-list-item>

            <store-list-item v-for="(o) in 25 " :key="o">
                <template v-slot:item-image>
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                </template>
                <template v-slot:item-text>
                    <div style="padding: 7px;">
                        <span>好吃的汉堡</span>
                    </div>
                </template>
                <template v-slot:item-button>
                    <div class="bottom" style="padding: 7px;">
                        <el-button type="text" class="button">操作按钮1</el-button>
                        <el-button type="text" class="button">操作按钮2</el-button>
                    </div>
                </template>

            </store-list-item>
        </store-list>
    </div>
</template>

<script>

    import StoreList from "./StoreList";
    import StoreListItem from "./StoreListItem";

    export default {
        name: "Listing",
        components: {
            StoreList,
            StoreListItem,
        },
        methods:{
            addGood() {
                this.$router.push({name: 'CreateGood'})
            }
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