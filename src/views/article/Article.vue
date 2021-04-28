<template>
    <div id="article">
        <div v-html="article.detail"></div>
    </div>
</template>

<script>

    import getArticleDetail from 'network/article'
    export default {
        name: "Article",
        components:{

        },
        data() {
            return {
                article: {
                    detail: null
                }
            }
        },
        created() {
            this.getArticleDetail()
        },
        methods: {
            getArticleDetail() {
                getArticleDetail().then(res => {
                    console.log(res);
                    this.article.detail = res.data.data.text;
                })
            }
        }
    }
</script>

<style scoped>

</style>