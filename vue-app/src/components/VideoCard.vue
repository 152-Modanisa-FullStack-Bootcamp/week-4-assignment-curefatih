<template>
  <div class="video-item" @click="navigateToVideo" :data-id="video.id">
    <div class="video-img">
      <img
        :src="hover ? video.hoverImage : video.coverImage"
        @mouseover="hover = !hover"
        @mouseleave="hover = !hover"
        width="500px"
        height="300px"
        class="cover-image"
        :alt="video.title"
      />
    </div>
    <h3 class="title">{{ video.title }}</h3>
  </div>
</template>

<script>
export default {
  name: "VideoCard",
  props: {
    video: {
      id: Number,
      title: String,
    },
  },
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    navigateToVideo() {
      this.$router.push({
        name: "Watch",
        query: {
          id: this.video.id,
        },
      });
    },
  },
};
</script>

<style>
.hover-image {
  display: none;
}

.cover-image:hover + .hover-image {
  display: block;
}

.hover-image:hover {
  display: block;
  padding: 10px;
  background: #000;
}
</style>