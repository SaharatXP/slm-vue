<!-- eslint-disable vue/multi-word-component-names -->
<template lang="">
  <div class="vl-parent">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <NavBar></NavBar>
    <img src="../assets/slide/1.jpeg" alt="หน้าปก" class="h-1/6" />

    <div class="card bg-gray-100 shadow-xl w-100 mx-10 mt-4">
      <div class="card-body">
        <div class="card-actions justify-center">
          <!-- <p class="text-xl">ค้นหารถ :</p> -->
          <div class="grid grid-cols-5 gap-4 mx-5">
            <div>
              <label for="">ยี่ห้อรถ </label>
              <select
                class="select select-bordered w-full max-w-xs"
                v-model="brand_id"
                @change="getModel()"
              >
                <option value="">ทั้งหมด</option>
                <option
                  v-for="b in brandOptions"
                  :key="b.brand_id"
                  :value="b.brand_id"
                >
                  {{ b.brand_name }}
                </option>
              </select>
            </div>
            <div>
              <label for="">รุ่นรถ </label>
              <select
                class="select select-bordered w-full max-w-xs"
                v-model="model_id"
              >
                <option value="">ทั้งหมด</option>
                <option
                  v-for="m in modelOptions"
                  :key="m.model_id"
                  :value="m.model_id"
                >
                  {{ m.model_name }}
                </option>
              </select>
            </div>

            <div>
              <label for="">ปีรถ </label>
              <select
                class="select select-bordered w-full max-w-xs"
                v-model="year"
              >
                <option value="">ทั้งหมด</option>
                <option v-for="y in yearOptions" :key="y.index" :value="y">
                  {{ y }}
                </option>
              </select>
            </div>

            <div>
              <label for="">ราคาไม่เกิน </label>
              <input
                v-model="price"
                type="text"
                placeholder="ราคา"
                class="input input-bordered w-full max-w-xs"
              />
            </div>

            <div>
              <label for=""> </label><br />
              <button class="btn btn-active btn-neutral" @click="getVehicles()">
                ค้นหารถ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 mx-10">
      <div
        class="card card-compact bg-base-100 shadow-xl mt-3 hover:bg-gray-100"
        v-for="d in pdData"
        :key="d.vehicle_id"
      >
        <router-link :to="{ path: `/vehicle/${d.vehicle_id}` }">
          <span class="indicator-item badge badge-success">รถใหม่</span>
          <figure>
            <img src="../assets/logo.png" alt="" v-if="!d.img" class="w-60" />
            <!-- <img src="../assets/logo.png" alt="" v-if="!d.img.img_path" /> -->
            <img
              :src="'http://127.0.0.1:8000/images/' + d.img.img_path"
              alt=""
              v-else
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{{ d.brand_name }} {{ d.model_name }}</h2>
            <hr />
            <p>
              <b> ทะเบียน :</b> {{ d.license_plate }} <br />
              เลขไมล์ : {{ d.mileage.toLocaleString() }} <br />
              ปี : {{ d.year }} <br />
              สีรถ : {{ d.color_name }} <br />
              เกียร์ : {{ d.gear }} <br />
            </p>
            <div class="card-actions justify-end text-red-700">
              <del>ราคา : {{ d.price.toLocaleString() }} บาท</del>
              <!-- <button class="btn btn-primary">Buy Now</button> -->
            </div>
            <div class="card-actions justify-end text-xl text-green-700">
              ราคา : {{ d.total_price.toLocaleString() }} บาท
              <!-- <button class="btn btn-primary">Buy Now</button> -->
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import "vue-loading-overlay/dist/css/index.css";
// import Loading from "vue-loading-overlay";
import Loading from "vue-loading-overlay";

import NavBar from "../components/NavBar.vue";
export default {
  components: {
    NavBar,
    // Loading,
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

      page: 1,

      brand_id: "",
      model_id: "",
      year: "",
      price: "",
    };
  },
  created() {
    this.getBrand();
    this.getVehicles();
    this.yearOptions = this.years();
    // console.log(this.yearOptions);
  },
  methods: {
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 1999 },
        (value, index) => 2000 + index
      );
    },
    getModel() {
      this.isLoading = true;
      axios
        .get("api/master/model", {
          params: {
            brand_id: this.brand_id,
          },
        })
        .then((res) => {
          this.modelOptions = res.data.data;
          // console.log(this.modelOptions);
          this.isLoading = false;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            // console.log(error);
            this.$router.push("/login");
          } else {
            // console.log(error);
          }
        });
    },
    getBrand() {
      this.isLoading = true;
      axios
        .get("api/master/brand")
        .then((res) => {
          this.brandOptions = res.data.data;
          // console.log(this.brandOptions);
          this.isLoading = false;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            // console.log(error);
            this.$router.push("/login");
          } else {
            // console.log(error);
          }
        });
    },
    getVehicles() {
      this.isLoading = true;
      axios
        .get("api/vehicles", {
          params: {
            page: this.page,
            brand_id: this.brand_id,
            model_id: this.model_id,
            year: this.year,
            price: this.price,
          },
        })
        .then((res) => {
          this.pdData = res.data.data.data;
          // console.log(this.pdData);
          this.isLoading = false;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            // console.log(error);
            this.$router.push("/login");
          } else {
            // console.log(error);
          }
        });
    },
  },
};
</script>
<style lang=""></style>
