<template>
  <vx-card>
    <vs-prompt
      title="Export To Excel"
      class="export-options"
      @cancle="clearFields"
      @accept="exportToExcel"
      accept-text="Export"
      @close="clearFields"
      :active.sync="activePrompt"
    >
      <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
      <v-select v-model="selectedFormat" :options="formats" class="my-4" />
      <div class="flex">
        <span class="mr-4">Cell Auto Width:</span>
        <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
      </div>
    </vs-prompt>

    <div class="export-table">
      <vs-table :data="usersData" search>
        <template slot="header">
          <vs-button @click="activePrompt = true">Export</vs-button>
        </template>

        <template slot="thead">
          <vs-th> UserID </vs-th>
          <vs-th> Name </vs-th>
          <vs-th> status </vs-th>
          <vs-th> Organization </vs-th>
          <vs-th> Role </vs-th>
          <vs-th> Gender </vs-th>
          <vs-th> Date of Birthday </vs-th>
          <vs-th> Enter Date </vs-th>
          <vs-th> University </vs-th>
          <vs-th> Major Subject </vs-th>
          <vs-th> Old Job </vs-th>
          <vs-th> Tech Field </vs-th>
          <vs-th> Main Skill </vs-th>
          <vs-th> Tech level </vs-th>
          <vs-th> Language level </vs-th>
          <vs-th> Special </vs-th>
          <vs-th> Overview </vs-th>
          <vs-th> Created at </vs-th>
          <vs-th> Updated at </vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td>{{ data[indextr].userID }}</vs-td>
            <vs-td>{{ data[indextr].name }}</vs-td>
            <vs-td>{{ data[indextr].status }}</vs-td>
            <vs-td>{{ data[indextr].organization }}</vs-td>
            <vs-td>{{ data[indextr].role }}</vs-td>
            <vs-td>{{ data[indextr].gender }}</vs-td>
            <vs-td>{{ data[indextr].dob }}</vs-td>
            <vs-td>{{ data[indextr].enter_date }}</vs-td>
            <vs-td>{{ data[indextr].university }}</vs-td>
            <vs-td>{{ data[indextr].major_subject }}</vs-td>
            <vs-td>{{ data[indextr].old_job }}</vs-td>
            <vs-td>{{ data[indextr].tech_field }}</vs-td>
            <vs-td>{{ data[indextr].main_skill }}</vs-td>
            <vs-td>{{ data[indextr].tech_level }}</vs-td>
            <vs-td>{{ data[indextr].lang_level }}</vs-td>
            <vs-td>{{ data[indextr].special }}</vs-td>
            <vs-td>{{ data[indextr].overview }}</vs-td>
            <vs-td>{{ data[indextr].created_at }}</vs-td>
            <vs-td>{{ data[indextr].updated_at }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </vx-card>
</template>

<script>
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      fileName: '',
      formats: ['xlsx', 'csv', 'txt'],
      cellAutoWidth: true,
      selectedFormat: 'xlsx',
      headerTitle: [
        'UserID',
        'Name',
        'status',
        'Organization',
        'Role',
        'Gender',
        'Dob',
        'Enter_date',
        'University',
        'Major_subject',
        'Old_job',
        'Tech_field',
        'Main_skill',
        'Tech_level',
        'Lang_level',
        'Special',
        'Overview',
        'Created_at',
        'Updated_at'
      ],
      headerVal: [
        'userID',
        'name',
        'status',
        'organization',
        'role',
        'gender',
        'dob',
        'enter_date',
        'university',
        'major_subject',
        'old_job',
        'tech_field',
        'main_skill',
        'tech_level',
        'lang_level',
        'special',
        'overview',
        'created_at',
        'updated_at',
      ],
      activePrompt: false
    }
  },
  computed: {
    usersData () {
      return this.$store.state.userManagement.users
    }
  },
  methods: {
    
    exportToExcel() {
      import("@/vendor/Export2Excel").then((excel) => {
        const list = this.users;
        const data = this.formatJson(this.headerVal, list);
        excel.export_json_to_excel({
          header: this.headerTitle,
          data,
          filename: this.fileName,
          autoWidth: this.cellAutoWidth,
          bookType: this.selectedFormat
        })
        this.clearFields()
      });
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          // Add col name which needs to be translated
          // if (j === 'timestamp') {
          //   return parseTime(v[j])
          // } else {
          //   return v[j]
          // }

          return v[j]
        })
      )
    },
    clearFields () {
      this.filename = '';
      this.cellAutoWidth = true;
      this.selectedFormat = 'xlsx';
    },
  },
  created() {
    this.$store.dispatch('userManagement/fetchUsers').catch((err) => {
      console.error(err);
    });
  },
  beforeCreate() {
    if (!this.$store.state.auth.isUserLoggedIn()) this.$router.push('/login');
    //  User Reward Card
  },
};
</script>
