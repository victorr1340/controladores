export class License {
    constructor({ id, software, version, price, key, featured, discount }) {
        this.id = id;
        this.software = software;
        this.version = version;
        this.price = price;
        this.key = key;
        this.featured = featured;
        this.discount = discount;
    }

   
    Render(parent) {
        const card = document.createElement('div');
        card.className = 'card';

        const finalPrice = this.discount > 0 
            ? (this.price * (1 - this.discount / 100)).toFixed(2) 
            : this.price.toFixed(2);

        card.innerHTML = `
            <div>
                ${this.discount > 0 ? `<span class="discount">-${this.discount}%</span>` : ''}
                <h3>${this.software}</h3>
                <p>Versión: <strong>${this.version}</strong></p>
                <p class="price">${finalPrice}€ ${this.discount > 0 ? `<del style="font-size:0.9rem; color:#94a3b8;">${this.price}€</del>` : ''}</p>
            </div>
        `;

        const buyButton = document.createElement('button');
        buyButton.textContent = 'Comprar Licencia';
        buyButton.addEventListener('click', () => this.Buy());
        
        card.appendChild(buyButton);
        parent.appendChild(card);
    }

    
    Buy() {
        const modal = document.getElementById('modal');
        const modalKey = document.getElementById('modal-key');
        
        modalKey.textContent = this.key;
        modal.classList.remove('hidden');

        const closeModal = document.getElementById('close-modal');
        const closeAction = () => {
            modal.classList.add('hidden');
            closeModal.removeEventListener('click', closeAction);
        };
        closeModal.addEventListener('click', closeAction);
    }
}