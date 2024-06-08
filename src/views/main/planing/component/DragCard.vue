<template>
  <div>
    <div style="width: 20%;">
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
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="">
  
</style>