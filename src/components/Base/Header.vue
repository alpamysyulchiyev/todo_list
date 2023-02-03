<template>
<header class="header">
  <div class="container">
    <div class="header__logo">
      <img class="header__img" src="@/assets/img/trello.png" alt="">
      <p class="texts18">TODO list</p>
    </div>
    <div
        v-if="!is_edit_group"
        class="button"
        @click="todo_store.addTask()"
    >
      Добавить
    </div>
    <div v-else class="button error-btn" @click="todo_store.deleteGroup">
      Удалить список
    </div>
  </div>
</header>
</template>

<script setup>
import {useToDoListStore} from "@/stores/tasks";
import {storeToRefs} from "pinia";
const todo_store = useToDoListStore()
let {is_edit_group} = storeToRefs(todo_store)
</script>

<style lang="scss">
.header {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);

  .container {
    display: flex;
    justify-content: space-between;
  }

  &__logo {
    display: flex;
    gap:10px;
    align-items: center;

    p {
      text-transform: uppercase;
      font-weight: 900;
    }
  }

  &__img {
    width: 40px;
    height: 40px;
  }
}
</style>
