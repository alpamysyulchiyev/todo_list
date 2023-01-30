<template>
  <div class="mod-input">
    <BaseInput
        :model="modelValue"
        @update="(event) => $emit('update:modelValue', event.target.value)"
    />
  </div>
</template>

<script setup>
import BaseInput from '@/components/Base/Input.vue'
const props = defineProps({
  modelValue: [String, Number],
  isEdit: Boolean
})
</script>

<style scoped>

</style>
