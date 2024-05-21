<template>
  <div>
    <div class="mb-8">
      <import-excel :onSuccess="loadDataInTable" />
    </div>
    <vs-row class="mb-3" vs-type="flex" vs-justify="flex-end">
      <vs-col :key="index" vs-type="flex" vs-justify="center" vs-align="center" vs-w="1">
        <vs-button color="primary" type="filled" @click="updateUserData">Update</vs-button>
      </vs-col>
    </vs-row>
    <vx-card v-if="tableData.length && header.length">
      <vs-table stripe pagination :max-items="10" search :data="tableData">
        <template slot="header">
          <h4>{{ sheetName }}</h4>
        </template>

        <template slot="thead">
          <vs-th :sort-key="heading" v-for="heading in header" :key="heading">{{ heading }}</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="col" v-for="(col, indexcol) in data[indextr]" :key="indexcol + col">
              {{ col }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>

<script>
import ImportExcel from '@/components/excel/ImportExcel.vue'

export default {
  components: {
    ImportExcel
  },
  data () {
    return {
      tableData: [],
      header: [],
      sheetName: ''
    }
  },
  methods: {
    loadDataInTable ({ results, header, meta }) {
      this.header = header
      this.tableData = results
      this.sheetName = 'Imported Users'
    },
    updateUserData () {
        const payload = {
          userData:this.tableData
      }
      this.$store.dispatch('auth/importUser', payload)
        .then((res) => { this.$vs.loading.close() })
        .catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    },
  },
  beforeCreate() {
    if (!this.$store.state.auth.isUserLoggedIn()) this.$router.push('/login');
    //  User Reward Card
  }
}
</script>
