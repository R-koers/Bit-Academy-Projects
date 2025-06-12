const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const component = data.components.find(comp => comp.id === parseInt(productId));
    
    if (!component) {
      document.getElementById("product-container").innerHTML = "<p>Product not found</p>";
      return;
    }

    const container = document.getElementById("product-container");

    container.innerHTML = `
      <h1 class="text-3xl font-bold mb-2">${component.name}</h1>
      <p class="text-sm text-gray-500 mb-4">${component.specifications.memory || component.specifications.memory_type || ''} • ${component.specifications.interface || ''}</p>

      <div class="flex flex-col md:flex-row gap-6">
        <div class="rounded-lg p-4 flex justify-center items-center md:w-1/2">
          <img src="${component.image}" alt="${component.name}" class="max-h-64 object-contain" />
        </div>

        <div class="space-y-4">
          <div>
            <p class="text-3xl font-bold text-gray-900">€${component.price.toFixed(2).replace('.', ',')}</p>
            <p class="text-sm text-gray-500">Incl. 21% btw</p>
          </div>

          <p><span class="font-bold">Hoeveelheid:</span> ${component.amount}</p>
          <p class="text-green-600 font-semibold">Volgende werkdag thuis</p>

          <p class="text-sm text-gray-600">2 jaar garantie<br />gratis retour bij defect binnen de garantie</p>

          <button onclick="addToCart(${component.id})" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
            In winkelwagen
          </button>

          <div class="flex gap-4 text-sm font-medium pt-4">
            <button class="underline">plus en min punten</button>
            <button class="underline">productomschrijving</button>
            <button class="underline">productspecificaties</button>
          </div>
        </div>
      </div>
<div>
<h3></h1>
</div>
      <div class="mt-8">
        <h2 class="bg-blue-900 text-white px-4 py-2 rounded-t-md font-semibold">Product specificaties</h2>
        <ul class="bg-white border border-blue-900 divide-y divide-blue-900 text-sm">
          ${Object.entries(component.specifications).map(([key, value]) => `
            <li class="flex justify-between px-4 py-2">
              <span class="capitalize">${key.replace('_', ' ')}</span>
              <span class="font-semibold">${value}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  })
  .catch(error => {
    console.error('Error loading product:', error);
    document.getElementById("product-container").innerHTML = "<p>Error loading product details</p>";
  });