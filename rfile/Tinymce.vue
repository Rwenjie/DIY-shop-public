<template>
    <div class='tinymce'>
        <!-- 富文本编辑组件 -->
        <editor
                v-model='tinymceHtml'
                :init='init'
                :disabled="disabled"
        ></editor>
        <div v-html="tinymceHtml"></div>
        <div>{{ tinymceHtml }}</div>
    </div>
</template>

<script>
    // 基本配置
    // eslint-disable-next-line no-unused-vars
    import tinymce from "tinymce/tinymce";
    import Editor from "@tinymce/tinymce-vue";
    import "tinymce/themes/silver/theme.min";
    import 'tinymce/icons/default/icons.min.js'

    // 插件导入
    import "tinymce/plugins/anchor";
    import "tinymce/plugins/advlist";
    import "tinymce/plugins/autolink";
    import "tinymce/plugins/autosave";
    import "tinymce/plugins/charmap";
    import "tinymce/plugins/code";
    import "tinymce/plugins/codesample";
    import "tinymce/plugins/emoticons";
    import "tinymce/plugins/fullscreen";
    import "tinymce/plugins/help";
    import "tinymce/plugins/hr";
    import "tinymce/plugins/image";
    import "tinymce/plugins/insertdatetime";
    import "tinymce/plugins/link";
    import "tinymce/plugins/lists";
    import "tinymce/plugins/media";
    import "tinymce/plugins/preview";
    import "tinymce/plugins/pagebreak";
    import "tinymce/plugins/print";
    import "tinymce/plugins/quickbars";
    import "tinymce/plugins/save";
    import "tinymce/plugins/searchreplace";
    import "tinymce/plugins/template";
    import "tinymce/plugins/textpattern";
    import "tinymce/plugins/toc";

    import "tinymce/plugins/table";
    import "tinymce/plugins/wordcount";

    export default {
        name: "TinymceEditor",
        props: {
            // 双向绑定值
            value: {
                type: String
            },
            // 是否可编辑
            disabled: {
                type: Boolean,
                default: false
            },
            // 皮肤
            skin: {
                type: String,
                validator: value => {
                    return ["light", "dark"].indexOf(value) !== -1;
                }
            },
            // 名称，可以用来区分 localStrage 存储名称前缀
            name: {
                type: String,
                default: "tinymce"
            }
        },

        data() {
            // eslint-disable-next-line no-unused-vars
            let that = this;
            return {
                tinymceHtml: this.value,
                init: {
                    // 语言配置
                    language_url: "/tinymce/langs/zh_CN.js",
                    language: "zh_CN",
                    // 皮肤配置
                    skin_url:
                        this.skin === "dark"
                            ? "/tinymce/skins/ui/oxide-dark"
                            : "/tinymce/skins/ui/oxide",
                    content_css: "/tinymce/skins/content/default/content.css",
                    // 表情地址
                    emoticons_database_url: "/tinymce/emoticons/js/emojis.js",
                    //内容模板
                    templates: [
                        {title: 'Some title 1', description: 'Some desc 1', content: 'My content'},
                        {title: 'Some title 2', description: 'Some desc 2', url: 'print.php'}
                    ],
                    // 插件
                    plugins: [
                        // 百度地图

                        // 锚点
                        "anchor",
                        // 自动链接
                        "autolink",
                        // 自动保存
                        "autosave",
                        // 特殊字符
                        "charmap",
                        // 代码示例插件
                        "codesample",
                        // 表情
                        "emoticons",
                        // 全屏
                        "fullscreen",
                        // 帮助
                        "help",
                        // 分割线
                        "hr",
                        // 图片
                        "image",
                        // 插入时间
                        "insertdatetime",
                        // 超链接
                        "link",
                        // 高级列表
                        "lists",
                        "advlist",
                        // 媒体
                        "media",
                        // 预览
                        "preview",
                        // 分页
                        "pagebreak",
                        // 打印
                        "print",
                        // 快速工具栏
                        "quickbars",
                        // 保存
                        "save",
                        // 搜索框
                        "searchreplace",
                        // 模板
                        "template",
                        // 快速排版
                        "textpattern",
                        // 目录
                        "toc",
                        "code",
                        "table",
                        "wordcount"
                    ],
                    toolbar:
                        "toc | template searchreplace save print | insertdatetime fullscreen emoticons | restoredraft codesample undo redo | fontsizeselect | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote charmap | link unlink image media anchor preview | removeformat",
                    // 富文本组件高度
                    height: 500,
                    // 不可重置大小
                    resize: false,
                    // 无logo
                    branding: false,

                    // 自动存稿设置
                    // 关闭或跳转URL弹出框提醒
                    autosave_ask_before_unload: true,
                    // 自动保存间隔
                    autosave_interval: "5s",
                    // localStorage中key字段
                    autosave_prefix: this.name + "-autosave-",
                    // 编辑器初始化时内容区为空时自动恢复本地存储中草稿，不再需要initial-value
                    autosave_restore_when_empty: true,



                    // 图片上传
                  /*  images_upload_handler: (blobInfo, success, failure) => {
                        const img = "data:image/jpeg;base64," + blobInfo.base64();
                        if (blobInfo.blob().size / 1024 > that.imageSize) {
                            failure("图片太大，须小于" + that.imageSize + "kb");
                        }
                        success(img);
                    },*/

                    images_uplaod_handler: function(blobInfo, succFun, failFun) {

                        var xhr, formData;
                        var file = blobInfo.blob();//转化为易于理解的file对象
                        xhr = new XMLHttpRequest();
                        xhr.withCredentials = false;
                        xhr.open('POST', '/demo/upimg.php');
                        xhr.onload = function() {
                            var json;
                            if (xhr.status != 200) {
                                failFun('HTTP Error: ' + xhr.status);
                                return;
                            }
                            json = JSON.parse(xhr.responseText);
                            if (!json || typeof json.location != 'string') {
                                failFun('Invalid JSON: ' + xhr.responseText);
                                return;
                            }
                            succFun(json.location);
                        };
                        formData = new FormData();
                        formData.append('file', file, file.name );//此处与源文档不一样
                        xhr.send(formData);

                    },

                    // 时间格式
                    insertdatetime_formats: [
                        "%r",
                        "%H:%M:%S",
                        "%H点%M分%S秒",
                        "%D",
                        "%Y-%m-%d",
                        "%Y年%m月%d日",
                        "%A",
                        "%a"
                    ],

                    // 分页
                    pagebreak_split_block: true,

                    // 保存
                    // save_enablewhendirty:false,
                    // save_onsavecallback: function () { console.log('已保存'); },

                    // 快速排版
                    textpattern_patterns: [
                        { start: "*", end: "*", format: "italic" },
                        { start: "**", end: "**", format: "bold" },
                        { start: "#", format: "h1" },
                        { start: "##", format: "h2" },
                        { start: "###", format: "h3" },
                        { start: "####", format: "h4" },
                        { start: "#####", format: "h5" },
                        { start: "######", format: "h6" },
                        { start: "1. ", cmd: "InsertOrderedList" },
                        { start: "* ", cmd: "InsertUnorderedList" },
                        { start: "- ", cmd: "InsertUnorderedList" }
                    ]
                }
            };
        },
        components: { Editor },

        mounted() {
            console.log(this.value, this.tinymceHtml);
        },
        watch: {
            value(val) {
                this.tinymceHtml = val;
            },
            tinymceHtml(val) {
                this.$emit("getContent", val);
            }
        }
    };
</script>