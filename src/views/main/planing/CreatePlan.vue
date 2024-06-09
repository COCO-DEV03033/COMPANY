<template>
    <div id="create-plan">
      <div class="main_card"> 
        <div class="vx-col w-full md:w-1/3">
          <DragCard team="'team1'" :list_team1="list1" />
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
      list2
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
<style scoped>
.main_card{
  background-color: #fff;
  height: 100vh;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
  gap: 30px;
}
</style>
  