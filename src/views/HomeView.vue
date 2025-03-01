<script setup>
import VueFeather from "vue-feather";
import Wrapper from "@/components/Wrapper.vue";
import { onMounted, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { getAllPhotos } from "@/utils/api";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import MasonryItem from "@/components/MansoryItem.vue";

const search = ref("");
const router = useRouter();
const photos = ref([]);
const loading = ref(false);
const page = ref(1);

const fetchPhotos = async () => {
  if (loading.value) return;
  loading.value = true;

  const newPhotos = await getAllPhotos(page.value, 10);

  if (newPhotos.length > 0) {
    photos.value.push(...newPhotos); // Append new images BELOW previous ones
    page.value++;
    nextTick(assignRowSpans);
  }

  loading.value = false;
};

const assignRowSpans = () => {
  document.querySelectorAll(".masonry-item").forEach((item) => {
    const img = item.querySelector("img");
    if (img) {
      const rowSpan = Math.ceil(img.clientHeight / 10); // Each row is 10px tall
      item.style.setProperty("--rows", rowSpan);
    }
  });
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
        <input type="text" v-model="search" placeholder="Search for photo" />
        <vue-feather type="search" size="16" stroke="2" class="search-icon" />
      </form>
    </template>

    <template #main>
      <div class="masonry-grid">
        <MasonryItem
          v-for="photo in photos"
          :key="photo.id"
          :photo="photo"
          :assignRowSpans="assignRowSpans"
        />
      </div>

      <div v-if="loading" class="skeleton-container">
        <div class="masonry-grid">
          <SkeletonLoader v-for="n in 6" :key="n" />
        </div>
      </div>
    </template>

    <button type="button" @click="fetchPhotos" :disabled="loading" class="load-btn">
      {{ loading ? "Loading..." : "Load More" }}
    </button>
  </Wrapper>
</template>

<style lang="scss" scoped>
.form-control {
  width: 100%;
  max-width: 1280px;
  position: relative;

  input {
    width: 100%;
    padding: 1.2rem 4rem;
    outline: none;
    border: none;
    border-radius: 0.3rem;

    &::placeholder {
      color: #504b4bff;
    }
  }

  .search-icon {
    stroke: #656060ff;
    position: absolute;
    left: 1.5rem;
    top: 1.2rem;
  }
}

.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: auto;
  row-gap: 10px;
  column-gap: 3rem;
}

.load-btn {
  background: var(--background-primary);
  color: #000;
  font-weight: bold;
  padding: 0.5rem 3rem;
  border: none;
  display: block;
  margin: 2rem auto;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;
}
</style>
