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
    <component :is="TaskNode.ConfigForm"></component>
  </aside>
</template>

<script setup lang="ts">

import { startDragToGraph } from './Graph/methods'
import { Graph, Shape, FunctionExt, DataUri } from '@antv/x6';
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Selection } from '@antv/x6-plugin-selection'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Snapline } from '@antv/x6-plugin-snapline'
import { ElButton } from 'element-plus'

import bindKey from './Graph/bindKey'

import { ref, onMounted } from 'vue'
import { register } from "@antv/x6-vue-shape";
import TaskNode from './materials/TaskNode/index'
import CustomNode from './materials/CustomNode';


register(TaskNode.config)
register(CustomNode.config)


const grid = { // 网格设置
  size: 20,      // 网格大小 10px
  visible: true, // 渲染网格背景
  type: 'mesh',
  args: {
    color: '#D0D0D0',
    thickness: 1,     // 网格线宽度/网格点大小
    factor: 10,
  }
}
let graph: any;

let container: any;
let type: String;
let selectCell: any;

let connectEdgeType = {  //连线方式
  connector: 'normal',
  router: {
    name: ''
  }
}


onMounted(() => {
  container = document.getElementById('chat-container')
  graph = new Graph({
    container: document.getElementById('chat-container') || undefined,
    width: 1700,
    height: '100%',
    grid: grid,
    resizing: { //调整节点宽高
      enabled: true,
      orthogonal: false,
    },
    selecting: true, //可选
    snapline: true,
    interacting: {
      edgeLabelMovable: true
    },
    connecting: { // 节点连接
      anchor: 'center',
      connectionPoint: 'anchor',
      allowBlank: false,
      snap: true,
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: '#1890ff',
              strokeWidth: 1,
              targetMarker: {
                name: 'classic',
                size: 8
              },
              strokeDasharray: 0, //虚线
              style: {
                animation: 'ant-line 30s infinite linear',
              }
            }
          },
          label: {
            text: ''
          },
          connector: connectEdgeType.connector,
          router: {
            name: connectEdgeType.router.name || ''
          },
          zIndex: 0
        })
      },
    },
    highlighting: {
      magnetAvailable: {
        name: 'stroke',
        args: {
          padding: 4,
          attrs: {
            strokeWidth: 4,
            stroke: '#6a6c8a'
          }
        }
      }
    },
  });
  let win: any = window
  win.graph = graph

  graph.use(
    new Clipboard({
      enabled: true,
    }),
  )
    .use(new Snapline()) // 使用辅助线，在移动过程中辅助对齐。
    .use(
      new Selection({
        enabled: true,
        rubberband: true,
        showNodeSelectionBox: true,
      }),
    )
    .use(
      new Keyboard({
        enabled: true,
        global: true,
      }),
    )

  bindKey(graph)
  // end 



  graph.on('node:mouseleave', () => {
    const ports = container!.querySelectorAll(
      '.x6-port-body'
    )
    showPorts(ports, false)
  })
  graph.on('blank:click', () => {
    type = 'grid'
    const ports = container.querySelectorAll(
      '.x6-port-body'
    )

    showPorts(ports, false)
  })



  
  graph.on('node:mouseenter', FunctionExt.debounce(({e, node, view}) => {
    const ports = container.querySelectorAll(
      '.x6-port-body'
    )

    showPorts(ports, true)
  }), 500)

  graph.on('cell:click', ({ cell }) => {
    type = cell.isNode() ? 'node' : 'edge'
  })

  graph.on('selection:changed', (args) => {

    if (args.selected.length === 1) {
      console.log(args.selected[0])
    }
    args.added.forEach(cell => {
      if (cell.isEdge()) {
        cell.isEdge() && cell.attr('line/strokeDasharray', 5) //虚线蚂蚁线
        cell.addTools([
          {
            name: 'vertices',
            args: {
              padding: 4,
              attrs: {
                strokeWidth: 0.1,
                stroke: '#2d8cf0',
                fill: '#ffffff',
              }
            },
          },
        ])
      }
    })
    args.removed.forEach(cell => {
      cell.isEdge() && cell.attr('line/strokeDasharray', 0)  //正常线
      cell.removeTools()
    })
  })

  const data = {};


  graph.fromJSON(data)
})


const showPorts = (ports: any, show: any) => {
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = show ? 'visible' : 'hidden'
  }
}

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
