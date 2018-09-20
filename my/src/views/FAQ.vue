<template>
    <v-app class="dashboard back">
        <Navbar2 class='navbar1' />
        <div class='container-status100'>
            <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                    <v-flex xs12>
                        <h1 display-5 style="margin:10px; margin-top:-8%;">Frequently Asked Questions</h1>
                    </v-flex>
                    <v-flex xs12>
                        <v-expansion-panel class="question-popout">
                            <v-expansion-panel-content style='background-color: transparent;'>
                                <div slot="header" class='bold'>What is DeltaHacks V?</div>
                                <v-card style='background-color: transparent;'>
                                    <v-card-text>DeltaHacks is McMaster’s annual student hackathon for change. We want to encourage students in all fields of study to come together to build real world applications that create positive change. The difference between DeltaHacks and other hackathons is that we embrace elements of design thinking to make “hacks” that solve real world problems.</v-card-text>
                                </v-card>
                            </v-expansion-panel-content>

                            <v-expansion-panel-content style='background-color: transparent;'>
                                <div slot="header" class='bold'>What should I bring with me?</div>
                                <v-card style='background-color: transparent;'>
                                    <v-card-text>Your laptop, a charger, maybe a change of clothes and a sleeping bag in case our sleeping areas get full, we'll provide everything else!</v-card-text>
                                </v-card>
                            </v-expansion-panel-content>

                            <v-expansion-panel-content style='background-color: transparent;'>
                                <div slot="header" class='bold'>How does the application judging process work?</div>
                                <v-card style='background-color: transparent;'>
                                    <v-card-text>Your application is recieved as soon as you submit it, after that our team of application reviewers will look over your application and make a decision, once the round comes to an end you'll recieve an email with your decision.</v-card-text>
                                </v-card>
                            </v-expansion-panel-content>

                            <v-expansion-panel-content style='background-color: transparent;'>
                                <div slot="header" class='bold'>Can I recieve travel reimbursement?</div>
                                <v-card style='background-color: transparent;'>
                                    <v-card-text>Unfortunately, at this time we cannot offer travel reimbursements outside of the busses we will provide.</v-card-text>
                                </v-card>
                            </v-expansion-panel-content>

                            <v-expansion-panel-content style='background-color: transparent;'>
                                <div slot="header" class='bold'>I've submitted my application and want to make a change...</div>
                                <v-card style='background-color: transparent;'>
                                    <v-card-text>Email us at relations@deltahacks.com with the email you used to signup and your requested change.</v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </v-app>
</template>


<script>
import Navbar2 from '@/components/Navbar2.vue';

export default {
  components: {
    Navbar2,
  },
};
</script>


<style scoped>
.question-popout {
    margin: 0 auto;
    width: 70%;
}
.question {
    font-weight: bold;
}

.navbar1 {
    z-index: 0;
    background-color: transparent;
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
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    /* background-color: rgba(255, 255, 255, 0.6); */
}
.panel {
    /* background-color: rgba(255, 255, 255, 0.8); */
    padding: 0px;
}
.back {
      background-image: url("https://github.com/deltahacks/my.Deltahacks/blob/master/my/src/assets/Backgimg2.jpg?raw=true");
          background-repeat: no-repeat;
    background-attachment: fixed;
    /* background: #8fd3f4;
    background: -webkit-linear-gradient(top, #84fab0, #8fd3f4);
    background: -o-linear-gradient(top, #84fab0, #8fd3f4);
    background: -moz-linear-gradient(top, #84fab0, #8fd3f4);
    background: linear-gradient(top, #84fab0, #8fd3f4); */
}
</style>

