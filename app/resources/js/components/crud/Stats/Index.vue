<template>
  <div>
    <sidebar></sidebar>

    <div class="ml-64 mr-0 px-2">
          

<div class="flex -mx-2">

         <div class="w-2/3 px-6 relative bg-white m-6 p-6 h-auto shadow-lg rounded-lg">
        <div class="h-16">
          <h2 class="block float-left text-2xl w-full text-left">Usage timeline</h2>
        </div>

      <apexcharts type="line" height="350" :options="options" :series="options.series" />
    </div>



       
        
      <div class="w-1/3 px-6 h-auto relative bg-white m-6 p-6 h-auto shadow-lg rounded-lg">
        <div class="h-16">
          <h2 class="block float-left text-2xl w-full text-left">Usage live feed</h2>
        </div>

        <table class="w-full m-auto userTable mt-6">
          <thead class="h-12">
            <tr class="text-medgrey border-b-2 border-bootstrapGrey font-normal text-left">
              <th>I/O</th>
              <th>Name</th>
              <th class="w-48">Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="outlet in orderedOutlets" class="h-12 border-b-2 border-bootstrapGrey">
              <td class="text-center">
                <!-- <span v-bind:class="(outlet.status == 1)?'gradGreen text-white':'bg-transparent text-green'" class="inline-block shadow rounded-full mx-1 w-10 h-10 border border-green items-center justify-center">
                                    <i class="block fas fa-power-off mt-2 text-2xl"></i>
                </span>-->

                <i v-if="outlet.status == 1" class="fas fa-circle text-green"></i>
                <i v-else-if="outlet.status == 0" class="fas fa-circle text-red"></i>
                <i v-else class="far fa-circle text-bootstrapGrey"></i>
              </td>
              <td class="w-1/2">{{outlet.name}}</td>
              <td>{{outlet.emeter.power_mw}} mW</td>
            </tr>
          </tbody>
        </table>
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
import Pusher from "pusher-js";
import ApexCharts from 'apexcharts'
import VueApexCharts from 'vue-apexcharts'

