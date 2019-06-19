<template>
  <div style="width:100%;">
    <div style="padding:10px"> <el-button type="small" icon="el-icon-plus" @click="addComponent">新增</el-button> </div>
    <div style="padding: 0 10px;">
      <el-table :data="tableData" border >
        <el-table-column type="index" label="#" width="50"  align="center" />
        <el-table-column prop="name" align="center" label="name" width="100">
          <template slot-scope="scope">
              <el-button @click="toGenerate(scope.row.id)" type="text" size="small">{{scope.row.name}}</el-button>
            </template>
        </el-table-column>  
        <el-table-column prop="vue_template" align="center" label="模板" />
        <el-table-column prop="attrs" align="center" label="暴露属性" />
        <el-table-column prop="data_template" align="center" label="默认属性" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="text"
              @click="editComponent(scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="text"
              @click="deleteComponent(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <comp-Dialog ref="addDialog" :configInfo="{ title:'新增', autoAdd:true }" :model="addComponentModel" 
    @close="fetchData"
    ></comp-Dialog>
    <comp-Dialog ref="updateDialog" :configInfo="{ title:'编辑', autoAdd:false }" :model="updateComponentModel"
    @close="fetchData"
    ></comp-Dialog>
  </div>

</template>

<script>
import componentDialog from './component_add_update_dialog'
import ComponentApi from './Api.js'
export default {
  name: 'ManagerHome',
  components:{
    'comp-Dialog' : componentDialog
  },
  data() {
      return {
        addComponentModel:{},
        updateComponentModel:{},
        tableData: [],
      }
    },
    created(){
      this.fetchData();
    },
    methods: {
      fetchData(){
        ComponentApi.getComponentInfo().then(res => {
          this.tableData = JSON.parse(res.data);
        })
      },
      editComponent(componentModel){
        this.updateComponentModel = JSON.parse(JSON.stringify(componentModel));
        this.$refs.updateDialog.isShow(true);
      },
      deleteComponent(componentModel){
        ComponentApi.deleteComponentInfo({id:componentModel.id}).then(res =>{
          if(res.code == 200){
              this.$notify({
              title:  '成功' ,
              message: '删除成功' ,
              type:'success' 
            });
          }
          this.fetchData();
        })
      },
      addComponent(){
        this.$refs.addDialog.isShow(true);
      },
      toGenerate(id){
        this.$router.push({
          name: 'dynamicCom',
          params: {
            id:id
          }
        })
      }
    }
}
</script>

<style scoped>
  .test{
    display: block;
  }
</style>

