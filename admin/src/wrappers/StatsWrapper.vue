<template>
    <div id="statsWrapper">
        <Stats :key="componentKey" />
    </div>
</template>


<script lang="ts">
import Stats from '../views/Stats.vue';
import Vue from 'vue';

export default Vue.extend({
    name: 'StatsWrapper',
    data() {
        return {
            componentKey: 0
        }
    },
    components: {
        Stats
    },
    watch: {
        '$store.state.currentHackathon': function() {
            this.componentKey++;
        }
    }
})
</script>