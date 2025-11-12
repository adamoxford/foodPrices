// A simple scrollytelling implementation using SVG images

const chartImages = [
    'chart_state_1.svg', // Corresponds to data-step="0"
    'chart_state_2.svg'  // Corresponds to data-step="1"
];

// Get the <object> element
const visElement = document.getElementById('vis');
let currentStep = -1;

function updateChart(stepIndex) {
    if (stepIndex === currentStep) {
        return;
    }
    
    currentStep = stepIndex;
    
    const newImageFile = chartImages[stepIndex];
    if (!newImageFile) {
        console.error('No chart image found for step:', stepIndex);
        return;
    }

    // This is the only line that changes:
    // Change the 'data' attribute of the <object> tag
    visElement.data = newImageFile;
}

// Set up the Intersection Observer (this logic is identical)
function setupObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepIndex = parseInt(entry.target.dataset.step, 10);
                updateChart(stepIndex);
            }
        });
    }, options);

    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        observer.observe(step);
    });
}

setupObserver();
