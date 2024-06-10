<template>
    <div id="create-plan">
      <div class="main_card vx-row">
        <vx-col
          v-for="(card, index) in cards"
          :key="card.id"
          :class="['w-full', 'md:w-1/3', 'sm:w-1/3', 'xs:w-full', 'xl:w-1/3']"
        >
          <DragCard  
            :team="`Team ${card.id}`" 
            :list_team1="card.list" 
            @delete-card="removeCard(index)" 
            :color = "colorValue[index % colorValue.length]" 
          />
        </vx-col>
        <vx-col>
          <div @click="addCard" class="svg-button">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="26" height="26" viewBox="0 0 256 256" xml:space="preserve">

            <defs>
            </defs>
            <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
              <path d="M 71.932 90 H 18.068 C 8.105 90 0 81.895 0 71.932 V 18.068 C 0 8.105 8.105 0 18.068 0 h 53.864 C 81.895 0 90 8.105 90 18.068 v 53.864 C 90 81.895 81.895 90 71.932 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(73,193,73); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
              <path d="M 45 70.454 c -2.761 0 -5 -2.238 -5 -5 V 24.545 c 0 -2.761 2.239 -5 5 -5 c 2.762 0 5 2.239 5 5 v 40.909 C 50 68.216 47.762 70.454 45 70.454 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
              <path d="M 65.454 50 H 24.545 c -2.761 0 -5 -2.238 -5 -5 c 0 -2.761 2.239 -5 5 -5 h 40.909 c 2.762 0 5 2.239 5 5 C 70.454 47.762 68.216 50 65.454 50 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
            </g>
            </svg>
          </div>
        </vx-col>
      </div>
    </div>
  </template>
<script>
import DragCard from './component/DragCard.vue'
import modulePlanManagement from '@/store/plan-management/modulePlanManagement.js'
export default {  
  data () {
    return {
      colorValue : ['#db6a90', '#c875e8', '#8aa7fb', '#76d2b7', '#c974e3', '#00FFFF', '#78d2e2'],
      cards: [
        {
          id: '_free',
          list: []
        },
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
          id: 3,
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
          id: 4,
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
        }
        
      ]
      
    }
  },
  components: {
    DragCard
  },
  computed: { 
    list1 () {
      return this.$store.state.planManagement.plans
    }
  },
  methods: {
    addCard () {
      const numericIds = this.cards.map(card => card.id).filter(id => !isNaN(id))
      const newId = numericIds.length ? Math.max(...numericIds) + 1 : 1

      this.cards.push({
        id: newId,
        list: []
      })
    },
    removeCard (index) {
      const othersIndex = this.cards.findIndex(card => card.id === '_free')
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
    gap: 20px;
    padding: 30px;
    flex-wrap: nowrap !important;
  }
  .btn-glyphicon {
      padding:8px;
      background:#ffffff;
      margin-right:4px;
  }
  .icon-btn {
      padding: 1px 15px 3px 2px;
      border-radius:50px;
  }
  .svg-button {
    cursor: pointer;
    transition: transform 0.3s ease; 
  }
  .svg-button:hover {
    transform: scale(1.2);
  }
</style>
  