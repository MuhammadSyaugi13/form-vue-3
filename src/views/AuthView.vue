<template>
  <div class="container my-5">
    <button
      class="btn btn-outline-secondary mr-1"
      @click="showForm = 'LoginForm'"
    >
      Login
    </button>
    <button
      class="btn btn-outline-secondary"
      @click="showForm = 'RegisterForm'"
    >
      Register
    </button>

    <keep-alive>
      <component :is="showForm"></component>
    </keep-alive>
  </div>
</template>

<script>
import LoginForm from "./components/auth/LoginForm.vue";
import RegisterForm from "./components/auth/RegisterForm.vue";

export default {
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      showForm: "LoginForm",
    };
  },
};
</script>
