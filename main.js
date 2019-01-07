let app = new Vue({
  el: '#app',
  data: {
    firstName: "Tim",
    lastName: "Knab",
    email: "tim@knab.com",
    phone: "2062711443",
    avatarImgUrl: "https://via.placeholder.com/150/000000/FFFFFF/?text=UserAvatar"
  },
  methods: {
    registerUser: () => {
      alert("Registering!");
    },
    loginUser: () => {
      alert("Logging In!");
    }
  }
})
