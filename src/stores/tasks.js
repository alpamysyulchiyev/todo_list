import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useToDoListStore = defineStore('todo_list', () => {
    const todo_list = ref([{
        title: 'post1',
        id: 1,
        is_edit: false,
        sub_tasks: []
    }])
    const addTask = () => {
        todo_list.value.push({
            title: '',
            id: todo_list.value.length + 1,
            is_edit:true,
            sub_tasks: []
        })
    }
    const deleteTask = (card) => {
        let idx = todo_list.value.findIndex(el => el.id === card)
        todo_list.value.splice(idx,1)
    }

    return {todo_list, addTask, deleteTask}
})
