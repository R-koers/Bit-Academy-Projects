document.addEventListener('DOMContentLoaded', function() {
    // hier worden de cart items vanuit de local storage opgehaald die dus in de shopping cart zitten
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutContainer = document.getElementById('checkout-container');
    
    // totale prijs wordt hier berekend door de cart items bij elkaar op te tellen
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    // checkout form wordt hier gemaakt
    checkoutContainer.innerHTML = `
        <div class="max-w-4xl mx-auto p-6">
            <h1 class="text-3xl font-bold mb-8">Afrekenen</h1>
            
            <!-- Order Summary -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 class="text-xl font-semibold mb-4">Je bestelling</h2>
                <div class="space-y-4">
                    ${cart.map(item => `
                        <div class="flex justify-between items-center border-b pb-4">
                            <div class="flex items-center space-x-4">
                                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-contain">
                                <div>
                                    <h3 class="font-medium">${item.name}</h3>
                                    <p class="text-sm text-gray-600">€${item.price.toFixed(2).replace('.', ',')}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                    <div class="flex justify-between items-center pt-4 font-bold">
                        <span>Totaal</span>
                        <span>€${totalPrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>
            </div>

            <!-- Customer Information Form -->
            <form id="checkout-form" class="space-y-8">
                <!-- Personal Information -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-xl font-semibold mb-4">Persoonlijke gegevens</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Voornaam *</label>
                            <input type="text" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Achternaam *</label>
                            <input type="text" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">E-mailadres *</label>
                            <input type="email" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer *</label>
                            <input type="tel" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                    </div>
                </div>

                <!-- Delivery Address -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-xl font-semibold mb-4">Bezorgadres</h2>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Straatnaam *</label>
                            <input type="text" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Huisnummer *</label>
                                <input type="text" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Toevoeging</label>
                                <input type="text" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Postcode *</label>
                                <input type="text" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Plaats *</label>
                                <input type="text" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Payment Method -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-xl font-semibold mb-4">Betaalmethode</h2>
                    <div class="space-y-4">
                        <div class="flex items-center space-x-4 p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                            <input type="radio" name="payment" id="ideal" value="ideal" class="h-4 w-4 text-blue-600">
                            <label for="ideal" class="flex items-center space-x-2 cursor-pointer">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/IDEAL_logo.webp" alt="iDEAL" class="h-8">
                                <span>iDEAL</span>
                            </label>
                        </div>
                        <div class="flex items-center space-x-4 p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                            <input type="radio" name="payment" id="paypal" value="paypal" class="h-4 w-4 text-blue-600">
                            <label for="paypal" class="flex items-center space-x-2 cursor-pointer">
                                <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal" class="h-8">
                                <span>PayPal</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Terms and Submit -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-start space-x-2 mb-6">
                        <input type="checkbox" required class="mt-1 h-4 w-4 text-blue-600">
                        <label class="text-sm text-gray-600">
                            Ik ga akkoord met de <a href="#" class="text-blue-600 hover:underline">algemene voorwaarden</a> en <a href="#" class="text-blue-600 hover:underline">privacybeleid</a>
                        </label>
                    </div>
                    <button type="submit" class="w-full bg-blue-950 text-white py-3 rounded-md hover:bg-blue-900 transition font-semibold">
                        Nu betalen - €${totalPrice.toFixed(2).replace('.', ',')}
                    </button>
                </div>
            </form>
        </div>
    `;

    // handel de form submissie af
    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // verkrijg welke payment method je gebruikt
        const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
        
        if (!paymentMethod) {
            alert('Selecteer een betaalmethode');
            return;
        }

        // Simulatie van het betalingsprocess in een notendop
        if (paymentMethod === 'ideal') {
            // als je ideal kiest krijg je dat je "doorgestuurd" wordt naar ideal
            alert('Je wordt doorgestuurd naar je bank voor iDEAL betaling...');
            setTimeout(() => {
                alert('Betaling succesvol! Je bestelling is geplaatst.');
                localStorage.removeItem('cart'); // cart wordt gecleared om het echt te laten lijken alsof je wat hebt gekocht
                window.location.href = 'index-new.html'; // je wordt weer terug gestuurd naar de homepage
            }, 2000);
        } else if (paymentMethod === 'paypal') {
            // voor als je paypal kiest in de tabel krijg je een paar popups
            alert('Je wordt doorgestuurd naar PayPal...');
            setTimeout(() => {
                alert('Betaling succesvol! Je bestelling is geplaatst.');
                localStorage.removeItem('cart'); // cart wordt gecleared om het echt te laten lijken alsof je wat hebt gekocht
                window.location.href = 'index-new.html'; // je wordt weer terug gestuurd naar de homepage
            }, 2000);
        }
    });
});
