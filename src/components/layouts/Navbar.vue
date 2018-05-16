<template>
    <v-app class="navbar">
        <v-toolbar dark color="primary">
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title class="white--text">Dashboard</v-toolbar-title>
            <v-spacer></v-spacer>
            <ul>
                <li><a v-if="cuser">{{ cuser.email }}</a></li>
                <li v-if="!(cuser)"><router-link to="/signup">Signup</router-link></li>
                <li v-if="!(cuser)"><router-link to="/login"> Login </router-link></li>
                <li v-if="cuser"><a @click="logout">Logout</a></li>
            </ul>
            <v-btn icon>
            <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
            <v-icon>apps</v-icon>
            </v-btn>
            <v-btn icon>
            <v-icon>refresh</v-icon>
            </v-btn>
            <v-btn icon>
            <v-icon>more_vert</v-icon>
            </v-btn>
        </v-toolbar>
        <!-- <nav class="light-blue accent-3">
            <div class="container">
                <a href="" class="brand-logo">
                    FireMap
                </a>
                <ul class="right">
                    <li><a v-if="cuser">{{ cuser.email }}</a></li>
                    <li><router-link to="/signup">Signup</router-link></li>
                    <li><router-link to="/login"> Login </router-link></li>
                    <li><a @click="logout">Logout</a></li>
                </ul>
            </div>
        </nav> -->
    </v-app>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'Navbar', 
    data(){
        return{
            cuser: null
        }
    }

}
</script>

<style>

</style>
