<script>
import { reactive, computed, defineComponent } from 'vue';
import axios from 'axios';
// import FormStars from './global/FormStars.vue';
// import UButton from './UButton.vue';
// import UInput from './global/UInput.vue';
// import UFile from './global/UFile.vue';

export default defineComponent({
  name: 'ReviewForm',

  // components: {
  //   UButton,
  //   UInput,
  //   UFile,
  //   FormStars,
  // },

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
    <h4>Ваше имя</h4>
    <UInput
      v-model="review.author"
      placeholder="Как вас зовут?"
    />

    <h4>Текст отзыва</h4>
    <UInput
      v-model="review.text"
      type="textarea"
      placeholder="Напишите текст отзыва.."
    />

    <FormStars
      v-model="review.stars"
      label="Ваша оценка"
    />

    <UFile
      v-model="review.attach"
      label="Фото"
    />

    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        id="adv1"
        v-model="review.isRecommended"
        :value="false"
      />
      <label
        class="form-check-label"
        for="adv1"
      >
        Не советую
      </label>
    </div>

    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        id="adv2"
        v-model="review.isRecommended"
        :value="true"
      />
      <label
        class="form-check-label"
        for="adv2"
      >
        Советую
      </label>
    </div>
    <UButton>Отправить</UButton>
  </form>
</template>

<style scoped></style>
