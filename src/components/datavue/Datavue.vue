<template>
  <div class="card">
    <div class="card-header" v-if="$slots.title">
      <slot name="title"></slot>
    </div>
    <div class="card-body">
      <div class="row mb-3">
        <div class="col-md-6">
          <slot name="actionbar" :checkedItems="checkedItems"></slot>
        </div>
        <div class="col-md-6">
          <div class="form-inline justify-content-end">
            <div class="form-group">
              <data-search v-model="searchTerm"></data-search>
            </div>
          </div>
        </div>
      </div>

      <app-alert
        message="No records found!"
        type="danger"
        v-if="!records.length"
      >
        <i class="fa fa-exclamation-triangle"></i>
      </app-alert>

      <table v-else class="table table-striped table-hover">
        <thead>
          <slot
            name="head"
            :sort="sorting"
            :sortable="sortable"
            :checkAll="checkAll"
            :isCheckedAll="isCheckedAll"
          ></slot>
        </thead>
        <tbody>
          <slot
            name="body"
            :records="recordsPaginated"
            :firstItem="firstItem"
            :isChecked="isChecked"
            :checkItem="checkItem"
          ></slot>
        </tbody>
      </table>
    </div>
    <div class="card-footer">
      <data-footer-control
        v-model:per-page="localPerPage"
        v-model:current-page="currentPage"
        :total-rows="records.length"
      ></data-footer-control>
    </div>
  </div>
</template>

<script>
import DataSearch from "./DataSearch.vue";
import DataFooterControl from "./DataFooterControl.vue";
import { addToHistory, getArrayIndexes, getFromHistory } from "./utils";
import { computed } from "vue";

export default {
  props: {
    searchKey: {
      type: String,
      default: "name",
    },
    sortKey: {
      type: String,
      default: "name",
    },
    source: {
      type: [String, Array],
      required: true,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    pagination: {
      type: String,
      default: "inline",
    },
  },
  provide() {
    return {
      paginationType: this.pagination,
      totalFilteredRows: computed(() => this.recordsFiltered.length),
    };
  },
  components: {
    DataSearch,
    DataFooterControl,
  },
  created() {
    console.log(this.$slots);
  },
  data() {
    return {
      records: [],
      searchTerm: getFromHistory("search", ""),
      sort: {
        by: getFromHistory("sort_by", this.sortKey),
        dir: getFromHistory("sort_dir", 1),
      },
      currentPage: getFromHistory("page", 1),
      localPerPage: getFromHistory("per_page", this.perPage),
      firstItem: 1,
      checkedItems: new Set(),
    };
  },
  computed: {
    recordsFiltered() {
      if (!this.searchTerm) {
        return this.records;
      }

      return this.records.filter((record) =>
        record[this.searchKey].match(new RegExp(this.searchTerm, "i"))
      );
    },

    recordsSorted() {
      return this.recordsFiltered.sort((a, b) => {
        const left = a[this.sort.by],
          right = b[this.sort.by];

        if (left < right) return -1 * this.sort.dir;
        else if (left > right) return 1 * this.sort.dir;
        else return 0;
      });
    },

    recordsPaginated() {
      let { from, to } = getArrayIndexes(
        this.records.length,
        this.localPerPage,
        this.currentPage
      );
      this.firstItem = from + 1;
      return this.recordsSorted.slice(from, to + 1);
    },

    sortType() {
      return this.sort.dir === 1 ? "ascending" : "descending";
    },

    isCheckedAll() {
      return (
        this.recordsPaginated.length &&
        this.recordsPaginated.length === this.checkedItems.size
      );
    },
  },
  methods: {
    checkAll(e) {
      if (e.target.checked) {
        this.recordsPaginated.forEach((record) =>
          this.checkedItems.add(record)
        );
      } else {
        this.checkedItems.clear();
      }
      console.log(this.checkedItems.size);
    },
    isChecked(record) {
      return this.checkedItems.has(record);
    },
    checkItem(record) {
      if (this.isChecked(record)) {
        this.checkedItems.delete(record);
      } else {
        this.checkedItems.add(record);
      }
      console.log(this.checkedItems.size);
    },
    fetchData() {
      if (Array.isArray(this.source)) {
        this.records = this.source;
      }
    },
    sorting(column) {
      this.sort.by = column;
      this.sort.dir = this.sort.dir * -1;
      addToHistory("sort_by", this.sort.by);
      addToHistory("sort_dir", this.sort.dir);
    },

    sortable(column) {
      return ["sort-control", column === this.sort.by ? this.sortType : ""];
    },
  },
  mounted() {
    this.fetchData();

    window.onpopstate = () => {
      this.currentPage = getFromHistory("page", 1);
    };
  },
};
</script>
