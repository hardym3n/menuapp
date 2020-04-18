<template>
  <div id="app">
    <!-- <div id="nav">

    </div> -->
    <component :is="layout">
      <router-view/>
    </component>
    
  </div>
</template>

<script>
export default {
  computed: {
    layout(){
      return this.$route.meta.layout || 'default-layout'
    }
  }
}
</script>
