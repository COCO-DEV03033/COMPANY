<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <!-- <feather-icon icon="InfoIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" /> -->
      <eye-icon size="1.5x" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" /></eye-icon>
      <!-- <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" /> -->
    </div>
</template>

<script>
import { EyeIcon } from 'vue-feather-icons'
export default {
  components: {
    EyeIcon
  },
  name: 'CellRendererActions',
  methods: {
    editRecord () {
      // this.$router.push(`/project/project-view/${  268}`).catch(() => {})

      // /project/edit/${id}
      // Below line will be for actual product
      // Currently it's commented due to demo purpose - Above url is for demo purpose

      this.$router.push(`/project/view/${this.params.data.userID}`).catch(() => {})
      console.log(' >>>>>>>>>>>>>>>>>>>>>>>>>>> ', this.params.data.userID)
            
    },
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete "${this.params.data.username}"`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      // this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      this.$store.dispatch('projectManagement/removeRecord', this.params.data.id)
        .then(()   => { this.showDeleteSuccess() })
        .catch(err => { console.error(err)       })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'User Deleted',
        text: 'The selected user was successfully deleted'
      })
    }
  }
}
</script>
