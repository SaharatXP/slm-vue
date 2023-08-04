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
      <div class="mx-10">หน้าหลัก > โปรโมชั่น</div>
      <img src="../assets/promotionmock/mock1.png" alt="หน้าปก" class="h-1/6" />

      <div class="card-body"></div>
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
      pdData: [],
      brandOptions: [],
      modelOptions: [],
      yearOptions: [],
      isLoading: false,
      fullPage: true,
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
    // this.getVehicles();
  },
  methods: {
    getVehicles() {
      this.isLoading = true;
      axios
        .get("api/vehicle", {
          params: {
            vehicle_id: this.$route.params.vehicle_id,
          },
        })
        .then((res) => {
          this.img = res.data.data.img;

          this.pdData = res.data.data.master;
          //   this.img = res.data.img;
          // console.log(this.pdData);
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
