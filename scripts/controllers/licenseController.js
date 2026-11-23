import { License } from '../types/license.js';

export class LicenseController {
    constructor(licensesData) {
        this.licenses = licensesData.map(data => new License(data));
    }

   
    RenderFeatured(count, parent) {
        parent.innerHTML = '';
        const featuredList = this.licenses.filter(l => l.featured).slice(0, count);
        featuredList.forEach(license => license.Render(parent));
    }


    RenderOffers(count, parent) {
        parent.innerHTML = '';
        const offersList = this.licenses
            .filter(l => l.discount > 0)
            .sort((a, b) => b.discount - a.discount)
            .slice(0, count);
        offersList.forEach(license => license.Render(parent));
    }

   
    RenderLatest(count, parent) {
        parent.innerHTML = '';
        

        const softwareMap = new Map();
        this.licenses.forEach(l => {
           
            softwareMap.set(l.software, l);
        });

        const latestList = Array.from(softwareMap.values()).slice(0, count);
        latestList.forEach(license => license.Render(parent));
    }

    
    RenderAll(count, parent, searchTerm = '', sortBy = 'default') {
        parent.innerHTML = '';

       
        let filtered = this.licenses.filter(l => 
            l.software.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.version.toLowerCase().includes(searchTerm.toLowerCase())
        );

        
        if (sortBy === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            filtered.sort((a, b) => b.price - b.price);
        }

       
        const result = count ? filtered.slice(0, count) : filtered;
        result.forEach(license => license.Render(parent));
    }
}