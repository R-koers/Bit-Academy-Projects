// hier worden de originele producten gedeclareerd
let originalProducts = null;

// hier wordt er gefetched en word de tabel gedisplayed
async function loadProducts() {
    try {
        let data;
        
        // dit is een check om te kijken of er nog producten in de localstorage zitten
        const storedData = localStorage.getItem('products');
        if (storedData) {
            data = JSON.parse(storedData);
        } else {
            // als er geen data in zit wordt de product.json data gedisplayed
            const response = await fetch('products.json');
            data = await response.json();
            // Store the initial data
            localStorage.setItem('products', JSON.stringify(data));
        }
        
        // hier wordt de originele data nog een keer gestored als dat nog niet is gebeurt
        if (!originalProducts) {
            originalProducts = JSON.parse(JSON.stringify(data));
        }
        
        const tableBody = document.getElementById('products-table-body');
        tableBody.innerHTML = ''; // eerdere data wordt gecleared
        
        data.components.forEach(product => {
            const row = createProductRow(product);
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function createProductRow(product) {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50';
    
    row.innerHTML = `
        <td class="px-6 py-4 border-b">${product.name}</td>
        <td class="px-6 py-4 border-b">€${product.price.toFixed(2)}</td>
        <td class="px-6 py-4 border-b">${product.amount}</td>
        <td class="px-6 py-4 border-b">
            <button class="edit-product text-blue-600 hover:text-blue-800" data-id="${product.id}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            </button>
        </td>
        <td class="px-6 py-4 border-b">
            <button class="delete-product text-red-600 hover:text-red-800" data-id="${product.id}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            </button>
        </td>
    `;
    
    return row;
}

// hier wordt een popup gemaakt voor het editen van een product of om een nieuw product toetevoegen
function showProductModal(product = null) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full';
    
    const isEdit = product !== null;
    const title = isEdit ? 'Edit Product' : 'Add New Product';
    
    // hier wordt een specificatie field gemaakt waarin je dus specifieke product specificaties kan toevoegen
    const specFields = isEdit ? Object.entries(product.specifications).map(([key, value]) => `
        <div class="spec-field flex gap-2 items-end">
            <div class="flex-1">
                <label class="block text-sm font-medium text-blue-950">Specification Name</label>
                <input type="text" name="spec_key" value="${key.replace('_', ' ')}" required
                    class="mt-1 block w-full rounded-md border-blue-950/20 shadow-sm focus:border-blue-950 focus:ring-blue-950 bg-white text-blue-950">
            </div>
            <div class="flex-1">
                <label class="block text-sm font-medium text-blue-950">Value</label>
                <input type="text" name="spec_value" value="${value}" required
                    class="mt-1 block w-full rounded-md border-blue-950/20 shadow-sm focus:border-blue-950 focus:ring-blue-950 bg-white text-blue-950">
            </div>
            <button type="button" class="remove-spec mb-1 p-2 text-red-600 hover:text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    `).join('') : `
        <div class="spec-field flex gap-2 items-end">
            <div class="flex-1">
                <label class="block text-sm font-medium text-blue-950">Specification Name</label>
                <input type="text" name="spec_key" value="" required
                    class="mt-1 block w-full rounded-md border-blue-950/20 shadow-sm focus:border-blue-950 focus:ring-blue-950 bg-white text-blue-950">
            </div>
            <div class="flex-1">
                <label class="block text-sm font-medium text-blue-950">Value</label>
                <input type="text" name="spec_value" value="" required
                    class="mt-1 block w-full rounded-md border-blue-950/20 shadow-sm focus:border-blue-950 focus:ring-blue-950 bg-white text-blue-950">
            </div>
            <button type="button" class="remove-spec mb-1 p-2 text-red-600 hover:text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    `;
    
    modal.innerHTML = `
        <div class="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div class="mt-3">
                <h3 class="text-xl font-semibold text-blue-950 mb-6">${title}</h3>
                <form id="product-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-blue-950">Product Name</label>
                        <input type="text" name="name" value="${product?.name || ''}" required
                            class="mt-1 block w-full rounded-md border-blue-950/20 shadow-sm focus:border-blue-950 focus:ring-blue-950 bg-white text-blue-950">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-blue-950">Price</label>
                        <input type="number" name="price" step="0.01" value="${product?.price || ''}" required
                            class="mt-1 block w-full rounded-md border-blue-950/20 shadow-sm focus:border-blue-950 focus:ring-blue-950 bg-white text-blue-950">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-blue-950">Stock</label>
                        <input type="number" name="amount" value="${product?.amount || ''}" required
                            class="mt-1 block w-full rounded-md border-blue-950/20 shadow-sm focus:border-blue-950 focus:ring-blue-950 bg-white text-blue-950">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-blue-950">Image URL</label>
                        <input type="url" name="image" value="${product?.image || ''}" required
                            class="mt-1 block w-full rounded-md border-blue-950/20 shadow-sm focus:border-blue-950 focus:ring-blue-950 bg-white text-blue-950">
                    </div>
                    <div class="mt-4">
                        <div class="flex justify-between items-center mb-2">
                            <h4 class="text-sm font-medium text-blue-950">Specifications</h4>
                            <button type="button" id="add-spec" class="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                                </svg>
                                Add Specification
                            </button>
                        </div>
                        <div id="specifications-container" class="space-y-3">
                            ${specFields}
                        </div>
                    </div>
                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" class="cancel-modal px-4 py-2 bg-gray-100 text-blue-950 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors duration-300 font-medium">
                            ${isEdit ? 'Save Changes' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // hier worden nieuwe event listeners toegevoegd voor nieuwe specificatie velden
    const addSpecButton = modal.querySelector('#add-spec');
    const specsContainer = modal.querySelector('#specifications-container');
    
    addSpecButton.addEventListener('click', () => {
        const newSpecField = document.createElement('div');
        newSpecField.className = 'spec-field flex gap-2 items-end';
        newSpecField.innerHTML = `
            <div class="flex-1">
                <label class="block text-sm font-medium text-blue-950">Specification Name</label>
                <input type="text" name="spec_key" value="" required
                    class="mt-1 block w-full rounded-md border-blue-950/20 shadow-sm focus:border-blue-950 focus:ring-blue-950 bg-white text-blue-950">
            </div>
            <div class="flex-1">
                <label class="block text-sm font-medium text-blue-950">Value</label>
                <input type="text" name="spec_value" value="" required
                    class="mt-1 block w-full rounded-md border-blue-950/20 shadow-sm focus:border-blue-950 focus:ring-blue-950 bg-white text-blue-950">
            </div>
            <button type="button" class="remove-spec mb-1 p-2 text-red-600 hover:text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        `;
        specsContainer.appendChild(newSpecField);
    });
    
    // hier wordt een eventlistener toegevoegd voor het verwijderen van een specificatie
    modal.querySelectorAll('.remove-spec').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.spec-field').remove();
        });
    });
    
    // hiermee wordt er voor gezorgd dat je edits in de form ook daadwerkelijk de product aanpassen
    const form = modal.querySelector('#product-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const productData = {
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            amount: parseInt(formData.get('amount')),
            image: formData.get('image'),
            specifications: {}
        };
        
        // hier worden 
        const specFields = modal.querySelectorAll('.spec-field');
        specFields.forEach(field => {
            const key = field.querySelector('[name="spec_key"]').value.trim().toLowerCase().replace(/\s+/g, '_');
            const value = field.querySelector('[name="spec_value"]').value.trim();
            if (key && value) {
                productData.specifications[key] = value;
            }
        });
        
        if (isEdit) {
            await updateProduct(product.id, productData);
        } else {
            await addProduct(productData);
        }
        
        modal.remove();
    });
    
    // als je toch niet je changes in je product wilt aanpassen dan zorgt dit er voor dat je als je er op klikt dat er ook niets verandert
    modal.querySelector('.cancel-modal').addEventListener('click', () => {
        modal.remove();
    });
}


