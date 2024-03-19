<template>
    this is config panel of custom node
    {{ data }}
</template>

<script lang="ts" setup>
defineProps({
  data: {
    type: Object,
    default: ()=> {
      return {  
        name: '自定义节点',  
        desc: '自定义内容'  
      }
    }
  }
});
</script>

<style lang="scss">

</style>