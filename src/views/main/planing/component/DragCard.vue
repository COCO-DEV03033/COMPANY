<template>
  <div>
    <vx-card :style="borderStyle" class="card_style">
      <vs-list  >
        <DeleteButton @click="deleteCard" />
        <div class="col text-center px-2 py-3 bg-light border rounded">
          <p class="text-success font-bold text-2xl" >{{team}}</p>
        </div>
          <draggable :list="list_team" group="people" class="p-2 cursor-move"    @start="emitDragEvent" @end="emitDragEvent" @drop="emitDragEvent">
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
import DeleteButton from './button/DeleteButton.vue'
export default {
  data () {
    return {
      
    }
  },
  components: {
    draggable,
    DeleteButton
  },
  props :{
    list_team :{
      type: Array,
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
    },
    emitDragEvent () {
      this.$emit('dragstart')
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
  
</style>
<style lang="scss">
.card_style{
    padding: 1px !important;
    .vx-card__body{
      padding: 5px !important
    }
  }
</style>