<template>
  <div class="home">
    <!-- <Navbar /> -->
    <MenuComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import MenuComponent from '@/components/MenuComponent.vue'
// import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    MenuComponent,
    // Navbar,
  }
}
</script>
<style lang="scss">

</style>
