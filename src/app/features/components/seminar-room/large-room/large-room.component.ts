import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {SwiperOptions} from "swiper/types";
import Swiper from "swiper";
import {EffectCoverflow, Navigation, Pagination} from "swiper/modules";
import {NgClass} from "@angular/common";

Swiper.use([Navigation, Pagination, EffectCoverflow]);

@Component({
  selector: 'app-large-room',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './large-room.component.html',
  styleUrls: ['./large-room.component.scss'],
})
export class LargeRoomComponent implements AfterViewInit{
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  loading = true;
@Input({required: true}) swiperClass!: string;
@Input({required:true}) images!:string[];
@Input({required:true}) title!:string;
@Input({required:true}) subtitle!:string;

  ngAfterViewInit(): void {
    this.initializeSwiper();
  }

  private initializeSwiper(): void {
    const options: SwiperOptions = {
      init: false,
      loop: true,
      speed: 800,
      slidesPerView: 1,
      centeredSlides: true,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      grabCursor: true,
      parallax: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1023: {
          slidesPerView: 2,
          spaceBetween: 0
        }
      },
      on: {
        init: function () {
          const swiper = this as unknown as Swiper;
          swiper.el.classList.remove('loading');
        }
      }
    };

    const mySwiper = new Swiper('.'+this.swiperClass, options);
    mySwiper.init();
  }


}
