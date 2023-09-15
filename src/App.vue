<script setup>
import { reactive, computed, ref } from 'vue';
import axios from 'axios';

const review = reactive({
  author: '',
  stars: null,
  text: '',
  attach: null,
  isRecommended: true,
});

const starts = [1, 2, 3, 4, 5];
const previewFilePath = computed(() => {
  if (review.attach) {
    return URL.createObjectURL(review.attach);
  }
  return '#';
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

const uploadFile = (e) => {
  const [file] = e.target.files;
  review.attach = file;
};
</script>

<template>
  <form
    @submit.prevent.stop="submit"
    class="container pt-5 pb-5"
  >
    <h4>Ваше имя</h4>
    <input
      class="form-control mb-3"
      type="text"
      v-model="review.author"
      placeholder="Как вас зовут?"
    />
    <h4>Ваша оценка</h4>
    <div
      class="form-check mb-3 star-list"
      v-for="star in starts"
      :key="star"
    >
      <input
        class="form-check-input"
        v-model="review.stars"
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
    <div>
      <h4>Текст отзыва</h4>
      <textarea
        v-model="review.text"
        class="form-control"
        rows="3"
        placeholder="Напишите текст отзыва.."
      >
      </textarea>
    </div>

    <div class="mb-3 mt-3">
      <label class="form-label">
        <h4>Приложения</h4>
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
    <button class="btn btn-primary mt-4">Отправить</button>
  </form>
</template>

<style scoped></style>
