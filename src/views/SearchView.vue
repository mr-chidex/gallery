<script setup>
import Wrapper from "@/components/Wrapper.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import MasonryItem from "@/components/MansoryItem.vue";
import { useRoute } from "vue-router";
import { onMounted, ref, nextTick } from "vue";
import { searchPhotos } from "@/utils/api";
import { assignRowSpans } from "@/utils/handlers";
import ImageSlider from "@/components/ImageSlider.vue";
import { useHead } from "@vueuse/head";

useHead({
  title: "Image Gallery: Search query",
  meta: [
    { name: "description", content: "A beautiful image gallery with smooth animations." },
  ],
});

const route = useRoute();
const searchQuery = route.query.q;
const photos = ref([]);
const loading = ref(false);
const page = ref(1);
const totalResult = ref(false);
const isNoMore = ref(false);
const showSlider = ref(false);
const currentIndex = ref(0);

const fetchPhotos = async () => {
  if (loading.value) return;
  loading.value = true;

  if (!searchQuery) return;
  const { total, results } = await searchPhotos(searchQuery, page, 8);
  totalResult.value = total;

  if (results?.length > 0) {
    photos.value.push(...results);
    page.value++;
    nextTick(assignRowSpans);
  }

  loading.value = false;
};

const openSlider = (index) => {
  currentIndex.value = index;
  showSlider.value = true;
};

onMounted(async () => {
  await fetchPhotos();
  isNoMore.value = photos.value.length >= totalResult?.value;
});
</script>

<template>
  <Wrapper>
    <template #header>
      <h1 v-if="searchQuery?.length > 0">
        Search Results for <span>&quot;{{ searchQuery }}&quot;</span>
      </h1>

      <h1 v-else>No search query</h1>
    </template>

    <template #main>
      <div v-if="loading && photos.length === 0" class="skeleton-container">
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
      <Transition name="slide-fade">
        <ImageSlider
          v-if="showSlider"
          :photos="photos"
          :currentIndex="currentIndex"
          @close="showSlider = false"
        />
      </Transition>

      <div v-if="!loading && photos.length === 0" class="empty">
        <p>No photo available at this moment.</p>
      </div>

      <button
        v-show="photos.length > 0 && !isNoMore"
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
h1 {
  color: #15054f;
  text-align: left;
  width: 100%;

  span {
    color: #6b6b6b;
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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
