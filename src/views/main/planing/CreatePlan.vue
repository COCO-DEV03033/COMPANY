<template>
  <div id="create-plan mt-6">
    <div>
      <div align="right"  class="save-button-container">
        <vs-button :disabled ="saveButtonDisabled" color="success" class="ml-4 mb-4 md:mb-0" >Save</vs-button>
      </div>
      <div class="main_card vx-row">
        <vx-col 
          v-for="(card, index) in list1" 
          :key="index"
          :class="['w-full', 'md:w-1/3', 'sm:w-1/3', 'xs:w-full', 'xl:w-1/3']"
        >
          <DragCard 
            :team="`Team ${index}`" 
            :list_team="card" 
            @delete-card="removeCard(index)"
            :color="colorValue[index % colorValue.length]"
            @update:modelValue="$event => (foo = $event)" 
            @dragstart="handleDragEvent"
            @dragover="handleDragEvent"
            @drop="handleDragEvent"
          />
        </vx-col>
        <vx-col>
          <AddButton @click="bothFunction" />
        </vx-col>
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
      const teamArray = this.$store.state.planManagement.plans
      for (let i = 0; i < teamArray.length; i++) {
        if (teamArray[i] === null) {
          teamArray[i] = [] 
        } else {
          break
        } 
      }
      return teamArray
    }
  },
  methods: {
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
      const othersIndex = this.cards.findIndex(card => card.id === '_free')
      if (othersIndex !== -1) {
        // Move the data to the "Others" card
        this.cards[othersIndex].list.push(...this.cards[index].list)
      }
      // Remove the card
      this.cards.splice(index, 1)
    },
    save () {
      // const payload = {

      // }
    },
    
    handleInputChange () {
      this.showSaveButton = true
    }
  },
  mounted () {
  },
  beforeCreate () {
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
  .company {
    color: red;
    font-weight: 800;
    font-size: 35px;
    font-family: Sans-Serif;
    letter-spacing: 3px;
    transform: scale(0.8, 1.0);
  }
  .main_card {
    background-color: #fff;
    height: 100vh;
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 30px;
    flex-wrap: nowrap !important;
    margin: 0 !important;
  }

  .btn-glyphicon {
    padding: 8px;
    background: #ffffff;
    margin-right: 4px;
  }

  .icon-btn {
    padding: 1px 15px 3px 2px;
    border-radius: 50px;
  }
  .save-button-container{
    height: 50px;
  }
</style>