<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/4/30
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/4/30
 -->

<template>
    <div id="sku">
        sku{{variations}}
        <div v-for="(variation, id) in variations" :key="id">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Sku",
        data(){
            return{
                skus: [],
                sku: {
                    price: "",
                    image: "",
                    indexes: "",
                    ownSpec: "",
                    title: "",

                }

            }
        },
        mounted() {
            this.$bus.$on('variationData', (res)=> {
                this.variations = res;
                console.log(res);

            })
        },
        watch: {
            variationList: {
                deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() {
                    this.variations = this.getVariations;
                    console.log(this.variations)
                }
            }
        }
    }
</script>

<style scoped>

</style>