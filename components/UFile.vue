<script setup>
import { computed, defineProps, defineEmits, watch, ref } from 'vue';

const emits = defineEmits(['update:modelValue']);

const value = ref(modelValue);

const { modelValue } = defineProps({
  modelValue: Array,
  label: String,
});

const uploadFile = (e) => {
  const [file] = e.target.files;
  value.value = file;
};

const previewFilePath = computed(() => {
  if (value.value) {
    return URL.createObjectURL(value.value);
  }
  return '#';
});

watch(value, () => {
  emits('update:modelValue', value.value);
});
</script>

<template>
  <div class="mb-3 mt-3">
    <label class="form-label">
      <h4>{{ label }}</h4>
    </label>
    <input
      class="form-control"
      type="file"
      @change="uploadFile"
    />
    <img
      :src="previewFilePath"
      alt=""
      class="w-100 mt-2"
    />
  </div>
</template>

<style scoped></style>
