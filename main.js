// User Registration Component
Vue.component('register', {
  template: `
    <div>
      <h1>Register</h1>
      <fieldset>
        <form action="">
          <input type="text" name="firstName" id="firstName" placeholder="First Name">
          <br/>
          <input type="text" name="lastName" id="lastName" placeholder="Last Name">
          <br/>
          <input type="email" name="email" id="email" placeholder="Email">
          <br/>
          <input type="password" name="password" id="password" placeholder="Password">
          <br/>
          <input type="tel" name="PhoneNumber" id="PhoneNumber" placeholder="Phone Number">
          <br/>
          <input type="button" value="Register" @click="registerUser">
        </form>
      </fieldset>
    </div>
  `,
  data() {
    return {};
  },
  methods: {
    registerUser() {
      this.$emit('register-user');
    },
  }
});

// User Login Component:
Vue.component('login', {
  template: `
    <div>
      <h1>Login</h1>
      <fieldset>
        <form action="">
          <input type="email" name="email" id="login_email" placeholder="Email">
          <br/>
          <input type="password" name="password" id="login_password" placeholder="Password">
          <br/>
          <input type="button" value="Login" @click="loginUser">
        </form>
      </fieldset>
    </div>
  `,
  data() {
    return {};
  },
  methods: {
    loginUser() {
      this.$emit('login-user');
    }
  }
});

// User Profile Component:
Vue.component('profile', {
  template: `
    <div>
      <fieldset>
        <legend>{{ firstName }}'s Profile</legend>
        <form>
          <img v-bind:src="avatarImgUrl" alt="User Avatar">
          <br/>
          <input type="text" name="firstName" id="firstName" :placeholder="firstName">
          <br/>
          <input type="text" name="lastName" id="lastName" :placeholder="lastName">
          <br/>
          <input type="text" name="email" id="email" :placeholder="email">
          <br/>
          <input type="tel" name="phone" id="phone" :placeholder="phone">
          <br/>
          <input type="text" name="avatarImgUrl" id="avatarImgUrl" :placeholder="avatarImgUrl">
          <br/>
          <input type="button" value="Update" @click="updateUser">
        </form>
      </fieldset>
    </div>
  `,
  data() {
    return {
      firstName: "Tim",
      lastName: "Knab",
      email: "tim@knab.com",
      phone: "2062711443",
      avatarImgUrl: "https://via.placeholder.com/150/000000/FFFFFF/?text=UserAvatar"
    };
  },
  methods: {
    updateUser() {
      this.$emit('update-user');
    },
    logout() {
      this.$emit('logout-user');
    }
  }
});

// Logout Component
Vue.component('logout', {
  template: `
    <div>
      <button @click="logout">Logout</button>
    </div>
  `,
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$emit('logout-user');
    }
  }
});

// Invoke Vue Application
let app = new Vue({
  el: '#app',
  data: {
    registeredUsers: [],
    loggedinUser: {}
  },
  methods: {
    registerNewUser() {
      console.log("Registering new user...");
      // register new user and save data
      // redirect to profile
    },
    loginExistingUser() {
      console.log("Logging in existing user...");
      // lookup existing user (we have no db so fake this)
      // or use a queue of registered users in an array to search within
      // if user is found store user data
      // redirect to profile if authenticated, else back home
    },
    updateUserProfile() {
      console.log("Updating user profile...");
      // update logged in user data
      // redirect to profile
    },
    logoutUser() {
      console.log("Logging out user...");
      // remove logged in user from data
      // redirect to homepage
    }
  }
});