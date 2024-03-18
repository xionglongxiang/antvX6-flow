<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>{{nodeInfo.name}}</span>
    </div>
    <div class="content">{{nodeInfo.desc}}</div>
  </el-card>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus'

const props = defineProps({
  nodeInfo: {
    type: Object,
    default: ()=> {
      return {  
        name: '任务节点',  
        desc: '节点内容'  
      }
    }
  }
});

let n = 3;
</script>
