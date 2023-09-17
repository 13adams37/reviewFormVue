<script setup>
const emits = defineEmits(['update:modelValue']);
const { modelValue, value } = defineProps({
  modelValue: Boolean,
  value: Boolean,
});
</script>

<template>
  <div class="form-check">
    <input
      class="form-check-input"
      type="radio"
      :value="value"
      @change="emits('update:modelValue', value)"
      :checked="modelValue === value"
    />
    <label class="form-check-label">
      <slot />
    </label>
  </div>
</template>

<style scoped></style>
