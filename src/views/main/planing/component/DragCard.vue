<template>
  <div>
    <vx-card :style="borderStyle" class="card_style">
      <vs-list  >
        <div @click="deleteCard"  class="float-right svg-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>
        </div>
        <div class="col text-center px-2 py-3 bg-light border rounded">
          <p class="text-success font-bold text-2xl" >{{team}}</p>
        </div>
          <draggable :list="list_team" group="people" class="p-2 cursor-move">
          <vs-list-item 
            @change="finish"
            v-for="(listItem, index) in list_team" 
            :key="index" 
            :title="listItem.name" 
            :class="['base_item', { 'first_item': index === 0 }]"
          >
            <input type="text" placeholder="$" class="input_style" v-model="listItem.amount" />
            <vs-avatar slot="avatar" :text="listItem.avatar" />
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
    list_team :{
      type: Object,
      required : true
    },
    team:{
      type:String,
      required: true
    },
    color : {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteCard () {
      this.$emit('delete-card')
    }
  },
  created () {
    console.log('this.list_team1', this.list_team)
  },  
  watch : {
    finish (item) {
      console.log(item.moved.element) // { id: 1, name: 'Item 1' }
    }
  },  
  computed: {
    borderStyle () {
      return {
        borderTop: `4px solid ${this.color}`,
        backgroundColor: '#f6f8fc'
      }
    }
  }
}
</script>
<style scoped>
  .input_style{
      width: 60px;
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
  .first_item {
    font-size: 1rem;
    font-weight: bold;
    color: red;
  }
  .base_item {
    border: 2px solid #e7e4e4;
    padding: 5px;
    margin: 10px 0;
    border-radius: 6px;
    background-color: #ffffff;
  }
  .svg-button {
    cursor: pointer;
    transition: transform 0.3s ease; 
  }
  .svg-button:hover {
    transform: scale(1.2);
  }
</style>
<style lang="scss">
.card_style{
    padding: 1px !important;
    .vx-card__body{
      padding: 5px !important
    }
  }
</style>