<template>
  <div>
    <sidebar></sidebar>
    <div class="divMinSideabar ml-64">



      <div class="float-left relative bg-white m-6 px-6 pt-12 pb-6 w-full h-auto shadow-lg rounded-lg">
        <a
          href="#"
         
          :class="(sensors.temp == 0) ? 'text-bootstrapGrey border-bootstrapGrey' : (!switches.temp == 0) ? 'gradGreen text-white':'bg-transparent text-green border-green'"

          class="block float-left rounded-full w-20 h-20 flex items-center justify-center border cursor-default">

          <i class="block fas fa-thermometer-quarter mt-2 text-4xl"></i>

        </a>

        <div class="h-32 ml-16 float-left w-1/2 h-auto">
          <h1 class="text-3xl">Temperature</h1>
          <p class="mb-4">Plugs labeled as a temperatue devices will go off/on after the degrees go <span class="font-semibold text-green">above 27°C</span> </p>
         
          <ul class="text-dimmedTxt pt-3 border-t border-bootstrapGrey">
              <li v-if="temps.length" v-for="temp in temps">
                    <span class="inline-block text-xxs pr-3 pb-1 align-middle"> &#9679; </span> {{ temp }}
                </li>
               
              </ul>
          </div>
            
        <div class="text-right float-right w-1/6">
         <label class="text-3xl" :class="(sensors.temp == 1) ?'text-dimmedTxt':'text-bootstrapGrey'" for="temp">{{temp}} °C </label>
             <input class="" id="temp" type="hidden" v-model="temp">
              <input class="" id="tempSensors" type="hidden" v-model="sensors.temp">


             <a  @click.prevent="toggleSensor('temp', sensors.temp)"
              :class="(temps.length) ? 'cursor-pointer hover:bg-gray-100 text-gray-800 border-gray-400' : 'text-bootstrapGrey border-bootstrapGrey cursor-default'"
              class="block w-26 text-center bg-white mt-2 py-1 border rounded-full shadow no-underline text-sm"> 
              <span v-if="sensors.temp == 1">Disable sensor</span>
              <span v-if="sensors.temp == 0">Enable sensor</span>

              </a>
        </div>

      </div>




      <div class="float-left relative bg-white m-6 px-6 pt-12 pb-6 w-full h-auto shadow-lg rounded-lg">
        <a href="#" v-bind:class="(!sensors.lights == 0) ? 'text-green border-green':'text-bootstrapGrey border-bootstrapGrey'" class="block float-left rounded-full w-20 h-20 flex items-center justify-center border cursor-default">
          <i class="block far fa-lightbulb mt-2 text-4xl"></i>
        </a>

        <div class="h-32 ml-16 float-left w-1/2 h-auto">
          <h1 class="text-3xl">Lights</h1>
          <p class="mb-4">
            Plugs labeled as a light devices will go off/on when it's <span class="font-semibold text-green">dark or light</span>
          </p>

           <ul class="text-dimmedTxt pt-3 border-t border-bootstrapGrey">
              <li v-if="lights.length" v-for="light in lights">
                    <span class="inline-block text-xxs pr-3 pb-1 align-middle"> &#9679; </span> {{ light }}
                </li>
               
              </ul>
          </div>

           
        <div class="text-right float-right w-1/6">
         <label class="text-3xl" :class="(sensors.lights == 1) ?'text-dimmedTxt':'text-bootstrapGrey'"> 
           <i class="fas fa-sun"></i>
          </label>
              <input class="" id="light" type="hidden" v-model="sensors.lights">

             <!-- <input class="" type="hidden"> -->
             <a @click.prevent="toggleSensor('light', sensors.lights)"
              :class="(lights.length) ? 'cursor-pointer hover:bg-gray-100 text-gray-800 border-gray-400' : 'text-bootstrapGrey border-bootstrapGrey cursor-default'"
              class="block w-26 text-center bg-white mt-2 py-1 border rounded-full shadow no-underline text-sm">

              <span v-if="sensors.lights == 0">Enable sensor</span>
              <span v-if="sensors.lights == 1">Disable sensor</span>
              </a>

        </div>
      </div>




      <div class="float-left relative bg-white m-6 px-6 pt-12 pb-6 w-full h-auto shadow-lg rounded-lg">
        <a href="#" v-bind:class="(!sensors.cords == 0) ? 'text-green border-green':'text-bootstrapGrey border-bootstrapGrey'" class="block float-left rounded-full w-20 h-20 flex items-center justify-center border cursor-default">
          <i class="block fas fa-bolt mt-2 text-4xl"></i>
        </a>
        <div class="h-32 ml-16 float-left w-1/2 h-auto">
          <h1 class="text-3xl">Extention cables</h1>
          <p class="mb-4">Plugs labeled as extention cables will be turned off when they reach <span class="font-semibold text-green">a low of 50kW/h</span></p>

           <ul class="text-dimmedTxt pt-3 border-t border-bootstrapGrey">
              <li v-if="cords.length" v-for="cord in cords">
                    <span class="inline-block text-xxs pr-3 pb-1 align-middle"> &#9679; </span> {{ cord }}
                </li>

            </ul>

        </div>

        <div class="text-right float-right w-1/6">
         <label :class="(sensors.cords == 1) ?'text-dimmedTxt':'text-bootstrapGrey'" class=" text-3xl" for="cord" > {{cord}} W</label>
             <input class="" id="cord" type="hidden" v-model="cord">
             <input class="" id="cordSensors" type="hidden" v-model="sensors.cords">


             <a @click.prevent="toggleSensor('cord',sensors.cords)"
              :class="(cords.length) ? 'cursor-pointer hover:bg-gray-100 text-gray-800 border-gray-400' : 'text-bootstrapGrey border-bootstrapGrey cursor-default'"
              class="block w-26 text-center bg-white mt-2 py-1 border rounded-full shadow no-underline text-sm">             
               <span v-if="sensors.cords == 0">Enable sensor</span>
              <span v-if="sensors.cords == 1">Disable sensor</span>
              </a>
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
      temps: [],
      lights: [],
      cords: [],

      temp: '',

      sensors: {
        temp: 0,
        lights: 0,
        cords: 0
      },

      switches: {
        temp: 0,
        lights: 0,
        cords: 0
      }
    };
  },
  mounted() {},
  created() {
    this.checkTemp();
    this.getLists();
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
          //this.temp = res.data

          //this.sensors.temp = 1;
          //this.sensors.temp = 0;

        /*   if (res <= "27") {
            axios
              .request({
                baseURL: "http://localhost:8000/api/v1/devices",
                method: "get"
              })
              .then(res => {
                this.sensors.temp = 1;
              });
          } */
        });
    },
    checkCord() {},
    toggleSensor(type, status) {

                          if (type == 'temp') {
                              if(status == 0){
                                  this.sensors.temp = 1
                              } else {
                                  this.sensors.temp = 0


                              }
                          
                            } else if(type == 'light'){


                               if(status == 0){
                                  this.sensors.lights = 1
                                  

                              } else {

                                  this.sensors.lights = 0


                              }
                                  

                            } else if(type == 'cord'){
                              console.log('type == cord')

                               if(status == 0){
                                  this.sensors.cords = 1 
                              } else {
                                  this.sensors.cords = 0

                              }

                            } 

      
    },
    getLists() {

       axios.request({
                baseURL: "http://localhost:8000/api/v1/devices",
                method: "get"
              })
              .then(res => {
          
                    

                  for (let o = 0; o < Object.keys(res.data).length; o++) {

                            if (res.data[o].category_id == 1) {
                              
                              this.temps.push(res.data[o].alias)

                          
                            } else if(res.data[o].category_id == 2){
                                  this.lights.push(res.data[o].alias)

                            } else if(res.data[o].category_id == 3){
                                  this.cords.push(res.data[o].alias)
                            } 
                          }
                
              });

    }
  }
};
</script>
