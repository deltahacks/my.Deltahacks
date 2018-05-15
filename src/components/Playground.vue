<template>
    <div class="dashboard">
        <Navbar/>
        <Tab/>
        <h2>Dash</h2>
        <Footer/>
    </div>
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
    Tab {
        height: 50%;
    }
</style>
