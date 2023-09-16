<script setup>
import { defineProps, ref, watch } from 'vue';

const emits = defineEmits(['update:modelValue']);
const stars = [1, 2, 3, 4, 5];
const { modelValue } = defineProps({
  modelValue: String,
  label: String,
});

const value = ref(modelValue);

watch(value, () => {
  emits('update:modelValue', value.value);
});
</script>

<template>
  <div>
    <label class="form-label">
      <h4>{{ label }}</h4>
    </label>
    <div
      class="form-check mb-3 star-list"
      v-for="star in stars"
      :key="star"
    >
      <input
        class="form-check-input"
        type="checkbox"
        :true-value="star"
        :false-value="null"
        :id="`star${star}`"
      />
      <label
        class="form-check-label"
        :for="`star${star}`"
      >
        {{ star }}
      </label>
    </div>
  </div>
</template>

<style scoped></style>
