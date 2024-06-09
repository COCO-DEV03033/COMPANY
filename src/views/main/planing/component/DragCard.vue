<template>
  <div>
    <vx-card class="card_style">
        <vs-list >
          <button @click="deleteCard" class="float-right">X</button>
          <div class="col text-center px-2 py-3 bg-light border rounded">
            <p class="text-success font-bold text-3xl" >Team</p>
          </div>
          <draggable :list="list_team1" group="people" class="p-2 cursor-move">
            <vs-list-item 
              v-for="(listItem, index) in list_team1" 
              :key="index" 
              :title="listItem.user.name" 
              :class="['base-item', { 'first-item': index === 0 }]"
            >
              <input type="text" placeholder="$" class="input_style" v-model="listItem.amount" />
              <vs-avatar slot="avatar" :text="listItem.user.avatar" />
            
            </vs-list-item>
          </draggable>
        </vs-list>
      </vx-card>
  </div>
</template>
<script>
// import { list1, list2} from '../data/userPlan.js'
import draggable from 'vuedraggable'
export default {
  data () {
    return {
      
    }
  },
  components: {
    draggable
    
  },
  props :{
    list_team1 :{
      type: Object,
      required : true
    },
    team:{
      type:String,
      required: true
    }
  },
  methods: {
    deleteCard () {
      this.$emit('delete-card')
    }
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
      border-color: green;
  }
  .first-item {
    font-size: 1rem;
    font-weight: bold;
    color: red;
  }
  .base-item {
    border: 2px solid #e7e4e4;
    padding: 5px;
    margin: 10px 0;
    border-radius: 6px;
    background-color: #ffffff;
    
  }
  .card_style{
    border-top: 4px solid red;
    background-color: #f6f8fc;
  }
</style>