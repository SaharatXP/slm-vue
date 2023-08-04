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
            <div class="flex flex-row text-xl mt-4">
              <Icon icon="ion:id-card" class="text-xxl mt-1" /> &nbsp;ทะเบียน :
              {{ pdData.license_plate }}
            </div>

            <div class="flex flex-row text-xl">
              <Icon
                icon="iconamoon:number-1-circle-fill"
                class="text-xxl mt-1"
              />
              &nbsp;เลขไมล์ :
              {{ pdData.mileage }}
            </div>

            <div class="flex flex-row text-xl">
              <Icon icon="iconamoon:calendar-2-fill" class="text-xxl mt-1" />
              &nbsp;ปี : {{ pdData.year }}
            </div>
            <div class="flex flex-row text-xl">
              <Icon icon="mdi:color" class="text-xxl mt-1" />&nbsp;สีรถ :
              {{ pdData.color_name }}
            </div>
            <div class="flex flex-row text-xl">
              <Icon icon="octicon:gear-16" class="text-xxl mt-1" />
              &nbsp;เกียร์ : {{ pdData.gear }}
            </div>
            <div class="flex flex-row text-xl">
              <Icon
                icon="mdi:oil"
                class="text-xxl mt-1"
              />&nbsp;ประเภทเชื้อเพลิง : {{ pdData.oil_type }}
            </div>
            <div class="flex flex-row text-xl">
              <Icon icon="solar:wheel-broken" class="text-xxl mt-1" />
              &nbsp;ระบบการขับเคลื่อน :
              {{ !pdData.drive_system ? "-" : pdData.drive_system }} ล้อ
            </div>
            <div class="flex flex-row text-xl">
              <Icon icon="ic:outline-grade" class="text-xxl mt-1" />
              &nbsp;เกรดรถ : A
            </div>

            <h2 class="card-actions justify-end text-red-700">
              <del>ราคา : {{ pdData.price }} บาท</del>
            </h2>
            <div class="card-actions justify-end text-xl text-green-700">
              ราคา : {{ pdData.total_price }} บาท
            </div>

            <div class="card-actions justify-end text-xl mt-5">
              <button
                class="btn btn-success text-white text-xl"
                onclick="my_modal_1.showModal()"
              >
                ติดต่อสามเหลี่ยมออโต้
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <dialog id="my_modal_1" class="modal">
    <form method="dialog" class="modal-box">
      <h3 class="font-bold text-xl">ติดต่อเซลล์ {{ pdData.saleName }}</h3>
      <p class="py-4 text-xl">
        Line: @slmkk<br />
        โทร: {{ pdData.saleTel }}
      </p>
      <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">ปิด</button>
      </div>
    </form>
  </dialog>
</template>
<script>
import axios from "axios";
import "vue-loading-overlay/dist/css/index.css";
import Loading from "vue-loading-overlay";
import { Icon } from "@iconify/vue";
import NavBar from "../components/NavBar.vue";
export default {
  components: {
    NavBar,
    Loading,
    Icon,
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
