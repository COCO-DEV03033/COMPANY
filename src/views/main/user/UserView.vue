<template>
  <div id="page-user-view">
    <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
      <span>User record with id: {{ $route.params.userId }} not found. </span>
      <span>
        <span>Check </span
        ><router-link :to="{ name: 'Engineer List' }" class="text-inherit underline"
          >All Users</router-link
        >
      </span>
    </vs-alert>

    <div id="user-data" v-if="user_data">
      <vx-card title="Account" class="mb-base">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <div class="vx-col border" id="avatar-col">
            <div class="img-container mb-4">
              <img
                :src="
                  user_data.avatar
                    ? user_data.avatar
                    : require('@/assets/images/avatar.png')
                "
                class="rounded border w-full"
              />
            </div>
          </div>

          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Name</td>
                <td>{{ user_data.name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">UserID</td>
                <td>{{ user_data.userID }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Role</td>
                <td>{{ user_data.role }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Status</td>
                <td>{{ user_data.status ? "Approved" : "Pending" }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Company</td>
                <td>{{ user_data.organization }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Team</td>
                <td>{{ user_data.team }} Group</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 2 -->
          <div class="vx-col w-full flex" id="account-manage-buttons">
            <vs-button
              icon-pack="feather"
              icon="icon-edit"
              class="mr-4"
              :to="{ name: 'engineer-edit', params: { userId: $route.params.userId } }"
              >Edit</vs-button
            >
            <vs-button
              type="border"
              color="danger"
              icon-pack="feather"
              icon="icon-trash"
              class="mr-4"
              @click="confirmDeleteRecord"
              >Delete</vs-button
            >
            <vs-button
              type="border"
              v-if="user_data.status == true"
              :color="user_data.status == true ? 'warning' : 'success'"
              icon-pack="feather"
              :icon="user_data.status == true ? 'icon-user-check' : 'icon-user-x'"
              @click="confirmRejectRecord"
              >{{user_data.status == true ? 'Reject' : 'Approve'}}</vs-button
            >
            <vs-button
              type="border"
              v-else
              :color="user_data.status == true ? 'warning' : 'success'"
              icon-pack="feather"
              :icon="user_data.status == true ? 'icon-user-check' : 'icon-user-x'"
              @click="confirmApproveRecord"
              >{{user_data.status == true ? 'Reject' : 'Approve'}}</vs-button
            >
          </div>
        </div>
      </vx-card>

      <div class="vx-row">
        <div class="vx-col lg:w-1/2 w-full">
          <vx-card title="Information" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Birth Date</td>
                <td>{{ user_data.dob }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Mobile</td>
                <td>{{ user_data.mobile }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Website</td>
                <td>{{ user_data.website }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Languages</td>
                <td>{{ user_data.languages_known }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Gender</td>
                <td>{{ user_data.gender }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Contact</td>
                <td>{{ user_data.contact_options }}</td>
              </tr>
            </table>
          </vx-card>
        </div>

        <div class="vx-col lg:w-1/2 w-full">
          <vx-card title="Career & Evaluation:" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Twitter</td>
                <td>{{ user_data.social_links }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Facebook</td>
                <td>{{ user_data.social_links }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Instagram</td>
                <td>{{ user_data.social_links }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Github</td>
                <td>{{ user_data.social_links }}</td>
              </tr>
              <tr>
                <td class="font-semibold">CodePen</td>
                <td>{{ user_data.social_links }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Slack</td>
                <td>{{ user_data.social_links }}</td>
              </tr>
            </table>
          </vx-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moduleUserManagement from "@/store/user-management/moduleUserManagement.js";

export default {
  data() {
    return {
      user_data: null,
      user_not_found: false,
    };
  },
  computed: {
    userAddress() {
      let str = "";
      for (const field in this.user_data.location) {
        str += `${field} `;
      }
      return str;
    },
  },
  methods: {
    confirmDeleteRecord() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Confirm Delete",
        text: `You are about to delete "${this.user_data.name}"`,
        accept: this.deleteRecord,
        acceptText: "Delete",
      });
    },
    confirmRejectRecord() {
      this.$store
        .dispatch("userManagement/rejectRecord", this.user_data.userID)
        .then((res) => {
          // this.$router.push({name : 'Refresh Router'});
          this.user_data.status = false
          // this.$router.push('/engineer/list');
        });
    },
    confirmApproveRecord() {
      this.$store
        .dispatch("userManagement/approveRecord", this.user_data.userID)
        .then((res) => {
          // this.$router.push({name : 'Refresh Router'});
          this.user_data.status = true
        });
    },
    deleteRecord() {
      /* Below two lines are just for demo purpose */
      // this.$router.push({ name: "Engineer List" })
      // this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      this.$store
        .dispatch("userManagement/removeRecord", this.user_data.userID)
        .then((res) => {
          console.log(res)
          this.$router.push({ name: "Engineer List" });
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
  created() {
    // Register Module UserManagement Module
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule("userManagement", moduleUserManagement);
      moduleUserManagement.isRegistered = true;
    }

    const userId = this.$route.params.userId;
    this.$store
      .dispatch("userManagement/fetchUser", userId)
      .then((res) => {
        this.user_data = res.data.existUser;
      })
      .catch((err) => {
        if (err.response.status > 400) {
          this.user_not_found = true;
          return;
        }
        console.error(err);
      });
  },
  beforeCreate() {
    if (!this.$store.state.auth.isUserLoggedIn()) this.$router.push("/login");
    //  User Reward Card
  },
};
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }
}
</style>
