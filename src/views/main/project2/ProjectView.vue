<template>
  <div id="page-user-view">

    <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
      <span>User record with id: {{ $route.params.userId }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'Project List'}" class="text-inherit underline">All Users</router-link>
      </span>
    </vs-alert>

    <div id="user-data" v-if="userData">

      <vx-card title="Account" class="mb-base">

        <!-- Avatar -->
        <div class="vx-row">

          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="userData.avatar" class="rounded w-full" />
            </div>
          </div>

          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Username</td>
                <td>{{ userData.name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">DOB</td>
                <td>{{ userData.dob }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Company</td>
                <td>{{ userData.organization }}</td>
              </tr>
              <tr>
                  <td class="font-semibold">Group</td>
                  <td>{{ userData.team }}</td>
                </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Major</td>
                <td>{{ userData.major }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Plan</td>
                <td>{{ userData.plan }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Income</td>
                <td>{{ userData.income }}</td>
              </tr>
            </table>
          </div>
        </div>
      </vx-card>
      <vs-button @click="addProject()" radius color="primary" type="gradient" icon-pack="feather" icon="icon-user-plus"></vs-button>


      <div v-for="project in projectData" v-if="projectData">
        <div class="vx-row">
          <div class="vx-col w-full">
            <vx-card title="Project" class="mb-base">
            <div class="vx-row">
              <div class="vx-col flex-1" id="account-info-col-1">
                <table style="height: 200px;">
                  <tr>
                    <td class="font-semibold">Project Title</td>
                    <td>{{project.title}}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Dev Field</td>
                    <td>  
                      <!--  {{ project.devField }} -->
                      <vs-chip :color="getDevFieldColor(project.devField)">
                      {{ project.devField }}
                    </vs-chip>
                  </td>                  
                  </tr>
                  <tr>
                    <td class="font-semibold">Required Skill</td>                    
                      <td><div v-for="(requiredSkill, index) in project.requiredSkills">
                        <vs-chip :color="getSkillColor(requiredSkill)">
                          {{ requiredSkill }}
                        </vs-chip>
                      </div>
                      </td>                    
                  </tr>
                  <tr>
                    <td class="font-semibold">Project Description</td>
                    <td>{{ project.description }}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Client Location</td>
                    <td>{{ project.clientLocation}}</td>
                  </tr>          
                </table>
              </div>
              <div class="vx-col flex-1" id="account-info-col-2">
                <table style="height: 200px;">
                  <tr>
                    <td class="font-semibold">Project Type</td>
                    <td>{{ project.type}}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Potential Budget</td>
                    <td>{{ project.potentialBudget }}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Payment Day and Cost</td>                   
                      <td>
                        <vs-chip v-for="(earning, index) in project.earnings" :key="index" color="primary">
                        <!-- <vs-avatar :text="earning.date" />{{ earning.cost }} -->{{ earning.date }}-{{ earning.cost }}
                      </vs-chip>
                      </td>                    
                  </tr>
                  <tr>
                    <td class="font-semibold">From Where</td>
                    <td>{{ project.siteID}}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Status</td>
                    <td><vs-chip transparent :color="getStatusColor(project.projectstatus)">{{ project.projectstatus }}</vs-chip></td>
                  </tr>          
                  <tr>
                    <td class="font-semibold">Note</td>
                    <td>{{project.note}}</td>
                  </tr>
                </table>
              </div>                 
            </div>
            <vs-td class="whitespace-no-wrap mt-4 mb-base" style="padding-top: 20px;">           
              <div class="vx-col w-full flex" id="account-manage-buttons">
                <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" @click="editProject(project)">Edit</vs-button>
                <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="deleteProject">Delete</vs-button>
              </div>                        
            </vs-td>
          </vx-card>
          </div>

          
        </div>
      </div>
      <!-- ADD NEW -->
      <div class="demo-alignment">        
        <vs-popup class="holamundo"  title="new project" :active.sync="popupActive">
          <div class="vx-row">
            <div class="vx-col flex-1" id="account-info-col-1">
              <div class="p-6">
                <!-- Project Title -->
                <vs-input label="Title" v-model="newProject.title" class="mt-3 w-full" name="item-title"/>
                <span class="text-danger text-sm" v-show="errors.has('item-title')">{{ errors.first('item-title') }}</span>
    
                <!-- Development Field -->
                <vs-select v-model="newProject.devField" label="Development Field" class="mt-3 w-full" name="item-devField" v-validate="'required'">
                  <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in devfield_choices" />
                </vs-select>
    
                <!-- Required Skill -->
                <div class="mt-3 w-full">
                  <label for="item-skills" class="vs-input--label">Required Skills</label>
                  <v-select id="item-skills" multiple v-model="newProject.requiredSkills" :options="options" :closeOnSelect="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                </div>

                <!-- Project Type -->
                <vs-select v-model="newProject.type" label="Project Type" class="mt-3 w-full" name="item-type" v-validate="'required'">
                  <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in type_choices" />
                </vs-select>
                <!-- Project Status -->
                <vs-select v-model="newProject.projectstatus" label="Project States" class="mt-3 w-full" name="item-status" v-validate="'required'">
                  <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in status_choices" />
                </vs-select>
    
                <!-- From Where -->
                <vs-select v-model="newProject.siteID" label="From Where" class="mt-3 w-full" name="item-site" v-validate="'required'">
                  <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in site_choices" />
                </vs-select>
                <!-- Client Location -->
              <div class="mt-3 w-full">
                  <label for="item-location" class="vs-input--label">Client Location</label>
                  <v-select id="item-location" v-model="newProject.clientLocation" :options="clientLocation" :closeOnSelect="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
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
              <vs-button class="mr-6" @click="submitData()" :disabled="!validateNewProject">Submit</vs-button>
              
              <vs-button type="border" color="danger" @click="popupActive = false">Cancel</vs-button>
            </div>
          </div>          
        </vs-popup>
      </div>         
    </div>
  </div>
</template>

<script>
import moduleProjectManagement from '@/store/project-management/moduleProjectManagement.js'
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'
import vSelect from 'vue-select'

export default {
  data () {
    return {
      userData:{},
      popupActive: false,
      user_not_found: false,
      isEditing: false,
      editingProjectId: null,
      newProject: {
        title: '',
        devField: '',
        requiredSkills: [],
        clientLocation: '',
        type: '',
        siteID: '',
        potentialBudget: '',
        earnings: [
          {
            date: '',
            cost: ''
          }
        ],        
        projectstatus:'',
        description: '',
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
        { text: 'Canceled', value: 'canceled' }
      ],
      site_choices: [
        { text: 'Freelancer', value: 'freelancer' },
        { text: 'Upwork', value: 'upwork' },
        { text: 'Local', value: 'local' },
        { text: 'Other', value: 'other' }
      ],
      options: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'Laravel', 'React', 'Shopify', 'WordPress', 'Angular'],
      clientLocation: ['US', 'UA', 'UAE', 'UK', 'China', 'Japan', 'Russia', 'Poland', 'Canada']
    }
  },
  computed: { 
    projectData () {
      return this.$store.state.projectManagement.project
    }
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
        text: `You are about to delete "${this.projectData.title}"`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },

    addProject () {
      this.newProject = { 
        title: '',
        devField: '',
        requiredSkills: [],
        clientLocation: '',
        type: '',
        siteID: '',
        potentialBudget: '',
        earnings: [
          {
            date: '',
            cost: ''
          }
        ],        
        projectstatus:'',
        description: '',
        note: ''
      }
      this.isEditing = false
      this.popupActive = true
    },
    
    editProject (project) {
      this.isEditing = true
      this.editingProjectId = project._id
      this.newProject = { ...project }
      this.popupActive = true
    },

    deleteProject () {      
      this.$store.dispatch('projectManagement/deleteProject', )
        .then(()   => { this.$router.push({name:'Project View'}); this.showDeleteSuccess() })
        .catch(err => { console.error(err)       })
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
        userID: '',
        devField: '',
        requiredSkills: '',
        clientLocation: '',
        type: '',
        siteID: '',
        potentialBudget: '',
        earnings: [
          {
            date: '',
            cost: ''
          }
        ],   
        description: '',
        projectstatus: '',
        note: ''
      }
    },
    validateNewProject () {
      const { title, devField, type, projectstatus, siteID, clientLocation, potentialBudget, requiredSkills, earnings } = this.newProject
      const hasEmptyField = [title, devField, type, projectstatus, siteID, clientLocation, potentialBudget, requiredSkills].some(field => field === '')

      // Check for incomplete earnings entries
      const hasIncompleteEarnings = earnings.some(entry => entry.date === '' || entry.cost === '')

      
      // const hasEmptyField = [title, devField, type, projectstatus, siteID, clientLocation, potentialBudget, requiredSkills, earnings]
      // const hasIncompleteEarnings = this.newProject.earnings.data
      if (hasEmptyField || hasIncompleteEarnings) {
        this.$vs.notify({
          color: 'warning',
          title: 'Warning',
          text: 'Please fill out all fields correctly!'          
        })       
        return false
      }
      return true
    },
    submitData () {
      if (this.validateNewProject()) {

        if (!this.isEditing) {
          const project = {
            userID:this.$route.params.userId,
            title: this.newProject.title,
            devField: this.newProject.devField,
            requiredSkills: this.newProject.requiredSkills,
            clientLocation: this.newProject.clientLocation,
            type: this.newProject.type,
            siteID: this.newProject.siteID,
            potentialBudget: this.newProject.potentialBudget,
            earnings: this.newProject.earnings.map(earning => ({
              date: earning.date,
              cost: earning.cost
            })),
            description: this.newProject.description,          
            projectstatus: this.newProject.projectstatus,
            note: this.newProject.note
          }
          this.$store.dispatch('projectManagement/addProject', project)
            .catch(err => {
              console.error(err)
              this.$vs.notify({
                color: 'danger',
                title: 'Error',
                text: 'There was an error adding the project'
              })
            })
          this.popupActive = false
        } else {
          this.$store.dispatch('projectManagement/updateProject', this.newProject)     
            .catch(err => { console.error(err) })
          this.popupActive = false
        }
      } else {
        this.$vs.notify({
          color: 'warning',
          title: 'Validation Error',
          text: 'Please fill out all required fields'
        })
      }
    },

    fetch_user_data (userID) {
      this.$store
        .dispatch('userManagement/fetchUser', userID)
        .then((res) => {
          this.userData = res.data.existUser
        })
        .catch((err) => {
          this.user_not_found = true
          return
          console.error(err)
        })
    },
    getDevFieldColor (devField) {      
     
      const colors = {
        'web': 'primary',
        'mobile': 'success',
        'software': 'warning',
        'architecture': 'info',
        'device': 'dark'
      }
      return colors[devField] || 'primary'
    },
    getSkillColor (requiredSkills) {
      const colors = {        
        'ReactJS': 'success',
        'Laravel': 'warning',
        'Node.js':'dark',
        'Shopify':'danger'     
      }
      return colors[requiredSkills] || 'primary'
    },
    getStatusColor (projectstatus) {
      const colors = {
        'completed': 'success',
        'active': 'primary',
        'pending': 'warning',
        'canceled': 'danger'
      }
      return colors[projectstatus] || 'primary'
    }
    
  },
  created () {
    if (!moduleProjectManagement.isRegistered) {
      this.$store.registerModule('projectManagement', moduleProjectManagement)
      moduleProjectManagement.isRegistered = true
    }

    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule('userManagement', moduleUserManagement)
      moduleUserManagement.isRegistered = true
    }
    this.fetch_user_data(this.$route.params.userId)

    this.$store
      .dispatch('projectManagement/fetchProject', this.$route.params.userId)      
      .catch((err) => {
        console.log(err)
      })

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
.vs-popup {
  width: 1000px !important;
}

</style>