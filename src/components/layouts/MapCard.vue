<template>
  <v-layout>
      <v-card>
        <GmapMap id="map"
        :center="{lat:10, lng:10}"
        :zoom="7"
        map-type-id="terrain"
        >
        <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
        />
        </GmapMap>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">maps</h3>
          </div>
        </v-card-title>
        <v-card-actions>
        </v-card-actions>
      </v-card>
  </v-layout>
</template>

<script>
export default {
    name: "MapCard",
    data(){
        return{
            lat : 53, 
            lng: -2
        }
    },
    methods: {
            renderMap(){
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat : this.lat, lng: this.lng},
                zoom : 6,
                maxZoom: 15,
                minZoom: 3, 
                streetViewControl: false 
            })
            }
    },
    mounted(){
    }
}
</script>

<style>
    #map {
        width: 100%;
        height: 100%;
    }
</style>
