<template>
  <span>{{ recordMeta }}</span>
  <!-- <span>{{ totalFilteredRows.value }}</span> -->
</template>

<script>
import { getArrayIndexes } from "./utils";

export default {
  props: {
    totalRows: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      required: true,
    },
  },
  inject: ["totalFilteredRows"],
  computed: {
    recordMeta() {
      let total = this.totalRows;
      let str = `Showing {from} to {to} of {total1} records`;

      if (this.totalRows !== this.totalFilteredRows.value) {
        total = this.totalFilteredRows.value;
        str += `(filtered from {total2} total entries)`;
      }

      let { from, to } = getArrayIndexes(total, this.perPage, this.currentPage);

      return str
        .replace("{from}", from + 1)
        .replace("{to}", to + 1)
        .replace("{total1}", total)
        .replace("{total2}", this.totalRows);
    },
  },
};
</script>
