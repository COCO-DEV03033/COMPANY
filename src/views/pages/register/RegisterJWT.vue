<template>
  <div class="clearfix">
    <vs-input
      v-validate="'required|alpha_dash|min:3'"
      data-vv-validate-on="blur"
      label-placeholder="Name"
      name="displayName"
      placeholder="Name"
      v-model="displayName"
      class="w-full"
    />
    <span class="text-danger text-sm">{{ errors.first("displayName") }}</span>

    <div class="mt-8">
      <flat-pickr
        v-model="dob"
        label-placeholder="Birth Date"
        placeholder="Birth Date"
        :config="{ dateFormat: 'd F Y' }"
        class="w-full"
      />
    </div>
    <div class="mt-8 mb-base">
      <label class="text-sm">Gender</label>
      <div class="mt-2">
        <vs-radio v-model="gender" vs-value="male" class="mr-4">Male</vs-radio>
        <vs-radio v-model="gender" vs-value="female" class="mr-4">Female</vs-radio>
      </div>
    </div>

    <vs-input
      v-validate="'required|min:3'"
      data-vv-validate-on="blur"
      name="userID"
      type="userID"
      label-placeholder="UserID"
      placeholder="UserID"
      v-model="userID"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first("userID") }}</span>

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
import "flatpickr/dist/flatpickr.css";

export default {
  components: {
    flatPickr,
  },
  data() {
    return {
      displayName: "",
      userID: "",
      password: "",
      gender: 'male',
      confirm_password: "",
      isTermsConditionAccepted: true,
      dob: null,
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.displayName !== "" &&
        this.userID !== "" &&
        this.dob !== "" &&
        this.gender !== "" &&
        this.password !== "" &&
        this.confirm_password !== "" &&
        this.isTermsConditionAccepted === true
      );
    },
  },
  methods: {
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
    registerUserJWt() {
      // If form is not validated or user is already login return
      if (!this.validateForm || !this.checkLogin()) return;

      const payload = {
        userDetails: {
          displayName: this.displayName,
          userID: this.userID,
          dob: this.dob,
          gender: this.gender,
          password: this.password,
          confirmPassword: this.confirm_password,
        },
        notify: this.$vs.notify,
      };
      this.$store.dispatch("auth/registerUserJWT", payload);
    },
  },
};
</script>

<style scope>
.clearfix {
  margin-top: 2rem;
  margin-bottom: 4rem;
}
</style>
