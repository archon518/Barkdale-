document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // 3. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.toggle('open');
      const icon = btn.querySelector('span');
      if (icon) {
        icon.textContent = isOpen ? '−' : '+';
      }
    });
  });

  // 4. Guest Intake Form Validation & Submission Summary
  const intakeForm = document.getElementById('guest-intake-form');
  const intakeStatus = document.getElementById('intake-status');

  if (intakeForm && intakeStatus) {
    intakeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!intakeForm.checkValidity()) {
        intakeForm.reportValidity();
        return;
      }

      const formData = new FormData(intakeForm);
      const dogName = formData.get('dog_name') || 'your dog';
      const ownerName = formData.get('owner_name') || 'Guest';

      // Construct pre-filled mailto fallback or webhook payload
      const summaryLines = [
        `Guardian: ${ownerName} (${formData.get('owner_phone')})`,
        `Email: ${formData.get('owner_email')}`,
        `Service: ${formData.get('service_type')}`,
        `Dates: ${formData.get('dropoff_date') || 'TBD'} to ${formData.get('pickup_date') || 'TBD'}`,
        `Dog: ${dogName} | ${formData.get('dog_breed')} | ${formData.get('dog_age')}`,
        `Spayed/Neutered: ${formData.get('spay_neuter')}`,
        `Diet: ${formData.get('feeding_routine')}`,
        `Meds/Senior Care: ${formData.get('medications') || 'None'}`,
        `Vet: ${formData.get('vet_clinic')}`,
        `Emergency Contact: ${formData.get('emergency_contact')}`,
        `Temperament: ${formData.get('temperament_notes')}`
      ].join('\n');

      intakeStatus.className = 'form-status success';
      intakeStatus.innerHTML = `
        <strong>Thank you, ${ownerName}!</strong> ${dogName}’s intake profile has been prepared.<br />
        <p style="margin-top: 0.5rem; font-size: 0.9rem;">
          To send this directly to Barkdale &amp; Co. or copy for your records, click below:
        </p>
        <div style="margin-top: 0.75rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <a class="btn btn-primary" style="padding: 0.55rem 1rem; font-size: 0.85rem;"
             href="mailto:hello@barkdaleandco.com?subject=${encodeURIComponent('Guest Intake: ' + dogName)}&body=${encodeURIComponent(summaryLines)}">
            Send via Email App
          </a>
          <button type="button" id="copy-intake-btn" class="btn btn-secondary" style="padding: 0.55rem 1rem; font-size: 0.85rem;">
            Copy Intake Summary
          </button>
        </div>
      `;

      const copyBtn = document.getElementById('copy-intake-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(summaryLines).then(() => {
            copyBtn.textContent = 'Copied!';
          });
        });
      }
    });
  }
});
