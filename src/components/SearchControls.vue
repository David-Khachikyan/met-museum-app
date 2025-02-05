<template>
  <div class="search-controls">
    <div v-if="isDepartmentsLoading" class="loader-small"></div>
    <div v-else>
      <!-- Department Dropdown -->
      <select v-model="localDepartment" class="styled-select">
        <option disabled value="">Select a department</option>
        <option v-for="dept in departments" :key="dept.id" :value="dept.id">
          {{ dept.name }}
        </option>
      </select>

      <!-- Search Input -->
      <input
        v-model="localSearchQuery"
        placeholder="Search artworks..."
        class="styled-input"
      />

      <!-- Search Button -->
      <button
        @click="onSearch"
        :disabled="isSearchButtonDisabled"
        class="styled-button"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchControls',
  props: {
    departments: {
      type: Array,
      required: true,
    },
    isDepartmentsLoading: {
      type: Boolean,
      required: true,
    },
    isSearchLoading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      localDepartment: '',
      localSearchQuery: '',
    };
  },
  computed: {
    isSearchButtonDisabled() {
      return (
        !this.localDepartment ||
        !this.localSearchQuery ||
        this.isDepartmentsLoading ||
        this.isSearchLoading
      );
    },
  },
  methods: {
    onSearch() {
      this.$emit('search', {
        departmentId: this.localDepartment,
        query: this.localSearchQuery,
      });
    },
  },
};
</script>

<style scoped>
.loader-small {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #09f;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin: 5px auto;
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

/* Reuse existing styles for select, input, and button */
.styled-select,
.styled-input,
.styled-button {
  margin: 5px;
  padding: 8px;
  font-size: 16px;
}
.styled-select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.styled-select:focus,
.styled-input:focus {
  border-color: #09f;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 153, 255, 0.5);
}
.styled-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 2;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.styled-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #09f;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}
.styled-button:hover:not(:disabled) {
  background-color: #007acc;
}
.styled-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
