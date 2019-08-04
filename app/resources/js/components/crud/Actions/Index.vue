<template>
  <div>
    <sidebar></sidebar>
    <div class="divMinSideabar ml-64">
      <div
        class="float-left relative bg-white m-6 px-6 pt-12 pb-6 w-full h-32 shadow-lg rounded-lg"
      >
        <a
          href="#"
          @click.prevent="pushData()"
          v-bind:class="(sensors.temp == 0)?'gradGreen text-white':'bg-transparent text-green'"
          class="block float-left rounded-full w-20 h-20 flex items-center justify-center border border-green"
        >
          <i class="block fas fa-thermometer-quarter mt-2 text-4xl"></i>
        </a>

        <div class="h-32 mx-16 float-left">
          <h1 class="text-3xl">Temperature</h1>
          <h1
            class
          >Plugs labeled as a temperatue devices will go off/on after the degrees go above 27°C</h1>
          <p class="text-dimmedTxt">Temperature devices:</p>
        </div>
      </div>

      <div
        class="float-left relative bg-white m-6 px-6 pt-12 pb-6 w-full h-32 shadow-lg rounded-lg"
      >
        <a
          href="#"
          class="block text-green float-left rounded-full w-20 h-20 flex items-center justify-center border border-green"
        >
          <i class="block far fa-lightbulb mt-2 text-4xl"></i>
        </a>

        <div class="h-32 mx-16 float-left">
          <h1 class="text-3xl">Lights</h1>
          <p class>
            Plugs labeled as a light devices will go off/on after the total of devices go above
            100.000 kW
          </p>
          <p class="text-dimmedTxt">Light devices:</p>
        </div>
      </div>
      <div
        class="float-left relative bg-white m-6 px-6 pt-12 pb-6 w-full h-32 shadow-lg rounded-lg"
      >
        <a
          href="#"
          class="block text-green float-left rounded-full w-20 h-20 flex items-center justify-center border border-green"
        >
          <i class="block fas fa-bolt mt-2 text-4xl"></i>
        </a>

        <div class="h-32 mx-16 float-left">
          <h1 class="text-3xl">Extention cord</h1>
          <p
            class
          >Plugs labeled as extention cables will be trurned off when they reach a low of 50kW/h</p>
          <p class="text-dimmedTxt">Extention cords:</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../../partials/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Outlet from "../../../services/Outlet/Outlet";
import axios from "axios";
import db from "../../../config/firebaseInit";

export default {
  name: "actions",

  components: {
    Sidebar,
    FontAwesomeIcon
  },

  data() {
    return {
      sensors: {
        temp: 0,
        lights: 0,
        cords: 0
      }
    };
  },
  mounted() {},
  created() {

    this.checkTemp();
    setInterval(this.checkTemp, 1000);
  },

  methods: {
    checkTemp() {
      axios
        .request({
          baseURL: "https://wot-2ex.firebaseio.com/temp/value.json",
          method: "get"
        })
        .then(res => {
          console.log(res);

          if (res <= "27") {
            this.sensors.temp = 1;
          }
        });
    },
       checkCord() {


      
    }
  }
};
</script>
