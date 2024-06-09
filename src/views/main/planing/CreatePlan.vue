<template>
    <div id="create-plan">
      <div class="main_card"> 
        <vx-col
          v-for="(card, index) in cards"
          :key="card.id"
          :class="['w-full', 'md:w-1/3']"
        >
          <DragCard :team="`Team ${card.id}`" :list_team1="card.list" @delete-card="removeCard(index)" />
        </vx-col>
      </div>
    </div>
  </template>
<script>
import draggable from 'vuedraggable'
import DragCard from './component/DragCard.vue'
import modulePlanManagement from '@/store/plan-management/modulePlanManagement.js'
export default {  
  data () {
    return {
      cards: [
        {
          id: 1,
          list: [
            {
              amount: 1000,
              month: 6,
              year: 2024,
              user: {
                userID: 'asd0303',
                name: 'JangG',
                dob: '1997/03/03',
                avatar: '@/assets/images/portrait/small/avatar-s-26.jpg',
                company: '3*9',
                team: 1
              }
            }
          ]
        },
        // Add more card objects if needed
        {
          id: 2,
          list: [
            {
              amount: 2000,
              month: 6,
              year: 2024,
              user: {
                userID: 'asd0303',
                name: 'Pak',
                dob: '1997/03/03',
                avatar: '@/assets/images/portrait/small/avatar-s-26.jpg',
                company: '3*9',
                team: 2
              }
            }
          ]
        },
        {
          id: '_other',
          list: []
        }
      ]
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
    removeCard (index) {
      const othersIndex = this.cards.findIndex(card => card.id === '_other')
      if (othersIndex !== -1) {
        // Move the data to the "Others" card
        this.cards[othersIndex].list.push(...this.cards[index].list)
      }
      // Remove the card
      this.cards.splice(index, 1)
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
  