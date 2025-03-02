<script setup>
import VueFeather from "vue-feather";
import Wrapper from "@/components/Wrapper.vue";
import { onMounted, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { getAllPhotos } from "@/utils/api";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import MasonryItem from "@/components/MansoryItem.vue";
import { assignRowSpans } from "@/utils/handlers";
import ImageSlider from "@/components/ImageSlider.vue";

const search = ref("");
const router = useRouter();
const photos = ref([]);
const loading = ref(false);
const page = ref(1);
const showSlider = ref(false);
const currentIndex = ref(0);

const fetchPhotos = async () => {
  if (loading.value) return;
  loading.value = true;

  const newPhotos = await getAllPhotos(page.value, 20);

  if (newPhotos.length > 0) {
    photos.value.push(...newPhotos); // Append new images BELOW previous ones
    page.value++;
    nextTick(assignRowSpans);
  }

  loading.value = false;
};

const openSlider = (index) => {
  currentIndex.value = index;
  showSlider.value = true;
};

const searchHandler = () => {
  if (search.value.trim() !== "") {
    router.push({ path: "/search", query: { q: search.value } });
  }
};

onMounted(fetchPhotos);
</script>

<template>
  <Wrapper>
    <template #header>
      <form @submit.prevent="searchHandler" class="form-control">
        <input
          class="form-control__input"
          type="text"
          v-model="search"
          placeholder="Search for photo"
        />
        <vue-feather type="search" size="16" stroke="2" class="form-control__icon" />
      </form>
    </template>

    <template #main>
      <div v-if="loading" class="skeleton-container">
        <SkeletonLoader v-for="n in 6" :key="n" />
      </div>

      <div class="masonry-grid">
        <MasonryItem
          v-for="(photo, index) in photos"
          :key="photo.id"
          :photo="photo"
          :assignRowSpans="assignRowSpans"
          @click="openSlider(index)"
        />
      </div>

      <!-- Image Slider Modal -->
      <ImageSlider
        v-if="showSlider"
        :photos="photos"
        :currentIndex="currentIndex"
        @close="showSlider = false"
      />

      <div v-if="!loading && photos.length === 0" class="empty">
        <p>No photo available at this moment.</p>
      </div>

      <button
        v-if="!loading && photos.length > 0"
        type="button"
        @click="fetchPhotos"
        :disabled="loading"
        class="load-btn"
      >
        {{ loading ? "Loading..." : "Load More" }}
      </button>
    </template>
  </Wrapper>
</template>

<style lang="scss" scoped>
.form-control {
  width: 100%;
  max-width: 1280px;
  position: relative;
}

.form-control__input {
  width: 100%;
  padding: 1.2rem 3rem;
  outline: none;
  border: none;
  border-radius: 0.3rem;

  &::placeholder {
    color: #504b4bff;
  }

  @media (min-width: 768px) {
    padding: 1.2rem 4rem;
  }
}

.form-control__icon {
  stroke: #656060ff;
  position: absolute;
  left: 1rem;
  top: 1.2rem;

  @media (min-width: 768px) {
    left: 1.5rem;
  }
}

.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: auto;
  row-gap: 4px;
  column-gap: 3rem;
}

.load-btn {
  background: var(--background-primary);
  color: var(--color-primary);
  font-weight: bold;
  padding: 0.5rem 3rem;
  border: none;
  display: block;
  margin: 4rem auto;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #0056b3;
    transform: scale(1.05);
    color: var(--color-secondary);
  }
}

.empty {
  text-align: center;
  margin-top: 4rem;
  display: grid;
  place-items: center;
}

.skeleton-container {
  column-count: 3;
  column-gap: 10px;
  row-gap: 10px;
  column-gap: 3rem;
}
</style>
