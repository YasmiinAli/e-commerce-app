import React from 'react'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import img1 from '../../assets/images/1.jpg'
import img2 from '../../assets/images/2.jpg'
import img3 from '../../assets/images/3.jpg'
import img4 from '../../assets/images/4.jpg'
import img5 from '../../assets/images/5.jpg'

export default function MainSlider() {
  return (
    <>
      <div className="row g-0">
        <div className="col-9">
          <OwlCarousel
            className="owl-theme"
            loop
            items={1}
            autoplay
            autoplayTimeout={3000}
            dots={false}
          >
            <div class="item">
              <img src={img1} className="w-100 largeImg " alt="" />
            </div>
            <div class="item">
              <img src={img2} className="w-100 largeImg" alt="" />
            </div>
            <div class="item">
              <img src={img3} className="w-100 largeImg" alt="" />
            </div>
            <div class="item">
              <img src={img2} className="w-100 largeImg" alt="" />
            </div>
            <div class="item">
              <img src={img3} className="w-100 largeImg" alt="" />
            </div>
          </OwlCarousel>
        </div>
        <div className="col-3">
          <img src={img1} className="w-100 smallImg" alt="" />
          <img src={img4} className="w-100 smallImg" alt="" />
        </div>
      </div>
    </>
  )
}
