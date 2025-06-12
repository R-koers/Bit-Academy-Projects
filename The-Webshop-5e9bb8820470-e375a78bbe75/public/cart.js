document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function getCartElement(baseId) {
        const contexts = ['', 'product-', 'parts-'];
        for (const context of contexts) {
            const element = document.getElementById(context + baseId);
            if (element) return element;
        }
        return null;
    }

    function showNotification(message) {
        try {
            const overlay = document.createElement('div');
            overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50';
            overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 9999;';
            
            const notification = document.createElement('div');
            notification.className = 'fixed bg-white text-gray-800 rounded-2xl shadow-xl z-50';
            notification.style.cssText = 'position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); background-color: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); z-index: 10000; opacity: 0; width: 300px; height: 300px; display: flex; align-items: center; justify-content: center; margin: 0;';
            
            const messageContainer = document.createElement('div');
            messageContainer.className = 'text-center w-full flex flex-col items-center justify-center';
            messageContainer.style.cssText = 'width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;';
            messageContainer.innerHTML = `
                <svg class="h-16 w-16 text-green-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p class="text-lg font-medium">${message}</p>
            `;
            
            notification.appendChild(messageContainer);
            
            function removeNotification() {
                notification.style.opacity = '0';
                overlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                    document.body.removeChild(overlay);
                }, 300);
            }
            
            overlay.addEventListener('click', removeNotification);
            
            document.body.appendChild(overlay);
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.opacity = '1';
            }, 100);
            
            const timeoutId = setTimeout(removeNotification, 2000);
            
            overlay.addEventListener('click', () => {
                clearTimeout(timeoutId);
            });
        } catch (error) {
            console.error('Error in showNotification:', error);
        }
    }

    const cartItems = getCartElement('cart-items');
    const cartOverlay = getCartElement('cart-overlay');
    const cartSidebar = getCartElement('cart-sidebar');
    const openCartBtn = getCartElement('open-cart');
    const closeCartBtn = getCartElement('close-cart');

    function updateCartDisplay() {
        if (!cartItems) {
            return;
        }
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-gray-500 text-center mt-8">Je winkelwagen is leeg.</p>';
            return;
        }

        cartItems.innerHTML = cart.map(item => `
            <div class="flex items-center justify-between py-2 border-b">
                <div class="flex items-center space-x-4">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-contain">
                    <div>
                        <h3 class="font-medium">${item.name}</h3>
                        <p class="text-sm text-gray-600">€${item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        `).join('');
    }

    window.addToCart = function(componentId) {
        const id = parseInt(componentId);
        
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                const component = data.components.find(c => c.id === id);
                if (!component) {
                    return;
                }
                
                const existingItem = cart.find(item => item.id === component.id);
                if (existingItem) {
                    showNotification('Dit product zit al in je winkelwagen!');
                    return;
                }
                cart.push(component);
                localStorage.setItem('cart', JSON.stringify(cart));
                showNotification(`${component.name} is toegevoegd aan je winkelwagen!`);
                updateCartDisplay();
            })
            .catch(error => {
                showNotification('Er is een fout opgetreden bij het toevoegen aan je winkelwagen.');
            });
    };

    window.removeFromCart = function(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };

    updateCartDisplay();

    if (openCartBtn) {
        openCartBtn.addEventListener('click', () => {
            if (cartSidebar) cartSidebar.classList.remove('translate-x-full');
            if (cartOverlay) cartOverlay.classList.remove('hidden');
        });
    }

    function closeCart() {
        if (cartSidebar) cartSidebar.classList.add('translate-x-full');
        if (cartOverlay) cartOverlay.classList.add('hidden');
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
}); 