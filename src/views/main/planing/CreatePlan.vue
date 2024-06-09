<template>
    <div id="create-plan">
      <div class="vx-row" style="background-color: #fff; height: 100vh;"> 
        <div class="vx-col w-full md:w-1/4" >
          <vx-card style="border-top: 4px solid red; background-color: #f6f8fc;" >
            <vs-list >
              <div class="col text-center px-2 py-3 bg-light border rounded">
                <p class="text-success font-bold text-3xl" >Team 1</p>
              </div>
              <draggable :list="list1" group="people" class="p-2 cursor-move">
                <vs-list-item 
                  v-for="(listItem, index) in list1" 
                  :key="index" 
                  :title="listItem.user.name" 
                  :class="[getItemClass(index), 'base-item', { 'first-item': index === 0 }]"
                >
               
                  <input type="text" placeholder="$" class="input_style" v-model="listItem.amount" />
                  <vs-avatar slot="avatar" :text="listItem.user.avatar" />
                
                </vs-list-item>
              </draggable>
            </vs-list>
          </vx-card>
        </div>
      </div>
    </div>
  </template>
<script>
import draggable from 'vuedraggable'
import { list2} from './data/userPlan.js'
import modulePlanManagement from '@/store/plan-management/modulePlanManagement.js'
export default {  
  data () {
    return {
      list2
    }
  },
  components: {
    draggable
  },
  computed: { 
    list1 () {
      return this.$store.state.planManagement.plans;
    }
  },
  methods : {
    getItemClass (index) {
      return {
        'second-item': index === 1,
        'third-item': index === 2
      }
    }
  },
  mounted () {
    console.log('list1->',this.plans);
  },  
  beforeCreate () {
    if (!modulePlanManagement.isRegistered) {
      this.$store.registerModule('planManagement', modulePlanManagement);
      modulePlanManagement.isRegistered = true;
    }

    const payload = {
      year: 2024,
      month: 5,
      organization: 'all',
      notify: this.$vs.notify,
    };
    this.$store
      .dispatch('planManagement/fetchPlans', payload)
      .then((res) => {})
      .catch((err) => {
        this.user_not_found = true;
        return;
        console.error(err);
      });

  }
}
</script>
<style scoped>
  .input_style{
      width: 60%;
      border: 1px solid rgb(187, 179, 179);
      border-radius:  3px;
      height: calc(1.5em + .75rem + 2px);
      padding: .375rem .75rem;
      font-size: 1rem;
      
  }
  input:focus
  {
      outline: 1px solid #82b1eb;
      border-color: green;
  }
  .first-item {
    /* background-color: rgb(93, 93, 215); Add your specific styles here */
    font-size: 1rem;
    font-weight: bold;
    color: red;
  }
  .base-item {
    border: 2px solid #ffffff;
    padding: 5px;
    margin: 10px 0;
    border-radius: 6px;
    background-color: #ffffff;
    justify-content: space-between;
  }
  .list-item-content {
  /* display: flex;
  align-items: center; */
  justify-content: space-between; /* Ensures content is spread out */
  /* width: 100%; */
}
</style>
  