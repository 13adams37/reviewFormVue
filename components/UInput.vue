<script setup>
import { defineProps, ref, watch } from 'vue';
import { ErrorMessage } from 'vee-validate';

const emits = defineEmits(['update:modelValue']);

const { modelValue } = defineProps({
  modelValue: String,
  label: String,
  id: String,
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
    <input
      v-if="type !== 'textarea'"
      :id="id"
      :name="id"
      :type="type"
      v-model="value"
      placeholder=" "
      class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
      required
    />

    <textarea
      v-else
      :id="id"
      :name="id"
      :type="type"
      v-model="value"
      placeholder=" "
      class="resize-none pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
      rows="3"
    />

    <label
      :for="id"
      class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
      >{{ label }}</label
    >

    <ErrorMessage :name="id"
      ><span class="text-sm text-red-600 mb-5"
        >Обязательное поле</span
      ></ErrorMessage
    >
  </div>
</template>
