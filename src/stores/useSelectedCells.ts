import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSelectedCells = defineStore('selectedCells', () => {
  const selectedCells = ref([])
  function updateSelectedCells(params: []) {
    selectedCells.value = params
  }

  return { selectedCells,  updateSelectedCells }
})
