<template>
  <div class="home">
      <v-parallax
        dark
        height="700"
        src="https://images.pexels.com/photos/3330118/pexels-photo-3330118.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      >
        <v-row
          class="black--text"
          align="center"
          justify="center"
        >
          <v-col class="text-center" cols="12">
            <h1 class="display-1 font-weight-thin mb-4">
              WELCOME TO ANALOGUES
            </h1>
            <h4 class="subheading">We sell everything related to analogue photographies</h4>
            <v-btn class="ma-8" outlined color="black" to="/products">SHOP WITH US</v-btn>
          </v-col>
        </v-row>
      </v-parallax>
      <v-parallax>
        <v-row
        class="red--text text--lighten-2"
          align="center"
          justify="center"
        >
          <v-col class="text-center d-flex justify-center" cols="3">
            <v-img
              src="https://images.pexels.com/photos/2739286/pexels-photo-2739286.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              aspect-ratio="1"
              max-width="300"
              max-height="300"
            ></v-img>
          </v-col>
          <v-col class="text-center p-10" cols="8">
            <h1 class="display-1 font-weight-thin mb-4">Film Photography</h1>
            <h4 class="subheading">Film photography is photography that uses a chemical process based recording medium.</h4>
            <p>For more than a hundred years, this was the only kind of photography available.
              In a film camera that uses the gelatin-silver process, light falling upon photographic emulsions containing silver halides is recorded as a latent image. The latent image is subjected to photographic processing, which makes it visible and insensitive to light.</p>
          </v-col>
        </v-row>
      </v-parallax>
      <v-parallax
        dark
        src="https://images.pexels.com/photos/2217366/pexels-photo-2217366.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center" cols="12">
            <h1 class="display-1 font-weight-thin mb-4">By: Angela Vanessa</h1>
            <h4 class="subheading">Please do not buy anything. This is a portfolio website. Thank you!</h4>
          </v-col>
        </v-row>
      </v-parallax>
  </div>
</template>

<script>

export default {
  name: 'home'
}
</script>
