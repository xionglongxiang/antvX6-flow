import { Graph } from '@antv/x6';
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Selection } from '@antv/x6-plugin-selection'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Snapline } from '@antv/x6-plugin-snapline'

let registerPlugins = (graph: Graph)=> {
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
    
}
export default registerPlugins