<template>
    <div id="create-plan">
      <div class="vx-row" style="background-color: #fff; height: 100vh;"> 
        <div class="vx-col w-full md:w-1/3" v-if="showCard1">
          <DragCard :list_team1="list1" @delete-card="toggleCard('card1')" />
        </div>
        <div class="vx-col w-full md:w-1/3" v-if="showCard2">
          <DragCard :list_team1="list1" @delete-card="toggleCard('card2')" />
        </div>
      </div>
    </div>
  </template>
<script>
import draggable from 'vuedraggable'
import { list2} from './data/userPlan.js'
import DragCard from './component/DragCard.vue'
import modulePlanManagement from '@/store/plan-management/modulePlanManagement.js'
export default {  
  data () {
    return {
      list2,
      showCard1: true,
      showCard2: true
    }
  },
  components: {
    draggable,
    DragCard
  },
  computed: { 
    list1 () {
      return this.$store.state.planManagement.plans
    }
  },
  methods: {
    addCard () {
      if (!this.showCard1) {
        this.showCard1 = true
      } else if (!this.showCard2) {
        this.showCard2 = true
      }
      // If both cards are already shown, you can handle it as needed
    },
    toggleCard (card) {
      if (card === 'card1') {
        this.showCard1 = false
      } else if (card === 'card2') {
        this.showCard2 = false
      }
    }
  },

 
  mounted () {
    console.log('list1->', this.$store.state.planManagement.plans)
  },  
  beforeCreate () {
    if (!modulePlanManagement.isRegistered) {
      this.$store.registerModule('planManagement', modulePlanManagement)
      modulePlanManagement.isRegistered = true
    }

    const payload = {
      year: 2024,
      month: 5,
      organization: 'all',
      notify: this.$vs.notify
    }
    this.$store
      .dispatch('planManagement/fetchPlans', payload)
      .then((res) => {})
      .catch((err) => {
        this.user_not_found = true
        return
        console.error(err)
      })

  }
}
</script>
  