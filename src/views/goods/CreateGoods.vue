<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/4/12
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/4/12
 -->

<template>
    <div id="create-goods">
        <h1>商品发布</h1>
        <el-collapse v-model="activeNames" @change="handleChange" >
            <el-collapse-item name="1">
                <template #title>
                    <span class="title-text">图片</span>
                </template>
                <p>尽可能多地添加，以便买家可以看到每个细节</p>
                <div>
                    <el-row>
                        <el-col :span="4" style="padding: 5px">
                            <p><b>图片*</b></p>
                            <span>最多使用十张照片来显示您的物品最重要的品质。</span>
                            <p><b>技巧</b></p>
                            <ui>
                                <li>使用自然光，不要闪光。</li>
                                <li>包括一个用于缩放的通用对象。</li>
                                <li>显示物品被磨损或使用过的位置。</li>
                                <li>在干净，简单的背景下拍摄。</li>
                            </ui>
                        </el-col>
                        <el-col :span="20" class="image-box">
                            <div class="">
                                <el-upload
                                        action="/api/file/import"
                                        list-type="picture-card"
                                        :headers="myHeaders"
                                        :file-list="product.imageUrl"
                                        multiple
                                        :on-success="uploadSuccess"
                                        :on-error="uploadError"
                                        :before-remove="beforeRemove"
                                        :on-remove="handleRemove">
                                    <template #default>
                                        <i class="el-icon-plus"></i>
                                    </template>
                                <!--    <template #file="{file}">
                                        <div>
                                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                            <span class="el-upload-list__item-actions">
                                            </span>
                                        </div>
                                    </template>-->
                                </el-upload>
                            </div>

                        </el-col>
                    </el-row>
                </div>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template #title>
                    <span class="title-text">基础信息</span>
                </template>
                <p>向全世界介绍您的物品以及他们为什么会喜欢它。</p>
                <div>
                    <el-row>
                        <el-col :span="6" style="padding: 5px">
                            <p><b>标题*</b></p>
                            <span class="toast-text">包括买家将用于搜索您的商品的关键字。</span>
                        </el-col>
                        <el-col :span="18">
                            <div style="padding-top: 30px">
                                <el-input type="text" v-model="product.title" maxlength="140" show-word-limit></el-input>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <el-row>
                        <el-col :span="6" style="padding: 5px">
                            <p><b>商品来源*</b></p>
                            <span class="toast-text">了解DIY手工坊可以出售那些类型的商品</span>
                        </el-col>
                        <el-col :span="18">
                            <div style="padding-top: 30px;">
                                <el-select v-model="product.maker" placeholder="请选择">
                                    <el-option
                                            v-for="item in makeInfo.maker"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="product.makeStatus" placeholder="请选择">
                                    <el-option
                                            v-for="item in makeInfo.status"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="product.makeTime" placeholder="请选择">
                                    <el-option
                                            v-for="item in makeInfo.time"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
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
                                        placeholder="试试搜索：指南"
                                        :options="category"
                                        filterable></el-cascader>
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
                                        v-model="product.describe">
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div>
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
                </div>
            </el-collapse-item>


            <el-collapse-item name="3">
                <template #title>
                    <span class="title-text">库存和定价</span>
                </template>
                <div>
                    <el-row>
                        <el-col :span="6" style="padding: 5px">
                            <p><b>价格*</b></p>
                            <p>切记要考虑材料，人工和其他业务费用的成本。 如果您提供免费送货服务，请确保包括送货费用，以免影响您的利润</p>
                        </el-col>
                        <el-col :span="18" style="margin-top: 45px">
                            <div>
                                <el-form :model="product" :rules="rules" ref="priceRule">
                                    <el-form-item prop="price">
                                        <el-input placeholder="" v-model="product.price" style="width: 35%; margin-left: 25px">
                                            <template #prepend>￥</template>
                                        </el-input>
                                    </el-form-item>
                                </el-form>

                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <el-row>
                        <el-col :span="6" style="padding: 5px">
                            <p><b>数量*</b></p>
                            <p>如果数量大于一，此列表将自动更新，直到售罄</p>
                        </el-col>
                        <el-col :span="18">

                        </el-col>
                    </el-row>
                </div>
                <div>
                    <el-row>
                        <el-col :span="6" style="padding: 5px">
                            <p><b>SKU</b><span class="toast-text">(可选)</span></p>
                            <p>SKU仅供您使用,买家将看不到它们。</p>
                        </el-col>

                        <el-col :span="18">

                        </el-col>
                    </el-row>
                </div>
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

    import {categoryList} from "network/project";

    export default {
        name: "CreateGoods",
        components: {

        },
        data() {
            var validateCount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('数量不能为空'));
                } else if (value<=0){
                    return callback(new Error('数量至少为1'))
                }
                };
            return {
                myHeaders: { Authorization: window.sessionStorage.getItem('tokenStr') },
                rules: {
                    price: [
                        {required: true, message: '请输入价格。', trigger: 'blur'},
                        { type: 'number', message: '价格必须为数字值'}],
                    count: [
                        {validator: validateCount, trigger: 'blur'}
                    ]
                },
                activeNames: ['1'],
                dialogImageUrl: [],
                dialogVisible: false,
                disabled: true,
                tagInputValue: "",
                product: {
                    title:"",
                    maker: "",
                    imageUrl: [],
                    makeStatus: "",
                    makeTime: "",
                    describe: "",
                    tags: [{ name: '白色', value: '白色' }],
                    material: [{name: '钢铁', value:'钢铁'}],
                    price: "",
                    count: "",


                },
                makeInfo: {
                    maker: [
                        {value: '我做的', label: '我做的'},
                        {value: '我的合伙人制做的', label: '我的合伙人制做的'},
                        {value: '其他人制作的', label: '其他人制作的'},
                    ],
                    status: [
                        {value: '成品', label: '成品'},
                        {value: '工具或部件', label: '工具或部件'},
                    ],
                    time: [
                        {value: '2020-2021', label: '2020-2021'},
                        {value: '2010-2019', label: '2010-2019'},
                        {value: '2000-2009', label: '2000-2009'},
                        {value: '2000年以前', label: '2000年以前'},
                    ],
                },
                category: [],

            };
        },
        methods: {
            handleRemove(file) {
                this.product.imageUrl.splice(this.product.imageUrl.indexOf(file.name));
                console.log(this.product);
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            uploadSuccess(res, file) {
                const image = {name: file.name, url: res.obj}
                this.product.imageUrl.push(image);
                console.log(res);
                console.log("imageUrl=>"+this.product);
            },
            uploadError(err, file, fileList) {
                console.log(err);
                console.log(file);
                console.log(fileList);
            },
            addTag() {
                let inputValue = {name:this.tagInputValue, value:""};
                inputValue.value = this.tagInputValue;
                if (inputValue) {
                    this.product.tags.push(inputValue);
                    this.tagInputValue = "";
                }
            },
            tagHandleClose(tag) {
                this.product.tags.splice(this.product.tags.indexOf(tag), 1)
            },
            addMaterial() {
                let inputValue = {name:this.tagInputValue, value:""};
                inputValue.value = this.tagInputValue;
                if (inputValue) {
                    this.product.material.push(inputValue);
                    this.tagInputValue = "";
                }
            },
            materialHandleClose(tag){
                this.product.material.splice(this.product.material.indexOf(tag), 1)
            },
            getTreeData(data){
                // 循环遍历json数据
                for(var i=0;i<data.length;i++){

                    if(data[i].children.length<1){
                        // children若为空数组，则将children设为undefined
                        data[i].children=undefined;
                    }else {
                        // children若不为空数组，则继续 递归调用 本方法
                        this.getTreeData(data[i].children);
                    }
                }
                return data;
            }
        },
        mounted() {
            categoryList().then( res=> {
                this.category = this.getTreeData(res.data);
                console.log("res=>"+res);
                console.log("category=>"+this.category);
                console.log(this.option);
            })
        }
    }
</script>

<style scoped>

    .title-text {
        font-size: x-large;
    }

    .image-box {
        border: 1px #697779 solid;
        padding: 5px;
    }

    .toast-text {
        font-size: small;
    }
</style>
