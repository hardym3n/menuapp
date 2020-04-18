<template>
  <div class="navbar">
    <div class="container">
      <nav class="navbar__container">
        <div class="navbar__logo">
          <router-link to='/' class="gohome">
          <img src="../../public/menu.svg" alt="" height="30px"> 
          <p class="navbar__text">доски.меню</p>
          </router-link>
        </div>
        <div class="navbar__search">
          <input type="text" placeholder="я хочу ..." v-model="searchText">
        </div>
        <div class="navbar__links">
          <router-link to="/add" class="navbar__link">Добавить блюдо <i class="fas fa-plus"></i></router-link>
        </div>
      </nav>
    </div>
  </div>
</template>
<style lang="scss">
.gohome{
  display: flex;
  align-items: center;
  text-decoration: none;
  &:focus{
    border: none;
    outline: none;
  }
}
</style>
<script>
export default {
  data(){
    return {
      
    }
  }, 
  computed: {
    searchText: {
      get(){
        console.log("GETTER",this.$store.state.menu.searchWord)
        return this.$store.state.menu.searchWord;
      },
      set(val){
        this.$store.commit('MENU_LIST', val)
        console.log(this.$store.state.menuList)
      }
    }
  }
}
</script>