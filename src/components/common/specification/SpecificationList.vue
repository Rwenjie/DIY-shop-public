<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/4/29
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/4/29
 -->

<template>
    <div id="specification-list">
        <el-form ref="form" :model="speTemplate" :inline="true" label-width="150px">
            <div v-for="(group, gId) in speTemplate" :key="gId">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span style="font-size: larger"><b>{{group.group}}</b></span>
                        </div>
                    </template>

                    <el-row style="
                        ">
                        <el-col :span="12" v-for="(param, pId) in group.params" :key="pId">
                                <!-- el-input -->
                                <div v-if="param.tag.type=='input' ">
                                    <el-form-item>
                                        <template #label>
                                            <span style="width: 100px">
                                                <span v-if="param.required" style="color: red">*</span>
                                                {{param.key}}
                                                <span v-if="param.numerical">({{param.unit}})</span>
                                            </span>
                                        </template>
                                        <el-input size="medium"
                                                  v-model="specific[gId].params[pId].value"
                                                  :placeholder=param.tag.placeholder></el-input>
                                    </el-form-item>
                                </div>
                                <!-- el-date-picker -->
                                <div v-if="param.tag.type=='date-picker' ">
                                    <el-form-item>
                                        <template #label>
                                            <span style="width: 100px">
                                                <span v-if="param.required" style="color: red">*</span>
                                                {{param.key}}
                                                <span v-if="param.numerical">({{param.unit}})</span>
                                            </span>
                                        </template>
                                        <div class="block">
                                            <el-date-picker
                                                    v-model="specific[gId].params[pId].value"
                                                    type="date"
                                                    size="medium"
                                                    placeholder="选择日期">
                                            </el-date-picker>
                                        </div>
                                    </el-form-item>
                                </div>
                                <!-- el-select -->
                                <div v-if="param.tag.type=='select' ">
                                    <el-form-item>
                                        <template #label>
                                            <span style="width: 100px">
                                                <span v-if="param.required" style="color: red">*</span>
                                                {{param.key}}
                                                <span v-if="param.numerical">({{param.unit}})</span>
                                            </span>
                                        </template>
                                        <el-select  size="medium"
                                                    v-model="specific[gId].params[pId].value"
                                                    :placeholder=param.tag.placeholder>
                                            <el-option
                                                    v-for="item in param.options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            <!-- 多选选择器-->
                                <div v-if="param.tag.type=='multiple-select' ">
                                    <el-form-item>
                                        <template #label>
                                            <span style="width: 100px">
                                                <span v-if="param.required" style="color: red">*</span>
                                                {{param.key}}
                                                <span v-if="param.numerical">({{param.unit}})</span>
                                            </span>
                                        </template>
                                        <el-select v-model="specific[gId].params[pId].options"
                                                   multiple
                                                   :placeholder=param.tag.placeholder>
                                            <el-option
                                                    v-for="item in param.options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>

                                <!-- 可以自己创建的选项的选择器 -->
                                <div v-if="param.tag.type=='allow-create-select' ">
                                    <el-form-item>
                                        <template #label>
                                            <span style="width: 100px">
                                                <span v-if="param.required" style="color: red">*</span>
                                                {{param.key}}
                                                <span v-if="param.numerical">({{param.unit}})</span>
                                            </span>
                                        </template>
                                    </el-form-item>
                                    <el-select
                                            v-model="specific[gId].params[pId].value"
                                            filterable
                                            size="medium"
                                            allow-create
                                            default-first-option>
                                        <el-option
                                                v-for="item in param.options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                    </el-row>
                </el-card>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "SpecificationList",
        props: {
            formDate: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        computed: {
            getFormDate() {
                return this.formDate
            }
        },
        data() {
            return{
                speTemplate: [],
                form: {
                    region: '',
                },
                isDeepFormDate: true,
                specific: [],
            }
        },
        methods: {
            initSpecific(formDate) {
                console.log(formDate);
                formDate.forEach((item) => {
                    const data = {
                        group: "",
                        params: []
                    };
                    data.group = item.group;
                    item.params.forEach((itemParam) => {
                        const param = {
                            key: itemParam.key,
                            searchable: itemParam.searchable,
                            global: true,
                            value: "",
                            options: []
                        };
                        data.params.push(param);
                    });
                    this.specific.push(data);
                    console.log(this.specific);
                });
            }
        },
        watch: {
            formDate: { // category
                deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() { //
                    this.speTemplate = this.getFormDate;
                    this.initSpecific(this.getFormDate);
                    console.log(this.speTemplate);

                }
            },
            specific: { // category
                deep: true,
                handler() {
                    this.$emit('getSpecificTemp', this.specific)
                }
            },
        }
    }
</script>

<style scoped>

</style>