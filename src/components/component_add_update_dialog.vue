<template>
  <el-dialog :title="configInfo.title" :visible.sync="dialogVisible" :width="configInfo.width">
        <el-form  label-width="80px" style="padding-right:10px;">
          <el-form-item label="组件名称">
            <el-input v-model="model.name"  />
          </el-form-item>
          <el-form-item label="模板">
            <el-input type="textarea" v-model="model.vue_template"  :autosize="{ minRows: 5 }"></el-input>
          </el-form-item>
          <el-form-item label="默认属性">
             <el-input type="textarea" v-model="model.data_template" :autosize="{ minRows: 5 }"></el-input>
          </el-form-item>
          <el-form-item label="暴露属性">
            <el-input type="textarea" v-model="model.attrs" :autosize="{ minRows: 3 }"></el-input>
          </el-form-item>
          <el-form-item label="暴露属性">
            <el-input type="textarea" v-model="model.css_code" :autosize="{ minRows: 3 }"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import OrgApi from './Api.js'
export default {
  name: 'component_add_update_dialog',
  props: {
    'model': {
      vue_template:'',
      data_template:'',
      attrs:'',
      css_code:''

    },
    'configInfo' : {
      type: Object,
      default: function () {
        return {
          'width': '40%',
          'title': '',
          'autoAdd':true
        }
      }
    },

    
  },
  data(){
    return {
      dialogVisible: false
    }
  },
  created(){

  },
  methods: {
    isShow(flag){
      this.dialogVisible = flag ?  true : false ;
    },
    submit(){
      if(typeof(this.configInfo.autoAdd) =='boolean' && this.configInfo.autoAdd) this.add();
      else if(typeof(this.configInfo.autoAdd) =='boolean' && !this.configInfo.autoAdd ) this.update();
      else this.configInfo.autoAdd();
    },
    update(){
        OrgApi.updateComponentInfo(this.model).then(res => {
            this.$notify({
              title:  res.code == 200 ? '成功' : '失败',
              message: res.code == 200 ? '编辑成功' : '编辑失败',
              type: res.code == 200  ? 'success' :'error'
            });
          this.dialogVisible = false;
          this.$emit('close' , true);
       })
    },
    add(){
      OrgApi.addComponentInfo(this.model).then(res => {
          this.$notify({
            title:  res.code == 200 ? '成功' : '失败',
            message: res.code == 200 ? '编辑成功' : '编辑失败',
            type: res.code == 200  ? 'success' :'error'
          });
          this.dialogVisible = false;
          this.$emit('close' , true);
      })
    },
  }

}
</script>
<style>

</style>


