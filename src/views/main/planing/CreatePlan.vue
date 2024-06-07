<template>
    <div id="create-plan">
      <div class="vx-row"> 
        <div class="vx-col w-full md:w-1/5">
          <vs-list>
            <vs-list-header title="Total Plan" color="primary" ></vs-list-header>
          </vs-list>
        </div>
        <div class="vx-col w-full md:w-1/5">
          <vs-list>
            <vs-list-header title="Team 1" color="primary" ></vs-list-header>
            <draggable :list="list1" group="people" class="p-2 cursor-move">
              <vs-list-item 
                v-for="(listItem, index) in list1" 
                :key="index" 
                :title="listItem.user.name" 
                >
                <input type="text" placeholder="$" class="input_style" v-model="listItem.amount" />
                <vs-avatar slot="avatar" :text="listItem.user.avatar" />
              </vs-list-item>
            </draggable>
          </vs-list>
        </div>
        <div class="vx-col w-full md:w-1/5">
          <vs-list>
            <vs-list-header title="Team 2" color="primary"></vs-list-header>
            <draggable :list="list2" group="people" class="p-2 cursor-move">
              <vs-list-item 
                v-for="(listItem, index) in list2" 
                :key="index" 
                :title="listItem.user.name" 
              >
                <input type="text" placeholder="$" class="input_style" v-model="listItem.amount" />
                <vs-avatar slot="avatar" :text="listItem.user.avatar" />
              </vs-list-item>
            </draggable>
          </vs-list>
        </div>
      </div>
    </div>
  </template>
<script>
import draggable from 'vuedraggable'
import { list1, list2} from './data/userPlan.js'
export default {  
  data () {
    return {
      list1,
      list2
    }
  },
  components: {
    draggable
  },
  beforeCreate () {
    if (!this.$store.state.auth.isUserLoggedIn()) this.$router.push('/login')
    //  User Reward Card
  }
}
</script>
<style scoped>
  .input_style{
      width: 80px;
      border: 1px solid rgb(187, 179, 179);
      border-radius:  3px;
      height: calc(1.5em + .75rem + 2px);
      padding: .375rem .75rem;
      font-size: 1rem;
  }
  input:focus
  {
      outline: 1px solid #82b1eb;
  }
</style>
  