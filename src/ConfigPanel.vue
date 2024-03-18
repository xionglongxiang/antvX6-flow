<template>
    <div>配置面板</div>
    <component :is="comp"></component>
    
</template>

<script lang="ts" setup>
import TaskNode from './materials/TaskNode/index'
import CustomNode from './materials/CustomNode';
import { useSelectedCells } from './stores/useSelectedCells';
import {watch} from 'vue'
import {shallowRef} from 'vue'

let data = useSelectedCells();

let comp = shallowRef()

watch(data, (item: any) => {
    let selectedCount = item.selectedCells.length
    if (selectedCount === 1) {
         let cell = item.selectedCells[0]
         
         if (cell.shape === 'edge') {
            return
         }
         let cellType = cell.data.type

         if (cellType == 'task-node') {
            comp.value = TaskNode.ConfigForm
         } else if (cellType == 'custom-node') {
            comp.value = CustomNode.ConfigForm
         } else {
            comp.value = null
         }
    }
})



</script>

<style lang="scss">

</style>