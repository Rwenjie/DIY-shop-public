<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/4/30
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/4/30
 -->

<template>
    <div id="upload-images">
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
                                :file-list="imageUrl"
                                multiple
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :before-remove="beforeRemove"
                                :on-remove="handleRemove">
                            <template #default>
                                <i class="el-icon-plus"></i>
                            </template>
                        </el-upload>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UploadImages",
        props: {
            submit: {
                type: Boolean,
                default() {
                    return false;
                }
            }
        },
        data() {
            return {
                myHeaders: { Authorization: window.sessionStorage.getItem('tokenStr') },
                imageUrl: []
            }
        },
        methods: {
            handleRemove(file) {
                this.splice(this.imageUrl.indexOf(file.name));
                //这里应该做后台删除
                console.log(this.imageUrl);
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            uploadSuccess(res, file) {
                const image = {name: file.name, url: res.data}
                this.imageUrl.push(image);
                //this.$bus.$emit("imageUrls", this.imageUrl);
                //将照片信息保存到Vuex
                this.$store.dispatch("addImages", {
                    imageUrl: this.imageUrl
                });
                console.log(this.imageUrl);
            },
            uploadError(err, file, fileList) {
                console.log(err);
                console.log(file);
                console.log(fileList);
            },
        },
        watch: {
            submit: {
                deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() { //

                }
            }
        }


    }
</script>

<style scoped>
    .image-box {
        border: 1px #697779 solid;
        padding: 5px;
    }
</style>