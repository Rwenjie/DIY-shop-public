<template>
    <div class='tinymce'>
        <!-- 富文本编辑组件 -->
        <editor
                v-model='tinymceHtml'
                :init='init'
                :disabled="disabled"
        ></editor>
     <!--   <div v-html="tinymceHtml"></div>
        <div>{{ tinymceHtml }}</div>-->
    </div>
</template>

<script>
    // 基本配置
    // eslint-disable-next-line no-unused-vars
    import tinymce from "tinymce/tinymce";
    import Editor from "@tinymce/tinymce-vue";
    import "tinymce/themes/silver/theme.min";
    import 'tinymce/icons/default/icons.min.js';

    // 插件导入
    import "tinymce/plugins/anchor";    //锚点
    import "tinymce/plugins/autolink";  //自动连接
    import "tinymce/plugins/autosave";  //自动保存
    import "tinymce/plugins/charmap";   //特殊字符
    import "tinymce/plugins/code";      //源代码
    import "tinymce/plugins/codesample";//代码示例插件
    import "tinymce/plugins/emoticons"; //表情
    import "tinymce/plugins/fullscreen";//全屏
    import "tinymce/plugins/help";      //帮助
    import "tinymce/plugins/hr";        //分割线
    import "tinymce/plugins/image";     //图片
    import "tinymce/plugins/insertdatetime";//插入时间
    import "tinymce/plugins/link";      //超链接
    import "tinymce/plugins/lists";     //高级列表
    import "tinymce/plugins/advlist";   //
    import "tinymce/plugins/media";     //媒体
    import "tinymce/plugins/preview";   //预览
    import "tinymce/plugins/pagebreak"; //分页
    import "tinymce/plugins/print";     //打印
    import "tinymce/plugins/quickbars"; //快速工具栏
    import "tinymce/plugins/save";      //保存
    import "tinymce/plugins/searchreplace";//搜索框
    import "tinymce/plugins/template";  //模板
    import "tinymce/plugins/textpattern";//快速排版
    import "tinymce/plugins/toc";       //目录
    import "tinymce/plugins/table";     //表格
    import "tinymce/plugins/wordcount"; //字数
    import 'tinymce/plugins/paste'


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
                screenWidth: 100,
                timer: false,
                init: {
                    language_url: "/tinymce/langs/zh_CN.js",    //导入语言文件
                    emoticons_database_url: "/tinymce/emoticons/js/emojis.js",  //导入表情文件
                    content_css: "/tinymce/skins/content/default/content.css",
                    language: "zh_CN",
                    height:500, //高度
                    resize: false,  // 不可重置大小
                    //menubar: false, // 隐藏最上方menu菜单
                    //toolbar: true,  //false禁用工具栏（隐藏工具栏）
                    branding: false, // 去水印无logo
                    //statusbar: false, // 隐藏编辑器底部的状态栏
                    //elementpath: false,  //禁用下角的当前标签路径
                    paste_data_images: true, // 允许粘贴图像
                    browser_spellcheck: true,   // 拼写检查
                    autosave_ask_before_unload: true, // 关闭或跳转URL弹出框提醒
                    autosave_interval: "5s", // 自动保存间隔
                    autosave_prefix: this.name + "-autosave-", // localStorage中key字段
                    autosave_restore_when_empty: true, // 编辑器初始化时内容区为空时自动恢复本地存储中草稿，不再需要initial-value
                    //pagebreak_split_block: true, // 分页
                    //save_enablewhendirty:false, // 保存
                    //save_onsavecallback: function () { console.log('已保存'); },
                    /**
                     * 插件
                     **/
                    plugins: ["anchor", "autolink", "autosave", "charmap", "codesample", "emoticons", "fullscreen", "help", "hr",
                        "image", "insertdatetime", "link", "lists", "advlist", "media", "preview", "pagebreak", "print", "quickbars",
                        "save", "table", "searchreplace", "template", "textpattern", "toc", "code", "wordcount", "paste"],
                    /**
                     * 工具栏
                     **/
                    toolbar:
                    //  目录 撤销  重做
                        [ "toc undo redo | bold italic underline strikethrough blockquote| forecolor backcolor |formatselect | fontsizeselect |  alignleft aligncenter alignright alignjustify | outdent indent ",
                        " bullist numlist pastetext  codesample  charmap|insertdatetime hr link unlink |emoticons  image media anchor table |code  template searchreplace save print fullscreen preview|removeformat restoredraft"],
                    // 图片上传
                    images_upload_handler: function (blobInfo, success, failure){
                        let formData = new FormData()
                        console.log(blobInfo.filename())
                        formData.append('img',blobInfo.blob())
                        self.$axios.post('http://127.0.0.1:8000/upload/',formData).then(response =>{
                            console.log(response.data['url'])
                            if(response.data['code']==200){
                                success(response.data['url'])
                            }else{
                                failure('上传失败！')
                            }
                        })
                    },
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
                    ],
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
                    //内容模板
                    templates: [
                        {title: 'Some title 1', description: 'Some desc 1', content: 'My content'},
                        {title: 'Some title 2', description: 'Some desc 2', url: 'print.php'}
                    ],
                    // 皮肤配置
                    skin_url:
                        this.skin === "dark"
                            ? "/tinymce/skins/ui/oxide-dark"
                            : "/tinymce/skins/ui/oxide",

                }
            };
        },
        components: {
            Editor
        },
        mounted() {
            tinymce.init({})
            //console.log(this.value, this.tinymceHtml);
        },
        methods: {

        },
        watch: {
            value(val) {
                this.tinymceHtml = val;
            },
            tinymceHtml(val) {
                this.$emit("getContent", val);
            },
            screenWidth(val){
                // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
                if(!this.timer){
                    // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
                    this.screenWidth = val
                    console.log(val);
                    this.timer = true
                    let that = this
                    setTimeout(function(){
                        // 打印screenWidth变化的值
                        console.log(that.screenWidth)
                        that.timer = false
                    },400)
                }
            }
        }
    };
</script>