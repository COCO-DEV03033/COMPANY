<template>
  <vx-card title="Date Setting">
    <div class="grid-layout-container alignment-block mb-4">
      <vs-row vs-type="flex" vs-w="12" vs-justify="flex-end">
        <vs-button icon-pack="feather" @click="activePrompt = true" icon="icon-plus"
          >Add</vs-button
        >
      </vs-row>
    </div>
    <vs-table :data="yearmonths" v-if="yearmonths">
      <template slot="thead">
        <vs-th sort-key="_id">Nro</vs-th>
        <vs-th sort-key="yearmonth">Year/ Month</vs-th>
        <vs-th sort-key="start_date">Start Date</vs-th>
        <vs-th sort-key="end_date">End Date</vs-th>
        <vs-th>Action</vs-th>
      </template>
      <template slot-scope="{ data }">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr]._id">
            {{ data[indextr]._id }}
          </vs-td>
          <vs-td :data="data[indextr].yearmonth">
            {{ data[indextr].yearmonth }}
          </vs-td>
          <vs-td :data="data[indextr].start_date">
            {{ data[indextr].start_date }}
          </vs-td>
          <vs-td :data="data[indextr].end_date">
            {{ data[indextr].end_date }}
          </vs-td>
          <vs-td>
            <div class="grid-layout-container alignment-block">
              <vs-row vs-type="flex" vs-w="12">
                <vs-button color="primary" type="filled" @click="editPrompt(data[indextr])">Edit</vs-button>
              </vs-row>
            </div>
          </vs-td>
          <vs-prompt
            @cancel="val = ''"
            @accept="editYearMonth"
            @close="close"
            :active.sync="isEditPrompt"
          >
            <div class="flex flex-wrap">
              <div class="w-full bg-grid-color">
                <label class="text-sm opacity-75">Year & Month</label>
                <datepicker class="w-full" size="large" :minimumView="'month'" :maximumView="'year'" :format="yearmonthformat" v-model="edit_yearmonth"></datepicker>
              </div>
              <div class="w-full bg-grid-color">
                <label class="text-sm opacity-75">Start Date</label>
                <datepicker :format="start_dateformat" class="w-full" size="large" v-model="edit_start_date" />
              </div>
              <div class="w-full bg-grid-color">
                <label class="text-sm opacity-75">End Date</label>
                <datepicker :format="end_dateformat" class="w-full" size="large" v-model="edit_end_date" />
              </div>
            </div>
          </vs-prompt>
        </vs-tr>
      </template>
    </vs-table>
    <vs-prompt
      @cancel="val = ''"
      @accept="addYearMonth"
      @close="close"
      :active.sync="activePrompt"
    >
      <div class="flex flex-wrap">
        <div class="w-full bg-grid-color">
          <label class="text-sm opacity-75">Year & Month</label>
          <datepicker
            class="w-full"
            size="large"
            :minimumView="'month'"
            :maximumView="'year'"
            :format="yearmonthformat"
            v-model="yearmonth"
          ></datepicker>
        </div>
        <div class="w-full bg-grid-color">
          <label class="text-sm opacity-75">Start Date</label>
          <datepicker :format="start_dateformat" class="w-full" size="large" v-model="start_date" />
        </div>
        <div class="w-full bg-grid-color">
          <label class="text-sm opacity-75">End Date</label>
          <datepicker :format="end_dateformat" class="w-full" size="large" v-model="end_date" />
        </div>
      </div>
    </vs-prompt>
  </vx-card>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moduleEarningManagement from "@/store/earning-management/moduleEarningManagement.js";

export default {
  data() {
    return {
      yearmonthformat: "yyyy-MM",
      start_dateformat: "MM-dd",
      end_dateformat: "MM-dd",
      start_date: new Date,
      end_date: new Date,
      yearmonth: new Date(),
      
      edit_id: null,
      edit_start_date: null,
      edit_end_date: null,
      edit_yearmonth: null,
      
      activePrompt: false,
      isEditPrompt: false,
    };
  },
  computed: {
    yearmonths() {
      return this.$store.state.earningManagement.yearmonths;
    },
  },
  methods: {
    addYearMonth() {
      const payload = {
        year: this.yearmonth.getFullYear(),
        month: this.yearmonth.getMonth() + 1,
        start_date: `${this.start_date.getMonth() + 1}-${this.start_date.getDate()}`,
        end_date: `${this.end_date.getMonth() + 1}-${this.end_date.getDate()}`,
        notify: this.$vs.notify,
      };
      this.$store.dispatch("earningManagement/addYearMonth", payload);
    },
    editPrompt (data) {

      const [year,month] = data.yearmonth.split('-');
      const [start_month, start_day] = data.start_date.split('-');
      const [end_month, end_day] = data.end_date.split('-');

      this.edit_id = data._id
      this.edit_yearmonth = data.yearmonth
      this.edit_start_date = new Date(`${year}-${start_month}-${start_day}`)
      this.edit_end_date = new Date(`${year}-${end_month}-${end_day}`)
      this.isEditPrompt=true;
    },
    async editYearMonth() {

      const payload = {
        _id:this.edit_id,
        year: new Date(this.edit_yearmonth).getFullYear(),
        month: new Date(this.edit_yearmonth).getMonth() + 1,
        start_date: `${this.edit_start_date.getMonth() + 1}-${this.edit_start_date.getDate()}`,
        end_date: `${this.edit_end_date.getMonth() + 1}-${this.edit_end_date.getDate()}`,
        notify: this.$vs.notify,
      };
      await this.$store.dispatch("earningManagement/updateYearMonth", payload,);
      // await this.$store.dispatch("earningManagement/updateYearMonth", payload, this.updateData(this.yearmonths, payload));
    },

    updateData(datas, inputData) {
      return datas.map((item) => {
        if (item._id === inputData._id) {
          return { ...item, ...inputData };
        }
        return item;
      });
    },
    close() {
      this.$vs.notify({
        color: "danger",
        title: "Closed",
        text: "You close a dialog!",
      });
    },
  },
  mounted() {
  },
  beforeCreate() {
    if (!moduleEarningManagement.isRegistered) {
      this.$store.registerModule("earningManagement", moduleEarningManagement);
      moduleEarningManagement.isRegistered = true;
    }
    const payload = {
      year: new Date().getFullYear(),
      notify: this.$vs.notify,
    };
    this.$store.dispatch("earningManagement/fetchYearMonths", payload)
    .then((res) => {})
      .catch((err) => {
        this.user_not_found = true;
        return;
        console.error(err);
      });
  },
  components: {
    flatPickr,
    Datepicker,
  },
};
</script>
