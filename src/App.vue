<template>
  <aside id="material-area">
    <div class="material-container">
      <div class="material-circle" title="圆形节点" @mousedown="startDrag('Circle', $event)">
      </div>
      <br>
      <div class="material-rect" title="正方形节点" @mousedown="startDrag('Rect', $event)">
      </div>
      <br>
      <TaskNode.View @mousedown="startDrag('task-node', $event)"></TaskNode.View>
      <CustomNode.View @mousedown="startDrag('custom-node', $event)"></CustomNode.View>
    </div>
  </aside>
  <header>
    <el-button type="primary" @click="save()">保存</el-button>
  </header>
  <main>
    <div id="chat-container"></div>
  </main>

  
  <aside id="config-area">
    <ConfigPanel></ConfigPanel>
  </aside>
</template>

<script setup lang="ts">

import { startDragToGraph } from './Graph/methods'
import { Graph} from '@antv/x6';
import { ElButton } from 'element-plus'
import bindKey from './Graph/bindKey'
import { onMounted } from 'vue'
import { register } from "@antv/x6-vue-shape";
import TaskNode from './materials/TaskNode/index'
import CustomNode from './materials/CustomNode';
import getGraphConfig from './utils/graph-config';
import registerPlugins from './utils/register-plugins';
import registerEvents from './utils/register-events';
import ConfigPanel from './ConfigPanel.vue'

register(TaskNode.config)

let win: any = window
win.PluginsList = new Map()

register(CustomNode.config)

let graph: any;
let container: any;
  
onMounted(() => {
  container = document.getElementById('chat-container')
  let config: any = getGraphConfig(container)
  graph = new Graph(config);
  let win: any = window
  win.graph = graph
  registerPlugins(graph)
  bindKey(graph)
  registerEvents(graph, container)
})


const startDrag = (type: any, e: any) => {
  startDragToGraph(graph, type, e)
}

const save = () => {
  console.log(graph.toJSON())
}

</script>

<style scoped>
aside#material-area {
  border-right: 1px solid #000;
  height: 100%;
  width: 200px;
  background: pink;
  position: fixed;
}

header {
  height: 60px;
  background: #eee;
  position: fixed;
  top: 0;
  width: calc(100% - 400px);
  left: 200px;

}


aside#config-area {
  border-left: 1px solid #eee;
  width: 200px;
  background-color: antiquewhite;
  position: fixed;
  right: 0;
  height: 100%;
}

.material-container {
  padding: 20px;
}

.material-circle {
  display: inline-block;
  border: 1px solid #666;
  border-radius: 50%;
  height: 40px;
  width: 40px;
}

.material-rect {
  display: inline-block;
  border: 1px solid #666;
  height: 40px;
  width: 40px;
}

main {
  position: fixed;
  top: 60px;
  left: 200px;
  right: 200px;
  bottom: 0;
}

#chat-container {
  height: 100%;
  width: 100%;
}

@keyframes ant-line {
  to {
    stroke-dashoffset: -1000
  }
}
</style>
