import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
  data() {
    return {
      // 加入 API 站點
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      // 載入個人 API 名稱
      apiPath: 'hardtosay',
      // 建立一個空陣列
      products: [],
      // 建立一個空物件
      tempProduct: {},
    }
  },
  methods: {
    checkAdmin() {
      // 宣告 API 路徑，用於檢查使用者是否登入
      const url = `${this.apiUrl}/api/user/check`;
      // 使用 axios POST 方法傳送
      axios.post(url)
        .then(() => {
          // 登入成功後，列出產品列表
          this.getData();
        })
        .catch((error) => {
          alert(error.data.message)
          // 登入失敗，即跳回登入頁面
          window.location = 'index.html';
        })
    },
    getData() {
      // 宣告 API 路徑，用於取得產品列表， this.apiURL 取得 API 路徑， this.apiPath 取得個人 API 名稱
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      // 使用 axios 獲取產品列表 API
      axios.get(url)
        .then((response) => {
          // 把 response 回傳的 data.prodcuts 放入到 products 空陣列
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.data.message);
        })
    },
    // openProduct 中的 item，是從…products.html 這一行來的 <tr v-for="(item) in products" :key="item.id">
    openProduct(item) {
    // 把回傳的 itme 存入到 tempProduct 這個空物件
      this.tempProduct = item;
    }
  },
  mounted() {
    // 取出 Token， Token 只需要設定一次
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // 把取出的 Token 放進 header 裡面， Global axios defaults
    axios.defaults.headers.common['Authorization'] = token;
    // 呼叫 checkAdmin function 來確認是否登入
    this.checkAdmin()
  }
}).mount('#app');

