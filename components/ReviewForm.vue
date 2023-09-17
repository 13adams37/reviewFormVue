<script>
import { reactive, defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'ReviewForm',

  setup() {
    const review = reactive({
      author: '',
      stars: null,
      text: '',
      attach: null,
      isRecommended: true,
    });
    const submit = () => {
      console.log('submited.');
      axios
        .post('/api/review', review, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        })
        .finally(() => {
          console.log('end');
        });
    };
    return {
      review,
      submit,
    };
  },
});
</script>

<template>
  <form
    @submit.prevent.stop="submit"
    class="container pt-5 pb-5"
  >
    <UInput
      label="Ваше имя"
      v-model="review.author"
      type="text"
      placeholder="Как вас зовут?"
    />

    <UInput
      label="Текст отзыва"
      v-model="review.text"
      type="textarea"
      placeholder="Напишите текст отзыва.."
    />

    <h4>Ваша оценка</h4>
    <NuxtRating
      :ratingCount="5"
      :read-only="false"
      :ratingValue="0"
      @rating-selected="(selectedRating) => (review.stars = selectedRating)"
    />

    <UFile
      v-model="review.attach"
      label="Фото"
    />

    <URadio
      v-model="review.isRecommended"
      :value="false"
      >Не советую</URadio
    >

    <URadio
      v-model="review.isRecommended"
      :value="true"
      >Советую</URadio
    >

    <UButton>Отправить</UButton>
  </form>
</template>

<style scoped></style>
