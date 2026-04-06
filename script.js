const fileInput = document.getElementById('file-u');
const uploadContent = document.getElementById('upload-content');

// 1. Save the original "Icon + Text" HTML so we can bring it back later
const originalUploadHTML = uploadContent.innerHTML;

fileInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  
  if (file) {
    // 2. Check if file is too big (500KB = 512000 bytes)
    if (file.size > 512000) {
      alert("File is too large! Please upload an image under 500KB.");
      fileInput.value = ""; // Clear the input
      return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
      // 3. Show the mini-preview and the two buttons
      uploadContent.innerHTML = `
        <img src="${event.target.result}" class="mini-preview">
        <div class="edit-btns">
          <button type="button" id="rem-btn">Remove Image</button>
          <button type="button" id="cha-btn">Change Image</button>
        </div>
      `;
      
      // 4. LOGIC: Remove Image (Resets the box to original state)
      document.getElementById('rem-btn').onclick = () => {
        uploadContent.innerHTML = originalUploadHTML;
        fileInput.value = ""; // Actually clears the file from the input
      };

      // 5. LOGIC: Change Image (Triggers the file picker again)
      document.getElementById('cha-btn').onclick = () => fileInput.click();
    };
    
    reader.readAsDataURL(file);
  }
});

