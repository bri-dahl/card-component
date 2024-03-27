<script setup>
import Card from './components/card.vue';
import { images } from './imageData.js';
</script>

<template>
  <main>
    <div class="m-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      <Card
        :result-name="'Desert Whisper'"
        :result-price="21250"
        :result-review-score="4.5"
        :image-source="images"
        :guest-capacity="2"
        :bedrooms="1"
        :bathrooms="1"
        :wifi="true"
      />
    </div>
  </main>
</template>
