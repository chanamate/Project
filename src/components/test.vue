<template>
  <div id="container-register">
    <div id="title">
      <h1>Register</h1>
    </div>

    <v-form>
      <v-col cols="8" class="mx-16">
        <v-text-field
          clearable
          variant="solo"
          label="email"
          type="email"
          hide-details="auto"
          bg-color="#dde2eb"
          v-model="email"
          autocomplete="off"
          required
          :rules="[required]"
        ></v-text-field
      ></v-col>

      <v-col cols="8" class="mx-16">
        <v-text-field
          clearable
          variant="solo"
          label="password"
          type="password"
          hide-details="auto"
          bg-color="#dde2eb"
          v-model="password"
          autocomplete="off"
          :rules="[required]"
        ></v-text-field
      ></v-col>
      <!-- <div class="input">
        <input
          id="email"
          placeholder="Email"
          type="email"
          required
          class="validate"
          autocomplete="off"
          v-model="Aemail"
        />
      </div> -->

      <!-- <div class="clearfix"></div>

      <div class="clearfix"></div> -->

      <!-- <div class="input">
        <input
          id="password"
          placeholder="Password"
          type="password"
          required
          class="validate"
          autocomplete="off"
          v-model="password"
        />
      </div> -->

      <input type="submit" value="Register" @click="submit" />
    </v-form>
    <div class="register">
      Do you already have an account?
      <a href="/Login"><button id="register-link">Log In here</button></a>
    </div>
  </div>
</template>

<script>
import axiosInstance from "../utils/axios.instance";

export default {
  name: "test",

  data: () => ({
    email: "",
    password: "",
  }),

  methods: {
    async submit() {
      console.log("email", this.email);
      const regis = await axiosInstance.post("/auth/register", {
        email: this.email,
        password: this.password,
      });
    },
    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: "Raleway", sans-serif;
  color: #f2f2f2;
  background-color: #dde2eb;
}

h1 {
  color: #f2f2f2;
}

#container-register {
  background-color: #1d1f20;
  position: relative;
  top: 20%;
  margin: auto;
  width: 390px;
  height: 480px;
  border-radius: 0.35em;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
}

#title {
  position: relative;
  background-color: #1a1c1d;
  width: 100%;
  padding: 20px 0px;
  border-radius: 0.35em;
  font-size: 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.lock {
  position: relative;
  top: 2px;
}

.input {
  margin: auto;
  width: 240px;
  border-radius: 4px;
  background-color: #dde2eb;
  padding: 8px 0px;
  margin-top: 15px;
}

input[type="checkbox"] {
  cursor: pointer;
}

input[type="text"] {
  color: #949494;
  margin: 0;
  background-color: #dde2eb;
  border: 1px solid #dde2eb;
  padding: 6px 0px;
  border-radius: 3px;
}

input[type="text"]:focus {
  border: 1px solid #373b3d;
}

input[type="password"] {
  color: #949494;
  margin: 0;
  background-color: #dde2eb;
  border: 1px solid #dde2eb;
  padding: 6px 0px;
  border-radius: 3px;
}

input[type="password"]:focus {
  border: 1px solid#dde2eb;
}

input[type="email"] {
  color: #949494;
  margin: 0;
  background-color: #dde2eb;
  border: 1px solid #dde2eb;
  padding: 6px 0px;
  border-radius: 3px;
}

input[type="email"]:focus {
  border: 1px solid #373b3d;
}

*:focus {
  outline: none;
}

input[type="submit"] {
  padding: 6px 25px;
  background: #373e4a;
  color: #c1c3c6;
  font-weight: bold;
  border: 0 none;
  cursor: pointer;
  border-radius: 3px;
  margin-top: 15px;
}

.register {
  margin: auto;
  padding: 16px 0;
  text-align: center;
  margin-top: 20px;
  width: 85%;
  border-top: 1px solid #c1c3c6;
  color: #f2f2f2;
}

.clearfix {
  clear: both;
}

#register-link {
  margin-top: 5px;
  padding: 6px 25px;
  background: #373e4a;
  color: #c1c3c6;
  font-weight: bold;
  border: 0 none;
  cursor: pointer;
  border-radius: 3px;
}
</style>
