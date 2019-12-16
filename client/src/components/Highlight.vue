<template>
  <div class="highlight">
    <div class="container">
      <div class="carousel">
        <input type="radio" id="carousel-1" name="carousel[]" checked />
        <input type="radio" id="carousel-2" name="carousel[]" />
        <input type="radio" id="carousel-3" name="carousel[]" />
        <input type="radio" id="carousel-4" name="carousel[]" />
        <input type="radio" id="carousel-5" name="carousel[]" />
        <ul class="carousel__items">
          <li class="carousel__item">
            <img
              src="https://images.unsplash.com/photo-1513529501683-f0d14bd9c138?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              alt
            />
          </li>
          <li class="carousel__item">
            <img
              src="https://images.unsplash.com/photo-1517582837435-fdb3ccb5bb41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              alt
            />
          </li>
          <li class="carousel__item">
            <img
              src="https://images.unsplash.com/photo-1548094775-4c3e99d267c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80"
              alt
            />
          </li>
          <li class="carousel__item">
            <img
              src="https://images.unsplash.com/photo-1541473211644-5cb06d3c68ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              alt
            />
          </li>
          <li class="carousel__item">
            <img
              src="https://images.unsplash.com/photo-1503342452485-86b7f54527ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
              alt
            />
          </li>
        </ul>
        <div class="carousel__prev">
          <label for="carousel-1"></label>
          <label for="carousel-2"></label>
          <label for="carousel-3"></label>
          <label for="carousel-4"></label>
          <label for="carousel-5"></label>
        </div>
        <div class="carousel__next">
          <label for="carousel-1"></label>
          <label for="carousel-2"></label>
          <label for="carousel-3"></label>
          <label for="carousel-4"></label>
          <label for="carousel-5"></label>
        </div>
        <div class="carousel__nav">
          <label for="carousel-1"></label>
          <label for="carousel-2"></label>
          <label for="carousel-3"></label>
          <label for="carousel-4"></label>
          <label for="carousel-5"></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
/** * Carousel.sass * @author: Dang Van Thanh * @github: https://github.com/dangvanthanh/carousel.sass * @description: A Simple Carousel Pure CSS Using Sass * @version: 1.0.0 */
.carousel
  > input[type="radio"]:nth-child(1):checked
  ~ .carousel__prev
  > label:nth-child(5),
.carousel
  > input[type="radio"]:nth-child(1):checked
  ~ .carousel__next
  > label:nth-child(2),
.carousel
  > input[type="radio"]:nth-child(2):checked
  ~ .carousel__prev
  > label:nth-child(1),
.carousel
  > input[type="radio"]:nth-child(2):checked
  ~ .carousel__next
  > label:nth-child(3),
.carousel
  > input[type="radio"]:nth-child(3):checked
  ~ .carousel__prev
  > label:nth-child(2),
.carousel
  > input[type="radio"]:nth-child(3):checked
  ~ .carousel__next
  > label:nth-child(4),
.carousel
  > input[type="radio"]:nth-child(4):checked
  ~ .carousel__prev
  > label:nth-child(3),
.carousel
  > input[type="radio"]:nth-child(4):checked
  ~ .carousel__next
  > label:nth-child(5),
.carousel
  > input[type="radio"]:nth-child(5):checked
  ~ .carousel__prev
  > label:nth-child(4),
.carousel
  > input[type="radio"]:nth-child(5):checked
  ~ .carousel__next
  > label:nth-child(1) {
  opacity: 1 !important;
  z-index: 3;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
body {
  background: #fcfcfc;
  margin: 0;
}
.container {
  min-width: 900px;
}
.carousel {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.carousel > input[type="radio"] {
  position: absolute;
  left: 0;
  opacity: 0;
  top: 0;
}
.carousel > input[type="radio"]:checked ~ .carousel__items .carousel__item,
.carousel > input[type="radio"]:checked ~ .carousel__prev > label,
.carousel > input[type="radio"]:checked ~ .carousel__next > label {
  opacity: 0;
}
.carousel
  > input[type="radio"]:nth-child(1):checked
  ~ .carousel__items
  .carousel__item:nth-child(1) {
  opacity: 1;
}
.carousel
  > input[type="radio"]:nth-child(1):checked
  ~ .carousel__nav
  > label:nth-child(1) {
  background: #ccc;
  cursor: default;
  pointer-events: none;
}
.carousel
  > input[type="radio"]:nth-child(2):checked
  ~ .carousel__items
  .carousel__item:nth-child(2) {
  opacity: 1;
}
.carousel
  > input[type="radio"]:nth-child(2):checked
  ~ .carousel__nav
  > label:nth-child(2) {
  background: #ccc;
  cursor: default;
  pointer-events: none;
}
.carousel
  > input[type="radio"]:nth-child(3):checked
  ~ .carousel__items
  .carousel__item:nth-child(3) {
  opacity: 1;
}
.carousel
  > input[type="radio"]:nth-child(3):checked
  ~ .carousel__nav
  > label:nth-child(3) {
  background: #ccc;
  cursor: default;
  pointer-events: none;
}
.carousel
  > input[type="radio"]:nth-child(4):checked
  ~ .carousel__items
  .carousel__item:nth-child(4) {
  opacity: 1;
}
.carousel
  > input[type="radio"]:nth-child(4):checked
  ~ .carousel__nav
  > label:nth-child(4) {
  background: #ccc;
  cursor: default;
  pointer-events: none;
}
.carousel
  > input[type="radio"]:nth-child(5):checked
  ~ .carousel__items
  .carousel__item:nth-child(5) {
  opacity: 1;
}
.carousel
  > input[type="radio"]:nth-child(5):checked
  ~ .carousel__nav
  > label:nth-child(5) {
  background: #ccc;
  cursor: default;
  pointer-events: none;
}
.carousel__items {
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 100%;
  height: 400px;
  position: relative;
}
.carousel__item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: opacity 2s;
  -webkit-transition: opacity 2s;
}
.carousel__item img {
  width: 100%;
  vertical-align: middle;
}
.carousel__prev > label,
.carousel__next > label {
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  opacity: 0;
  z-index: 2;
}
.carousel__prev > label:hover,
.carousel__next > label:hover,
.carousel__prev > label:focus,
.carousel__next > label:focus {
  opacity: 0.5 !important;
}
.carousel__prev > label:before,
.carousel__next > label:before,
.carousel__prev > label:after,
.carousel__next > label:after {
  content: "";
  position: absolute;
  width: inherit;
  height: inherit;
}
.carousel__prev > label:before,
.carousel__next > label:before {
  background: linear-gradient(
      to top,
      #fff 0%,
      #fff 10%,
      rgba(51, 51, 51, 0) 10%
    ),
    linear-gradient(to left, #fff 0%, #fff 10%, rgba(51, 51, 51, 0) 10%);
  width: 60%;
  height: 60%;
  top: 20%;
}
.carousel__prev > label {
  left: 2%;
}
.carousel__prev > label:before {
  left: 35%;
  top: 20%;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
.carousel__next > label {
  right: 2%;
}
.carousel__next > label:before {
  left: 10%;
  transform: rotate(315deg);
  -webkit-transform: rotate(315deg);
}
.carousel__nav {
  position: absolute;
  bottom: 3%;
  left: 0;
  text-align: center;
  width: 100%;
  z-index: 3;
}
.carousel__nav > label {
  border: 1px solid #fff;
  display: inline-block;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 0.125%;
  width: 20px;
  height: 20px;
}
</style>
