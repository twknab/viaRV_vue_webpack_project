// User Registration Component
Vue.component('register', {
  template: `
    <div>
      <h1>Register</h1>
      <fieldset>
        <form action="" @submit.prevent="registerUser">
          <p v-if="errors.length">
            <em>Please fix the following errors:</em>
            <ul>
              <li v-for="error in errors">{{ error  }}</li>
            </ul>
          </p>
          <input v-model="firstName" type="text" name="firstName" id="firstName" placeholder="First Name">
          <br/>
          <input v-model="lastName" type="text" name="lastName" id="lastName" placeholder="Last Name">
          <br/>
          <input v-model="email" type="email" name="email" id="email" placeholder="Email">
          <br/>
          <input v-model="password" type="password" name="password" id="password" placeholder="Password">
          <br/>
          <input v-model="phoneNumber" type="tel" name="phoneNumber" id="phoneNumber" placeholder="Phone Number">
          <br/>
          <input type="submit" value="Register">
        </form>
      </fieldset>
    </div>
  `,
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      phoneNumber: null,
      errors: [],
    };
  },
  methods: {
    registerUser() {
      // begin validation:
      // empty errors array if any existing errors:
      this.errors = [];

      // validate submission (front-end validations only):
      // first and last name required and at least 2 characters:
      if (!this.firstName || !this.lastName) {
        this.errors.push("First and last name are both required.");
      } else if (this.firstName.length < 2 || this.lastName.length < 2) {
        this.errors.push("First and last name must be at least 2 characters.");
      }
      // email and password required, password at least 6 characters:
      if (!this.email || !this.password) {
        this.errors.push("Email and password are both required.");
      } else if (this.password.length < 6) {
        this.errors.push("Password must be at least 8 characters");
      }
      // phone number required, at least 10 characters:
      if (!this.phoneNumber) {
        this.errors.push("Phone number is required.");
      } else if (this.phoneNumber.length < 10) {
        this.errors.push("Phone number must be at least 10 characters");
      }
      // email must be unique:

      // if validation passes:
      else {
        console.log("-------");
        console.log(this);
        console.log("-------");
        // capture new user details:
        let newUser = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          phoneNumber: this.phoneNumber,
        };
        console.log(newUser);
        // reset values to null after form submission:
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.password = null;
        this.phoneNumber = null;
        // emit to global function and send new User:
        this.$emit('register-user', newUser);
      }
    },
  }
});

// User Login Component:
Vue.component('login', {
  template: `
    <div>
      <h1>Login</h1>
      <fieldset>
        <form action="" @submit.prevent="loginUser">
          <input v-model="email" type="email" name="email" id="login_email" placeholder="Email">
          <br/>
          <input v-model="password" type="password" name="password" id="login_password" placeholder="Password">
          <br/>
          <input type="submit" value="Login">
        </form>
      </fieldset>
    </div>
  `,
  data() {
    return {
      email: null,
      password: null,
      errors: [],
    };
  },
  methods: {
    loginUser() {
      // capture user details to find:
      let findUser = {
        email: this.email,
        password: this.password,
      };
      console.log(findUser);
      // reset values to null after form submission:
      this.email = null;
      this.password = null;

      // emit login-user() method globally and send findUser data object with it:
      this.$emit('login-user', findUser);
    }
  }
});

// User Profile Component:
Vue.component('profile', {
  template: `
    <div>
      <fieldset>
        <legend>{{ firstName }}'s Profile</legend>
        <form action="" @submit.prevent="updateUser">
          <img v-bind:src="avatarImgUrl" alt="User Avatar">
          <br/>
          <input v-model="firstName" type="text" name="firstName" id="firstName">
          <br/>
          <input v-model="lastName" type="text" name="lastName" id="lastName">
          <br/>
          <input v-model="email" type="text" name="email" id="email">
          <br/>
          <input v-model="phoneNumber" type="tel" name="phone" id="phone">
          <br/>
          <input v-model="avatarImgUrl" type="text" name="avatarImgUrl" id="avatarImgUrl">
          <br/>
          <input type="submit" value="Update">
        </form>
      </fieldset>
    </div>
  `,
  data() {
    return {
      firstName: "Tim",
      lastName: "Knab",
      email: "tim@knab.com",
      phoneNumber: "2062711443",
      avatarImgUrl: "https://via.placeholder.com/150/000000/FFFFFF/?text=UserAvatar",
      errors: [],
    };
  },
  methods: {
    updateUser() {
      let updatedUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        avatarImgUrl: this.avatarImgUrl
      };
      this.$emit('update-user', updatedUser);
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
    // how do we get logged in user for the profile component?
  },
  methods: {
    registerNewUser(newUser) {
      console.log("Registering new user...", newUser);
      // note: could front-end validate here
      // push into array of global data containing new users
      this.registeredUsers.push(newUser);
      console.log(this.registeredUsers);
      // send our new user to the backend for validation and creation, and wait for a response
      // redirect to profile
    },
    loginExistingUser(user) {
      console.log("Logging in existing user...", user);
      // lookup existing user (we have no db so fake this)
      // or use a queue of registered users in an array to search within
      // if user is found store user data
      // redirect to profile if authenticated, else back home
    },
    updateUserProfile(updatedUser) {
      console.log("Updating user profile...", updatedUser);
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