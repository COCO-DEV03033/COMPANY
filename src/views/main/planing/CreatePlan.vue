<template>
    <div id="create-plan">
      <div class="vx-row" > 
        <div id="Card_main" class="vx-col w-full lg:w-full mb-base " >
          <vx-card slot="no-body" class="text-center" style="height: 100vh; background-color: #eef2f9;">
            <div style="display: flex;">
             
            </div>
            
          </vx-card>
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
  