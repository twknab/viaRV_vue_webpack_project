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
      this.errors = this.validateRegistration(this);

      // if validation passes:
      if (this.errors.length === 0) {

        // capture new user details:
        let newUser = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          phoneNumber: this.phoneNumber,
        };

        // reset values to null after form submission:
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.password = null;
        this.phoneNumber = null;

        // emit to global function and send new User to update global scope:
        this.$emit('register-user', newUser);
      }
    },
    validateRegistration(user) {
      // create array to store errors:
      let errors = [];
      // first and last name required and at least 2 characters:
      if (!user.firstName || !user.lastName) {
        errors.push("First and last name are both required.");
      } else if (user.firstName.length < 2 || user.lastName.length < 2) {
        errors.push("First and last name must be at least 2 characters.");
      }
      // email and password required, password at least 6 characters:
      if (!user.email || !user.password) {
        errors.push("Email and password are both required.");
      } else if (user.password.length < 6) {
        errors.push("Password must be at least 6 characters.");
      } else if (user.email.length < 5) {
        errors.push("Email must be at least 5 characters.");
      }
      // phone number required, at least 10 characters:
      if (!user.phoneNumber) {
        errors.push("Phone number is required.");
      } else if (user.phoneNumber.length < 10) {
        errors.push("Phone number must be at least 10 characters");
      }
      return errors;
    }
  }
});

// User Login Component:
Vue.component('login', {
  template: `
    <div>
      <h1>Login</h1>
      <fieldset>
        <form action="" @submit.prevent="loginUser">
          <p v-if="errors.length">
            <em>Please fix the following errors:</em>
            <ul>
              <li v-for="error in errors">{{ error  }}</li>
            </ul>
          </p>
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
      // begin validation:

      // empty errors array if any existing errors:
      this.errors = [];

      // validate submission (front-end validations only):
      this.errors = this.validateLogin(this);

      // If validation passes:
      if (this.errors.length === 0) {

        // capture user details to find:
        let findUser = {
          email: this.email,
          password: this.password,
        };

        // reset values to null after form submission:
        this.email = null;
        this.password = null;
  
        // emit login-user() and send findUser data to update global logged in user:
        this.$emit('login-user', findUser);
      }
    },
    validateLogin(user) {
      // create array to store errors:
      let errors = [];
      // email and password required, password at least 6 characters:
      if (!user.email || !user.password) {
        errors.push("Email and password are both required.");
      } else if (user.password.length < 6) {
        errors.push("Password must be at least 6 characters.");
      }
      return errors;
    }
  }
});

// User Profile Component:
Vue.component('profile', {
  props: {
    loggedInUser: {
      type: Object,
      required: true,
    }
  },
  template: `
    <div>
      <fieldset>
        {{ loggedInUser }}
        <legend>{{ loggedInUser.firstName }}'s Profile</legend>
        <form action="" @submit.prevent="updateUser">
          <p v-if="errors.length">
            <em>Please fix the following errors:</em>
            <ul>
              <li v-for="error in errors">{{ error  }}</li>
            </ul>
          </p>
          <img :src="loggedInUser.avatarImgUrl" alt="User Avatar">
          <br/>
          <input v-model="firstName" type="text" name="firstName" id="firstName" :placeholder="loggedInUser.firstName">
          <br/>
          <input v-model="lastName" type="text" name="lastName" id="lastName" :placeholder="loggedInUser.lastName">
          <br/>
          <input v-model="email" type="text" name="email" id="email" :placeholder="loggedInUser.email">
          <br/>
          <input v-model="phoneNumber" type="tel" name="phone" id="phone" :placeholder="loggedInUser.phoneNumber">
          <br/>
          <input v-model="avatarImgUrl" type="text" name="avatarImgUrl" id="avatarImgUrl" :placeholder="loggedInUser.avatarImgUrl">
          <br/>
          <input type="submit" value="Update">
        </form>
      </fieldset>
    </div>
  `,
  data() {
    return {
      firstName: this.loggedInUser.firstName,
      lastName: this.loggedInUser.lastName,
      email: this.loggedInUser.email,
      phoneNumber: this.loggedInUser.phoneNumber,
      avatarImgUrl: this.loggedInUser.avatarImgUrl,
      errors: [],
    };
  },
  methods: {
    updateUser() {
      // empty errors array if any existing errors:
      this.errors = [];

      // validate submission (front-end validations only):
      this.errors = this.updateUserValidation(this);

      // if validation passes:
      if (this.errors.length === 0) {
        let updatedUser = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          avatarImgUrl: this.avatarImgUrl
        };
        this.$emit('update-user', updatedUser);
      }
    },
    updateUserValidation(user) {
      let errors = [];
      // first and last name required and at least 2 characters:
      if (!user.firstName || !user.lastName) {
        errors.push("First and last name are both required.");
      } else if (user.firstName.length < 2 || user.lastName.length < 2) {
        errors.push("First and last name must be at least 2 characters.");
      }
      // email required and at least 5 characters:
      if (!user.email) {
        errors.push("Email is required.");
      } else if (user.email.length < 5) {
        errors.push("Email must be at least 5 characters.");
      }
      // phone number required, at least 10 characters:
      if (!user.phoneNumber) {
        errors.push("Phone number is required.");
      } else if (user.phoneNumber.length < 10) {
        errors.push("Phone number must be at least 10 characters");
      }
      return errors;
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
    loggedInUser: {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      avatarImgUrl: null,
    }
    // how do we get logged in user for the profile component?
  },
  methods: {
    registerNewUser(newUser) {
      console.log("Registering new user...", newUser);

      // push into array of global data containing new users
      this.registeredUsers.push(newUser);
      console.log(this.registeredUsers);

      // update logged in user:
      this.updateLoggedInUser(newUser);

      // redirect to profile

    },
    loginExistingUser(user) {
      console.log("Logging in existing user...", user);

      // update logged in user:
      this.updateLoggedInUser(user);

      // redirect to profile

    },
    updateUserProfile(updatedUser) {
      console.log("Updating user profile...", updatedUser);
      
      // update logged in user:
      this.updateLoggedInUser(updatedUser);

      // redirect to profile

    },
    updateLoggedInUser(user) {
      // update the global scope with new user:
      this.loggedInUser.firstName = user.firstName;
      this.loggedInUser.lastName = user.lastName;
      this.loggedInUser.email = user.email;
      this.loggedInUser.phoneNumber = user.phoneNumber;
      if (user.avatarImgUrl.length < 1) {
        // sets a default avatar image for new users
        this.loggedInUser.avatarImgUrl = "https://via.placeholder.com/150/000000/FFFFFF/?text=User Avatar";
      } else {
        // set avatar to user entered URL
        this.loggedInUser.avatarImgUrl = user.avatarImgUrl;
      }
    },
    logoutUser() {
      // Clear logged in user data:
      this.loggedInUser = {
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        avatarImgUrl: null,
      };
      
      // redirect to homepage
      // ?????
      console.log("Logging out user...");
    }
  }
});