<template>
  <div class="tab-bar-item" @click="itemClick">
    item item
    <slot/>


  </div>
</template>

<script>
    export default {
      name: "TabBarItem",
      props: {
        path: String,
      },
      data() {
          return {
          }
      },

      methods: {
        itemClick() {
          if(this.$route.path.indexOf(this.path) === -1){
            this.$router.replace(this.path)
          }
        }
      }
    }
</script>

<style scoped>

</style>
