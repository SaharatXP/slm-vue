<!-- eslint-disable vue/multi-word-component-names -->
<template lang="">
  <div class="vl-parent">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <NavBar></NavBar>

    <div class="card card-compact bg-base-100 shadow-xl mx-10 mt-10">
      <div class="mx-10">หน้าหลัก > ติดต่อสามเหลี่ยมออโต้</div>

      <div class="card-body">
        Google Maps:
        <GMapMap
          :center="{ lat: 51.093048, lng: 6.84212 }"
          :zoom="7"
          map-type-id="terrain"
          style="width: 100vw; height: 500px"
        >
        </GMapMap>
        <hr class="mt-3" />
        <div class="text-2xl text-center mb-5">เซลล์</div>

        <div class="grid grid-cols-5 gap-4 text-center">
          <div v-for="u in saleData" :key="u">
            <div class="avatar text-center">
              <div class="w-24 rounded-full">
                <img src="../assets/avatar.png" />
              </div>
            </div>
            <div class="text-center">
              {{ u.fname }} {{ u.lname }} ( เซลล์{{ u.saleName }} ) <br />
              โทร : {{ u.saleTel }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import "vue-loading-overlay/dist/css/index.css";
import Loading from "vue-loading-overlay";

import NavBar from "../components/NavBar.vue";
export default {
  components: {
    NavBar,
    Loading,
  },
  data() {
    return {
      data: [],
      authToken: "",
      saleData: [],
      brandOptions: [],
      modelOptions: [],
      yearOptions: [],
      isLoading: false,
      fullPage: true,
      center: { lat: 51.093048, lng: 6.84212 },
      // fullPage: true,

      page: 1,
      img: [],

      brand_id: "",
      model_id: "",
      year: "",
      price: "",
    };
  },
  created() {
    this.getSales();
  },
  methods: {
    getSales() {
      this.isLoading = true;
      axios
        .get("api/sales", {
          params: {
            page: 1,
          },
        })
        .then((res) => {
          this.img = res.data.data.img;
          this.saleData = res.data.data.master.data;
          // console.log(this.saleData);
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang=""></style>
