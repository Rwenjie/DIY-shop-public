<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/4/30
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/4/30
 -->

<template>
    <div id="basic-info">
        <p>向全世界介绍您的物品以及他们为什么会喜欢它。</p>
        <div>
            <el-row>
                <el-col :span="6" style="padding: 5px">
                    <p><b>标题*</b></p>
                    <span class="toast-text">包括买家将用于搜索您的商品的关键字。</span>
                </el-col>
                <el-col :span="18">
                    <div style="padding-top: 30px">
                        <el-input type="text" v-model="basicInfo.title" maxlength="140" show-word-limit></el-input>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div>
            <el-row>
                <el-col :span="6" style="padding-top: 5px">
                    <p><b>类别*</b></p>
                    <span class="toast-text">输入两到三个的商品描述，以获取类别建议，以帮助更多的购物者找到它。</span>
                </el-col>
                <el-col :span="18">
                    <div class="block" style="padding-top: 30px;">
                        <el-cascader
                                :model="category"
                                ref="categorySelect"
                                placeholder="试试搜索：指南"
                                :options="categories"
                                :value="category"
                                @change="getSpecification"
                                filterable></el-cascader>
                    </div>
                    <div>
                        <specification-list
                                :formDate="specification"
                                @getSpecificTemp="SpecificTemp">
                        </specification-list>

                    </div>
                </el-col>
            </el-row>
        </div>

        <div>
            <el-row>
                <el-col :span="6" style="padding: 5px">
                    <p><b>描述*</b></p>
                    <span class="toast-text">首先，简要概述一下您产品的最佳功能。购物者起初只会看到描述的前几行，因此请务必计数！</span>
                    <p><span class="toast-text">不确定还有什么要说的吗？购物者还喜欢了解您的流程以及该商品背后的故事。</span></p>
                </el-col>
                <el-col :span="18">
                    <div style="padding-top: 30px;">
                        <el-input
                                type="textarea"
                                :rows="10"
                                placeholder="请输入内容"
                                v-model="basicInfo.describe">
                        </el-input>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div>
            <p><b>自定义</b></p>
            <p>添加可用的选项，如颜色或大小。买家在付款时将从中选择。</p>

            <variations></variations>

        </div>
<!--        <div>
            <el-row>
                <el-col :span="6" style="padding: 5px">
                    <p><b>标签</b><span class="toast-text">(可选)</span></p>
                    <span class="toast-text">有人可以用哪些词来搜索您的列表？使用所有13个标记进行查找。 获取标签的提示。</span>
                </el-col>
                <el-col :span="18">
                    <div style="padding-top: 30px;">
                        <div style="margin-top: 15px">
                            <el-input placeholder="形状，颜色，样式，功能等" v-model="tagInputVlaue" style="width: 35%">
                                <template #append >
                                    <el-button @click="addTag">添加</el-button>
                                </template>
                            </el-input>
                        </div>
                    </div>
                    <el-tag
                            v-for="tag in product.tags"
                            :key="tag.name"
                            closable
                            type="info"
                            :disable-transitions="false"
                            @close="tagHandleClose(tag)"
                            style="margin-top: 20px; margin-right: 5px">
                        {{tag.name}}
                    </el-tag>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-row>
                <el-col :span="6" style="padding: 5px">
                    <p><b>材料</b><span class="toast-text">(可选)</span></p>
                </el-col>
                <el-col :span="18">
                    <div style="padding-top: 10px;">
                        <div style="margin-top: 15px">
                            <el-input placeholder="材质，成分" v-model="tagInputVlaue" style="width: 35%">
                                <template #append >
                                    <el-button @click="addMaterial">添加</el-button>
                                </template>
                            </el-input>
                        </div>
                    </div>
                    <el-tag
                            v-for="tag in product.material"
                            :key="tag.name"
                            closable
                            type="info"
                            :disable-transitions="false"
                            @close="materialHandleClose(tag)"
                            style="margin-top: 20px; margin-right: 5px">
                        {{tag.name}}
                    </el-tag>
                </el-col>
            </el-row>
        </div>-->
    </div>
</template>

<script>


    import {categoryList, specificList} from "network/product";

    import SpecificationList from "components/common/specification/SpecificationList";
    import Variations from "components/common/specification/Variations";

    export default {
        name: "BasicInfo",
        components: {
            SpecificationList,
            Variations
        },


        data() {
            return{
                basicInfo: {
                    title: "",
                    maker: "",
                    makeStatus: "",
                    describe: "",



                },
                categories: [],
                category: {},
                specification: "",
            }
        },
        methods: {

            //根据商品列表获得属性模板
            getSpecification() {
                const categoryId = this.$refs["categorySelect"].getCheckedNodes()[0].value;
                //可以获得category 的各级ID
                //const test = this.$refs["categorySelect"].getCheckedNodes(false);

                specificList(categoryId).then(res => {
                    this.specification = JSON.parse(res.data.specifications);
                });

            },
            //获得specificationsList输入的值
            SpecificTemp(specificInputs) {
                console.log(specificInputs);
            },


            //递归将category的叶子结点设置为undefined
            getTreeData(data) {
                // 循环遍历json数据
                for (var i = 0; i < data.length; i++) {
                    if (data[i].children.length < 1) {
                        // children若为空数组，则将children设为undefined
                        data[i].children = undefined;
                    } else {
                        // children若不为空数组，则继续 递归调用 本方法
                        this.getTreeData(data[i].children);
                    }
                }
                return data;
            },
        },
        mounted() {
            //获得商品列表
            categoryList().then( res=> {
                this.categories = this.getTreeData(res.data);

            })
        },
        watch: {
            basicInfo: {
                deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() {
                    console.log(this.basicInfo);
                }
            }
        }

    }
</script>

<style scoped>

</style>