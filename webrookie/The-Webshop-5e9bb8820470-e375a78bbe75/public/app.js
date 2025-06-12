document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing carousel...');
    // hier wordt de carousel gemaakt
    const carousel = document.getElementById("carousel");
    if (carousel) {
        const slides = carousel.querySelectorAll(".carousel-item");
        if (slides.length === 0) {
            console.log("No slides found"); //als er geen slides zijn gevonden
            return;
        }

        let currentIndex = 0;
        //functie dat ervoor zorgt dat de carousel update naar de volgende image
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
                updateCarousel(); //functie wordt aangeroepen als je op de prev knop of next knop drukt
            });
        } else {
            console.log("Next button not found");
        }

        updateCarousel();
    }
});


//functie om te bepalen welk product bij welke categorie hoort gebasseerd op de specificaties van het product
function getProductCategory(product) {
    const specs = product.specifications;
    if (specs.gpu) return 'gpu';
    if (specs.memory_type) return 'memory';
    if (specs.type === 'NVMe' || specs.type === 'HDD') return 'storage';
    if (specs.type === 'Air Cooler') return 'cooling';
    if (specs.chipset) return 'motherboard';
    if (specs.wattage) return 'psu';
    if (specs.cores) return 'cpu';
    return 'other';
}

// Functie om het filteren van producten
function filterAndSortProducts(products, category, sortBy, searchTerm) {
    let filtered = [...products];
    
    // past de category filter toe
    if (category) {
        filtered = filtered.filter(product => getProductCategory(product) === category);
    }
    
    // past de zoek filter toe
    if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchLower) ||
            Object.values(product.specifications).some(value => 
                value.toLowerCase().includes(searchLower)
            )
        );
    }
    
    // past de sortering toe
    switch (sortBy) {
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
    }
    
    return filtered;
}

// dit is een functie om product cards te maken en die haalt dan vanwege de fetch die op regel 177 staat
function createProductCard(component) {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200";
    
    let shortSpecs = "";
    if (component.specifications) {
        const specsToShow = Object.entries(component.specifications)
            .slice(0, 3)
            .map(([_, value]) => `${value}`)
            .join(" • ");
        shortSpecs = specsToShow;
    }
    
    card.innerHTML = `
        <div class="w-full h-[300px] flex justify-center items-center">
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
                <button onclick="addToCart('${component.id}')" class="bg-blue-950 hover:bg-blue-900 text-white py-2 px-4 rounded-lg transition-colors duration-300 text-sm font-medium flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Functie om de display te updaten en te displayen
function updateProductDisplay(products) {
    const container = document.getElementById("card-container");
    if (!container) return;
    
    container.innerHTML = '';
    products.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

// hier wordt de pagina geinitialiseerd
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById("card-container");
    if (!container) return;
    
    // verkrijg de filter elementen
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    const searchInput = document.getElementById('search-input');
    
    let allProducts = [];
    
    // hier worden de products in products.json gefetched
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data.components;
            updateProductDisplay(allProducts);
            
            // hier worden eventlistener toegepast op de filters 
            categoryFilter.addEventListener('change', updateFilters);
            sortBy.addEventListener('change', updateFilters);
            searchInput.addEventListener('input', updateFilters);
        })
        .catch(error => {
            console.error('Error loading products:', error);
        });
    
    // en hier is een functie gemaakt om de filters ook te updaten
    function updateFilters() {
        const filteredProducts = filterAndSortProducts(
            allProducts,
            categoryFilter.value,
            sortBy.value,
            searchInput.value
        );
        updateProductDisplay(filteredProducts);
    }
});

