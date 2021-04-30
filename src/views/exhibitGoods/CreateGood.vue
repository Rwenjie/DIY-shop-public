<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/4/30
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/4/30
 -->

<template>
    <div id="create-good">
        <h1>商品发布</h1>
        <el-collapse v-model="activeNames" @change="handleChange" >
            <el-collapse-item name="1">
                <template #title>
                    <span class="title-text">图片</span>
                </template>
                <!-- 上传图片 UploadImages.vue -->
                <upload-images/>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template #title>
                    <span class="title-text">基础信息</span>
                </template>
                <basic-information @getVariationData="variationData"/>
               <!-- 基本信息 BasicInformation -->
            </el-collapse-item>


            <el-collapse-item name="3">
                <template #title>
                    <span class="title-text">库存和定价</span>
                </template>
                <inventory-price/>
            </el-collapse-item>
            <el-collapse-item>
                <template #title>
                    <span class="title-text">图片</span>
                </template>
                <div>尽可能多地添加，以便买家可以看到每个细节</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>

    import UploadImages from "./childComps/UploadImages";
    import BasicInformation from "./childComps/BasicInfo";
    import InventoryPrice from "./childComps/InventoryPrice";

    export default {
        name: "CreateGood",
        components: {
            UploadImages,
            BasicInformation,
            InventoryPrice
        },
        data() {
            return {
                activeNames: ['1'], // 默认第一个collapse是展开的
                goodsParams:{ //上传商品返回的数据

                }
            }
        },

    }
</script>

<style scoped>

    .title-text {
        font-size: x-large;
    }
</style>