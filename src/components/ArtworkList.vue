<template>
  <div>
    <div v-if="artworks.length" class="artwork-list">
      <div
        v-for="artwork in artworks"
        :key="artwork.id || artwork.objectID"
        class="artwork-card"
      >
        <div class="artwork-image">
          <img :src="artwork.image" :alt="artwork.title" />
        </div>
        <div class="artwork-details">
          <h3>{{ artwork.title }}</h3>
          <p><strong>Department:</strong> {{ artwork.department }}</p>
          <p><strong>Object Name:</strong> {{ artwork.objectName }}</p>
          <div class="artwork-links">
            <a :href="artwork.objectUrl" target="_blank" class="link-button">
              View on Met Museum
            </a>
            <a
              v-if="artwork.objectWikidataUrl"
              :href="artwork.objectWikidataUrl"
              target="_blank"
              class="link-button"
            >
              View on Wikidata
            </a>
          </div>
        </div>
      </div>
    </div>
    <p v-else>No artworks found.</p>
  </div>
</template>

<script>
export default {
  name: 'ArtworkList',
  props: {
    artworks: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.artwork-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.artwork-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.artwork-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.artwork-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.artwork-details {
  padding: 15px;
}

.artwork-details h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #333;
}

.artwork-details p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

.artwork-links {
  margin-top: 10px;
}

.link-button {
  display: inline-block;
  margin: 5px 5px 0 0;
  padding: 8px 12px;
  background-color: #09f;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.2s;
}

.link-button:hover {
  background-color: #007acc;
}
</style>
