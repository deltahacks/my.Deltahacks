<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
            <div class="google-map" id="map"> </div>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">maps</h3>
          </div>
        </v-card-title>
        <v-card-actions>
        </v-card-actions>
      </v-card>
    </v-flex>
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
        this.renderMap();
    }
}
</script>

<style>

</style>
