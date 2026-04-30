// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// Auto-dismiss flash messages after 4s
setTimeout(() => {
  document.querySelectorAll('[data-flash]').forEach(el => el.remove());
}, 4000);

// Format card number input with spaces
document.addEventListener('input', e => {
  if (e.target.placeholder && e.target.placeholder.includes('4242')) {
    e.target.value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  }
});
