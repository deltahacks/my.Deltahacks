<template>
    <v-app class="dashboard">
        <Navbar/>
        <Footer/>
    </v-app>
</template>

<script>
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'
import Tab from './layouts/Tab'


export default {
    name: 'Dashboard',
    data(){
        return{
            links: ["Home", "About", "Contact"]
        }
    },
    components: {
        Navbar,
        Footer,
        Tab
    }
}
</script>

<style>


</style>
