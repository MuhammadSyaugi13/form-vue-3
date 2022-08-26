<template>
  <div :class="alertClasses" role="alert">
    <slot>
      <i class="fa fa-check"></i>
    </slot>
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "check",
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "primary",
      validator: function (value) {
        return (
          ["success", "primary", "danger", "warning"].indexOf(value) !== -1
        );
      },
    },
  },
  computed: {
    alertClasses() {
      return ["alert", `alert-${this.type}`];
    },
  },
};
</script>
