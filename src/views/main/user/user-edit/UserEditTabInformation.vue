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

          <vs-input class="w-full mt-4" label="Address" v-model="data_local.mobile" v-validate="{regex: '^\\+?([0-9]+)$' }" name="mobile" />
          <span class="text-danger text-sm"  v-show="errors.has('mobile')">{{ errors.first('mobile') }}</span>

          <vs-input class="w-full mt-4" label="Old Job" v-model="data_local.website" v-validate="'url:require_protocol'" name="website" data-vv-as="field" />
          <span class="text-danger text-sm"  v-show="errors.has('website')">{{ errors.first('website') }}</span>

          <div class="mt-4">
            <label class="text-sm">University</label>
            <v-select v-model="data_local.languages_known" multiple :closeOnSelect="false" v-validate="'required'" name="lang_known" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            <span class="text-danger text-sm"  v-show="errors.has('lang_known')">{{ errors.first('lang_known') }}</span>
          </div>

          <div class="mt-4">
            <label class="text-sm">Enter Date</label>
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

          <!-- <div class="mt-6">
            <label>Contact Options</label>
            <div class="flex flex-wrap mt-1">
            <vs-checkbox v-model="data_local.contact_options" vs-value="email" class="mr-4 mb-2">Email</vs-checkbox>
            <vs-checkbox v-model="data_local.contact_options" vs-value="message" class="mr-4 mb-2">Message</vs-checkbox>
            <vs-checkbox v-model="data_local.contact_options" vs-value="Phone" class=" mb-2">Phone</vs-checkbox>
            </div>
          </div> -->

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
            <div class="mt-4">
              <label class="text-sm">Main Skill</label>
              <v-select v-model="data_local.languages_known" :options="langOptions" multiple :closeOnSelect="false" v-validate="'required'" name="lang_known" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
              <span class="text-danger text-sm"  v-show="errors.has('lang_known')">{{ errors.first('lang_known') }}</span>
            </div>

            <vs-input class="w-full mt-4" label="Technology License" v-model="data_local.location" />

            <div class="mt-4">
              <label class="text-sm">Language</label>
              <v-select v-model="data_local.languages_known" :options="langOptions" multiple :closeOnSelect="false" v-validate="'required'" name="lang_known" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
              <span class="text-danger text-sm"  v-show="errors.has('lang_known')">{{ errors.first('lang_known') }}</span>
            </div>

            <vs-input class="w-full mt-4" label="Special" v-model="data_local.location" v-validate="'required|alpha'" name="city" />
            <span class="text-danger text-sm"  v-show="errors.has('city')">{{ errors.first('city') }}</span>

            
          </div>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Save Changes</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reset</vs-button>
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

      langOptions: [
        { label: 'English',  value: 'english'  },
        { label: 'Spanish',  value: 'spanish'  },
        { label: 'French',   value: 'french'   },
        { label: 'Russian',  value: 'russian'  },
        { label: 'German',   value: 'german'   },
        { label: 'Arabic',   value: 'arabic'   },
        { label: 'Sanskrit', value: 'sanskrit' }
      ],
      langOptions: [
        { label: 'Web developement',  value: 'web development'  },
        { label: 'Mobile development',  value: 'mobile development'  },
        { label: '3D Design',   value: '3D design'   },
        { label: 'Data entry',  value: 'data entry'  },
        { label: 'Civil Engineering',   value: 'civil engineering'   }
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

      const payload = {
        userDetails: {
          dob: this.data_local.dob,
          gender: this.data_local.gender,
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
    },
    reset_data () {
      this.data_local = Object.assign({}, this.data)
    }
  }
}
</script>
