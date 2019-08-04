<template>
<div>

    <div class="float-left bg-darkgrey h-screen w-64">

    <h1 class="block m-autotext-white p-8">MENU</h1>
    <ul class="block text-white">
        <li class="block text-white py-4 px-8 border-b border-gray-400"><a href=""><font-awesome-icon icon="home" class="pr-2" /><span>Home</span></a></li>
        <li class="block text-white py-4 px-8 border-b border-gray-400"><a href=""><font-awesome-icon icon="play-circle" class="pr-2" /><span>Actions</span></a></li>
        <li class="block text-white py-4 px-8 border-b border-gray-400" ><a href=""><font-awesome-icon icon="chart-bar" class="pr-2" /><span>Stats</span></a></li>
        <li class="block text-white py-4 px-8 border-b border-gray-400"><a href=""><font-awesome-icon icon="history" class="pr-2"/><span>History</span></a></li>
        <li class="block text-white py-4 px-8 border-b border-gray-400"><a href=""><font-awesome-icon icon="wrench" class="pr-2"/><span>Settings</span></a></li>

    </ul>

    </div>
</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    export default {

    components: {
            FontAwesomeIcon,
    },

    data() {

        return {
          

        };
      
    },

    mounted() {

   

    },
        
    methods: {
            

         reloadPage() {
             window.location.reload()
        }
    }

    }
</script>
