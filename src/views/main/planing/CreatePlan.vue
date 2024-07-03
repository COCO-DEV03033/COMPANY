<template>
  <div id="create-plan mt-6">
    <div class="header">
      <div align="right"  class="btnsave">
        <vs-button @click="Save" :disabled ="saveButtonDisabled" color="success" class="ml-4 mb-4 md:mb-0" >Save</vs-button>
      </div>
      <div class="main vx-row">
        <div 
          v-for="(card, index) in datas" 
          :key="index"
          :class="['team','sm:w-full', 'md:w-1/3', 'lg:w-1/4']"
        >
          <DragCard 
            :team="Number(index) === 0 ? `Free Members` : `Team ${index}`"  
            :list_team="card"
            :index_main = "Number(index)"
            @delete-card="deleteFunction(index)"
            :color="colorValue[index % colorValue.length]" 
            :teamAmount = "Number(index) === 0 ? 0 : teamAmountCalc(card)"
            @dragstart="handleDragEvent"
            @dragover="handleDragEvent"
            @drop="handleDragEvent"
            @changeEvent="handleChangeEvent"
            @inputChange="inputChangeEvent"
          />
        </div>
        <div>
          <addButton @click="bothFunction" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DragCard from './component/DragCard.vue'
import modulePlanManagement from '@/store/plan-management/modulePlanManagement.js'
import addButton from './component/button/addButton.vue'
import { ref } from "vue";
export default {
  data () {
    return {   
      saveButtonDisabled: true,
      colorValue: ['#db6a90', '#c875e8', '#8aa7fb', '#76d2b7', '#c974e3', '#00FFFF', '#78d2e2']
    }
  },
  components: {
    DragCard,
    addButton
  },
  computed: {
    datas () {
        console.log('res data-> ', this.$store.state.planManagement.plans)
        return this.$store.state.planManagement.plans
      },
  },
  methods: {
    confirmDelete (index) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete Team ${index}`,
        accept: () => this.removeCard(index),
        acceptText: 'Delete'
      })
    },
    teamAmountCalc(card){
      const teamAmount = card.reduce((sum, member) => Number(sum) + Number(member.amount), 0);
      return teamAmount;
    },
    handleDragEvent () {
      this.saveButtonDisabled = false
    },
    inputChangeEvent () {      
      this.saveButtonDisabled = false
    },
    handleChangeEvent(event) {
      console.log('Change event:', event);
      // Handle the updated order of items here
    },
    addCard() {
      const newTeamIndex = Object.keys(this.datas).length; // Calculate the new team index
      this.$set(this.datas, newTeamIndex, []); // Add a new team with an empty array of members
    },
    bothFunction () {
      this.handleDragEvent()
      this.addCard()
    },
    deleteFunction (index) {
      this.confirmDelete (index)
      this.inputChangeEvent()
    },
    removeCard(index) {
      var deleting = ref("eee");
      const firstIndex = '0';
      const index_ = index.toString();
      if (index_ !== firstIndex) {
        const deletedItem = this.datas[index_];
        if (deletedItem) {
          if (Array.isArray(deletedItem) && Array.isArray(this.datas[firstIndex])) {
            this.datas[firstIndex].push(...deletedItem);
          } else {
            console.error('Deleted item or first index is not an array:', deletedItem, this.datas[firstIndex]);
          }
          delete this.datas[index];
          
          // Get the keys and sort them numerically
          let sortedKeys = Object.keys(this.datas).sort((a, b) => a - b);

          // Create a new object with keys in order
          let updateTeams = {};
          let nextAvailableTeam = 0;

          sortedKeys.forEach((key) => {
            updateTeams[nextAvailableTeam] = this.datas[key];
            updateTeams[nextAvailableTeam].forEach(member => member.team = nextAvailableTeam.toString());
            nextAvailableTeam++;
          });

          this.$store
          .dispatch('planManagement/updatePlans', updateTeams)
          .catch((err) => {
            console.log(err)
            this.user_not_found = true
          })
        }
      }
    },
    Save () {
      const payload = { data : this.datas,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      }
      this.$store
        .dispatch('planManagement/savePlans', payload)
        .catch((err) => {
          console.log(err)
          this.user_not_found = true
        })
    },
    handleInputChange () {
      this.showSaveButton = true
    }
  },
  mounted () {
    // console.log("datas--------->", this.datas)
  },
  beforeCreate () {
    if (!this.$store.state.auth.isUserLoggedIn()) this.$router.push('/login')
    if (!modulePlanManagement.isRegistered) {
      this.$store.registerModule('planManagement', modulePlanManagement)
      modulePlanManagement.isRegistered = true
    }
    const payload = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      organization: this.$route.params.companyId
    }   
    this.$store
      .dispatch('planManagement/fetchPlans', payload)
      .then((res) => {
      })
      .catch((err) => {
        console.log(err)
        this.user_not_found = true
      })
  }
}
</script>
<style scoped>
  .header {
    background-color: #fff;
    padding: 5px;
  }
  .btnsave{
    height: 50px;
    margin: 15px 20px 0 0;
  }
  .team {
    min-width: 25%;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    .team {
      min-width: 30%;
    }
  }
  @media (min-width: 576px) and (max-width: 768px) {
    .team {
      min-width: 45%;
    }
  }
  @media (max-width: 576px) {
    .team {
      width: 100%;
    }
  }
  .main {
    height: 100vh;
    overflow-x: auto;
    gap: 20px;
    padding: 15px;
    margin: 0 !important;
  }
  @media (min-width: 780px) {
    .main {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap !important;
    }
  }
  @media (max-width: 780px) {
    .main {
      display:-webkit-box !important;
    }
  }
</style>