<template>
  <div>
  <header>
    <Navbar />
  </header>
  <slot />
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
  }
}
</script>