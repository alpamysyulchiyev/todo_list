<template>
  <div class="todo-card" v-click-outside="() => modelValue.is_edit = false">
  <div class="todo-card__header" :class="{'done':modelValue.is_done}">
    <input v-if="is_edit_group" v-model="selected" type="checkbox">
      <div class="todo-card__title">

        <BaseInput
            v-if="modelValue.is_edit && !is_edit_group"
            v-model="modelValue.title"
            @keyup.enter="modelValue.is_edit = false"
            placeholder="введите заголовок"
        />

        <p v-else> {{modelValue.title}}</p>
      </div>

      <img
          @click="isPopover = !isPopover"
          class="icon"
          v-click-outside="closePopover"
          src="@/assets/img/dots.svg"
          alt=""
      >
    </div>
    <div class="todo-card__body">
      <div
          class="todo-card__subtask"
          v-for="(item, idx) in modelValue.sub_tasks"
          v-click-outside="() => modelValue.sub_tasks[idx].is_edit = false"
      >
          <BaseInput
              v-if="modelValue.sub_tasks[idx].is_edit"
              :key="item"
              v-model="modelValue.sub_tasks[idx].title"
          />
          <div v-else>
              <p>{{ modelValue.sub_tasks[idx].title }} </p>
            <img @click="modelValue.sub_tasks[idx].is_edit = true" src="@/assets/img/edit.svg" alt="">
          </div>
      </div>
      <button @click="addChild" class="button">Добавить карточку</button>
    </div>

      <div v-show="isPopover" class="popover">
        <p @click="modelValue.is_done = !modelValue.is_done">
          Пометить как {{modelValue.is_done ? 'невыполненное' : 'выполненное'}}
        </p>
        <p @click="todoStore.deleteTask(modelValue.id)">Удалить</p>
        <p @click="editCard()">Редактировать</p>
        <p @click="selectGroup">Выбрать</p>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import {useToDoListStore} from "@/stores/tasks";
import BaseInput from '@/components/Base/Input.vue'
import {storeToRefs} from "pinia";
const props = defineProps({
  modelValue: Object,
})
const emits = defineEmits(['update:modelValue', 'selectCard'])


let todoStore = useToDoListStore()
let { is_edit_group } = storeToRefs(todoStore)
const isPopover = ref(false)

let selected = ref(false)
watch(selected, () => {
  emits('selectCard', props.modelValue.id)
})
const selectGroup = () => {
  selected.value = true
  is_edit_group.value = true
}
function editCard () {
  props.modelValue.is_edit = true
  props.modelValue.is_done = false
  isPopover.value = false
}
function closePopover() {
  isPopover.value === true ? isPopover.value = false : false
}
const addChild = () => {
  props.modelValue.sub_tasks.push({
    title: 'child',
    is_edit: true,
  })
}

</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.todo-card {
  display: flex;
  flex-direction: column;
  @include rem(width,300px);
  @include rem(min-width,300px);
  height: fit-content;
  box-shadow: 3px 6px 5px 2px rgba(0,0,0,0.42);
  gap:20px;
  border-radius: 8px;
  position: relative;

  &__header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid white;
    padding: 20px;
    flex-grow: 1;

  }

  &__title {
    min-height: 29.3px;
    display: flex;
    flex-grow: 1;
    overflow: hidden;

    p {
      padding: 4px;
      font-size: 16px;
    }
  }

  &__body {
    padding: 0 20px 20px 20px ;
    min-height: 60px;
    display: flex;
    flex-direction: column;
    gap:15px;


  }

  &__subtask {
    div {
      display: flex;
      justify-content: space-between;
      padding: 5px;
      border: 1px solid #d2d1d1;
      border-radius: 2px;

      p {
        overflow: hidden;

      }

      img {
        cursor: pointer;
      }
    }
  }

  .popover {
    border-radius: 2px;
    border: 1px solid #b9b7b7;
    position: absolute;
    right: -300px;
    top:40px;
    z-index: 70;
    background-color: white;
    width: 350px;
     p {
       padding: 5px;
       cursor: pointer;
       font-weight: 700;

       &:hover {
         background-color: #e3e2e2;
       }
     }
  }

  .done {
    background-color: #17d917;
  }

}
</style>
