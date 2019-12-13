<template>
<div>
    <v-container :fluid="true" class="d-flex flex-column align-center sheet">
        <div class="mb-n10">
            <v-img
            src="../assets/img/dota_logo.png"
            alt="pict"
            :height="400"
            :width="400"
            :contain="true"
            >
            </v-img>
        </div>
        <h1 id="tagline-dota" class="grey--text">
            "A MODERN MULTIPLAYER MASTERPIECE"
        </h1>
        <h3 class="grey--text text--darken-2 tag-title1">
            -DESTRACTOID
        </h3>
        <h2 class="mt-10 grey--text text--darken-2 tag-title2">
            JOIN THE BATTLE. BRING YOUR FRIENDS
        </h2>
    </v-container>
    <div>
        <v-img src="../assets/img/mirana.jpg">
            <div class="d-flex justify-end mr-12" style="height: 100%">
                <div class="inner d-flex flex-column justify-center" style="width: 40%">
                    <h1>The most-played game on Steam.</h1>
                    <p>Every day, millions of players worldwide enter battle as one of over a hundred Dota heroes. And no matter if it's their 10th hour of play or 1,000th, there's always something new to discover. With regular updates that ensure a constant evolution of gameplay, features, and heroes, Dota 2 has truly taken on a life of its own.</p>
                    <p>"The game is in an extraordinary place." –PC Gamer</p>
                </div>
            </div>
        </v-img>
    </div>
    <div id="tower">
        <v-img src="../assets/img/tower.jpg">
            <div class="d-flex justify-start ml-12" style="height: 100%">
                    <div class="inner d-flex flex-column justify-center" style="width: 40%">
                        <h1>One Battlefield. Infinite Possibilities.</h1>
                        <p>When it comes to diversity of heroes, abilities, and powerful items, Dota boasts an endless array—no two games are the same. Any hero can fill multiple roles, and there's an abundance of items to help meet the needs of each game. Dota doesn't provide limitations on how to play, it empowers you to express your own style.</p>
                        <p>"...offers more than literally any game I can think of." –Eurogamer</p>
                    </div>
                </div>
        </v-img>
    </div>
    <div id="disruptor">
        <v-img src="../assets/img/disruptor.jpg">
            <div class="d-flex justify-end mr-12" style="height: 100%">
                    <div class="inner d-flex flex-column justify-center" style="width: 40%">
                        <h1>All heroes are free.</h1>
                        <p>Competitive balance is Dota's crown jewel, and to ensure everyone is playing on an even field, the core content of the game—like the vast pool of heroes—is available to all players. Fans can collect cosmetics for heroes and fun add-ons for the world they inhabit, but everything you need to play is already included before you join your first match.</p>
                        <p>"...totally free to play in the way we wish all free-to-play games could be" –IGN</p>
                    </div>
                </div>
        </v-img>
    </div>
</div>
</template>

<script>
export default {
  name: 'mainpage'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Gupter&display=swap');
@import url('https://fonts.googleapis.com/css?family=Yeseva+One&display=swap');
@import url('https://fonts.googleapis.com/css?family=Titillium+Web&display=swap');

#tagline-dota{
    font-family: 'Gupter', serif;
    font-size: 40px;
    letter-spacing: 0.5rem;
}

.sheet{
    height: calc(100vh - 150px);
}

.tag-title1{
    font-family: 'Yeseva One', cursive;
    font-size: 12px;
    letter-spacing: 2px;
}

.tag-title2{
    font-family: 'Titillium Web', sans-serif;
    font-size: 24px;
    letter-spacing: 2px;
}
</style>
