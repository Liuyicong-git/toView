<template>
  <div style="width:100%">
        <el-row>
         
          <el-col :span="7" style="padding : 0 10px;" >
            <el-col :span="24">
              <el-col :span="24" ><span >template code:</span></el-col>
              <el-col :span="24" style="margin-top:10px;">
                <el-input type="textarea" :autosize="{ minRows: 15}" placeholder="请输入内容" v-model="viewModel[0].vue_template"/>
              </el-col>
            </el-col>
            <el-col :span="24" ><span>css code:</span></el-col>
            <el-col :span="24" style="margin-top:10px;">
              <el-input type="textarea" :autosize="{ minRows: 15}" placeholder="请输入内容" v-model="viewModel[0].css_code"/>
            </el-col>
          </el-col>
          <el-col :span="5" style="padding-right:10px;">
            <el-col :span="24" ><span>js config code:</span></el-col>
            <el-col :span="24" style="margin-top:10px;">
              <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 14}" placeholder="请输入内容" v-model="viewModel[0].attrs"/>
            </el-col>
            <el-button @click="toView" size="mini" style="margin-top:10px;">运行</el-button>
            <el-button @click="toUpdate" size="mini" style="margin-top:10px;">修改</el-button>
            <el-button @click="toAdd" size="mini" style="margin-top:10px;">新增</el-button>
            <el-button @click="toDoown" size="mini" style="margin-top:10px;">生成模板</el-button>
          </el-col>
          <el-col :span="12">
            <el-col :span="24" ><span>预览效果:</span></el-col>
            <el-col :spam="24">
              <div style="border:1px solid red;margin:10px;height:calc( 100vh - 100px )">
                <div id="childapp"></div>
              </div>  
            </el-col>  
          </el-col>  
        </el-row>
        <comp-Dialog ref="updateDialog" :configInfo="{ title:'编辑', autoAdd:false }" :model="viewModel[0]"/>
        <comp-Dialog ref="addDialog" :configInfo="{ title:'新增', autoAdd:true }" :model="addModel" />
  </div>

</template>

<script>
import Vue from 'vue';
import OrgApi from './Api.js';
import componentDialog from './component_add_update_dialog'
export default {
  name: 'DynamicCreate',
  components:{
    'comp-Dialog' : componentDialog
  },
  data () {
    return {
      viewModel:[{
        vue_template:'',
        data_template:'',
        attrs:'',
        css_code:''
      }],
      addModel:{},
    }
  },
  created(){
    this.fetchData();
  },
  mounted(){},
  methods:{
    fetchData(){
      OrgApi.getComponentInfo(this.$route.params).then(res => {
        let result = JSON.parse(res.data)
        this.viewModel = result;
        this.addModel = JSON.parse(res.data)[0];
        this.addModel.name= '';
        delete this.addModel.id;
      })
    },
    toView(){
      let self = this;
      let Main = {
        beforeMount(){
          let style = document.createElement('style');
          style.innerHTML = self.viewModel[0].css_code;
          document.head.append(style);
        },
        template: `<div id="childapp" > ${self.viewModel[0].vue_template} </div>`  ,
        ...eval('(' + this.viewModel[0].attrs + ')')
      }
      let _vmProx = new Vue(Main);
      this.vm = new Vue(Main);
      _vmProx.$mount('#childapp')
    },
    toUpdate(){
      this.$refs.updateDialog.isShow(true);
    },
    toAdd(){
      this.$refs.addDialog.isShow(true);
    },
    toDoown(){
      //处理cssCode 采用另外一个目标代理viewModel[0] 防止页面渲染
      let target = JSON.parse(JSON.stringify(this.viewModel[0]));
      //生成css , template ,  js 等;
      let cssCode = this.generateCssCode(target.css_code);
      let vueTemplate = this.generateVueTemplate(target.vue_template);
      let vueJsCode = this.generateJsCode(target.attrs)
      let result = 
      ` 
        ${vueTemplate}
        ${vueJsCode}
        ${cssCode}
      `
      debugger;
      const blob = new Blob([result],{type: 'application/octet-stream'});
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a');
      a.href = url
      a.download = 'test.vue';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      return vueCode + '\n' + cssCode
    },
    generateJsCode(){
      //当前暴露属性替换系统默认属性
      const _replace = function(k ,v) {
        if(typeof v === 'function') {
          console.log(v);
          return Function.prototype.toString.call(v)
        }
        return v
      }
      let currentAttrs = eval('(' + this.viewModel[0].attrs + ')') ;

      let strTemp = `<owner-c>
              export default  
                ${JSON.stringify(currentAttrs , _replace)}
            </owner-c>`
      let result = strTemp.replace(/owner-c/g , 'script')
      return result;
    },
    generateVueTemplate(vueTemplate){
      return `<template>
                  <div>
                    ${vueTemplate}
                  </div>
              </template>`
    },
    generateCssCode(cssCode){
      //当前仅仅处理class id 不处理postcss sass 等， 仅支持原生
      return cssCode;
    },
    generateDataAndHook(){
      
      let currentAttrs = eval('(' + this.viewModel[0].attrs + ')') ;
      Object.assign(currentAttrs , eval('(' + this.viewModel[0].data_template + ')') ); 
      let vueTemplate =  `<template>  ${ this.viewModel[0].vue_template   } </template>`
      return   vueTemplate + '\n' + 'export default {' + '\n' + JSON.stringify(currentAttrs , replace) + '\n' + '}' ;
   }
    
  }  
}
</script>



