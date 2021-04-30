<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/4/30
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/4/30
 -->

<template>
    <div id="inventor-price">
        <div>
            <el-row>
                <el-col :span="6" style="padding: 5px">
                    <p><b>价格*</b></p>
                    <p>切记要考虑材料，人工和其他业务费用的成本。 如果您提供免费送货服务，请确保包括送货费用，以免影响您的利润</p>
                </el-col>
                <el-col :span="18" style="margin-top: 45px">
                    <div>
                        <el-form :model="goodsParams" :rules="rules" ref="priceRule">
                            <el-form-item prop="price">
                                <el-input placeholder="" v-model="goodsParams.price" style="width: 35%; margin-left: 25px">
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
                    <sku></sku>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import Sku from "components/common/specification/Sku";
    export default {
        name: "InventoryPrice",
        components: {
          Sku
        },
        data(){
            return{
                goodsParams:{
                    bottomPrice: "",
                    topPrice: "",

                },
            }
        },


    }
</script>

<style scoped>

</style>