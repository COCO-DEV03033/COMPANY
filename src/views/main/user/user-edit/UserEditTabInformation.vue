<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-edit-tab-info">
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/2">

        <!-- Col Header -->
        <div class="flex items-end">
          <feather-icon icon="FileTextIcon" class="mr-2" svgClasses="w-5 h-5" />
          <span class="leading-none font-medium">Personal Information</span>
        </div>

        <!-- Col Content -->
        <div>          
          <!-- DOB -->
          <div class="mt-4">
            <label class="text-sm">Birth Date</label>
            <flat-pickr v-model="data_local.dob" :config="{ dateFormat: 'd F Y', maxDate: new Date() }" class="w-full" v-validate="'required'" name="dob" />
            <span class="text-danger text-sm"  v-show="errors.has('dob')">{{ errors.first('dob') }}</span>
          </div>
          <!-- Gender -->
          <div class="mt-4">
            <label class="text-sm">Gender</label>
            <div class="mt-2">
              <vs-radio v-model="data_local.gender" vs-value="male" class="mr-4">Male</vs-radio>
              <vs-radio v-model="data_local.gender" vs-value="female" class="mr-4">Female</vs-radio>
            </div>
          </div>
           <!-- Address -->
          <vs-input
            class="w-full mt-4"
            label="Current Address"
            v-model="data_local.current_address"
            v-validate="'required'"
            name="address"
            default=""
          />
           <!-- University -->
          <vs-input
            class="w-full mt-4"
            label="University"
            v-model="data_local.university"
            v-validate="'required'"
            name="university"            
          /> 
          <span class="text-danger text-sm" v-show="errors.has('university')">{{
          errors.first("university")
        }}</span>
           <!-- Old job -->
          <vs-input
            class="w-full mt-4"
            label="Old Job"
            v-model="data_local.old_job"
            v-validate="'required'"
            name="old_job"
            default=""
          />
          <!-- Enter Date -->
          <div class="mt-4">
            <label class="text-sm">Enter Date</label>
            <flat-pickr v-model="data_local.enter_date" :config="{ dateFormat: 'd F Y', maxDate: new Date() }" class="w-full" v-validate="'required'" name="dob" />
            <span class="text-danger text-sm"  v-show="errors.has('dob')">{{ errors.first('dob') }}</span>
          </div>

          

        </div>
      </div>

      <!-- Address Col -->
      <div class="vx-col w-full md:w-1/2">

          <!-- Col Header -->
          <div class="flex items-end md:mt-0 mt-base">
            <feather-icon icon="BriefcaseIcon" class="mr-2" svgClasses="w-5 h-5" />
            <span class="leading-none font-medium">Ability</span>
          </div>

          <!-- Col Content -->
          <div>
          <vs-input
            class="w-full mt-4"
            label="Major Subject"
            v-model="data_local.major_subject"
            v-validate="'required'"
            name="major_subject"
            default=""
          />
          <div class="mt-4">
            <label class="text-sm">Technical Field</label>
            <v-select  v-model="data_local.main_skill" :options="stackOptions"  v-validate="'required'" name="main_skill" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            <span class="text-danger text-sm"  v-show="errors.has('main_skill')">{{ errors.first('main_skill') }}</span>
          </div>

          <vs-input class="w-full mt-4" label="Technology License" v-model="data_local.tech_field" />
          <div class="mt-3 w-full">
            <label for="item-skills" class="vs-input--label">Required Skills</label>
            <v-select id="item-skills" multiple v-model="data_local.lang_level" :options="langOptions" :closeOnSelect="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
          </div>
          <!-- <vs-select v-model="data_local.lang_level" multiple :closeOnSelect="false" v-validate="'required'" label="Language" class="mt-3 w-full" name="lang_level">
            <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in langOptions" />
          </vs-select>           -->
          
          <vs-input
            class="w-full mt-4"
            label="Major Subject"
            v-model="data_local.special"
            v-validate="'required'"
            name="major_subject"
            default=""
          />

            
          </div>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Save Changes</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reset</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="danger" @click="cancel_edit">Cancel</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,
    flatPickr
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      data_local: JSON.parse(JSON.stringify(this.data)),       
      langOptions: ['English', 'Spanish', 'French', 'Russian', 'German', 'Arabic', 'Sanskrit'],
      stackOptions: ['Web developement', 'Mobile development', '3D Design', 'Data Science', 'Civil Engineering'],
      chips: [
        'Dribbble',
        'GitHub',
        'Behance',
        'Vuejs',
        'Vuexy'
      ]
      
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any()
    }
  },
  methods: {
    save_changes() {
      /* eslint-disable */
      if (!this.validateForm) return;

      const payload = this.data_local;
      console.log("localData:", payload);
      // sending file to the backendthis.$store
      this.$store
        .dispatch("userManagement/updateUser", payload)
        .then((res) => {
          this.$router.push({ name: "engineer-view" });
        })
        .catch((err) => {
          this.$vs.notify({
            color: "danger",
            title: "User Upload Failed!",
            text: res.message,
          });
          console.error(err);
        });
    },
    reset_data () {
      this.data_local = Object.assign({}, this.data)
    },
    cancel_edit (){
      this.$router.push({name: "engineer-view"});

    }  
  }
}
</script>
