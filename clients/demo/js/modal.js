// Modal content data structure
const cardContents = {
    0: {
        title: "Welcome",
        items: [
            "A Personal Greeting from the Team",
            "Discover the Little Touches Awaiting You"
        ]
    },
    1: {
        title: "Before You Arrive",
        items: [
            "What to Pack for Your Adventure",
            "Directions and Getting Here Smoothly",
            "Special Requests? Let Us Know!",
            "Weather Tips & Local Insights",
            "Pre-Check-In: How to Make it Seamless"
        ]
    },
    2: {
        title: "When You Arrive",
        items: [
            "Quick Check-In & Welcome Treats",
            "Your Guide to Unpacking and Unwinding",
            "Room Orientation for a Smooth Start",
            "Meet the Resort's Cozy Corners",
            "Settle In and Feel Right at Home"
        ]
    },
    5: {
        title: "Necessities & Convenience",
        items: [
            "24/7 Services & Support",
            "Medical & Emergency Info",
            "Daily Essentials & Supplies",
            "Laundry & Housekeeping"
        ]
    },
    7: {
        title: "Wi-Fi & More",
        items: [
            "Connect to Wi-Fi in a Flash",
            "Setting Your Ideal Room Temperature",
            "Easy Access to Reception Help",
            "Troubleshooting Basics – We've Got You!",
            "Quick Tips for Staying Comfortable"
        ]
    },
    8: {
        title: "Amenities",
        items: [
            "Poolside Paradise & Lounges",
            "The Fitness Hub – Your Space to Energize",
            "Spa Secrets & Relaxation Spots",
            "On-Site Dining Delights to Try",
            "Hidden Corners for Quiet Moments"
        ]
    },
    9: {
        title: "Discover Nearby",
        items: [
            "Scenic Trails and Natural Wonders",
            "Top Local Cafés and Eateries",
            "Family-Friendly Activities for All Ages",
            "Must-Visit Historical Spots Nearby",
            "Nightlife and Evening Entertainment"
        ]
    },
    10: {
        title: "Safety Guidelines",
        items: [
            "Emergency Contact Information",
            "Health & Wellness Essentials",
            "Safety Guidelines to Keep You Secure",
            "Resort Etiquette for a Smooth Stay",
            "Local Safety Tips You Should Know"
        ]
    },
    11: {
        title: "Share Your Experience",
        items: [
            "Leave a Review – It Matters!",
            "Capture Your Moments and Tag Us",
            "Join the Wall of Smiles & Memories",
            "Share Your Tips with Fellow Travelers",
            "Rate Your Favorite Amenities"
        ]
    },
    13: {
        title: "Until Next Time",
        items: [
            "Quick & Easy Check-Out Tips",
            "Leaving Feedback? We're All Ears",
            "Pack Up and Prepare for Departure",
            "Stay in Touch for Future Adventures"
        ]
    }
};

// Modal functionality
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const modalContentDiv = document.getElementById('modalContent');
const cards = document.querySelectorAll('.card');

function openModal() {
    modalOverlay.style.display = 'flex';
    document.body.classList.add('modal-open');
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modalOverlay.style.display = 'none';
        document.body.classList.remove('modal-open');
        modalContentDiv.innerHTML = '';
    }, 300);
}

// Add click event to each card
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const content = cardContents[index];
        const modalHTML = `
            <div class="modal-header">
                <h2>${content.title}</h2>
                <div class="modal-buttons">
                    <a href="https://g.page/r/your-google-review-link" 
                       class="review-button" 
                       target="_blank"
                       aria-label="Leave a review on Google">
                        ★ Enjoying the vibe? Drop a quick review
                    </a>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close modal"></button>
                </div>
            </div>
            <div class="modal-list">
                ${content.items.map((item, i) => `
                    <div class="list-item" style="--index: ${i}" onclick="handleSubheadingClick(${index}, ${i})">
                        <span class="arrow">→</span>
                        <span>${item}</span>
                    </div>
                `).join('')}
            </div>
        `;
        modalContentDiv.innerHTML = modalHTML;
        openModal();
    });
});

// Update the handleSubheadingClick function
function handleSubheadingClick(cardIndex, itemIndex) {
    closeModal();
    
    setTimeout(() => {
        switch(cardIndex) {
            case 0: // Welcome
                window.location.href = 'welcome.html' + 
                    (itemIndex === 0 ? '#personal-greeting' : '#little-touches');
                break;
                
            case 1: // Pre-Arrival Essentials
                const preArrivalAnchors = ['#packing', '#directions', '#requests', '#weather', '#pre-checkin'];
                window.location.href = 'pre-arrival.html' + preArrivalAnchors[itemIndex];
                break;
                
            case 2: // Your First Moments
                const firstMomentsAnchors = ['#check-in', '#unpacking', '#orientation', '#resort-corners', '#settle-in'];
                window.location.href = 'first-moments.html' + firstMomentsAnchors[itemIndex];
                break;
                
            case 5: // Necessities & Convenience (New)
                const necessitiesAnchors = ['#services', '#medical', '#essentials', '#laundry'];
                window.location.href = 'necessities-guide.html' + necessitiesAnchors[itemIndex];
                break;
                
            case 7: // Stay in Touch – Wi-Fi, AC, & Reception
                const stayInTouchAnchors = ['#wifi', '#temperature', '#reception', '#troubleshooting', '#comfort-tips'];
                window.location.href = 'stay-connected.html' + stayInTouchAnchors[itemIndex];
                break;
                
            case 8: // Hidden Gems & Amenities
                const hiddenGemsAnchors = ['#pool', '#fitness', '#spa', '#dining', '#quiet-spots'];
                window.location.href = 'amenities.html' + hiddenGemsAnchors[itemIndex];
                break;
                
            case 9: // Discover Nearby
                const nearbyAnchors = ['#trails', '#cafes', '#family-activities', '#historical', '#nightlife'];
                window.location.href = 'discover-nearby.html' + nearbyAnchors[itemIndex];
                break;
                
            case 10: // Stay Safe
                const safetyAnchors = ['#emergency', '#health', '#guidelines', '#etiquette', '#local-safety'];
                window.location.href = 'safety.html' + safetyAnchors[itemIndex];
                break;
                
            case 11: // Extended Stays and Services
                const servicesAnchors = ['#extended-stay', '#late-checkout', '#housekeeping', '#transport', '#experiences'];
                window.location.href = 'services.html' + servicesAnchors[itemIndex];
                break;
                
            case 13: // Farewell
                const farewellAnchors = ['#checkout', '#feedback', '#packing-tips', '#stay-in-touch'];
                window.location.href = 'farewell.html' + farewellAnchors[itemIndex];
                break;
        }
    }, 300);
}

// Close modal when clicking outside
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
        closeModal();
    }
}); 