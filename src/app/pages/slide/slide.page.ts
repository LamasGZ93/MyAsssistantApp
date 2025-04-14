import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import Swiper from 'swiper';  // Importación corregida
import { Pagination } from 'swiper/modules'; // Importación del módulo Pagination
import 'swiper/swiper-bundle.css'; // Asegúrate de importar los estilos

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
})
export class SlidePage implements AfterViewInit {
  swiper: Swiper | undefined;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      loop: false,
      allowTouchMove: true, // Permite arrastrar las imágenes
      modules: [Pagination], // Usamos el módulo Pagination
      on: {
        slideChange: () => {
          // Asegurarse de que el slide activo no tiene aria-hidden
          const slides = document.querySelectorAll('.swiper-slide');
          slides.forEach((slide, index) => {
            if (index === this.swiper?.activeIndex) {
              slide.removeAttribute('aria-hidden'); // El slide activo no tiene aria-hidden
            } else {
              slide.setAttribute('aria-hidden', 'true'); // El resto de los slides tienen aria-hidden
            }
          });
        },
      },
    });
  }

  // Función para redirigir al Home y marcar el tutorial como visto
  goToHome() {
    localStorage.setItem('tutorialVisto', 'true'); // Marcar el tutorial como visto
    this.router.navigate(['/home']);
    this.resetAriaHidden(); // Reseteamos aria-hidden cuando se va al home
  }

  // Función para pasar al siguiente slide
  nextSlide() {
    this.swiper?.slideNext(); // Avanza al siguiente slide
    this.resetAriaHidden(); // Reseteamos aria-hidden cuando se cambia de slide
  }

  // Función para resetear aria-hidden en todos los slides al cambiar
  resetAriaHidden() {
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach((slide) => {
      slide.removeAttribute('aria-hidden'); // Aseguramos que no haya aria-hidden aplicado
    });
  }
}
