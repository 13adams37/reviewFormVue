<script setup>
import axios from 'axios';
import * as yup from 'yup';
import { ErrorMessage } from 'vee-validate';

const schema = yup.object({
  name: yup.string().required().label('Автор'),
  text: yup.string().required().label('Текст отзыва'),
  stars: yup.number().min(1).required().label('Оценка'),
  attach: yup.mixed(),
  isRecommended: yup.boolean().label('Рекомендация'),
});

const { defineComponentBinds, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    attach: '',
    isRecommended: true,
  },
});

const vuetifyConfig = (state) => ({
  props: {
    'error-messages': state.errors,
  },
});

const name = defineComponentBinds('name', vuetifyConfig);
const text = defineComponentBinds('text', vuetifyConfig);
const stars = defineComponentBinds('stars', vuetifyConfig);
const attach = defineComponentBinds('attach', vuetifyConfig);
const isRecommended = defineComponentBinds('isRecommended', vuetifyConfig);

const onSubmit = handleSubmit((values) => {
  console.log('Submitted with', values);
  axios
    .post('/api/review', values, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log('submited.');
    })
    .catch((res) => {
      console.log('error.');
    })
    .finally(() => {
      console.log('end');
    });
});
</script>

<template>
  <h1 class="text-center text-2xl font-bold mb-8">Форма отзыва</h1>
  <v-form
    @submit.prevent="onSubmit"
    :validation-schema="schema"
  >
    <UInput
      label="Ваше имя"
      v-bind="name"
      type="text"
      id="name"
      class="relative z-0 w-full mb-5"
    />

    <UInput
      label="Текст отзыва"
      v-bind="text"
      type="textarea"
      id="text"
      class="relative z-0 w-full mb-5"
    />

    <div class="text-center">
      <h3 class="text-xl text-gray-600">Ваша оценка</h3>
      <v-rating
        v-bind="stars"
        active-color="yellow-darken-3"
        color="grey-darken-1"
        empty-icon="$ratingFull"
        item-aria-label=""
        :style="{ fontSize: '32px' }"
        size="64"
        hover
      >
      </v-rating>
    </div>
    <ErrorMessage name="stars"
      ><span class="flex justify-center text-sm text-red-600 mb-5"
        >Оценка обязательна</span
      ></ErrorMessage
    >

    <UFile
      v-bind="attach"
      label="Загрузите фотографию для отзыва"
      id="reviewPhoto"
      class="relative z-0 w-full p-px mb-5"
    />

    <fieldset class="z-0 w-full p-px mb-5">
      <legend class="text-center text-gray-600">
        Вы бы посоветовали друзьям?
      </legend>
      <div class="pt-5 flex place-content-evenly">
        <URadio
          v-bind="isRecommended"
          :value="false"
          id="recommendedFalse"
          >Не советую</URadio
        >
        <URadio
          v-bind="isRecommended"
          :value="true"
          id="recommendedTrue"
          >Советую</URadio
        >
      </div>
    </fieldset>

    <UButton
      class="w-full px-6 py-3 mt-3 text-xl font-bold text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue-500 hover:bg-blue-600 hover:shadow-lg focus:outline-none"
      >Отправить</UButton
    >
  </v-form>
</template>

<style lang="scss"></style>
