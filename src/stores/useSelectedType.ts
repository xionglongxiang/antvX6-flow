import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSelectedType = defineStore('data', () => {
  const type = ref('')
  function updateType(param: string) {
    type.value = param
  }

  return { type,  updateType }
})
