import View from './view.vue'
import ConfigForm from './config-form.vue'
import BaseNode from '../BaseNode'
import config from './config'

export default class TaskNode extends BaseNode {

    static NodeType = 'task-node'
    static Shape = 'task-node'
    static MaterialView = View
    static DisplayView = View
    static ConfigFormView = ConfigForm
    static initConfig = config
    
}