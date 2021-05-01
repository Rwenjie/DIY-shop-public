<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/4/30
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/4/30
 -->

<template>
    <div id="variations">
        <p>Variations</p>

        <el-button icon="el-icon-edit" @click="dialogVisible = true">添加选项</el-button>
        <el-dialog
                v-model="dialogVisible"
                width="45%"
                :before-close="handleClose">

            <template #title>
                <p style="font-size: x-large">添加选项</p>
                <p>列出您提供的所有选项。买家将按在这里的顺序看到它们。</p>
            </template>
            <div>
                <el-row v-for="(variation, Id) in variations" :key="Id">
                    <el-col :span="12">

                        <el-space  wrap :size="medium">
                            <span v-show=variation.show>{{variation.name}}</span>
                            <span v-show=variation.show><el-button size="small" type="text" @click="rename(Id)">改名</el-button></span>
                            <span v-show=!variation.show>
                                <el-input v-model="variation.name"
                                          @change="renameVariation(Id)"
                                          size="small" >
                                    <template #append>
                                        <el-button @click="renameVariation(Id)">修改</el-button>
                                    </template>
                                </el-input>
                            </span>
                            <span><el-button size="small" type="text" @click="variationDelete(Id)">删除</el-button></span>
                        </el-space>

                        <ul style="list-style: none; font-size: smaller">
                            <li><el-checkbox v-model="variation.price">你每个{{variation.name}}的价格都不同</el-checkbox></li>
                            <li><el-checkbox v-model="variation.number">你每个{{variation.name}}的库存都不同</el-checkbox></li>
                            <li><el-checkbox v-model="variation.sku">你每个{{variation.name}}的SKU都不同</el-checkbox></li>
                        </ul>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="2"></el-col>
                            <el-col :span="20">
                                <el-input v-model="options[Id]"
                                          placeholder="命名属性"
                                          @change="addOption(Id)"
                                          size="small" >
                                    <template #append>
                                        <el-button @click="addOption(Id)">添 加</el-button>
                                    </template>
                                </el-input>
                                <div style="margin-top: 5px"></div>
                                <lu style="list-style: none;">
                                    <li v-for="(option, oId) in variation.options" :key="oId">
                                        <el-button size="small">{{option}}</el-button>
                                        <el-button size="small" icon="el-icon-delete" @click="deleteOption(Id, oId)"></el-button>
                                    </li>
                                </lu>

                            </el-col>
                            <el-col :span="2"></el-col>
                        </el-row>

                    </el-col>
                </el-row>
            </div>
            <div>
                <span>添加一个选项</span>
                <el-row>
                    <el-col :span="12">
                        <el-input v-model="variationName" @change="addVariation" size="medium">
                            <template #append>
                                <el-button @click="addVariation">添 加</el-button>
                            </template>
                        </el-input>
                    </el-col>
                </el-row>
                <div>

                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Variations",
        data() {
            return {
                options: [

                ],
                dialogVisible: false,
                variations: [
                    {
                        name: "颜色",
                        options: [
                            "白色","黄色","绿色"
                        ],
                        price: false,
                        number: true,
                        sku: true,
                        show: true
                    },
                    {
                        name: "内存",
                        options: [
                            "64GB","128GB","256GB","512GB"
                        ],
                        price: true,
                        number: true,
                        sku: true,
                        show: true
                    },
                    {
                        name: "运行内存",
                        options: [
                            "6GB","8GB","12GB"
                        ],
                        price: true,
                        number: true,
                        sku: true,
                        show: true
                    }

                ],
                show: [],
                variationName: "",
            }
        },
        methods: {
            addVariation() {
                if (this.variationName == "") {
                    return;
                }
                const variation = {
                    name: this.variationName,
                    options: [

                    ],
                    price: false,
                    number: false,
                    sku: false,
                    show: true
                };
                this.variations.push(variation);
                this.show.push(false)
                this.variationName = "";
            },
            variationDelete(id) {
                this.variations.splice(id, 1);
            },
            rename(id) {
                this.variations[id].show = false;
                this.variations[id].name = "";
            },
            renameVariation(id){
                this.variations[id].show = true;
            },
            //添加属性
            addOption(id) {
                 if (this.variations[id].options.indexOf(this.options[id])==-1){
                     this.variations[id].options.push(this.options[id]);
                 }
                this.options[id] = "";
            },
            //删除属性
            deleteOption(Id, oId){
                this.variations[Id].options.splice(oId, 1);
            },
            //离开不保存数据
            cancel(){
                this.dialogVisible = false;
                this.variations = [];
            },
            //提交数据
            submit(){
                this.dialogVisible = false;
                console.log(this.variations);
                this.$bus.$emit('variationData', this.variations);
            }
        },
/*        watch: {
            variations: {
                deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() {
                    console.log(this.variations);
                }
            }
        }*/

    }
</script>

<style scoped>

</style>