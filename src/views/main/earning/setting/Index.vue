
<template>
    <vx-card title="Date Setting">
        <div class="grid-layout-container alignment-block mb-4">
          <vs-row vs-type="flex" vs-w="12" vs-justify="flex-end">
            <vs-button icon-pack="feather"  @click="activePrompt = true" icon="icon-plus" >Add</vs-button>
          </vs-row>
        </div>
      <vs-table :data="dates">
          <template slot="thead">
              <vs-th sort-key="_id">Nro</vs-th>
              <vs-th sort-key="yearmonth">Year/ Month</vs-th>
              <vs-th sort-key="start_date">Start Date</vs-th>
              <vs-th sort-key="end_date">End Date</vs-th>
              <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{data}">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr]._id">
                      {{data[indextr]._id}}
                  </vs-td>
                  <vs-td :data="data[indextr].yearmonth">
                      {{data[indextr].yearmonth}}
                  </vs-td>
                  <vs-td :data="data[indextr].start_date">
                      {{data[indextr].start_date}}
                  </vs-td>
                  <vs-td :data="data[indextr].end_date">
                      {{data[indextr].end_date}}
                  </vs-td>
                  <vs-td>
                    <div class="grid-layout-container alignment-block">
                      <vs-row
                        vs-type="flex" vs-w="12">
                        <vs-button color="primary" type="filled">Edit</vs-button>
                      </vs-row>
                    </div>
                  </vs-td>
              </vs-tr>
          </template>
      </vs-table>

      <vs-prompt
        @cancel="val=''"
        @accept="acceptAlert"
        @close="close"
        :active.sync="activePrompt">
        <div class="vx-row">
          <div class="w-full">
            <label class="text-sm opacity-75">Year & Month</label>
              <datepicker :minimumView="'month'" :maximumView="'year'" :format="format" v-model="date"></datepicker>
          </div>
          <div class="w-full">
            <label class="text-sm opacity-75">Start Date</label>
            <flat-pickr v-model="start_date" />
          </div>
          <div class="w-full">
            <label class="text-sm opacity-75">End Date</label>
            <flat-pickr v-model="end_date" />
          </div>
          </div>

        <!-- <div class="con-exemple-prompt">
          <span>Enter the security code</span>
          <vs-input placeholder="Code" vs-placeholder="Code" v-model="val" class="mt-3 w-full" />
        </div> -->
    </vs-prompt>

    </vx-card>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

import dates  from "./date.json";
export default {
  data () {
    return {
      format: "yyyy-MM",      
      start_date: '2024-04-26',
      end_date: '2024-05-26',
      date:"2024-05",
      dates,
      activePrompt:false,
    }
  },
  methods:{
    acceptAlert () {

      // this.$store.dispatch('earningManagement/fetchEarings')
      // .then((res) => {
      //   console.log('res',res.data.earnings);
      //   this.incomes = res.data.earnings;
      // })
      // .catch((err) => {
      //   this.user_not_found = true;
      //   return;
      //   console.error(err);
      // });

      this.$vs.notify({
        color:'success',
        title:'Accept Selected',
        text:'Lorem ipsum dolor sit amet, consectetur'
      })
    },
    close () {
      this.$vs.notify({
        color:'danger',
        title:'Closed',
        text:'You close a dialog!'
      })
    },
  },
  components: {
    flatPickr,
    Datepicker
  },
}
</script>
