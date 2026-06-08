// Copy JSON to clipboard
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('copy-btn')) {
    const pre = e.target.closest('.result-body').querySelector('pre');
    navigator.clipboard.writeText(pre.textContent).then(() => {
      e.target.textContent = '✓ Copied';
      setTimeout(() => e.target.textContent = 'Copy', 1500);
    });
  }
});

// Auto-resize textarea
document.querySelectorAll('textarea').forEach(ta => {
  ta.addEventListener('input', () => {
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  });
});

// Loading state on form submit
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span style="opacity:.6">Fetching…</span>';
    }
  });
});
