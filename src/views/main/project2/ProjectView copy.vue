<template>
  <div id="page-user-view">

    <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
      <span>User record with id: {{ $route.params.userId }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'Project List'}" class="text-inherit underline">All Users</router-link>
      </span>
    </vs-alert>

    <div id="user-data" v-if="user_data">

      <vx-card title="Account" class="mb-base">

        <!-- Avatar -->
        <div class="vx-row">

          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="user_data.avatar" class="rounded w-full" />
            </div>
          </div>

          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Username</td>
                <td>{{ user_data.username }}</td>
              </tr>
              <tr>
                <td class="font-semibold">DOB</td>
                <td>{{ user_data.dob }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Company</td>
                <td>{{ user_data.company }}</td>
              </tr>
              <tr>
                  <td class="font-semibold">Group</td>
                  <td>{{ user_data.group }}</td>
                </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Major</td>
                <td>{{ user_data.major }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Plan</td>
                <td>{{ user_data.plan }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Income</td>
                <td>{{ user_data.income }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 2 -->
          <!-- <div class="vx-col w-full flex" id="account-manage-buttons">
            <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'app-user-edit', params: { userId: $route.params.userId }}">Edit</vs-button>
            <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Delete</vs-button>
          </div> -->

        </div>

      </vx-card>

      <div class="vx-row">
        <div class="vx-col w-full">
          <vx-card title="Project" class="mb-base">
          <div class="vx-row">
            <div class="vx-col flex-1" id="account-info-col-1">
              <table style="height: 200px;">
                <tr>
                  <td class="font-semibold">Project Title</td>
                  <td>{{ project.title }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Dev Field</td>
                  <td><vs-chip  v-for="field in project.fields" :key="field" :color="getDevField(field)">{{ project.devField }}</vs-chip></td>                  
                </tr>
                <tr>
                  <td class="font-semibold">Required Skill</td>
                  <td>
                    <vs-chip v-for="skill in project.skills" :key="skill" :color="getSkillColor(skill)">
                    {{ skill }}
                    </vs-chip>
                  </td>
                </tr>
                <tr>
                  <td class="font-semibold">Project Description</td>
                  <td>{{ project.description }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Client Location</td>
                  <td>{{ project.location }}</td>
                </tr>          
              </table>
            </div>
            <div class="vx-col flex-1" id="account-info-col-2">
              <table style="height: 200px;">
                <tr>
                  <td class="font-semibold">Project Type</td>
                  <td>{{ project.type }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Potential Budget</td>
                  <td>${{ project.potentialBudget }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Payment Day and Cost</td>
                  <td>
                    <vs-chip v-for="(earning, index) in project.earnings" :key="index" color="primary">
                    <vs-avatar :text="earning.date" />{{ earning.cost }}
                  </vs-chip>
                  </td>
                </tr>
                <tr>
                  <td class="font-semibold">From Where</td>
                  <td>{{ project.site }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Status</td>
                  <td><vs-chip transparent :color="getStatusColor(project.status)">{{ project.status }}</vs-chip></td>
                </tr>          
                <tr>
                  <td class="font-semibold">Note</td>
                  <td>{{ project.note }}</td>
                </tr>
              </table>
            </div>                 
          </div>
          <vs-td class="whitespace-no-wrap mt-4 mb-base" style="padding-top: 20px;">           
            <div class="vx-col w-full flex" id="account-manage-buttons">
              <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: '', params: { userId: $route.params.userId }}">Edit</vs-button>
              <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Delete</vs-button>
            </div>                        
          </vs-td>
        </vx-card>
        </div>

        
      </div>
      <!-- ADD NEW -->
      <div class="demo-alignment">
        <vs-button @click="popupActive=true" radius color="primary" type="gradient" icon-pack="feather" icon="icon-user-plus"></vs-button>
        <vs-popup class="holamundo" title="New Project" :active.sync="popupActive">
          <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <div class="p-6">
              <!-- Project Title -->
              <vs-input label="Project Title" v-model="newProject.title" class="mt-3 w-full" name="item-group" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('item-title')">{{ errors.first('item-title') }}</span>
  
              <!-- Development Field -->
              <vs-select v-model="newProject.devField" label="Development Field" class="mt-3 w-full" name="item-devField" v-validate="'required'">
                <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in devfield_choices" />
              </vs-select>
  
              <!-- Required Skill -->
              <div class="mt-3 w-full">
                <label for="item-skills" class="vs-input--label">Required Skills</label>
                <v-select id="item-skills" multiple v-model="newProject.skills" :options="options" :closeOnSelect="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
              </div>

              <!-- Project Type -->
              <vs-select v-model="newProject.type" label="Project Type" class="mt-3 w-full" name="item-type" v-validate="'required'">
                <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in type_choices" />
              </vs-select>
              <!-- Project Status -->
              <vs-select v-model="newProject.status" label="Project States" class="mt-3 w-full" name="item-status" v-validate="'required'">
                <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in status_choices" />
              </vs-select>
  
              <!-- From Where -->
              <vs-select v-model="newProject.site" label="From Where" class="mt-3 w-full" name="item-site" v-validate="'required'">
                <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in site_choices" />
              </vs-select>
              <!-- Client Location -->
             <div class="mt-3 w-full">
                <label for="item-location" class="vs-input--label">Client Location</label>
                <v-select id="item-location" v-model="newProject.location" :options="location" :closeOnSelect="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
              </div>
              <!-- project description -->
              <div class="mt-3 w-full">
                <label for="item-description" class="vs-input--label">Project Description</label>
                <vs-textarea v-model="newProject.description" />
              </div>
            </div>
          </div>
          <div class="vx-col flex-1" id="account-info-col-2">
            <div class="p-6"> 
                <!-- Container for earning date and cost forms -->
              <div class="earning-date-cost-container justify-content-center vx-col flex-1 mt-5">

                <vs-input class="mt-3 w-full" icon-pack="feather" icon="icon-dollar-sign" label="potentialBudget" v-model="newProject.potentialBudget" v-validate="{ required: true, regex: /\d+(\.\d+)?$/ }" name="item-potentialBudget" />         
                
                <div v-for="(earning, index) in newProject.earnings" :key="index" class="flex items-center justify-between mt-3 w-full">
                  <!-- Earning Date -->              
                  <vs-input label="Earning Date" v-model="earning.date" class="w-full sm:w-1/2 md:w-1/2" style="padding-right: 14px;" name="item-date" v-validate="'required'" />
                  <span class="text-danger text-sm" v-show="errors.has('item-date')">{{ errors.first('item-date') }}</span>         
                  <!-- Earning Cost -->
                  <vs-input label="Cost" v-model="earning.cost" class="w-full sm:w-1/2 md:w-1/2" name="item-earningCost" v-validate="'required'" />
                  <span class="text-danger text-sm" v-show="errors.has('item-earningCost')">{{ errors.first('item-earningCost') }}</span>  
                </div>

                <!-- Button to add new instance of earning date and cost forms -->
                <div class="button-container">
                  <vs-button @click="addNewEarningDateCost" class="mt-3" radius color="primary" type="gradient" icon-pack="feather" icon="icon-user-plus"></vs-button>
                </div>

              </div>              

              <!-- Note -->
              <div class="mt-3 w-full">
                <label for="item-note" class="vs-input--label">Note</label>
                <vs-textarea v-model="newProject.note" />
              </div>              
            </div>
          </div>
            <div class="flex flex-wrap items-center p-6" slot="footer">
              <vs-button class="mr-6" @click="submitData" :disabled="!validateNewProject">Submit</vs-button>
              <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
            </div>
          </div>          
        </vs-popup>
      </div>         
    </div>
  </div>
</template>

<script>
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'
import vSelect from 'vue-select'

export default {
  data () {
    return {
      popupActive: false,
      user_data: null,
      user_not_found: false,
      newProject: {
        title: '',
        devField: '',
        skills: [],
        location: '',
        type: '',
        site: '',
        potentialBudget: '',
        earnings: [
          {
            date: '',
            cost: ''
          }
        ],        
        description: '',        
        status: '',
        note: ''
      },
      devfield_choices: [
        { text: 'Web', value: 'web' },
        { text: 'Mobile', value: 'mobile' },
        { text: 'Software', value: 'software' },
        { text: 'Device', value: 'device' },
        { text: 'Architecture', value: 'architecture' }
      ],
      type_choices: [
        { text: 'Hourly', value: 'hourly' },
        { text: 'Weekly', value: 'weekly' },
        { text: 'Monthly', value: 'monthly' },
        { text: 'Fixed', value: 'fixed' }
      ],
      status_choices: [
        { text: 'Delivered', value: 'hourly' },
        { text: 'Completed', value: 'completed' },
        { text: 'Completing', value: 'completing' },
        { text: 'Pending', value: 'pending' },
        { text: 'Cancel', value: 'cancel' }
      ],
      site_choices: [
        { text: 'Freelancer', value: 'freelancer' },
        { text: 'Upwork', value: 'upwork' },
        { text: 'Local', value: 'local' },
        { text: 'Other', value: 'other' }
      ],
      options: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'Laravel', 'React', 'Shopify', 'WordPress', 'Angular'],
      location: ['US', 'UA', 'UAE', 'UK', 'China', 'Japan', 'Russia', 'Poland', 'Canada']
    }
  },
  computed: {
    user_data() {
      return this.$store.state.userManagement.user
    },

    // userAddress () {
    //   let str = ''
    //   for (const field in this.user_data.location) {
    //     str += `${field  } `
    //   }
    //   return str
    // }
  },
  components: {
    'v-select': vSelect
  },
  methods: {
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete "${this.user_data.username}"`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      this.$router.push({name:'app-user-list'})
      this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      // this.$store.dispatch("userManagement/removeRecord", this.user_data.id)
      //   .then(()   => { this.$router.push({name:'app-user-list'}); this.showDeleteSuccess() })
      //   .catch(err => { console.error(err)       })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'User Deleted',
        text: 'The selected user was successfully deleted'
      })
    },
    // Method to add new instance of earning date and cost forms
    addNewEarningDateCost () {
      this.newProject.earnings.push({
        date: '',
        cost: ''
      })
    },

    initValues () {
      this.newProject = {
        title: '',
        devField: '',
        skills: '',
        location: '',
        type: '',
        site: '',
        potentialBudget: '',
        earnings: [
          {
            date: '',
            cost: ''
          }
        ],   
        description: '',        
        status: '',
        note: ''
      }
    },
    validateNewProject () {
      const { title, devField, type, status, site, location, potentialBudget, skills } = this.newProject
      const hasEmptyField = [title, devField, type, status, site, location, potentialBudget, skills].some(field => field === '')
      const hasIncompleteEarnings = this.newProject.earnings.some(earnings => earnings.date === '' || earnings.cost === '')
      if (hasEmptyField || hasIncompleteEarnings) {
        this.$vs.notify({
          color: 'warning',
          title: 'Warning',
          text: 'Please fill out all fields correctly!'          
        })
        console.log('=====================================>', title)
        console.log('=====================================>', devField)
        console.log('=====================================>', type)
        console.log('=====================================>', status)
        console.log('=====================================>', hasEmptyField)
        console.log('=====================================>', location)
        console.log('=====================================>', hasIncompleteEarnings)
        console.log('=====================================>', potentialBudget)
        console.log('=====================================>', skills)
        
        return false
      }
      return true
    },
    submitData () {
      if (this.validateNewProject()) {
        const project = {
          title: this.newProject.title,
          devField: this.newProject.devField,
          skills: this.newProject.skills,
          location: this.newProject.location,
          type: this.newProject.type,
          site: this.newProject.site,
          potentialBudget: this.newProject.potentialBudget,
          earnings: this.newProject.earnings.map(earning => ({
            date: earning.date,
            cost: earning.cost
          })),
          description: this.newProject.description,          
          status: this.newProject.status,
          note: this.newProject.note
        }
        project.userID = this.user_data.id
        this.$store.dispatch('userManagement/addProject', project)
          .then(() => {
            this.$vs.notify({
              color: 'success',
              title: 'Project Added',
              text: 'The project was successfully added'
            })
            this.popupActive = false
            this.initValues()
          })
          .catch(err => {
            console.error(err)
            this.$vs.notify({
              color: 'danger',
              title: 'Error',
              text: 'There was an error adding the project'
            })
          })
      } else {
        this.$vs.notify({
          color: 'warning',
          title: 'Validation Error',
          text: 'Please fill out all required fields'
        })
      }
    }
  },
  created () {
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule('userManagement', moduleUserManagement)
      moduleUserManagement.isRegistered = true
    }

    const userId = this.$route.params.userId
    this.$store.dispatch('userManagement/fetchUser', userId)
      .then(res => { this.user_data = res.data })
      .catch(err => {
        if (err.response.status === 404) {
          this.user_not_found = true
          return
        }
        console.error(err)
      })
    
      // let payload = this.$route.params.userId;
      // console.log("payload",payload);
    this.$store.dispatch('userManagement/fetchProjectData', payload)
      .then(() => {
      // After fetching, get the projects from the store state
        const projects = this.$store.getters['userManagement/getProjects']
        // Filter projects by userId
        this.projects = projects.filter(project => project.userID === userId)
      })
      .catch(error => {
        console.error('Error fetching project datakkk:', error)
      })
  },
  getSkillColor (skill) {
    const colors = {
      'Vue.js': 'primary',
      'ReactJS': 'success',
      'Laravel': 'warning',
      'MongoDB': 'info'
    }
    return colors[skill] || 'primary'
  },
  getDevField (field) {
    const colors = {
      'Web': 'primary',
      'Mobile': 'success',
      'Software': 'warning',
      'Architecture': 'info'
    }
    return colors[field] || 'primary'
  },
  getStatusColor (status) {
    const colors = {
      'Completed': 'success',
      'Active': 'primary',
      'Pending': 'warning',
      'Canceled': 'danger'
    }
    return colors[status] || 'primary'
  }
}

</script>

<style lang="scss" scoped>
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}

@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}

/* Style for the container */
.earning-date-cost-container {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

</style>
