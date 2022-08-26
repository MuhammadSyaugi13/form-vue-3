<template>
  <nav>
    <ul
      class="pagination"
      :class="positionClass"
      v-if="paginationType === 'inline'"
    >
      <li class="page-item" :class="{ disabled: isFirstPage }">
        <a class="page-link" href="#" @click.prevent="prev">Previous</a>
      </li>
      <li
        class="page-item"
        :class="{ active: currentPage === page }"
        v-for="page in pages"
        :key="`page-${page}`"
      >
        <a class="page-link" href="#" @click.prevent="switchPage(page)">{{
          page
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: isLastPage }">
        <a class="page-link" href="#" @click.prevent="next">Next</a>
      </li>
    </ul>
    <div v-else class="row align-items-center">
      <div class="col-md-6">
        <label>Page</label>
        <select
          class="form-control custom-select ml-1 mr-1"
          style="width: 70px"
          v-model="currentPage"
        >
          <option v-for="page in pages" :key="`option-${page}`" :value="page">
            {{ page }}
          </option>
        </select>
        <span>of {{ pages }}</span>
      </div>
      <div class="col-md-6 text-right">
        <button
          class="btn btn-outline-secondary btn-sm mr-1"
          @click="prev"
          :disabled="isFirstPage"
        >
          Prev
        </button>
        <button
          class="btn btn-outline-secondary btn-sm"
          @click="next"
          :disabled="isLastPage"
        >
          Next
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { addToHistory, getFromHistory } from "./utils";

export default {
  props: {
    totalRows: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    modelValue: {
      // current page
      type: Number,
      default: 1,
    },
    position: {
      type: String,
      default: "",
      validator: function (value) {
        return ["left", "right", "center"].indexOf(value) !== -1;
      },
    },
    type: {
      type: String,
      default: "inline",
      validator: function (value) {
        return ["inline", "dropdown"].indexOf(value) !== -1;
      },
    },
  },
  inject: ["paginationType", "totalFilteredRows"],
  mounted() {
    console.log("type", this.paginationType);
  },
  computed: {
    positionClass() {
      const posOptions = {
        left: "",
        right: "justify-content-end",
        center: "justify-content-center",
      };
      return posOptions[this.position] || "";
    },
    pages() {
      const total =
        this.totalFilteredRows.value !== this.totalRows
          ? this.totalFilteredRows.value
          : this.totalRows;
      return Math.ceil(total / this.perPage);
    },

    isFirstPage() {
      return this.currentPage === 1;
    },

    isLastPage() {
      return this.currentPage >= this.pages;
    },
  },

  data() {
    return {
      currentPage: this.modelValue,
    };
  },
  emits: ["update:modelValue"],
  watch: {
    currentPage(val) {
      this.$emit("update:modelValue", val);
      addToHistory("page", val);
    },
  },
  methods: {
    prev() {
      if (!this.isFirstPage) {
        this.currentPage--;
      }
    },
    next() {
      if (!this.isLastPage) {
        this.currentPage++;
      }
    },
    switchPage(page) {
      this.currentPage = page;
    },
  },
};
</script>
