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
    <div class="mt-6">
      <label class="text-sm">Gender</label>
      <div class="mt-2">
        <vs-radio v-model="gender" vs-value="male" class="mr-4">Male</vs-radio>
        <vs-radio v-model="gender" vs-value="female" class="mr-4">Female</vs-radio>
      </div>
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

    <vx-input-group class="w-full">
      <vs-input
        v-validate="'required|min:3'"
        data-vv-validate-on="blur"
        name="userID"
        type="text"
        label-placeholder="UserID"
        placeholder="UserID"
        v-model="userID"
      />

      <template slot="append">
        <div class="append-text btn-addon check-btn">
          <vs-button class="text-white shadow" color="primary">
            <feather-icon
              icon="CheckCircleIcon"
              class="bg-primary text-white"
              svgClasses="h-6 w-6"
            ></feather-icon
          ></vs-button>
        </div>
      </template>
    </vx-input-group>
    <span class="text-danger text-sm">{{ errors.first("userID") }}</span>

    <v-select
      data-vv-validate-on="blur"
      v-validate="'required'"
      name="organization"
      label-placeholder="Organization"
      placeholder="Organization"
      v-model="organization"
      class="w-full mt-6"
      :options="['President', 'Officer', 'Engineer']"
    />
    <span class="text-danger text-sm">{{ errors.first("organization") }}</span>

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
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.displayName !== "" &&
        this.userID !== "" &&
        this.dob !== "" &&
        this.organization !== "" &&
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
    checkAvailableID() {
      console.log("check available userID");
    },
    registerUserJWt() {
      // If form is not validated or user is already login return
      if (!this.validateForm || !this.checkLogin()) return;

      const payload = {
        userDetails: {
          displayName: this.displayName,
          userID: this.userID,
          dob: this.dob,
          organization: this.organization,
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
.check-btn {
  padding-top: 17px;
}
</style>
