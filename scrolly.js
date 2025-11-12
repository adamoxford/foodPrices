// A simple scrollytelling implementation using SVG images

// Define the list of SVG files that correspond to the steps
// Make sure these filenames match your SVGs
const chartImages = [
    'chart_state_1.svg', // Corresponds to data-step="0"
    'chart_state_2.svg'  // Corresponds to data-step="1"
];

// Get the <img> element
const visElement = document.getElementById('vis');
let currentStep = -1; // Keep track of the current step

// This function is now very simple: it just changes the image source
function updateChart(stepIndex) {
    if (stepIndex === currentStep) {
        return; // Don't re-load the same image
    }
    
    currentStep = stepIndex;
    
    const newImageFile = chartImages[stepIndex];
    if (!newImageFile) {
        console.error('No chart image found for step:', stepIndex);
        return;
    }

    // This is the only line that matters:
    // Change the 'src' attribute of the <img> tag
    visElement.src = newImageFile;
}

// Set up the Intersection Observer (this logic is identical)
function setupObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the element is in view
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

// Start the observer
setupObserver();

// Note: We don't need the initial updateChart(0) call anymore
// because the HTML <img src="..."> already loads the first chart.
