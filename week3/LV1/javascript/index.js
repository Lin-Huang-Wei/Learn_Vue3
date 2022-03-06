import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      // 宣告自已 API 的路徑
      const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      // 使用 axios POST 方法傳送使用者帳號及密碼到 API Server
      axios.post(api, this.user).then((response) => {
        // 跳出成功登入訊息框
        alert(response.data.message)
        // 寫入 cookie 跟 token
        // 使用解構的方式，取出 token 跟 expired
        const { token, expired } = response.data;
        // 使用樣版字面值來儲存 cookie 會比較好存，儲存 cookie 的目的主要是為了可以保存登入的狀態，即使重新刷新頁面，無須重新登入
        // expired 抓出來的是 unix timestamp，所以要用 new Data() 這個方法來做轉型
        document.cookie = `hexToken=${ token }; expires=${new Date(expired)};`;
        // 成功登入後，跳轉至產品頁面
        window.location = 'products.html';
      }).catch((error) => {
        // 跳出錯誤的訊息提示框
        alert(error.data.message);
      });
    },
  },
}).mount('#app');
