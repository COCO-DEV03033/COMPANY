<template>
  <div>
    <div style="width: 25%;margin-left: 20px;margin-top: 30px;">
      <div class="vx-row " >
          <vs-list >
            <draggable :list="list1" group="people" class="p-2 cursor-move" >
              <vs-list-item 
                v-for="(listItem, index) in list1" 
                :key="index" 
                :title="listItem.user.name"  
                >
                <input type="text" placeholder="$" class="input_style" v-model="listItem.amount" style="float: right;" />
                <vs-avatar slot="avatar" :text="listItem.user.avatar" />
              </vs-list-item>
            </draggable>
          </vs-list>
      </div>
    </div>
  </div>
</template>
<script>
import { list1, list2} from '../data/userPlan.js'
import draggable from 'vuedraggable'
export default {
  data () {
    return {
      list1,
      list2
    }
  },
  components: {
    draggable
    
  }
}
</script>
<style scoped>
  .input_style {
      width: 80px;
      border: 1px solid rgb(187, 179, 179);
      border-radius:  3px;
      height: calc(1.5em + .75rem + 2px);
      padding: .375rem .75rem;
      font-size: 1rem;
      float: right;
  }
  input:focus
  {
      outline: 1px solid #82b1eb;
  }
</style>