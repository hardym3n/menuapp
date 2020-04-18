import axios from 'axios'

const url_get = "http://localhost:8000/api/v1/menu/"
const url_post = "http://localhost:8000/api/v1/menu/add"
// const url_update = "http://localhost:8000/api/v1/menu/update"
// const url_delete = "http://localhost:8000/api/v1/menu/delete"

class MenuService{
    // GET MENU
    static async getMenu(){
        return (await axios.get(url_get)).data
    }
    // Post menus
    static insertMenu(obj) {
        return axios.post(url_post, {
            title: obj.title,
            price: obj.price,
            description: obj.description,
            image: obj.image,
        })
    }

    // Delete menue
    // static deleteMenu(id) {
    //     return axios.delete(`${url}${id}`)
    // }
}


export default MenuService;