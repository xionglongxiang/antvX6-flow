import { Graph, Shape, FunctionExt } from '@antv/x6';
import { useSelectedType } from '@/stores/useSelectedType';
import { useSelectedCells } from '@/stores/useSelectedCells'

const showPorts = (ports: any, show: any) => {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }

let registerEvents = (graph: Graph, container: HTMLElement)=> {
    graph.on('node:mouseleave', () => {
        const ports = container!.querySelectorAll(
          '.x6-port-body'
        )
        showPorts(ports, false)
      })
      graph.on('blank:click', () => {
        let {type, updateType} = useSelectedType()
        updateType('grid')
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
        let { updateType} = useSelectedType()
        const type = cell.isNode() ? 'node' : 'edge'
        updateType(type)
      })
    
      graph.on('selection:changed', (args) => {

        let { updateSelectedCells } = useSelectedCells()
        updateSelectedCells(args.selected)

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
    
}
export default registerEvents