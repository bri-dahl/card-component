<script setup>
import { onMounted, ref } from 'vue';
const props = defineProps({
  resultName: {
    type: String,
    required: true,
  },
  resultPrice: {
    type: Number,
    required: true,
  },
  resultReviewScore: {
    type: Number,
    required: true,
  },
  imageSource: {
    type: Array,
    required: true,
  },
  guestCapacity: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  wifi: {
    type: Boolean,
    required: true,
  },
});

const amenityStyling =
  'flex h-10 w-16 flex-row items-center justify-center rounded-full bg-white p-2 shadow-sm';
const buttonStyling =
  'h-9 w-9 cursor-pointer rounded-full bg-brand-accent p-2 text-white shadow-md xl:h-11 xl:w-11 xl:p-3';

let cardHoveredOrButtonFocused = ref(false);
let onMobile = ref(false);
let activeImage = ref(0);

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

function checkMobile() {
  onMobile.value = window.innerWidth < 820;
}

function currentImage() {
  return props.imageSource[activeImage.value];
}

function previousImage() {
  activeImage.value =
    activeImage.value === 0
      ? props.imageSource.length - 1
      : activeImage.value - 1;
}

function nextImage() {
  activeImage.value =
    activeImage.value === props.imageSource.length - 1
      ? 0
      : activeImage.value + 1;
}

function formatPrice(price) {
  return price.toLocaleString('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  });
}
</script>

<template>
  <div
    id="card"
    class="relative"
    @mouseenter="cardHoveredOrButtonFocused = true"
    @mouseleave="cardHoveredOrButtonFocused = false"
    data-cy="card"
  >
    <div id="image-carousel">
      <img
        id="result-image"
        :src="currentImage()"
        :alt="resultName"
        class="h-[30rem] w-full rounded-3xl object-cover shadow-[0_0_30px] shadow-black/20 xl:h-[35rem] 2xl:h-[40rem]"
        data-cy="image"
      />
      <div
        id="amenities"
        class="absolute top-0 m-4 flex flex-wrap gap-2 font-bodyBold"
        data-cy="amenities"
      >
        <div id="guest-capacity" :class="amenityStyling">
          <span class="icon-[mingcute--group-2-fill]"></span>
          <p class="ml-1.5" aria-label="'Guest capacity'" data-cy="capacity">
            {{ guestCapacity }}
          </p>
        </div>
        <div id="bedrooms" :class="amenityStyling">
          <span class="icon-[mingcute--bed-fill] h-5 w-5"></span>
          <p
            class="ml-1.5"
            aria-label="'Number of bedrooms'"
            data-cy="bedrooms"
          >
            {{ bedrooms }}
          </p>
        </div>
        <div id="bathrooms" :class="amenityStyling">
          <span class="icon-[mingcute--bath-fill] h-5 w-5"></span>
          <p
            class="ml-1.5"
            aria-label="'Number of bathrooms'"
            data-cy="bathrooms"
          >
            {{ bathrooms }}
          </p>
        </div>
        <div
          id="wifi"
          v-if="wifi"
          :class="amenityStyling"
          aria-label="'Has wifi'"
          data-cy="wifi"
        >
          <span class="icon-[mingcute--wifi-line] h-6 w-6"></span>
        </div>
      </div>
      <div
        id="actions"
        v-if="imageSource.length > 1"
        class="absolute top-1/2 flex w-full justify-between transition-all duration-200 ease-in-out"
        :class="{
          'scale-100 opacity-100': cardHoveredOrButtonFocused || onMobile,
          'scale-90 opacity-0': !cardHoveredOrButtonFocused && !onMobile,
        }"
      >
        <button
          @click="previousImage()"
          :class="buttonStyling"
          class="-ml-4 xl:-ml-6"
          aria-label="'Go to previous image'"
          @focus="cardHoveredOrButtonFocused = true"
          @blur="cardHoveredOrButtonFocused = false"
          data-cy="previous-image"
        >
          <span class="icon-[mingcute--arrow-left-fill] h-5 w-5"></span>
        </button>
        <button
          @click="nextImage()"
          :class="buttonStyling"
          class="-mr-4 xl:-mr-6"
          aria-label="'Go to next image'"
          @focus="cardHoveredOrButtonFocused = true"
          @blur="cardHoveredOrButtonFocused = false"
          data-cy="next-image"
        >
          <span class="icon-[mingcute--arrow-right-fill] h-5 w-5"></span>
        </button>
      </div>
    </div>
    <div
      id="card-info-bg"
      class="absolute bottom-0 left-0 right-0 m-4 flex h-1/5 flex-col justify-center rounded-3xl bg-white shadow-sm"
    >
      <div id="card-info-content" class="m-6 font-body">
        <h1
          id="result-name"
          class="mr-10 line-clamp-1 font-bodyBold text-xl lg:mr-8 lg:pb-1 lg:text-2xl xl:text-3xl"
          data-cy="name"
        >
          {{ resultName }}
        </h1>
        <div id="price-container" class="line-clamp-1 flex items-end">
          <p id="result-price" class="text-xl xl:text-2xl" data-cy="price">
            {{ formatPrice(resultPrice) }}
          </p>
          <p class="ml-1.5 line-clamp-1 pb-0.5 text-sm xl:text-base">
            per night
          </p>
        </div>
        <div
          id="review-score-container"
          class="absolute -top-7 right-0 mb-4 mr-6 xl:mr-8"
        >
          <div
            id="review-score-bg"
            class="flex flex-col items-center rounded-full bg-brand-accent p-2 text-white shadow-md xl:p-3"
          >
            <span class="icon-[mingcute--star-fill] mb-0.5 h-5 w-5"></span>
            <p
              id="result-review-score"
              class="font-bodyBold text-white 2xl:text-lg"
              aria-label="'Review score'"
              data-cy="score"
            >
              {{ resultReviewScore }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
