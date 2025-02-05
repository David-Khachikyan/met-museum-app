<template>
  <div class="container">
    <h1>Metropolitan Museum of Art Explorer</h1>
    <!-- Search Controls -->
    <SearchControls
      :departments="departments"
      :isDepartmentsLoading="isDepartmentsLoading"
      :isSearchLoading="isSearchLoading"
      @search="handleSearchArtworks"
    />

    <!-- Artwork List or Loader -->
    <div v-if="isSearchLoading" class="loader-large"></div>
    <ArtworkList v-else :artworks="artworks" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { watch } from 'vue';
import { useToast } from 'vue-toastification';
import SearchControls from '@/components/SearchControls.vue';
import ArtworkList from '@/components/ArtworkList.vue';

export default {
  name: 'DepartmentsView',
  components: {
    SearchControls,
    ArtworkList,
  },
  computed: {
    ...mapState({
      departments: (state) => state.departments,
      artworks: (state) => state.artworks,
      isDepartmentsLoading: (state) => state.isDepartmentsLoading,
      isSearchLoading: (state) => state.isSearchLoading,
      networkError: (state) => state.networkError,
    }),
  },
  methods: {
    ...mapActions({
      loadDepartments: 'loadDepartments',
      performSearch: 'performSearch',
    }),
    handleSearchArtworks({ departmentId, query }) {
      if (departmentId && query) {
        this.performSearch({ departmentId, query });
      }
    },
  },
  mounted() {
    this.loadDepartments();

    const toast = useToast();

    watch(
      () => this.networkError,
      (newError) => {
        if (newError) {
          toast.error(newError);
        }
      },
    );
  },
};
</script>

<style scoped>
.container {
  margin: auto;
  text-align: center;
}

/* Loader for search results */
.loader-large {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #09f;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 20px auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
