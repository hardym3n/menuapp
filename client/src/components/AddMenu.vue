<template>
  <form class="form" @submit.prevent="checkForm">
    <transition-group name="fade">
      <div class="card" v-for="(card, index) in storedMenu" :key="index">
        <div class="card__photo">
          <div class="photoframe">
            <div class="photoframe__layer"></div>
            <img :src="showPreview[index]" alt="" class="photoframe__image" />
            <input
              type="file"
              @change="putImage($event, index)"
              class="image--load"
              ref="imageInput"
              accept="image/*"
            />
            <label class="button--load" @click="$refs.imageInput[index].click()">Load Image</label>
          </div>
        </div>
        <div class="card__input">
          <input
            type="text"
            id="dishTitle"
            class="input input--title"
            v-model="storedMenu[index].title"
            placeholder="Название блюда ..."
            required
          />
          <input
            type="number"
            class="input input--price"
            placeholder="Цена ..."
            v-model.number="storedMenu[index].price"
            required
          />
          <textarea
            type="text"
            class="input input--description"
            placeholder="Описание ..."
            v-model="storedMenu[index].description"
          ></textarea>
          <a href="#" class="card__remove" @click="removeCard($event, index)">
            <i class="fas fa-trash"></i>
          </a>
        </div>
      </div>
    </transition-group>
    <a href="#addDish" class="form__add" id="addDish" @click="addDish">Добавить еще</a>
    <button v-show="showSave" class="form__submit">Save</button>
    <!-- Идея: сделать карточку как и на главной только с инпутами -->
  </form>
</template>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@keyframes showBlock {
  0% {
    position: relative;
    right: 0;
    opacity: 0;
  }
  100% {
    left: 0;
    opacity: 1;
  }
}
</style>
<script>
// import MenuService from '../PostService'
import Axios from "axios";

export default {
  data() {
    return {
      imageFile: [],
      showPreview: {},
      selectedImage: [],
      storedMenu: [
        {
          title: null,
          price: null,
          description: null,
          image: null
        }
      ]
    };
  },
  methods: {
    // jumpToButton(){
    //   window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#addDish"
    // },
    removeCard(e, index) {
      e.preventDefault();
      console.log("Remove card index arg: ", index);
      if (this.storedMenu.length > 1) {
        this.storedMenu.splice(index, 1);
        delete this.showPreview[index];
        //this.$set(this.showPreview)
      }
      //this.$set(this.storedMenu[index], null)
      //this.storedMenu[index]
    },
    addDish(e) {
      e.preventDefault();
      this.storedMenu.push({
        title: "",
        price: null,
        description: "",
        image: ""
      });
      //this.jumpToButton()
      console.log(e.offsetTop);
    },
    saveForm(e) {
      e.preventDefault();
    },
    putImage(e, index) {
      console.log(index);
      console.log(e);
      //this.imageFile[index] = e.target.files[0]\
      let file = e.target.files || e.dataTransfer.files;
      this.$set(this.storedMenu[index], "image", file[0]);
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          this.$set(this.showPreview, index, reader.result);
        },
        false
      );
      if (this.storedMenu[index].image) {
        if (/\.(jpe?g|png|gif)$/i.test(this.storedMenu[index].image.name)) {
          reader.readAsDataURL(this.storedMenu[index].image);
        }
      }
      console.log("ImageFile", this.imageFile);
      console.log("Preview", this.showPreview);
    },
    async checkForm() {
      // const sendData = (dataForm) => {
      //   fetch("http://localhost:8000/api/v1/menu/", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //       body: dataForm,
      //     })
      // }

      for (let data of this.storedMenu) {
        let formData = new FormData();
        for (let elem in data) {
          formData.append(elem, data[elem]);
          console.log("DATA ELEM! ", elem, data[elem]);
        }
        console.log(data);
        console.log("!!!FORM DATA", formData);
        console.log("!!!FORM DATA ALL:", formData.getAll("title"));
        try {
          let response = await Axios.post(
            "http://localhost:8000/api/v1/menu/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          );
          console.log(response)
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
  computed: {
    showSave() {
      // const res = Boolean()
      // if (this.storedMenu[0])
      return this.storedMenu[0].title && this.storedMenu[0].price
        ? true
        : false;
    }
  }
};
/* ы
    TODO
    1. Выровнить
    2. Дропэйбл имэйдж
    3. Кнопка SAVE
    4. POST запрос
*/
</script>