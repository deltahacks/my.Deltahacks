<template>
    <v-app class="dashboard background back" >
    <Navbar2/>
    <div class='container-status100'>
        <div class='question-popout'>
            <h1>Tere maa</h1>
            <v-expansion-panel popout>
                <v-expansion-panel-content class="panel">
                <div slot="header" class='bold'>What is DeltaHacks V?</div>
                <v-card>
                    <v-card-text>Bruh how you get here without knowing</v-card-text>
                </v-card>
                </v-expansion-panel-content>

                <v-expansion-panel-content>
                <div slot="header">What is DeltaHacks V?</div>
                <v-card>
                    <v-card-text>Bitch how u get to this page w/o knowing what this shit is</v-card-text>
                </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </div>
    </div>
    </v-app>
</template>


<script>

    import Navbar2 from '@/components/Navbar2.vue'
export default {

    components: {
        Navbar2
    },
    
}

</script>


<style scoped>
.question-popout {
    margin: 0 auto;
    margin-top: -25%;
    width: 70%;
    
}
.question {
    font-weight: bold;
}


 .background{
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 0;
   background-color: rgba(255,255,255,0.8);
  }
  .navbar1 {
  z-index: 0;
  background-color: rgba(255,255,255,0.8);
}
.container-status100 {
  width: 100%;  
height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  padding-bottom: 0px;
overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  z-index: 1;  
}

.container-status100::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255,255,255,0.2);
} 
.panel {
    background-color: rgba(255,255,255,0.8);
}
.back {
background: #5C258D;  /* fallback for old browsers */
background: -webkit-linear-gradient(to bottom, #4389A2, #5C258D);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to bottom, #4389A2, #5C258D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

</style>

