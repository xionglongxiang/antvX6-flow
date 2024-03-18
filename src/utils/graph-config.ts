
import { Shape } from '@antv/x6';

let connectEdgeType = {  //连线方式
    connector: 'normal',
    router: {
      name: ''
    }
}


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


/**
 * 生成graph的配置
 * @param container 容器
 * @returns 配置
 * @description 为什么容器要传进来，因为必须要在页面渲染后才能拿到dom。
 */
export default function getGraphConfig (container: HTMLElement) {
  return {
    container,
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
  }
}