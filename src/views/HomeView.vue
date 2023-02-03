<script setup>
import {ref} from 'vue'
import { useToDoListStore } from "@/stores/tasks";
import { storeToRefs } from 'pinia'
import Card from '@/components/Base/Card.vue'
const todo_store = useToDoListStore()
const {todo_list} = storeToRefs(todo_store)

</script>

<template>
  <main class="main">
      <Card v-for="(item, idx) in todo_list" :key="item" @selectCard="todo_store.addSelectedCard" v-model="todo_list[idx]" />
  </main>
</template>
<style lang="scss">
.main {
  padding: 30px;
  display: flex;
  overflow: scroll;
  min-height: 100vh;
  gap: 30px;

}
</style>
