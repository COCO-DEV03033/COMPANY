<template>
  <div id="user-edit-tab-info">
    <!-- Avatar Row -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="flex items-start flex-col sm:flex-row">
          <img
            :src="
              data_local.avatar
                ? data_local.avatar
                : require('@/assets/images/avatar.png')
            "
            class="mr-8 rounded border h-24 w-24 avatar_image"
          />
          <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
          <div>
            <p class="text-lg font-medium mb-2 mt-4 sm:mt-0">{{ data_local.name }}</p>
            <input
              type="file"
              class="hidden"
              ref="update_avatar_input"
              @change="update_avatar"
              accept="image/*"
            />

            <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
            <!-- <vs-button class="mr-4 mb-4">Change Avatar</vs-button> -->
            <vs-button
              type="border"
              class="mr-4"
              @click="$refs.update_avatar_input.click()"
              >Change Avatar</vs-button
            >

            <vs-button type="border" @click="removeAvatar" color="danger"
              >Remove Avatar</vs-button
            >
            <p class="text-sm mt-2">Allowed JPG, GIF or PNG. Max size of 800kB</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Row -->
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">
        <vs-input
          class="w-full mt-4"
          label="UserID"
          v-model="data_local.userID"
          v-validate="'required'"
          name="username"
          disabled
        />
        <span class="text-danger text-sm" v-show="errors.has('username')">{{
          errors.first("username")
        }}</span>

        <vs-input
          class="w-full mt-4"
          label="Name"
          v-model="data_local.name"
          v-validate="'required'"
          name="name"
        />
        <span class="text-danger text-sm" v-show="errors.has('name')">{{
          errors.first("name")
        }}</span>

        <div class="mt-4">
          <label class="vs-input--label">Role</label>
          <v-select
            v-model="role_local"
            :clearable="false"
            :options="roleOptions"
            v-validate="'required'"
            name="role"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
          <span class="text-danger text-sm" v-show="errors.has('role')">{{
            errors.first("role")
          }}</span>
        </div>
      </div>

      <div class="vx-col md:w-1/2 w-full">
        <div class="mt-4">
          <label class="vs-input--label">Company</label>
          <v-select
            v-model="data_local.organization"
            :clearable="false"
            :options="companyOptions"
            v-validate="'required'"
            name="organization"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
          <span class="text-danger text-sm" v-show="errors.has('organization')">{{
            errors.first("organization")
          }}</span>
        </div>

        <div class="mt-4">
          <label class="vs-input--label">Department</label>
          <v-select
            v-model="data_local.department"
            :clearable="false"
            :options="departOptions"
            v-validate="'required'"
            name="department"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
          <span class="text-danger text-sm" v-show="errors.has('department')">{{
            errors.first("department")
          }}</span>
        </div>

        <div class="mt-4">
          <label class="vs-input--label">Team</label>
          <v-select
            v-model="data_local.team"
            :clearable="false"
            :options="teamOptions"
            v-validate="'required'"
            name="team"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
          <span class="text-danger text-sm" v-show="errors.has('team')">{{
            errors.first("team")
          }}</span>
        </div>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm"
            >Save Changes</vs-button
          >
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data"
            >Reset</vs-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";

export default {
  components: {
    vSelect,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      data_local: JSON.parse(JSON.stringify(this.userData)),

      departOptions: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
        { label: "7", value: "7" },
        { label: "8", value: "8" },
        { label: "9", value: "9" },
        { label: "10", value: "10" }
      ],
      roleOptions: [
        { label: "SuperAdmin", value: "superadmin" },
        { label: "president", value: "president" },
        { label: "Officer", value: "officer" },
        { label: "Researcher", value: "researcher" },
        { label: "Engineer", value: "engineer" },
      ],
      companyOptions: [
        { label: "7*9", value: "7*9" },
        { label: "3*9", value: "3*9" },
        { label: "5*4", value: "5*4" },
        { label: "8*2", value: "8*2" },
        { label: "AI", value: "ai" },
        { label: "Net", value: "net" },
      ],
      teamOptions: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
        { label: "7", value: "7" },
        { label: "8", value: "8" },
        { label: "9", value: "9" },
      ],
    };
  },
  computed: {
    status_local: {
      get() {
        const val = this.data_local.status === true ? "Approved" : "Pending";
        return { label: this.capitalize(val), value: val };
      },
      set(obj) {
        this.data_local.status = obj.value;
      },
    },
    role_local: {
      get() {
        return {
          label: this.capitalize(this.data_local.role),
          value: this.data_local.role,
        };
      },
      set(obj) {
        this.data_local.role = obj.value;
      },
    },
    validateForm() {
      return !this.errors.any();
    },
  },
  methods: {
    capitalize(str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
    },
    save_changes() {
      /* eslint-disable */
      if (!this.validateForm) return;

      let avatarName = "";
      const payload = {
        userDetails: {
          name: this.data_local.name,
          userID: this.data_local.userID,
          dob: this.data_local.dob,
          organization: this.data_local.organization,
          department: this.data_local.department,
          team: this.data_local.team,
          gender: this.data_local.gender,
          department: this.data_local.department,
          role: this.data_local.role,
        },
        file: this.data_local.avatar,
      };

      // sending file to the backendthis.$store
      this.$store
        .dispatch("userManagement/updateUser", payload)
        .then((res) => {
          this.$router.push({ name: "Engineer List" });
        })
        .catch((err) => {
          this.$vs.notify({
            color: "danger",
            title: "User Upload Failed!",
            text: res.message,
          });
          console.error(err);
        });

      // Here will go your API call for updating data
      // You can get data in "this.data_local"

      /* eslint-enable */
    },
    reset_data() {
      this.data_local = JSON.parse(JSON.stringify(this.data));
    },
    update_avatar(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
      // You can update avatar Here
      // For reference you can check dataList example
      // We haven't integrated it here, because data isn't saved in DB
    },
    createImage(file) {
      let reader = new FileReader();
      let vm = this;
      this.data_local.avatar = file;
      reader.onload = (e) => {
        document.getElementsByClassName("avatar_image")[0].src = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeAvatar() {
      document.getElementsByClassName(
        "avatar_image"
      )[0].src = require("@/assets/images/avatar.png");
    },
  },
};
</script>
