<template>
   <div>
      <div>配置面板</div>
      <component :is="comp" :data="data"></component>
      <button @click="changeName()">change name</button>
   </div>
</template>

<script lang="ts" setup>
import TaskNode from './materials/TaskNode/index'
import CustomNode from './materials/CustomNode/index';
import { useSelectedCells } from './stores/useSelectedCells';
import {watch} from 'vue'
import {shallowRef ,ref} from 'vue'
import { useGraph } from './stores/useGraph';

let selectedCells = useSelectedCells();
let comp = shallowRef()
let data: any = ref({ cell_id: ''})

let graphStore = useGraph()

watch(selectedCells, (item: any) => {
    let selectedCount = item.selectedCells.length
    if (selectedCount === 1) {
         let cell = item.selectedCells[0]
         
         if (cell.shape === 'edge') {
            return
         }
         let cellType = cell.data.type

         data.value = {
            ...cell.data,
            cell_id: cell.id
         }


         if (cellType == 'task-node') {
            comp.value = TaskNode.ConfigFormView
         } else if (cellType == 'custom-node') {
            comp.value = CustomNode.ConfigFormView
         } else {
            comp.value = null
         }
    }
})

let changeName = () => {
   let cell = graphStore.graph.getCellById(data.value.cell_id)
   cell.data.name = 'change cell data to this'
   data.value.name = 'change cell data to this'
}



</script>

<style lang="scss">

</style>