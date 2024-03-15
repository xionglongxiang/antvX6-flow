import { Graph } from '@antv/x6';  
import { Dnd } from '@antv/x6-plugin-dnd'; 

// 定义端口对象的类型  
interface PortGroup {  
  position: string;  
  attrs: {  
    circle: {  
      r: number;  
      magnet: boolean;  
      stroke: string;  
      strokeWidth: number;  
      fill: string;  
    };  
  };  
}  
  
interface Ports {  
  groups: {  
    top: PortGroup;
    bottom: PortGroup;
    right: PortGroup;
    left: PortGroup;
  };  
}  

const ports: Ports = {
  groups: {
    // 输入链接桩群组定义
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
    // 输出链接桩群组定义
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
  },
  items: [
    {
      id: 'port1',
      group: 'top',
    },
    {
      id: 'port2',
      group: 'bottom',
    },
    {
      id: 'port3',
      group: 'left',
    },
    {
      id: 'port4',
      group: 'right',
    }
  ],
}

// 拖拽生成四边形或者圆形  
export const startDragToGraph = (graph: Graph, type: string, e: MouseEvent) => {  
  
  let nodeConfig: any = {  
    width: 100,  
    height: 60,  
    attrs: {  
      label: {  
        text: '正方形节点',  
        fill: '#000000',  
        fontSize: 14,  
        textWrap: {  
          width: -10,  
          height: -10,  
          ellipsis: true,  
        },  
      },  
      body: {  
        stroke: '#000000',  
        strokeWidth: 1,  
        fill: '#ffffff',  
      },  
    },  
    ports: ports,  
  };  
  
  if (type === 'custom-node') {
    nodeConfig = {
      ...nodeConfig,
      type: 'custom-node',
      shape: 'custom-node',
      width: 300,
      height: 121,
      data: {
        id: 'asdf',
        type: 'abcd',
        name: '自定义节点',
        desc: '自定义内容'
      },
      attrs: {  
        ...nodeConfig.attrs,  
        label: {  
          ...nodeConfig.attrs.label,  
          text: '圆形节点',  
        },  
      },  
      component: 'custom-node'
    }
  } else if (type === 'task-node') {
    nodeConfig = {
      ...nodeConfig,
      type: 'task-node',
      shape: 'task-node',
      width: 300,
      height: 121,
      data: {
        id: 'asdf',
        type: 'abcd',
        name: '任务节点',
        desc: '节点内容'
      },
      attrs: {  
        ...nodeConfig.attrs,  
        label: {  
          ...nodeConfig.attrs.label,  
          text: '圆形节点',  
        },  
      },  
      component: 'task-node'
    }
  } else if (type === 'Rect') {  
    // 不需要修改 nodeConfig，因为它是默认配置  
  } else if (type === 'Circle') {  
    nodeConfig = {  
      ...nodeConfig,  
      shape: 'ellipse',  
      width: 100,  
      height: 100,  
      attrs: {  
        ...nodeConfig.attrs,  
        label: {  
          ...nodeConfig.attrs.label,  
          text: '圆形节点',  
        },  
      },  
    };  
  } else {  
    nodeConfig = {  
      ...nodeConfig,  
      shape: 'polygon',  
      x: 40,  
      y: 40,  
      width: 120,  
      height: 120,  
      attrs: {  
        ...nodeConfig.attrs,  
        label: {  
          ...nodeConfig.attrs.label,  
          text: '条件节点',  
        },  
        body: {  
          ...nodeConfig.attrs.body,  
          refPoints: '0,10 10,0 20,10 10,20',  
        },  
      },  
    };  
  }  
  
  const node = graph.createNode(nodeConfig);

  const dnd = new Dnd({ target: graph});  
  dnd.start(node, e);
};