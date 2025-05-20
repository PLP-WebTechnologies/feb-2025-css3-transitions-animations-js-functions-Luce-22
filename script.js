document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const animatedBox = document.getElementById('myAnimatedBox');
    const triggerAnimationButton = document.getElementById('triggerAnimation');
    const themeSelect = document.getElementById('themeSelect');
    const savePreferencesButton = document.getElementById('savePreferences');
    const currentThemeSpan = document.getElementById('currentTheme');
    const spinImage = document.getElementById('spinImage');
    const lightThemeImageSrc = 'piggy2.jpg';
const darkThemeImageSrc ='piggy.jpg';
    const body = document.body;

    function storePreference(key, value) {
        try {
            localStorage.setItem(key, value);
            console.log(`Preference '${key}' stored: ${value}`);
        } catch (e) {
            console.error("Error storing to localStorage:", e);
            alert("Could not save preferences. Local storage might be full or blocked.");
        }
    }

    function retrievePreference(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            console.log(`Preference '${key}' retrieved: ${value}`);
            return value === null ? defaultValue : value;
        } catch (e) {
            console.error("Error retrieving from localStorage:", e);
            return defaultValue;
        }
    }

    function applySavedTheme() {
        const savedTheme = retrievePreference('userTheme', 'light');
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            themeSelect.value = 'dark';
            
            currentThemeSpan.textContent = "It appears you like the spooky stuff! How goth🦇;)";
            spinImage.src = darkThemeImageSrc;
        } else {
            body.classList.remove('dark-theme');
            themeSelect.value = 'light';
            
            currentThemeSpan.textContent = "Snow!❄️How lovely!";
            spinImage.src = lightThemeImageSrc;
        }
    }

    // --- Animation Trigger Function ---

    function triggerBoxAnimation() {
        animatedBox.classList.remove('active-animation');
        setTimeout(() => {
            animatedBox.classList.add('active-animation');
        }, 10); 
        animatedBox.addEventListener('animationend', () => {
            animatedBox.classList.remove('active-animation');
        }, { once: true });
    }

    // --- Event Listeners ---

    // Save preferences when the button is clicked
    savePreferencesButton.addEventListener('click', () => {
        const selectedTheme = themeSelect.value;
        storePreference('userTheme', selectedTheme);
        applySavedTheme(); 
        alert('Preferences saved!');
    });

    // Trigger animation when the button is clicked
    triggerAnimationButton.addEventListener('click', triggerBoxAnimation);

    applySavedTheme();
});