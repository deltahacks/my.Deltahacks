<template>
    <div id="dashboardWrapper">
        <Dashboard :key="componentKey" />
    </div>
</template>


<script lang="ts">
import Dashboard from '../views/Dashboard.vue';
import Vue from 'vue';

export default Vue.extend({
    name: 'DashboardWrapper',
    data() {
        return {
            componentKey: 0
        }
    },
    components: {
        Dashboard
    },
    watch: {
        '$store.state.currentHackathon': function() {
            this.componentKey++;
        }
    }
})
</script>
