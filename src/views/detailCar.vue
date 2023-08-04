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
      <div class="mx-10">
        หน้าหลัก > รายการรถขาย > {{ pdData.brand_name }} {{ pdData.model_name }}
      </div>
      <!-- :src="'http://127.0.0.1:8000/images/' + img" -->
      <div class="card-body">
        <div class="grid grid-cols-2 gap-4 mx-10">
          <div class="mx-0">
            <div class="carousel w-full" v-if="img.length < 1">
              <img src="../assets/logo.png" alt="" class="w-100" />
            </div>
            <div class="carousel w-full">
              <div
                :id="'slide' + index"
                class="carousel-item relative w-full"
                v-for="(i, index) in img"
                :key="index"
              >
                <img
                  :src="'http://127.0.0.1:8000/images/' + i.img_path"
                  class="w-100"
                />
                <div
                  class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
                >
                  <a :href="'#slide' + (index - 1)" class="btn btn-circle">❮</a>
                  <a :href="'#slide' + (index + 1)" class="btn btn-circle">❯</a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="text-[30px] text-green-700">
              {{ pdData.brand_name }} - {{ pdData.model_name }}
            </p>
            <p class="text-xl mt-5">
              <b> ทะเบียน :</b> {{ pdData.license_plate }} <br />
              เลขไมล์ : {{ pdData.mileage }} <br />
              ปี : {{ pdData.year }} <br />
              สีรถ : {{ pdData.color_name }} <br />
              เกียร์ : {{ pdData.gear }} <br />
              ประเภทเชื้อเพลิง : {{ pdData.oil_type }} <br />
              ระบบการขับเคลื่อน :
              {{ !pdData.drive_system ? "-" : pdData.drive_system }} ล้อ<br />
              เกรดรถ : A <br />
            </p>
            <h2 class="card-actions justify-end text-red-700">
              <del>ราคา : {{ pdData.price }} บาท</del>
            </h2>
            <div class="card-actions justify-end text-xl text-green-700">
              ราคา : {{ pdData.total_price }} บาท
            </div>

            <div class="card-actions justify-end text-xl mt-5">
              <button class="btn btn-success">ติดต่อสามเหลี่ยมออโต้</button>
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
    this.getVehicles();
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
