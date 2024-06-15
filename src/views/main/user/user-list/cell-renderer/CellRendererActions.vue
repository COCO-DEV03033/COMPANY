<template>
  <div :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
    <feather-icon
      icon="UserCheckIcon"
      svgClasses="h-5 w-5 hover:h-7 hover:w-7 mr-4 text-success cursor-pointer"
      @click="confirmApproveRecord"
    />
    <feather-icon
      icon="UserXIcon"
      svgClasses="h-5 w-5 mr-4 text-warning cursor-pointer"
      @click="confirmRejectRecord"
    />
    <feather-icon
      icon="Edit3Icon"
      svgClasses="h-5 w-5 mr-4 text-primary cursor-pointer"
      @click="editRecord"
    />
    <feather-icon
      icon="Trash2Icon"
      svgClasses="h-5 w-5 text-danger cursor-pointer"
      @click="confirmDeleteRecord"
    />
  </div>
</template>

<script>
export default {
  name: "CellRendererActions",
  methods: {
    editRecord() {
      this.$router
        .push(`/engineer/engineer-edit/${this.params.data.userID}`)
        .catch(() => {});

      /*
              Below line will be for actual product
              Currently it's commented due to demo purpose - Above url is for demo purpose

              this.$router.push("/apps/user/user-edit/" + this.params.data.id).catch(() => {})
            */
    },
    confirmApproveRecord() {
      this.$store
        .dispatch("userManagement/approveRecord", this.params.data.userID)
        .then((res) => {
          this.$router.push({name : 'Refresh Router'});
        });
    },
    confirmRejectRecord() {
      this.$store
        .dispatch("userManagement/rejectRecord", this.params.data.userID)
        .then((res) => {
          this.$router.push({name : 'Refresh Router'});
          // this.$router.push('/engineer/list');
        });
    },
    confirmDeleteRecord() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Confirm Delete",
        text: `You are about to delete "${this.params.data.name}"`,
        accept: this.deleteRecord,
        acceptText: "Delete",
      });
    },
    deleteRecord() {
      /* Below two lines are just for demo purpose */
      // this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      this.$store
        .dispatch("userManagement/removeRecord", this.params.data.userID)
        .then(() => {
          this.showDeleteSuccess();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    showDeleteSuccess() {
      this.$vs.notify({
        color: "success",
        title: "User Deleted",
        text: "The selected user was successfully deleted",
      });
    },
  },
};
</script>
