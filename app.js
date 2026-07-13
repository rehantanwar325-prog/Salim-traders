/**
 * Salim Traders - Main JavaScript Functionality
 * Handles responsive menu, scroll spy navigation, form validation, and success modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const header = document.querySelector('header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const contactForm = document.getElementById('enquiry-form');
  const modalOverlay = document.getElementById('success-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const messageInput = document.getElementById('form-message');

  // --- Header Scroll Effect ---
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger once on load in case of refresh

  // --- Mobile Navigation Toggle ---
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // --- Scroll Spy Navigation Link Highlighting ---
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120; // Offset for header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // --- Contact Form Submission Handling ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const nameInput = document.getElementById('form-name');
      const phoneInput = document.getElementById('form-phone');

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const message = messageInput ? messageInput.value.trim() : '';

      // Clean validation states
      nameInput.setCustomValidity('');
      phoneInput.setCustomValidity('');

      // Custom Validation Check
      if (name.length < 2) {
        nameInput.setCustomValidity('Please enter your full name (at least 2 letters).');
        nameInput.reportValidity();
        return;
      }

      // Simple phone verification (10 digits minimum)
      const phoneRegex = /^[0-9\s-+\(\)]{10,15}$/;
      if (!phoneRegex.test(phone.replace(/[\s-+\(\)]/g, ''))) {
        phoneInput.setCustomValidity('Please enter a valid 10-digit phone number.');
        phoneInput.reportValidity();
        return;
      }

      // Save submission data to LocalStorage to simulate backend record
      const inquiryData = {
        name,
        phone,
        message,
        date: new Date().toLocaleString(),
        source: 'Website Contact Form'
      };

      const existingInquiries = JSON.parse(localStorage.getItem('salim_traders_inquiries') || '[]');
      existingInquiries.push(inquiryData);
      localStorage.setItem('salim_traders_inquiries', JSON.stringify(existingInquiries));

      // Display custom popup success modal
      if (modalOverlay) {
        modalOverlay.classList.add('active');
      }

      // Reset the form
      contactForm.reset();
    });
  }

  // --- Close Modal Event ---
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  // Close modal when clicking outside the box
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
});
