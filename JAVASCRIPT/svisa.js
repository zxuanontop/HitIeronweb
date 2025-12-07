    AOS.init();

    // Audio player
    const audio = document.getElementById("bgAudio");
    const player = document.getElementById("player");
    const rotImg = document.getElementById("rotimg");
    audio.play().catch(() => {});
    player.onclick = () => {
      if (audio.paused) {
        audio.play();
        rotImg.style.animationPlayState = "running";
      } else {
        audio.pause();
        rotImg.style.animationPlayState = "paused";
      }
    };

    // File uploads
    document.getElementById('photoUpload').onchange = function(e) {
      const fileName = e.target.files[0]?.name || '';
      document.getElementById('photoName').textContent = fileName ? '✓ ' + fileName : '';
    };

    document.getElementById('docUpload').onchange = function(e) {
      const fileName = e.target.files[0]?.name || '';
      document.getElementById('docName').textContent = fileName ? '✓ ' + fileName : '';
    };

    // Form submission
    document.getElementById('visaForm').onsubmit = function(e) {
      e.preventDefault();
      
      // Collect form data
      const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        nationality: document.getElementById('nationality').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        visaType: document.getElementById('visaType').value,
        occupation: document.getElementById('occupation').value,
        education: document.getElementById('education').value,
        skills: document.getElementById('skills').value
      };

      console.log('Application submitted:', formData);

      // Show success message
      document.getElementById('successMessage').style.display = 'block';
      
      // Scroll to success message
      document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Reset form after 3 seconds
      setTimeout(() => {
        this.reset();
        document.getElementById('photoName').textContent = '';
        document.getElementById('docName').textContent = '';
        document.getElementById('successMessage').style.display = 'none';
      }, 3000);
    };