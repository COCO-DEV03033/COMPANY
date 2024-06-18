<template>
  <div id="create-plan mt-6">
    <div class="header">
      <div align="right"  class="btnsave">
        <vs-button @click="Save" :disabled ="saveButtonDisabled" color="success" class="ml-4 mb-4 md:mb-0" >Save</vs-button>
      </div>
      <div class="main vx-row">
        <div 
          v-for="(card, index) in list1" 
          :key="index"
          :class="['team','sm:w-full', 'md:w-1/3', 'lg:w-1/4']"
        >
          <DragCard 
            :team="index === 0 ? `Free Members` : `Team ${index}`"  
            :list_team="card"
            :index_main = "index"
            @delete-card="confirmDelete(index)"
            :color="colorValue[index % colorValue.length]" 
            @dragstart="handleDragEvent"
            @dragover="handleDragEvent"
            @drop="handleDragEvent"
          />
        </div>
        <div>
          <AddButton @click="bothFunction" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DragCard from './component/DragCard.vue'
import modulePlanManagement from '@/store/plan-management/modulePlanManagement.js'
import AddButton from './component/button/AddButton.vue'
export default {
  data () {
    return {   
      saveButtonDisabled: true,
      colorValue: ['#db6a90', '#c875e8', '#8aa7fb', '#76d2b7', '#c974e3', '#00FFFF', '#78d2e2']
    }
  },
  components: {
    DragCard,
    AddButton
  },
  computed: {
    list1 () {
      
      return this.$store.state.planManagement.plans
      
      // const teamArray = this.$store.state.planManagement.plans
      // console.log('teamArray', teamArray)
      // for (let i = 0; i < teamArray.length; i++) {
      //   if (teamArray[i] === null) {
      //     teamArray[i] = [] 
      //   } else {
      //     break
      //   } 
      // }
      // return teamArray
    },
    
  },
  methods: {
    confirmDelete (index) {
      console.log("index", index)
      // if (index === 0) return
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete Team ${index}`,
        accept: () => this.removeCard(index),
        acceptText: 'Delete'
      })
    },
    handleDragEvent () {
      this.saveButtonDisabled = false
    },
    addCard () {
      this.list1.push([])
    },
    bothFunction () {
      this.handleDragEvent()
      this.addCard()
    },
    removeCard (index) {
      const firstIndex = 0
      if (index !== firstIndex) {
        const deletedItem = this.list1.splice(index, 1)[0]
        console.log('deletedItem', deletedItem)
        if (this.list1.length > 0) {
          this.list1[firstIndex].push(...deletedItem)
        }
      }
    },
    Save () {
      const payload = {
        
      }
    },
    handleInputChange () {
      this.showSaveButton = true
    }
  },
  mounted () {
    console.log("response", this.$store.state.planManagement.plans)
    console.log("list1", list1)
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
        console.log('response data', res.plans.length)
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