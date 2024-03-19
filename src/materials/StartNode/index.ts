import View from './view.vue'
import ConfigForm from './config-form.vue'
import BaseNode from '../BaseNode'
import config from './config'

export default class StartNode extends BaseNode {
    
    static NodeType = 'start-node'
    static Shape = 'start-node'
    static MaterialView = View
    static DisplayView = View
    static ConfigFormView = ConfigForm
    static initConfig:any = config
}