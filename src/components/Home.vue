<template>
  <div class="hello">
    <el-menu
      :default-active="activeName"  mode="horizontal"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1">组件管理</el-menu-item>
    </el-menu>    
    <el-container style="border: 1px solid #eee">
        <router-view/>
    </el-container>   
  </div>
</template>

<script>
import Vue from 'vue';
import OrgApi from './Api.js'
export default {
  name: 'home',
  data () {
    return {
      activeName:'1'
    }
  },
  created(){
    
  },
  mounted(){},
  methods:{
    toManager(){
      this.$router.push({ name: 'comManager'})
    }
  }
}
</script>
<style scoped>
 
</style>
