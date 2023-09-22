<script setup>
import { reactive } from 'vue';
import axios from 'axios';

const review = reactive({
  author: '',
  stars: null,
  text: '',
  attach: null,
  isRecommended: true,
});
const submit = () => {
  axios
    .post('/api/review', review, {
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
};
</script>

<template>
  <h1 class="text-center text-2xl font-bold mb-8">Форма отзыва</h1>
  <form
    @submit.prevent.stop="submit"
    novalidate
  >
    <UInput
      label="Ваше имя"
      v-model="review.author"
      type="text"
      id="reviewName"
      class="relative z-0 w-full mb-5"
    />
    <span
      class="text-center text-sm text-red-600 hidden"
      id="error"
    >
      Имя должно быть заполнено
    </span>

    <UInput
      label="Текст отзыва"
      v-model="review.text"
      type="textarea"
      id="reviewText"
      class="relative z-0 w-full mb-5"
    />
    <span
      class="text-center text-sm text-red-600 hiden"
      id="error"
    >
      Текст отзыва не должен быть пустым
    </span>

    <div class="text-center">
      <h3 class="text-xl text-gray-600">Ваша оценка</h3>
      <v-rating
        v-model="review.stars"
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
    <div
      class="text-center text-sm text-red-600 hidden"
      id="error"
    >
      Оценка
    </div>

    <UFile
      v-model="review.attach"
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
          v-model="review.isRecommended"
          :value="false"
          id="recommendedFalse"
          >Не советую</URadio
        >
        <URadio
          v-model="review.isRecommended"
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
  </form>
</template>

<style lang="scss"></style>
