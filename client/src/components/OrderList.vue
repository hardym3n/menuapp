<template>
  <div class="wrapper" v-if="order.length">
    <div class="order">
      <div class="order__wrapper">
      <div class="order__item" v-for="(item, index) in order" :index="index" :key="item.__id">
        <a href="#" class="order__delete" @click.prevent="deleteOne(index)"><i class="fas fa-minus-circle"></i></a>
        <div class="order__main">
          <h5 class="order__title">{{ item.title }} <span>x{{item.ammount}}</span></h5> 
          <p class="order__price">{{ item.price }}₽ </p>
          <!-- <p class="order__price--multiplier">x{{item.ammount}}</p> -->
        </div>
      </div>
      
      </div>
      <p class="order__total">Итог: {{ totalPrice }}₽</p>
      <router-link to="/checkout" class="order__button">Дальше</router-link>
    </div>
    
    <!-- <p class="debug">{{ showProps }}</p> -->
  </div>
</template>
<style lang="scss">

</style>
<script>
export default {
  data() {
    return {
      order: this.$store.getters.getOrder,
      summary: 0,
    };
  },
  computed:{
      totalPrice(){
        let res = 0
        for (let item of this.order){
          res += item.price * item.ammount
        }
        return res;
      }
  },
  methods: {
    deleteOne(index){
      if (this.order[index].ammount > 1){
        this.$store.commit('delAmmount', index)
      } else if (this.order[index].ammount == 1){
        this.$store.commit('delOrderByIndex', index)
      }
    }
  },
  mounted(){
    console.log(this.props)
    
  },
  updated(){
    console.log(this.order)
  }
};
</script>