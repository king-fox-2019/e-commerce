<template>

<div class="parallax" style="margin-top:-100px;">
    <div class="parallax">
    </div>
    <div class="parallax_layer parallax_layer-back" style="background-image: url(https://storage.googleapis.com/nike-public-bucket/parallax-base-new.jpg);height:100vh;width:100vw;background-size:auto;background-position:center;top:0vh">
    <div class="title"></div>
    </div>
    <div class="parallax_layer parallax_layer-text-1" style="background-image: url(https://storage.googleapis.com/nike-public-bucket/parallax-the.png);height:100vh;width:100vw;background-size:15%;background-position:center;top:10vh;left:-78vw">
    <div class="title"></div>
    </div>
    <div class="parallax_layer parallax_layer-grass" style="background-image: url(https://storage.googleapis.com/nike-public-bucket/parallax-grass1.png);height:100vh;width:100vw;background-size:auto;background-position:center;top:470vh">
      <div class="title"></div>
    </div>
    <div class="parallax_layer parallax_layer-shadow" style="background-image: url(https://storage.googleapis.com/nike-public-bucket/parallax-shoes-shadow.png);height:100vh;width:100vw;background-position:center;background-size: 32%;top:430vh">
      <div class="title"></div>
    </div>
    <div class="parallax_layer parallax_layer-shoes" style="background-image: url(https://storage.googleapis.com/nike-public-bucket/parallax-shoes.png);min-width:1200px;height:100vh;width:100vw;background-position:center;background-size: 33%;top:70vh">
      <div class="title"></div>
    </div>
     <div class="parallax_layer parallax_layer-text" style="background-image: url(https://storage.googleapis.com/nike-public-bucket/parallax-release.png);height:100vh;width:100vw;background-size:30%;background-position:center;top:-110vh;left:50vw">
    <div class="title"></div>
    </div>
    <div class="parallax_layer parallax_layer-text" style="background-image: url(https://storage.googleapis.com/nike-public-bucket/parallax-beast.png);height:100vh;width:100vw;background-size:25%;background-position:center;top:150vh;left:20vw">
    <div class="title"></div>
    </div>
    <div class="parallax_layer parallax_layer-soil" style="background-image: url(https://storage.googleapis.com/nike-public-bucket/parallax-soil.png);height:100vh;width:100vw;background-position:center;background-size: 100%;top:700vh">
      <div class="title"></div>
    </div>
    <div class="parallax_layer parallax_layer-flying-grass2" style="background-image: url(https://storage.googleapis.com/nike-public-bucket/parallax-flying-grass2.png);height:100vh;width:100vw;background-position:center;background-size: 100%;top:200vh">
      <div class="title"></div>
    </div>
    <div class="parallax_layer parallax_layer-flying-grass1" style="background-image: url(https://storage.googleapis.com/nike-public-bucket/parallax-flying-grass1.png);height:100vh;width:100vw;background-position:center;background-size: 100%;top:400vh">
      <div class="title"></div>
    </div>
</div>
    <!-- <div>
        <b-carousel
            id="carousel-fade"
            style="text-shadow: 0px 0px 2px #000;"
            fade
            indicators
            img-width="1024"
            img-height="800"
        >
            <b-carousel-slide
            img-src="https://storage.googleapis.com/nike-public-bucket/img1.jpg"
            >
            <div class="content-slider1">
            </div>
        
            </b-carousel-slide>
            <b-carousel-slide
            
            img-src="https://storage.googleapis.com/nike-public-bucket/img2.jpg"
            ></b-carousel-slide>
             <b-carousel-slide
           
            img-src="https://storage.googleapis.com/nike-public-bucket/img3.jpg"
            ></b-carousel-slide>
            <b-carousel-slide
            
            img-src="https://storage.googleapis.com/nike-public-bucket/img4.jpg"
            ></b-carousel-slide> 
        </b-carousel>
    </div> -->
  
</template>

<script>
export default {

}
</script>

<style scoped>
parallax{
    height:100vh;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-perspective: 1px;
    perspective: 1px;
}
parallax_layer{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-size: cover;
}
.parallax {
    height: 110vh;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-perspective: 1px;
    perspective: 1px;
  
   
  }
  .parallax_layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .parallax_layer-shoes {
    -webkit-transform: translateZ(0);
    transform: translateZ(-8px) scale(9);
  }
  .parallax_layer-shadow {
    -webkit-transform: translateZ(-1);
    transform: translateZ(-9px) scale(12);
  }
  .parallax_layer-grass {
    -webkit-transform: translateZ(-1px);
    transform: translateZ(-10px) scale(11);
  }
  .parallax_layer-text {
    -webkit-transform: translateZ(0px);
    transform: translateZ(-5px) scale(6);
  }
  .parallax_layer-text-1 {
    -webkit-transform: translateZ(0px);
    transform: translateZ(-6px) scale(7);
  }
    .parallax_layer-soil {
    -webkit-transform: translateZ(-2px);
    transform: translateZ(-9.5px) scale(10.5);
  }
  .parallax_layer-back {
    -webkit-transform: translateZ(-2px);
    transform: translateZ(-11px) scale(12);
  }
  .parallax_layer-flying-grass1 {
    -webkit-transform: translateZ(-2px);
    transform: translateZ(-6px) scale(7);
  }
  .parallax_layer-flying-grass2 {
    -webkit-transform: translateZ(-3px);
    transform: translateZ(-9px) scale(10);
    /* margin-bottom: -200px; */
  }

  * {
    margin:0;
    padding:0;
  }
   /* add some padding to force scrollbars */
  .parallax_layer {
    padding: 50vh 0;
  }
   /* centre the content in the parallax layers */
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-20%, -20%);
    transform: translate(-20%, -20%);
  }
  .cover{
    position: fixed;
    background-color: #2B4C80;
    width: 100%;
    height: 100vh;
    top: 100vh;
  }
/* .content-slider1 {
    position: absolute;
    bottom: 150px;
    left: 15%;
    z-index: 10;
    padding-top: 20px;
    padding-bottom: 20px;
    color: #fff;
    text-align: center;
} */

</style>