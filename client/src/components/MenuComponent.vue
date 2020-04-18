<template>
  <div class="container container--menu overflow">
    
    <div class="menu" v-if="menus">
      <div
        class="menu__item"
        v-for="(item, index) in filteredList"
        v-bind:item="item"
        v-bind:index="index"
        v-bind:key="item.id"
      >
        <div class="menu__header">
          <h2 class="menu__title">{{ item.title }}</h2>
          <p class="menu__price">{{ item.price }}₽</p>
        </div>
        <div class="menu__description">
          <p>{{ item.description }}</p>
        </div>
        <div class="menu__image">
          <img alt :src="item.image" />
        </div>
        <a href="#" class="menu__button" @click.prevent="addToOrder(item.id, item.title, item.price)">Добавить</a>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
    <div class="order--wrapper">
      <OrderList :order="preOrder"/>
      <div style="width: 1px; height: 1px"></div>
    </div>
  </div>
</template>
<script>
import OrderList from './OrderList.vue';
import PostService from "../PostService";

export default {
  name: "MenuComponent",
  components:{
    OrderList,
  },
  data() {
    return {
      menusActual: [], // Меню с БД
      searchWord: "", 
      menus: [], // Дубликат для фильтра
      error: "", // Сообщенние ошибки
      title: "", 
      price: null,
      counter: 0,
      preOrder: [], // Предзаказ корзина
      indexedOrder: {}, // Индексация для заказов где храниться id: menus[index]
      indexedName: {},
    };
  },
  async created() { 
    try {
      this.menusActual = await PostService.getMenu() // Данные с БД
      this.menus = await this.menusActual
    } catch (err) {
      this.error = err.message;
    }
  },
  methods:{
    fillMenu(){
      this.menus = this.menusActual
    },
    fillNameObject(arr){
      console.log("!!!! ENTER INTO fillNameObj", arr)
      for (let index in arr){
        console.log("!!!! NAME INDEX", index)
        console.log("!!!", arr[index].title)
        this.indexedName[arr[index].title] = index
      }
      console.log("!!!!!! INDEXED NAME: ", this.indexedName)
    },
    addOrderAmmount(id){
      this.preOrder[this.indexedOrder[id]]['ammount'] += 1
    },
    addToOrder(id, title, price){
      console.log(id, title, price)  
      console.log(this.indexedOrder)
      if (id in this.indexedOrder){
        this.$store.commit('addAmmount', this.indexedOrder[id])
      } else {
        this.$store.commit('setOrder', {'id': id, 'title': title, 'price': price, 'ammount': 1})
        this.indexedOrder[id] = this.$store.getters.getOrder.length - 1
      }
    }
  },
  computed:{
    filteredList(){
      const title = this.$store.state.menu.searchWord.toLowerCase() // Переменная из NavbarComponent
      console.log(title)
      return this.menus.filter((elem)=>{
        if(title === ""){
          return true
        } else {
          return elem.title.toLowerCase().indexOf(title.toLowerCase()) > -1
        }
      })
    }
  }
};
</script>
