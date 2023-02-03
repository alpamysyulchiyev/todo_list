import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useToDoListStore = defineStore('todo_list', () => {
    const todo_list = ref([{
        title: 'post1',
        id: 1,
        is_edit: false,
        sub_tasks: [],
        is_done: false
    }])
    let selected_cards = ref([])
    let is_edit_group = ref(false)
    const addTask = () => {
        todo_list.value.push({
            title: '',
            id: todo_list.value.length + 1,
            is_edit:true,
            sub_tasks: [],
            is_done:false
        })
    }
    const deleteTask = (card) => {
        let idx = todo_list.value.findIndex(el => el.id === card)
        todo_list.value.splice(idx,1)
    }

    const addSelectedCard = (event) => {
        let idx = todo_list.value.findIndex(el => el.id === event)
        if(selected_cards.value.includes(event)) {
            selected_cards.value.splice(idx, 1)
        } else {
            selected_cards.value.push(event)
        }
    }

    const deleteGroup = () => {
        selected_cards.value.forEach(el => {
            let idx = todo_list.value.findIndex(item => item.id === el)
            todo_list.value.splice(idx, 1)
        })
        is_edit_group.value = false
        selected_cards.value = []
    }

    return {todo_list, addTask, deleteTask, selected_cards, addSelectedCard, is_edit_group, deleteGroup }
})
