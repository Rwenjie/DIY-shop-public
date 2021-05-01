<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/4/30
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/4/30
 -->

<template>
    <div id="sku">
        {{variation}}
        <el-table
                :data="table"
                style="width: 100%">
            <el-table-column v-for="(item, id) in variation" :key="id"
                                               prop=""
                                               :label=item.name
                                               width="130">
                <template #default>
                    <el-select
                        size="medium"
                        v-model="options[id]"
                        placeholder="请选择">
                        <el-option v-for="(opt, oId) in item.options"
                               :key="oId"
                               :label="opt"
                               :value="opt">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    label="绑定图片"
                    prop=""
                    width="100">
                <div v-show="imageBtn">
                    <el-button size="medium" @click="imageBtnShow">图片</el-button>
                    <el-dialog
                            v-model="dialogVisible"
                            width="45%"
                            :before-close="handleClose">
                        <template #title>
                            <p style="font-size: x-large">选择你要添加的图片</p>
                        </template>
                        <div class="demo-image">
                            <el-radio-group v-model="imageIndex" @change=imageChange >
                                <el-radio v-for="(img, Iid) in images" :key="Iid" :label="Iid">
                                    <el-image
                                            style="width: 100px; height: 100px"
                                            :src="img.url"
                                            :fit="fit"/>
                                </el-radio>
                                <div class="block" >
                                    {{imageIndex}}

                                </div>

                            </el-radio-group>

                        </div>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="imageBtnCancel">取 消</el-button>
                                <el-button type="primary" @click="imageConfirm">确 定</el-button>
                            </span>
                        </template>
                    </el-dialog>
                </div>
                <div v-show="!imageBtn">
                    {{inputSku.image}}
                    <div>
                        <el-button @click="deleteImage">
                            删除
                        </el-button>
                    </div>
                </div>
            </el-table-column>
            <el-table-column
                    label="标题"
                    prop="name"
                    width="200">
                <template #default>
                    <el-input v-model="inputSku.title"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="价格"
                    prop="name"
                    width="140">
                <template #default>
                    <el-input v-model="inputSku.price"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="数量"
                    prop="name"
                    width="140">
                <template #default>
                    <el-input v-model="inputSku.stock"></el-input>
                </template>
            </el-table-column>

            <el-table-column
                    label="是否可用"
                    prop="name"
                    width="100">
                <template #default>
                    {{inputSku.image}}
                    <el-checkbox v-model="inputSku.enable">可用</el-checkbox>
                </template>
            </el-table-column>
            <el-table-column
                    label=""
                    prop="name"
                    width="100">
                <template #default>
                    <el-button @click="addSkus">
                        确定
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--:show-header=false-->
       <!-- <el-table
                :data="skus"

                style="width: 100%">
            <el-table-column v-for="(item, id) in options" :key="id"
                :label=item.options[id]
                :prop=item.options[id]
                width="150">
            </el-table-column>

     &lt;!&ndash;       <el-table-column
                    :label=item.title
                    :prop=item.title
                    width="150">
            </el-table-column>&ndash;&gt;

            <el-table-column
                    label="是否可用"
                    prop="name"
                    width="100">
                <template #default>
                    是
                    <span v-if=item.enable >
                        是
                    </span>
                    <span v-else>
                        否
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    :label="item.price"
                    :prop="item.price"
                    width="150">
            </el-table-column>
            <el-table-column
                    :label="item.stock"
                    :prop="item.stock"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="Name"
                    prop="variation.value"
                    width="150">
            </el-table-column>
        </el-table>-->
        {{skus}}

    </div>
</template>

<script>

    export default {
        name: "Sku",
        computed: {
            imageList() {
                return this.$store.state.createGood.images
            }
        },
        data(){
            return{
                table: [""],
                imageBtn: true,
                dialogVisible: false,
                variation: [],
                image: "",
                inputSku: {
                        enable: true, //是否启用
                        image: "", //链接图片
                        indexes: "",
                        price: 0,
                        stock: 0,
                        ownSpec: "",
                        title: "",
                        options: []
                    },
                skus: [],
                options: [],
                images: this.imageList,
                imageIndex: 0,
            }
        },
        mounted() {
            this.$bus.$on('variationData', (res)=> {
                this.variation = res;
            });
            /*this.$bus.$on('imageUrls', (res) => {
                this.images = res;
            })*/
        },
        methods: {
            imageBtnShow() {
                this.dialogVisible=true;
                this.images = this.imageList.imageUrl;
            },
            addSkus() {
                const input = {
                    enable: true, //是否启用
                    image: "", //链接图片
                    indexes: "",
                    price: 0,
                    stock: 0,
                    ownSpec: "",
                    title: "",
                    options: []
                };

                this.inputSku.options = this.options;
                let ownSpec = '{';
                for (let i=0; i<this.options.length; i++) {
                    ownSpec = ownSpec + " \"" + this.variation[i].name + "\":\"" +this.options[i] + "\"";
                    if (i+1<this.options.length){
                        ownSpec = ownSpec + ',';
                    }
                }
                ownSpec = ownSpec + '}';
                this.inputSku.ownSpec = ownSpec;

                let indexes = "";
                for (let i=0; i<this.options.length; i++) {
                    const option = this.options[i]
                    let index = this.variation[i].options.indexOf(option);
                    indexes = indexes + index +"";
                    if (i+1<this.options.length){
                        indexes = indexes + '_';
                    }
                }
                this.inputSku.indexes = indexes;
                if (indexes=="") {
                    this.inputSku = input;
                    return;
                }
                this.skus.push(this.inputSku);
                this.inputSku = input;
                console.log("skus=>"+this.skus);


            },
            imageConfirm() {
                this.imageBtn = false;
                this.dialogVisible = false;
            },
            imageBtnCancel() {
                this.dialogVisible = false;
                this.inputSku.image = "";
            },
            deleteImage(){
                this.imageBtn = true;
                this.inputSku.image = "";
            },
            imageChange(value) {
                this.inputSku.image = this.images[value].url;
                console.log(this.inputSku);
                console.log(value);
            }
        },
        watch: {
            images: {
                deep: true,
                handler() {
                    console.log(this.images);
                }

            }
        }
    }
</script>

<style scoped>

</style>