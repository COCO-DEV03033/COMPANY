<template>
  <div id="create-plan mt-6">
    <div class=" main_card vx-row">
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
        />
      </vx-col>
      <vx-col>
        <AddButton @click="addCard" />
      </vx-col>
    </div>
    <vs-button color="success" class="ml-4 mb-4 md:mb-0" @click="save">Save</vs-button>
  </div>
</template>
<script>
import DragCard from './component/DragCard.vue'
import modulePlanManagement from '@/store/plan-management/modulePlanManagement.js'
import AddButton from './component/button/AddButton.vue'
export default {
  data () {
    return {
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
    }
  },
  methods: {
    addCard () {
      const newId = this.list1.length ? this.list1.length : 0
      this.list1.push({
        index : newId
        // amount : ''.
        // user : {
        //   name : '',
        //   avatar : ''
        // }
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
    },
    save () {
      // const payload = {

      // }
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
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      organization: this.$route.params.companyId
    }
    this.$store
      .dispatch('planManagement/fetchPlans', payload)
      .then((res) => {
        console.log('response data', res)
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
</style>