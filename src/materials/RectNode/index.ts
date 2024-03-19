import View from './view.vue'
import ConfigForm from './config-form.vue'
import BaseNode from '../BaseNode'
import config from './config'

export default class CustomNode extends BaseNode {
    
    static NodeType = 'custom-node'
    static Shape = 'custom-node'
    static MaterialView = View
    static DisplayView = View
    static ConfigFormView = ConfigForm
    static initConfig = config
    
}