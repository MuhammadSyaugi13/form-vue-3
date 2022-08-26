<template>
  <label>Show</label>
  <select
    :value="modelValue"
    @change="handleChange"
    class="form-control custom-select mr-1 ml-1"
    style="width: 70px"
  >
    <option v-for="size in pageSizes" :key="`page-size-${size}`" :value="size">
      {{ size }}
    </option>
  </select>
  <span>records</span>
</template>

<script>
import { addToHistory } from "./utils";

export default {
  props: {
    totalRows: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      limit: this.modelValue,
    };
  },
  computed: {
    pageSizes() {
      const pageSizes = [10, 25, 50, 100];
      if (pageSizes.indexOf(this.limit) === -1) {
        pageSizes.push(this.limit);
      }

      return pageSizes.sort((a, b) => a - b);
    },
  },
  methods: {
    handleChange(event) {
      let value = parseInt(event.target.value);
      this.$emit("update:modelValue", value);
      addToHistory("per_page", value);
    },
  },
};
</script>
