<script setup>
import { defineProps, ref, watch } from 'vue';

const emits = defineEmits(['update:modelValue']);

const { modelValue } = defineProps({
  modelValue: String,
  placeholder: String,
  label: String,
  type: {
    type: String,
    default: 'text',
    validator: (value) =>
      ['text', 'textarea', 'password', 'tel', 'email', 'search'].includes(
        value
      ),
  },
});

const value = ref(modelValue);

watch(value, () => {
  emits('update:modelValue', value.value);
});
</script>

<template>
  <div>
    <h1>{{ label }}</h1>

    <input
      v-if="type !== 'textarea'"
      :type="type"
      :placeholder="placeholder"
      v-model="value"
      class="form-control mb-3"
    />

    <textarea
      v-else
      :type="type"
      v-model="value"
      class="form-control mb-3"
      rows="3"
      :placeholder="placeholder"
    >
    </textarea>
  </div>
</template>
