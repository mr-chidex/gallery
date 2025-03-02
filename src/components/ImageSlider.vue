<script setup>
import VueFeather from "vue-feather";
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { EffectFade, Navigation } from "swiper/modules";

const props = defineProps({
  photos: { type: Array, required: true },
  currentIndex: { type: Number, default: 0 },
});

const emit = defineEmits(["close"]);

const showSlider = ref(true);

const closeSlider = () => {
  showSlider.value = false;
  emit("close");
};
</script>

<template>
  <div v-if="showSlider" class="slider-overlay">
    <button class="slider__close-btn" @click="closeSlider">✖</button>
    <swiper
      v-if="photos.length"
      :modules="[EffectFade, Navigation]"
      :effect="'fade'"
      :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }"
      :initial-slide="currentIndex"
      class="swiper"
    >
      <swiper-slide v-for="photo in photos" :key="photo.id">
        <div class="swiper_contianer">
          <img :src="photo.urls.regular" loading="lazy" class="swiper__image" />

          <div class="slider__caption">
            <p class="slider__caption_name">{{ photo.user.name }}</p>
            <p class="slider__caption__location" v-if="photo.user?.location">
              {{ photo.user.location }}
            </p>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <button class="custom-prev">
      <vue-feather type="chevron-left" size="20" stroke="2" class="custom-prev__icon" />
    </button>
    <button class="custom-next">
      <vue-feather type="chevron-right" size="20" stroke="2" class="custom-next__icon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.slider-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.slider__close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10001;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
}

.swiper_contianer {
  width: 70vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  overflow: hidden;
  background: linear-gradient(-90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);

  @media (min-width: 768px) {
    width: 60vw;
    height: 70vh;
  }

  @media (min-width: 1268px) {
    width: 30vw;
    height: 70vh;
  }
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.swiper__image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: cover;
}

.slider__caption {
  color: white;
  background: var(--color-secondary);
  color: var(--background-secondary);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-transform: capitalize;
}

.slider__caption__name {
  font-size: 0.85rem;
  font-weight: bold;
}

.slider__caption__location {
  font-size: 0.75rem;
  font-weight: normal;
}

.custom-prev,
.custom-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  padding: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  stroke: #656060ff;
  position: absolute;
}

.custom-prev {
  left: 5rem;
}

.custom-next {
  right: 5rem;
}

.custom-prev:hover,
.custom-next:hover {
  background-color: #e0e0e0cc;
}

.swiper-button-next,
.swiper-button-prev {
  display: none !important;
}
</style>
