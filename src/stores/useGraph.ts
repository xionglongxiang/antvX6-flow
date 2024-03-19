import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Graph } from '@antv/x6'

export const useGraph = defineStore('graph', () => {
  const graph = ref()
  function updateGraph(param: Graph) {
    graph.value = param
    return graph.value
  }

  return { graph,  updateGraph }
})
