import { LicenseController } from './controllers/licenseController.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
       
        const response = await fetch('../data/licenses.json');
        const data = await response.json();

      
        const controller = new LicenseController(data);

        
        const featuredContainer = document.getElementById('featured-container');
        const offersContainer = document.getElementById('offers-container');
        const latestContainer = document.getElementById('latest-container');
        const allContainer = document.getElementById('all-container');

        
        controller.RenderFeatured(3, featuredContainer);
        controller.RenderOffers(3, offersContainer);
        controller.RenderLatest(3, latestContainer);

       
        controller.RenderAll(null, allContainer);

        
        const filterInput = document.getElementById('filter-input');
        const sortSelect = document.getElementById('sort-select');

        const updateAllSection = () => {
            const search = filterInput.value;
            const sort = sortSelect.value;
            controller.RenderAll(null, allContainer, search, sort);
        };

        filterInput.addEventListener('input', updateAllSection);
        sortSelect.addEventListener('change', updateAllSection);

    } catch (error) {
        console.error('Error al cargar las licencias:', error);
    }
});