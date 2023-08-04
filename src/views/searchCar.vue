<!-- eslint-disable vue/multi-word-component-names -->
<template lang="">
  <div class="vl-parent">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <NavBar></NavBar>

    <div
      class="lg:flex lg:items-center lg:justify-center items-center mx-10 mt-10 content-center"
    >
      <div class="min-w-0 flex-1 items-center">
        <h2
          class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight items-center"
        >
          ค้นหารถแบบละเอียด
        </h2>
      </div>
    </div>

    <div
      class="card bg-gray-100 shadow-xl w-100 mx-10 mt-4"
      style="position: sticky; overflow-y: auto"
    >
      <div class="card-body">
        <div class="card-actions justify-center">
          <!-- <p class="text-xl">ค้นหารถ :</p> -->

          <div class="grid grid-cols-4 gap-4 mx-5">
            <div>
              <label for="">ประเภทรถ </label>
              <select
                class="select select-bordered w-full max-w-xs mt-1"
                v-model="cartype"
              >
                <option value="">ทั้งหมด</option>
                <option
                  v-for="y in cartypeOptions"
                  :key="y.index"
                  :value="y.car_type_id"
                >
                  {{ y.car_type_name }}
                </option>
              </select>
            </div>
            <div>
              <label for="" class="">ยี่ห้อรถที่ต้องการ</label>
              <select
                class="select select-bordered w-full max-w-xs mt-1"
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
                class="select select-bordered w-full max-w-xs mt-1"
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
              <label for="">สีรถ </label>
              <select
                class="select select-bordered w-full max-w-xs mt-1"
                v-model="color_id"
              >
                <option value="">ทั้งหมด</option>
                <option
                  v-for="m in colorOptios"
                  :key="m.color_id"
                  :value="m.color_id"
                >
                  {{ m.color_name }}
                </option>
              </select>
            </div>

            <div>
              <label for="">ปีรถ </label>
              <select
                class="select select-bordered w-full max-w-xs mt-1"
                v-model="year"
              >
                <option value="">ทั้งหมด</option>
                <option v-for="y in yearOptions" :key="y.index" :value="y">
                  {{ y }}
                </option>
              </select>
            </div>

            <div>
              <label for="">เกียร์ </label>
              <select
                class="select select-bordered w-full max-w-xs mt-1"
                v-model="gear"
              >
                <option value="">ทั้งหมด</option>
                <option v-for="m in gearOptions" :key="m.gear" :value="m.gear">
                  {{ m.name_th }}
                </option>
              </select>
            </div>

            <div>
              <label for="">ประเภทเชื้อเพลิง </label>
              <select
                class="select select-bordered w-full max-w-xs mt-1"
                v-model="oiltype"
              >
                <option value="">ทั้งหมด</option>
                <option
                  v-for="m in oiltypeOptions"
                  :key="m.oil_type"
                  :value="m.oil_type"
                >
                  {{ m.oil_type }}
                </option>
              </select>
            </div>

            <div>
              <label for=""> ขับเคลื่อน </label>
              <select
                class="select select-bordered w-full max-w-xs mt-1"
                v-model="drive_system"
              >
                <option value="">ทั้งหมด</option>
                <option
                  v-for="m in driveSystemOptions"
                  :key="m.system"
                  :value="m.system"
                >
                  {{ m.name_th }}
                </option>
              </select>
            </div>

            <div>
              <label for="">ราคาเรื่มต้น </label>
              <input
                v-model="startPrice"
                type="number"
                min="0"
                placeholder="ราคาเรื่มต้น"
                class="input input-bordered w-full max-w-xs mt-1"
              />
            </div>
            <div>
              <label for="">ราคาสูงสุด </label>
              <input
                v-model="maxPrice"
                type="number"
                :min="startPrice"
                placeholder="ราคาสูงสุด"
                class="input input-bordered w-full max-w-xs mt-1"
              />
            </div>

            <div>
              <label for=""> </label><br />
              <button
                class="btn btn-active btn-success mt-1"
                @click="getVehicles()"
              >
                ค้นหารถ
              </button>
            </div>
            <div>
              <h2 class="mt-10">ค้นพบ : {{ tbDetails.total }} รายการ</h2>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 mx-10 mt-5">
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
    <div class="grid grid-cols-1 gap-4 mx-5 justify-center mt-10">
      <div class="join" v-if="tbDetails.last_page > 1">
        <button
          :class="activePage(index, page)"
          v-for="index in tbDetails.last_page"
          :key="index"
          @click="cPage(index)"
        >
          {{ index }}
        </button>
      </div>
    </div>

    <!-- <div class="carousel carousel-center rounded-box h-1/4">
      <div class="carousel-item h-1/4">
      </div>
    </div> -->
    <!-- {{ pdData[0] }} -->
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
      colorOptios: [],
      oiltypeOptions: [
        {
          oil_type: "เบนซิล",
        },
        {
          oil_type: "ดีเซล",
        },
        {
          oil_type: "แก๊ส",
        },
      ],
      gearOptions: [
        {
          gear: "AT",
          name_th: "เกียร์อัดโนมัติ",
        },
        {
          gear: "MT",
          name_th: "เกียร์กระปุก",
        },
      ],
      cartypeOptions: [],
      driveSystemOptions: [
        {
          system: "2",
          name_th: "ขับ 2",
        },
        {
          system: "4",
          name_th: "ขับ 4",
        },
      ],

      cartype: "",
      startPrice: 0,
      maxPrice: "",
      mileage: "",
      license_plate: "",
      drive_system: "",
      oiltype: "",
      // fullPage: true,

      isLoading: false,
      fullPage: true,

      page: 1,

      brand_id: "",
      model_id: "",
      year: "",
      price: "",
      color_id: "",
      gear: "",

      tbDetails: [],
    };
  },
  created() {
    this.getBrand();
    this.getVehicles();
    this.getColors();
    this.getCarTypes();
    this.yearOptions = this.years();
    // console.log(this.yearOptions);
  },
  methods: {
    cPage(index) {
      this.page = index;
      this.getVehicles();
    },
    activePage(index, page) {
      if (index == page) {
        return "join-item btn btn-active";
      } else {
        return "join-item btn";
      }
    },
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 1999 },
        (value, index) => 2000 + index
      );
    },
    getCarTypes() {
      this.isLoading = true;
      axios
        .get("api/master/cartype")
        .then((res) => {
          this.cartypeOptions = res.data.data;
          // console.log(this.cartypeOptions);
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getColors() {
      this.isLoading = true;
      axios
        .get("api/master/color")
        .then((res) => {
          this.colorOptios = res.data.data;
          // console.log(this.colorOptios);
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
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
          console.log(error);
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
          console.log(error);
        });
    },
    getVehicles() {
      this.isLoading = true;
      axios
        .get("api/search/vehicles", {
          params: {
            page: this.page,
            cartype: this.cartype,
            brand_id: this.brand_id,
            model_id: this.model_id,
            year: this.year,
            gear: this.gear,
            color_id: this.color_id,
            startPrice: this.startPrice,
            maxPrice: this.maxPrice,
            mileage: this.mileage,
            license_plate: this.license_plate,
            drive_system: this.drive_system,
            oiltype: this.oiltype,
          },
        })
        .then((res) => {
          this.pdData = res.data.data.data;
          this.tbDetails = res.data.data;
          // console.log(this.pdData);
          this.isLoading = false;
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang=""></style>
