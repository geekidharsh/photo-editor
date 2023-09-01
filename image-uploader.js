// JavaScript to display previews of selected images
const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const selectedImagesLabel = document.getElementById('selectedImagesLabel');
const loadingContainer = document.getElementById('loadingContainer');

fileInput.addEventListener('change', function () {
    const files = fileInput.files;

    // Clear previous previews
    imagePreview.innerHTML = '';

    if (files.length === 0) {
        // If no files selected, hide the loading container and set the label
        loadingContainer.classList.add('hidden');
        selectedImagesLabel.textContent = 'No image selected';
    } else if (files.length > 10) {
        // If more than 10 files selected, display an error message
        selectedImagesLabel.textContent = 'Please select up to 10 images.';
        fileInput.value = ''; // Clear the selected files
        loadingContainer.classList.add('hidden');
    } else {
        // Show loading container while images are loading
        loadingContainer.classList.remove('hidden');

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = new Image();
                    img.src = e.target.result;
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '300px'; // You can adjust the maximum height as needed
                    imagePreview.appendChild(img);

                    // Hide the loading container when all images are loaded
                    if (i === files.length - 1) {
                        loadingContainer.classList.add('hidden');
                    }
                };
                reader.readAsDataURL(file);
            }
        }
        // Update the "Images Currently Selected" label
        selectedImagesLabel.textContent = `Images Currently Selected: ${files.length}`;
    }
});