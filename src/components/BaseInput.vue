<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input class="form-control" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
  },

  created() {
    console.log(this.$attrs);
  },
};
</script>
