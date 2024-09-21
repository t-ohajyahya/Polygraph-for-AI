document.getElementById('inspectBtn').onclick = function() {
        // Get the current URL
        let currentUrl = window.location.href;
    
        // Use regex to replace the last segment
        let newUrl = currentUrl.replace(/\/[^\/]*$/, '/inspect.html');
    
        // Change the window location to the new URL
        window.location.href = newUrl;
};

document.getElementById('homeBtn').onclick = function() {
            // Get the current URL
            let currentUrl = window.location.href;
    
            // Use regex to replace the last segment
            let newUrl = currentUrl.replace(/\/[^\/]*$/, '/index.html');
        
            // Change the window location to the new URL
            window.location.href = newUrl;
};