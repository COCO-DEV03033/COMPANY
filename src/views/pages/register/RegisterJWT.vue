<template>
  <div class="clearfix">
    <vs-input
      v-validate="'required|min:2'"
      data-vv-validate-on="blur"
      label-placeholder="Name"
      name="name"
      placeholder="Name"
      v-model="displayName"
      class="w-full"
    />
    <span class="text-danger text-sm">{{ errors.first("name") }}</span>

    <div class="mt-6">
      <flat-pickr
        v-validate="'required'"
        v-model="dob"
        name="birthday"
        label-placeholder="Birthday"
        placeholder="Birthday"
        :config="{ dateFormat: 'd F Y' }"
        class="w-full"
      />
      <span class="text-danger text-sm">{{ errors.first("birthday") }}</span>
    </div>

    <!-- <vs-input
      v-validate="'required|min:3'"
      data-vv-validate-on="blur"
      name="userID"
      type="text"
      label-placeholder="UserID"
      placeholder="UserID"
      v-model="userID"
      class="w-full mt-6"
    /> -->

    <vx-input-group class="w-full mt-3">
      <vs-input
        v-validate="'required|min:3'"
        data-vv-validate-on="blur"
        name="userID"
        type="text"
        label-placeholder="UserID"
        placeholder="UserID"
        v-model="userID"
        @input="
          (userIDValid = false),
            (userIDMessage = 'Please check your userID\'s available!')
        "
      />

      <template slot="append">
        <div class="append-text btn-addon check-btn">
          <vs-button class="text-white shadow" @click="checkAvailableID" color="primary">
            <feather-icon
              icon="CheckCircleIcon"
              class="bg-primary text-white"
              svgClasses="h-6 w-6"
            ></feather-icon
          ></vs-button>
        </div>
      </template>
    </vx-input-group>
    <span v-if="!userIDValid" class="text-danger text-sm">{{ userIDMessage }}<br /></span>
    <span class="text-danger text-sm">{{ errors.first("userID") }}</span>

    <div class="mt-6">
      <label class="text-sm">Gender</label>
      <div class="mt-2">
        <vs-radio v-model="gender" vs-value="male" class="mr-4">Male</vs-radio>
        <vs-radio v-model="gender" vs-value="female" class="mr-4">Female</vs-radio>
      </div>
    </div>

    <v-select
      data-vv-validate-on="blur"
      v-validate="'required'"
      name="organization"
      label-placeholder="Organization"
      placeholder="Organization"
      v-model="organization"
      class="w-1/3 mt-6 float-left mr-3 select"
      v-on:change="selectValidate"
      :options="['7*9', '3*9', '8*2', '5*4', 'A*', 'Net*']"
    />

    <v-select
      data-vv-validate-on="blur"
      v-validate="'required'"
      name="team"
      label-placeholder="Team"
      placeholder="Team"
      v-model="team"
      class="w-1/4 float-right mt-6 ml-3 select"
      v-on:change="selectValidate"
      :options="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']"
    />
    <span class="text-danger text-sm">{{ errors.first("team") }}</span>

    <v-select
      data-vv-validate-on="blur"
      v-validate="'required'"
      name="department"
      label-placeholder="Department"
      placeholder="Department"
      v-model="department"
      class="w-full mt-6 select"
      v-on:change="selectValidate"
      :options="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']"
    />
    <span v-if="organValidate == false" class="text-danger text-sm">Please pick your organization correctly.</span>

    <vs-input
      ref="password"
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6|max:10'"
      name="password"
      label-placeholder="Password"
      placeholder="Password"
      v-model="password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first("password") }}</span>

    <vs-input
      type="password"
      v-validate="'min:6|max:10|confirmed:password'"
      data-vv-validate-on="blur"
      data-vv-as="password"
      name="confirm_password"
      label-placeholder="Confirm Password"
      placeholder="Confirm Password"
      v-model="confirm_password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first("confirm_password") }}</span>

    <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6"
      >I accept the terms & conditions.</vs-checkbox
    >
    <vs-button type="border" to="/login" class="mt-6">Login</vs-button>
    <vs-button class="float-right mt-6" @click="registerUserJWt" :disabled="!validateForm"
      >Register</vs-button
    >
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import vSelect from "vue-select";
import "flatpickr/dist/flatpickr.css";

export default {
  components: {
    flatPickr,
    "v-select": vSelect,
  },
  data() {
    return {
      displayName: "",
      userID: "",
      password: "",
      gender: "male",
      confirm_password: "",
      isTermsConditionAccepted: true,
      dob: "",
      organization: "",
      department: "",
      team: "",
      userIDValid: true,
      userIDMessage: "",
      organValidate: true
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.displayName !== "" &&
        this.userID !== "" &&
        this.dob !== "" &&
        // this.organization !== "" &&
        // this.department !== "" &&
        // this.team !== "" &&
        this.gender !== "" &&
        this.password !== "" &&
        this.confirm_password !== "" &&
        this.userIDValid &&
        this.isTermsConditionAccepted === true
      );
    },
  },
  methods: {
    selectValidate() {
      console.log(this.organization == '' || this.department == '' || this.team == '')
      if (this.organization == '' || this.department == '' || this.team == '') {
        this.organValidate = false
      }
    },
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: "Login Attempt",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning",
        });

        return false;
      }
      return true;
    },
    async checkAvailableID() {
      if (this.userID == "") {
        this.$vs.notify({
          title: "Warning",
          text: "Please input one userID",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning",
        });
        return;
      }
      let result = await this.$store.dispatch("auth/checkuserID", {
        userID: this.userID,
        valid: this.userIDValid,
      });
      this.userIDValid = result;
      if (!result) {
        this.userIDMessage = "UserID is already in use. Please pick something else!";
      }
    },
    async registerUserJWt() {
      // If form is not validated or user is already login return
      console.log(this.organization == '' || this.department == '' || this.team == '', this.organValidate)
      if (this.organization == '' || this.department == '' || this.team == '') {
        this.organValidate = false
        return
      }
      else this.organValidate = true
      if (!this.validateForm || !this.checkLogin()) return;

      const payload = {
        userDetails: {
          displayName: this.displayName,
          userID: this.userID,
          dob: this.dob,
          organization: this.organization,
          department: this.department,
          team: this.team,
          gender: this.gender,
          password: this.password,
          confirmPassword: this.confirm_password,
        },
        notify: this.$vs.notify,
      };

      await this.$store.dispatch("auth/registerUserJWT", payload);
    },
  },
  beforeCreate() {
    if (this.$store.state.auth.isUserLoggedIn()) this.$router.go(-1);
    //  User Reward Card
  },
};
</script>

<style scope>
.clearfix {
  margin-top: 2rem;
  margin-bottom: 4rem;
}
.check-btn {
  padding-top: 17px;
}
.select {
  cursor: pointer;
}
</style>
