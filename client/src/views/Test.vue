<template>
  <main class="container my-5" style="padding-top: 100px">
    <form @submit.prevent="postForm">
      <input type="file">
      <button type="submit">go!</button>
    </form>
  </main>
</template>
<script>
export default {
  head() {
    return {
      title: "Add Recipe"
    };
  },
  data() {
    return {
      dataset: {
        title: "",
        price: "",
        description: "",
        image: "",
      },
      preview: ""
    };
  },
  methods: {
    async postForm(){

    }
  }
};
</script>
<style scoped>
</style>
