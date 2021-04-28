
<template>
  <div id="app">
    <el-row>
      <el-col :span="1"></el-col>
      <el-col :span="22" id="main">
        <el-containe>
          <el-header style="border: 1px solid black; height: 52px">
            <main-tab-bar/>
          </el-header>
          <el-main>

            <router-view></router-view>

          </el-main>
          <el-footer>Footer</el-footer>
        </el-containe>
      </el-col>
      <el-col :span="1"></el-col>
    </el-row>


  </div>
</template>

<script>

  import MainTabBar from "components/content/mainTabBar/MainTabBar";

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  #main {
    /*background-color: #e8fdff;*/
    height: auto;
    border: 1px solid red;
  }
</style>
