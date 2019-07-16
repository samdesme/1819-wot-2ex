<template>
<div class="bg-white m-6 p-6 h-56 shadow-lg rounded-lg">
    <a  v-on:click="toggleOutlet()" v-bind:class = "(plug.status == 1)?'bg-green':'bg-red'" class="block float-left shadow rounded-full h-32 w-32 flex items-center justify-center"></a>

    <div class="h-32 mx-16 float-left">

        <h1>{{plug.name}}</h1>
        <p class="text-dimmedTxt">Description</p>
        <p>status: {{plug.status}}</p>


    </div>
</div>
</template>

<script>
import Outlet from '../services/Outlet/Outlet';

    export default {

    data() {
        return {
            plug: {
                name : '',
                desc : '',
                status,
            },

        };
    },

    mounted() {

        Outlet.getToken().then(tokenRes => {

            Outlet.outletState(tokenRes.data.result.token).then(res => {
                
            let toParse = JSON.parse(res.data.result.responseData)
    
            this.plug.name = toParse.system.get_sysinfo.alias
            this.plug.status = toParse.system.get_sysinfo.relay_state

        })
    
    })

    },
        
    methods: {
            toggleOutlet() {

                if(this.plug.status == 0){

                    Outlet.getToken().then(tokenRes => {

                    Outlet.outletRequest(tokenRes.data.result.token, 1).then(res => {
                
                    let toParse = JSON.parse(res.data.result.responseData)
                    this.plug.status = toParse.system.get_sysinfo.relay_state

                })
    
            })
        
        } else if (this.plug.status == 1) {

                    Outlet.getToken().then(tokenRes => {

                    Outlet.outletRequest(tokenRes.data.result.token, 0).then(res => {
                
                    let toParse = JSON.parse(res.data.result.responseData)
                    this.plug.status = toParse.system.get_sysinfo.relay_state

                })
    
            })


        }

        this.reloadPage()
                
        },

         reloadPage() {
             window.location.reload()
        }
    }

    }
</script>