export default {
  name: "stats",

  components: {
    Sidebar,
    FontAwesomeIcon,
    Pusher,
    apexcharts: VueApexCharts,

  },

  data() {
    
    return {
      outlets: [],
      statsOutlet: [],
      options: {
            xaxis: {
        type: "datetime",
      },
      }
    };
  },

  computed: {
    orderedOutlets: function() {
      return _.orderBy(this.outlets, "emeter.power_mw", "desc");
    }
  },

   
mounted () {

  
},

  created() {

   
    this.usageTable();
    this.chart();

     setInterval(this.freshUsage, 1000);
     //setInterval(this.chart, 1000);
    
  },

  methods: {

     chart() {

      let options = {
      chart: {
         id: "chart",
       
      },
  
      labels: [],
      series: [],


     grid: {
       padding: {
        bottom: 20,
 
    }, 
     }
     
    }



      //console.log("outlets arr =>",this.outlets)

      var getDaysInMonth = function(month,year) {
        return new Date(year, month, 0).getDate();
        };

        let todayDate = new Date();
        let thisMonth = todayDate.getMonth() +1;
        let thisYear = todayDate.getFullYear();

        
          let deviceName = '';


      Outlet.getToken().then(tokenRes => {
      Outlet.outletGetList(tokenRes.data.result.token).then(resDevices => {
          
          
      let arrDevices = resDevices.data.result.deviceList;

  for (let u = 0; u < arrDevices.length; u++) {


     Outlet.outletDaystat(tokenRes.data.result.token, arrDevices[u].deviceId, thisMonth, thisYear).then(resUsage => {

              let toParse = JSON.parse(resUsage.data.result.responseData);
                let dayList = toParse.emeter.get_daystat.day_list;
                deviceName = arrDevices[u].alias
                let xMonthArray = [];

              for (let i = 1; i <= getDaysInMonth(thisMonth,thisYear); i++) {

            console.log('getDaysInMonth(thisMonth,thisYear): ',getDaysInMonth(thisMonth,thisYear));


                 if(dayList[i]){


                    if(dayList[i].month == thisMonth && dayList[i].year == thisYear){


                         if(u == 0){
                           
                           


                         let dayString = String(dayList[i].year + '-' + dayList[i].month + '-' + dayList[i].day)

                              options.labels.push(dayString)

                            }

                      
                          xMonthArray.push(dayList[i].energy_wh);

                          
                    } 
                 } else {
                       
                       if(u == 0){


                           let dayString = String(thisYear + '-' + thisMonth + '-' + i)

                              options.labels.push(dayString)

                            }

                    xMonthArray.push(0);


                 } 
               

              }
              

             



              options.series.push({
                      name: deviceName,
                      data: xMonthArray
  
                     //data: [406,909,55,693,444,965,687,224]


                 })

          })

          }


               this.options = options;





        }).then(() => {
      var chart = new ApexCharts(
      document.querySelector("#chart"),
      this.options
    );

    chart.render();
    console.log('this.options',this.options);


});

     });




   // console.log("options arr =>", options)
   // console.log(options.xaxis.categories)


  



   
  },

    freshUsage() {
      Outlet.getToken().then(tokenRes => {
        Outlet.outletGetList(tokenRes.data.result.token).then(resDevices => {
          let arrDevices = resDevices.data.result.deviceList;

          for (let i = 0; i < this.outlets.length; i++) {
            for (let o = 0; o < arrDevices.length; o++) {
              if (arrDevices[o].deviceId == this.outlets[i].device_id) {
                Outlet.outletUsage(
                  tokenRes.data.result.token,
                  arrDevices[o].deviceId
                ).then(resUsage => {
                  let toParse = JSON.parse(resUsage.data.result.responseData);
                  this.outlets[i].emeter.power_mw =
                    toParse.emeter.get_realtime.power_mw;
                });
              }
            }
          }
        });
      });
    },

    usageTable() {
      Outlet.getToken().then(tokenRes => {
        Outlet.outletGetList(tokenRes.data.result.token).then(resDevices => {
          let arrDevices = resDevices.data.result.deviceList;

          axios
            .request({
              baseURL: "http://localhost:8000/api/v1/devices",
              method: "get"
            })
            .then(res => {
              if (res.data.length) {
                for (let i = 0; i < arrDevices.length; i++) {
                  let outletObj = {
                    device_id: arrDevices[i].deviceId,
                    name: arrDevices[i].alias,
                    status: 0,
                    emeter: {}
                  };

                  for (let o = 0; o < Object.keys(res.data).length; o++) {
                    if (arrDevices[i].deviceId == res.data[o].device_id) {
                      outletObj.name = res.data[o].alias;
                    }
                  }
                  //console.log(arrDevices[i].deviceId);

                  Outlet.outletInfo(
                    tokenRes.data.result.token,
                    arrDevices[i].deviceId
                  ).then(resState => {
                    //console.log(resState);
                    let toParse = JSON.parse(resState.data.result.responseData);
                    outletObj.status = toParse.system.get_sysinfo.relay_state;

                    Outlet.outletUsage(
                      tokenRes.data.result.token,
                      arrDevices[i].deviceId
                    ).then(resUsage => {
                      let toParse = JSON.parse(
                        resUsage.data.result.responseData
                      );
                      outletObj.emeter = toParse.emeter.get_realtime;

                      this.outlets.push(outletObj);
                    });
                  });
                }
              }
            });
        });
      });
    },

    lineGraph() {



    
    }

    /*           pusher(){

    Pusher.logToConsole = true;

    var pusher = new Pusher('049c0debdfbba42cf228', {
      cluster: 'eu',
      forceTLS: true
    });

    let data = this.outlets
    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      console.log(JSON.stringify(data));
    });

    }, */
  }
};
</script>
