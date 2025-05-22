document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById("carousel");
    if (!carousel) {
        console.log("Carousel element not found");
        return;
    }

    const slides = carousel.querySelectorAll(".carousel-item");
    if (slides.length === 0) {
        console.log("No slides found");
        return;
    }

    let currentIndex = 0;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    if (prevButton) {
        prevButton.addEventListener("click", () => {

            if (currentIndex === 0) {
                currentIndex = slides.length - 1;
            } else {
                currentIndex--;
            }
            updateCarousel();
        });
    } else {
        console.log("Previous button not found");
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            if (currentIndex === slides.length - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateCarousel();
        });
    } else {
        console.log("Next button not found");
    }

    updateCarousel();
});




    fetch('products.json')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("card-container");
        container.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4";
        const components = data.components;

        components.forEach((component) => {
          const card = document.createElement("div");
          card.className = "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200";
let shortSpecs = "";
if (component.specifications) {
  const specsToShow = Object.entries(component.specifications)
    .slice(0, 3) 
    .map(([key, value]) => `${value}`)
    .join(" • ");
  shortSpecs = specsToShow;
}
          card.innerHTML = `
            <div class="w-full h-[200px] flex justify-center items-center">
              <img src="${component.image}" alt="${component.name}" class="w-[300px] h-full p-4" />
            </div>
            <div class="p-4 space-y-3">
              <h3 class="text-lg font-bold text-gray-800 line-clamp-2 min-h-[56px]">
                ${component.name}
              </h3>
              <p class="text-md text-gray-600 line-clamp-2 min-h-[40px]">
  ${shortSpecs}
</p>

              <div class="font-bold text-blue-950">
                <span class="text-2xl">€${component.price.toFixed(2).replace('.', ',')}</span>
              </div>
              <div class="flex flex-row gap-2 justify-between px-4 py-4 pt-2">
                <a href="product.html?id=${component.id}"
                  class="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors duration-300 text-sm font-medium flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  Lees meer
                </a>
                <button class="bg-blue-950 hover:bg-blue-900 text-white py-2 px-4 rounded-lg transition-colors duration-300 text-sm font-medium flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          `;

          container.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Fout bij het ophalen van products.json:', error);
      });

  const openCartBtn = document.getElementById('open-cart');
  const closeCartBtn = document.getElementById('close-cart');
  const cartSidebar = document.getElementById('cart-sidebar');

  openCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('translate-x-full');
  });

  function closeCart() {
    cartSidebar.classList.add('translate-x-full');
  }

  closeCartBtn.addEventListener('click', closeCart);

