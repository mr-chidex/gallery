<template>
  <div class="masonry-item">
    <div class="masonry-item__image-container">
      <img
        :src="photo.urls.small"
        :alt="photo.alt_description"
        class="masonry-item__image"
        loading="lazy"
        @load="assignRowSpans"
      />
      <div class="masonry-item__overlay">
        <div class="masonry-item__content">
          <p class="masonry-item__name">{{ photo.user.name }}</p>
          <p class="masonry-item__location" v-if="photo.user?.location">
            {{ photo.user.location }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  photo: Object,
  assignRowSpans: Function,
});
</script>

<style lang="scss" scoped>
.masonry-item {
  display: flex;
  flex-direction: column;
  grid-row-end: span var(--rows);
  margin-bottom: 1rem;
  background: linear-gradient(-90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  height: fit-content;
}

.masonry-item__image-container {
  position: relative;
  width: 100%;
  transition: all 0.3s ease-in-out;
  cursor: zoom-in;
  border-radius: 0.5rem;
  height: auto;
  overflow: hidden;

  &:hover .masonry-item__overlay {
    display: none;
  }
}

.masonry-item__image {
  width: 100%;
  border-radius: 0.5rem;
  display: block;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  object-fit: cover;

  &:hover {
    transform: scale(1.1);
  }
}

.masonry-item__image:hover {
  transform: scale(1.1);
}

.masonry-item__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  color: var(--color-secondary);
  padding: 0.625rem;
  height: 100%;
  text-transform: capitalize;
  display: flex;
}

.masonry-item__content {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.5rem;
}

.masonry-item__name {
  font-size: 0.85rem;
  font-weight: bold;
}

.masonry-item__location {
  font-size: 0.75rem;
  font-weight: normal;
}
</style>
