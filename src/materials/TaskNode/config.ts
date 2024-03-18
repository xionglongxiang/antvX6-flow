import View from './view.vue'
import { name } from './properties'

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

export default {
    shape: name,
    component: View,
    width: 300,
    height: 90,
    data: {
      type: 'task-node',
    },  
    ports
  }