async function handleEditClick(event) {
    const button = event.target.closest('.edit-product');
    if (!button) return;
    
    const productId = parseInt(button.dataset.id);
    const product = originalProducts.components.find(p => p.id === productId);
    if (product) {
        showProductModal(product);
    }
}

// handel de verwijder knop zodat als je erop klikt er ook een product wordt verwijdert
async function handleDeleteClick(event) {
    const button = event.target.closest('.delete-product');
    if (!button) return;
    
    const productId = parseInt(button.dataset.id);
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            const response = await fetch('products.json');
            const data = await response.json();
            
            // verwijder het product
            data.components = data.components.filter(p => p.id !== productId);
            
            // Save de nieuwe data
            await saveProducts(data);
            
            // herlaad de tabel
            await loadProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    }
}

// Handle add product button click
function handleAddProduct() {
    showProductModal();
}

// Handle reset products button click
async function handleResetProducts() {
    if (confirm('Are you sure you want to reset all products to their original state?')) {
        try {
            // Fetch the original products from products.json
            const response = await fetch('products.json');
            const originalData = await response.json();
            
            // Save the original data
            await saveProducts(originalData);
            
            // Update the originalProducts reference
            originalProducts = JSON.parse(JSON.stringify(originalData));
            
            // Reload the table
            await loadProducts();
            
            alert('Products have been reset to their original state.');
        } catch (error) {
            console.error('Error resetting products:', error);
            alert('Failed to reset products');
        }
    }
}

// Add new product
async function addProduct(productData) {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        
        // Generate new ID
        const newId = Math.max(...data.components.map(p => p.id)) + 1;
        
        // Add new product
        data.components.push({
            id: newId,
            ...productData
        });
        
        // Save the updated data
        await saveProducts(data);
        
        // Reload the table
        await loadProducts();
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Failed to add product');
    }
}

// Update existing product
async function updateProduct(productId, productData) {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        
        // Update the product
        const index = data.components.findIndex(p => p.id === productId);
        if (index !== -1) {
            data.components[index] = {
                ...data.components[index],
                ...productData
            };
        }
        
        // Save the updated data
        await saveProducts(data);
        
        // Reload the table
        await loadProducts();
    } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product');
    }
}

// Save products to file
async function saveProducts(data) {
    try {
        // Save to localStorage
        localStorage.setItem('products', JSON.stringify(data));
        
        // Update the original products data
        originalProducts = JSON.parse(JSON.stringify(data));
        
        // Save to products.json using a POST request to a server endpoint
        const response = await fetch('/update-products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to save products to server');
        }
        
        // Reload the table to show the changes
        await loadProducts();
        
        return true;
    } catch (error) {
        console.error('Error saving products:', error);
        // If server update fails, at least keep the localStorage changes
        alert('Changes saved locally, but failed to update server. Please contact administrator.');
        return false;
    }
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    
    // Add event listeners for buttons
    document.getElementById('products-table-body').addEventListener('click', (e) => {
        handleEditClick(e);
        handleDeleteClick(e);
    });
    
    document.getElementById('add-product').addEventListener('click', handleAddProduct);
    document.getElementById('reset-products').addEventListener('click', handleResetProducts);
});
