import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: {
      searchWord: "",
      
    },
    layout: 'default-layout',
    preorder: [],
    order: [],
    _menu: []
  },
  getters: {
    MENU_LIST: (state)=>{
      return state.menu.searchWord;
    },
    LAYOUT: (state)=>{
      return state.layout
    },
    getPreorder: (state)=>{
      return state.preorder
    },
    getOrder: (state) =>{
      return state.order
    },
    getMenu: (state) => {
      return state._menu
    }
  },
  mutations: {
    setMenu: (state, payload) => {
      state._menu.push(payload)
    },
    setPreorder: (state, payload)=>{
      state.preorder.push(payload)
    },
    MENU_LIST: (state, payload)=>{
      state._menu.searchWord = payload
    },
    LAYOUT: (state, payload)=>{
      state.layout = payload
    },
    setOrder: (state, payload) => {
      state.order.unshift(payload)
    },
    addAmmount: (state, index) =>{
      state.order[index].ammount += 1
    },
    delAmmount: (state, index)=>{
      state.order[index].ammount -= 1
    },
    delOrderByIndex: (state, index) =>{
      state.order.splice(index, 1)
    },
  },
  actions: {
    getMenu: async (_this)=>{
      let response = (await Axios.get("http://localhost:8000/api/v1/menu/")).data
      _this.commit('setMenu', response)
    }
  },
  modules: {
  }
})
