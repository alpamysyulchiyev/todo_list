<template>
  <div class="input">
    <input
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        @input="(event) => $emit('update:modelValue', event.target.value)"
    >
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  placeholder: String
})
</script>

<style lang="scss" scoped>
  .input {
    display: flex;
    width: 100%;
    border: 1px solid #5c8fea;
    border-radius: 6px;
    padding: 3px;
    flex-grow: 1;
    user-select: none;


    input {
      border: none;
      width: 100%;
      font-size: 16px;
    }
  }
</style>
