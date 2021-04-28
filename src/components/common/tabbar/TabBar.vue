<template>
  <div id="tab-bar">
    <slot/>

  </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;

  }

</style>
