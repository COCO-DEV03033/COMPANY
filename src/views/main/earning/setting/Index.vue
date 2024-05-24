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

          <div :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
            <feather-icon
              icon="EditIcon"
              svgClasses="h-5 w-5 mr-4 text-primary cursor-pointer"
              @click="editPrompt(data[indextr])"
            />
            <!-- <feather-icon
              icon="Trash2Icon"
              svgClasses="h-5 w-5 text-danger cursor-pointer"
              @click="confirmDeleteRecord(data[indextr])"
            /> -->
          </div>

          </vs-td>
          <vs-prompt
            title="Edit Year&Month"
            accept-text= "Save"
            cancel-text = "Cancel"
            button-cancel = "border"
            @cancel="val = ''"
            @accept="editYearMonth"
            @close="close"
            :active.sync="isEditPrompt"
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
                  v-model="edit_yearmonth"
                ></datepicker>
              </div>
              <div class="w-full bg-grid-color">
                <label class="text-sm opacity-75">Start Date</label>
                <datepicker
                  :format="start_dateformat"
                  class="w-full"
                  size="large"
                  v-model="edit_start_date"
                />
              </div>
              <div class="w-full bg-grid-color">
                <label class="text-sm opacity-75">End Date</label>
                <datepicker
                  :format="end_dateformat"
                  class="w-full"
                  size="large"
                  v-model="edit_end_date"
                />
              </div>
            </div>
          </vs-prompt>
        </vs-tr>
      </template>
    </vs-table>
    <vs-prompt
      title="Add Year&Month"
      accept-text= "Add"
      cancel-text = "Cancel"
      button-cancel = "border"
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
          <datepicker
            :format="start_dateformat"
            class="w-full"
            size="large"
            v-model="start_date"
          />
        </div>
        <div class="w-full bg-grid-color">
          <label class="text-sm opacity-75">End Date</label>
          <datepicker
            :format="end_dateformat"
            class="w-full"
            size="large"
            v-model="end_date"
          />
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
      start_date: new Date(),
      end_date: new Date(),
      yearmonth: new Date(),

      edit_id: null,
      edit_start_date: null,
      edit_end_date: null,
      edit_yearmonth: null,

      activePrompt: false,
      isEditPrompt: false,
      
      delete_id: null,
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
    editPrompt(data) {
      const [year, month] = data.yearmonth.split("-");
      const [start_month, start_day] = data.start_date.split("-");
      const [end_month, end_day] = data.end_date.split("-");

      this.edit_id = data._id;
      this.edit_yearmonth = data.yearmonth;
      this.edit_start_date = new Date(`${year}-${start_month}-${start_day}`);
      this.edit_end_date = new Date(`${year}-${end_month}-${end_day}`);
      this.isEditPrompt = true;
    },
    async editYearMonth() {
      const payload = {
        _id: this.edit_id,
        year: new Date(this.edit_yearmonth).getFullYear(),
        month: new Date(this.edit_yearmonth).getMonth() + 1,
        start_date: `${
          this.edit_start_date.getMonth() + 1
        }-${this.edit_start_date.getDate()}`,
        end_date: `${this.edit_end_date.getMonth() + 1}-${this.edit_end_date.getDate()}`,
        notify: this.$vs.notify,
      };
      await this.$store.dispatch("earningManagement/updateYearMonth", payload);
      this.$router.go(0);
    },

    updateData(datas, inputData) {
      return datas.map((item) => {
        if (item._id === inputData._id) {
          return { ...item, ...inputData };
        }
        return item;
      });
    },

    confirmDeleteRecord(data) {
      this.delete_id = data._id
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Confirm Delete",
        text: `Are you really delete "${data.yearmonth}"`,
        accept: this.deleteRecord,
        acceptText: "Delete",
      });
    },
    async deleteRecord() {
      const payload = {
        _id: this.delete_id,
      };
      await this.$store.dispatch("earningManagement/removeRecord", payload);
      this.$vs.$forceUpdate();
    },

    close() {
      this.$vs.notify({
        color: "danger",
        title: "Closed",
        text: "You close a dialog!",
      });
    },
  },
  mounted() {},
  beforeCreate() {
    if (!moduleEarningManagement.isRegistered) {
      this.$store.registerModule("earningManagement", moduleEarningManagement);
      moduleEarningManagement.isRegistered = true;
    }
    const payload = {
      year: new Date().getFullYear(),
      notify: this.$vs.notify,
    };
    this.$store
      .dispatch("earningManagement/fetchYearMonths", payload)
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
