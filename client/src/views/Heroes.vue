<template>
  <div class="Heroes">
    <v-container fluid class="px-0 py-0 main-heroes">
      <v-row>
        <div id="header-heroes">
          <h2>WE ARE HEROES</h2>
          <p>A story about six dragon slayers leaders and Hero Argenta.</p>
        </div>
      </v-row>
      <v-row justify="center">
        <div class="we-heroes" cols="2" v-for="(hero, i) in heroes" :key="i">
          <a @click="changeHero(hero)">
            <span class="default">
              <strong>{{ hero.name }}</strong>
              <em>{{ hero.desc }}</em>
            </span>
            <img :src="hero.imgsm" :alt="hero.name" />
          </a>
        </div>
      </v-row>
      <v-row class="hero-layer" justify="center">
        <transition name="fade">
          <div v-if="showHero !== null" class="hero-info">
            <img class="pic" :src="showHero.imglg" :alt="showHero.name" />
            <div class="infohero">
              <p class="title">{{ showHero.name }}</p>
              <p class="subtitle">{{ showHero.desc }}</p>
              <div class="text" v-html="showHero.text"></div>
              <div class="sound" v-html="showHero.sound"></div>
            </div>
          </div>
        </transition>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Heroes",
  data() {
    return {
      showHero: {
        name: "Argenta",
        desc: "Gray Hair beauty who wears a red cape",
        imgsm:
          "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/img_character1.png",
        imglg:
          "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/big_character1.png",
        text: `Red caped beauty but sensitive and bad tempered woman.
              <br />She ignores other's opinions and do her own way but all that actions are
              <br />quite right and it looks her more mysterious.
              <br />
              <br />She also participated in Black Dragon raid but only few knew
              <br />about this and she couldn't be the one of six heroes.`,
        sound: "Once again, we meet up here, fool."
      },
      heroes: [
        {
          name: "Argenta",
          desc: "Gray Hair beauty who wears a red cape",
          imgsm:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/img_character1.png",
          imglg:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/big_character1.png",
          text: `Red caped beauty but sensitive and bad tempered woman.
              <br />She ignores other's opinions and do her own way but all that actions are
              <br />quite right and it looks her more mysterious.
              <br />
              <br />She also participated in Black Dragon raid but only few knew
              <br />about this and she couldn't be the one of six heroes.`,
          sound: "Once again, we meet up here, fool."
        },
        {
          name: "Geraint",
          desc: "A leader of Dragon Slayers",
          imgsm:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/img_character2.png",
          imglg:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/big_character2.png",
          text: `A leader of six heroes who beat Black Dragon Karas 50 years ago.
            <br />
            One day he suddenly appeared and lead heroes to fight againest Black Dragon.
            <br />
            He's a super talented sword master and also has a knowledge about crests and spells.
            <br />
            But heroes fell into mass confusion when his true nature was revealed
            <br />
            at the end of Black dragon raid.`,
          sound: `Your one step may open
            <br />
            the way for next visitors.`
        },
        {
          name: "Velskud",
          desc: "Young knight of Saint Heaven",
          imgsm:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/img_character3.png",
          imglg:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/big_character3.png",
          text: `He's from a low class noble but climbed up to the top knight only
            <br />
            with his talents.
            <br />
            Also lots of aristocats sponsored him because of his charming humanity
            <br />
            and being a dragon slayer surely can be described as super luck.
            <br />
            <br />
            It was told that he was found to be dead in Black Dragon raid.`,
          sound: `I only follow the justice that I believe in.`
        },
        {
          name: "Barnac",
          desc: "A leader of mercenaries",
          imgsm:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/img_character4.png",
          imglg:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/big_character4.png",
          text: `A leader of mercenaries who participated in Black Dragon raid 50 years ago.
            <br />
            He gathered scattered mecenaries and made a huge mercenary army camp
            <br />
            that became a venturer's guild at present.
            <br />
            He's bit hasty but a honest man.
            <br />
            <br />
            After the Black Dragon raid, no one knows his whereabouts.`,
          sound: `Cut it first, think later.`
        },
        {
          name: "Karacule",
          desc: "A leader of Fairly Star sorceress",
          imgsm:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/img_character5.png",
          imglg:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/big_character5.png",
          text: `Successor of Fairly Star sorceress
            <br />
            She's been trained at Lotus Marsh town then oneday
            <br />
            she met Elf archer Nerwin and moved to Saints Heaven.
            <br />
            She participated the Black Dragon raid with
            <br />
            battle sorceress of Fairy Star and fought as much as other heroes.
            <br />
            But now she's in her laboratory near Lotus Marsh and isolated
            <br />
            herself from people.
            <br />
            <br />
            No one knows why she socially isolated herself.`
        },
        {
          name: "Nerwin",
          desc: "A leader of Silver light crescent moon archers",
          imgsm:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/img_character6.png",
          imglg:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/big_character6.png",
          text: `Royal messenger Elf archer from Anu Alendel.
            <br />
            She contributed to establish diplomatic ties with Human to beat Black Dragon.
            <br />
            She also participated in Black Dragon raid
            <br />
            with her Silver light crescent moon archers.
            <br />
            <br />
            After she returned to her homeland,
            <br />
            <br />
            she became a "Narcelia", a queen of elves.`,
          sound: `This is the place that my fate waits for me.`
        },
        {
          name: "Terrence",
          desc: "A leader of Temple knight",
          imgsm:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/img_character7.png",
          imglg:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/big_character7.png",
          text: `Terrence Terramai met Geraint in Saints Heaven by chance.
            <br />
            He deeply impressed by Geraint and participated in Black Dragon raid
            <br />
            with battle clerics of temple knights.
            <br />
            This contribution made him a holy father of goddess order at a young age
            <br />
            and later this order is called "Terra's Order".
            <br />
            <br />
            Now he entrusted all duties to a bishop and left his places for a long time
            <br />
            but only few knows the reason.`,
          sound: `What we need now is a judgement, not a mercy`
        }
      ]
    };
  },
  methods: {
    changeHero(hero) {
      this.showHero = null;
      setTimeout(() => {
        this.showHero = hero;
      }, 500);
    }
  }
};
</script>

<style scoped>
@import "../assets/scss/heroes/heroes.css";
</style>
