// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Parts Search Functionality
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('partsSearchInput');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (searchInput.value.trim() === '') {
        searchInput.focus();
        return;
    }
    
    // Show loading state
    const originalText = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    
    // Simulate search
    setTimeout(() => {
        searchBtn.innerHTML = originalText;
        alert(`Searching for: "${searchInput.value}"\nThis would show results in a real implementation.`);
    }, 1500);
});

// Load Featured Parts
const partsGrid = document.getElementById('partsGrid');
const featuredParts = [
    {
        name: "2018 Ford F-150 Transmission",
        image: "images/transmission-part.jpg",
        price: 1250,
        originalPrice: 1900,
        mileage: "42,000 km",
        discount: 35
    },
    {
        name: "2016 Honda Civic Alternator",
        image: "images/alternator-part.jpg",
        price: 95,
        originalPrice: 150,
        mileage: "38,000 km",
        discount: 20
    },
    {
        name: "2019 Toyota RAV4 Engine",
        image: "images/engine-part.jpg",
        price: 2200,
        originalPrice: 3200,
        mileage: "25,000 km",
        discount: 30
    }
];

function loadFeaturedParts() {
    partsGrid.innerHTML = featuredParts.map(part => `
        <div class="part-card">
            ${part.discount ? `<div class="part-badge">-${part.discount}%</div>` : ''}
            <div class="part-image">
                <img src="${part.image}" alt="${part.name}" loading="lazy">
            </div>
            <h4>${part.name}</h4>
            <div class="part-meta">
                <span class="mileage"><i class="fas fa-tachometer-alt"></i> ${part.mileage}</span>
                <span class="warranty"><i class="fas fa-shield-alt"></i> 90 Days</span>
            </div>
            <p class="price">$${part.price.toLocaleString()} <span class="original-price">$${part.originalPrice.toLocaleString()}</span></p>
            <button class="btn btn-block add-to-cart">
                <i class="fas fa-cart-plus"></i> ADD TO CART
            </button>
        </div>
    `).join('');
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const partName = this.closest('.part-card').querySelector('h4').textContent;
            this.innerHTML = '<i class="fas fa-check"></i> ADDED!';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-cart-plus"></i> ADD TO CART';
                this.style.backgroundColor = '';
            }, 2000);
            
            console.log(`Added to cart: ${partName}`);
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedParts();
    
    // Animate elements when they come into view
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.part-card, .category-card').forEach(card => {
        animateOnScroll.observe(card);
    });
});