function toggleForm() {
    document.getElementById('container').classList.toggle('active');
}

// Robust toggle implementation that doesn't rely on inline onclick attributes.
    // This avoids ReferenceError: toggleForm is not defined when the environment
    // evaluates inline handlers before scripts are available.

    (function () {
      const container = document.getElementById('container');

      // expose a global function for backward compatibility (if other code expects it)
      window.toggleForm = function (e) {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        container.classList.toggle('active');
      };

      // Attach delegated listeners to all links with .toggle-link
      document.addEventListener('click', function (evt) {
        const link = evt.target.closest && evt.target.closest('.toggle-link');
        if (!link) return;
        evt.preventDefault();

        // Optional: use data-action to choose a deterministic state
        const action = link.getAttribute('data-action');
        if (action === 'register') {
          container.classList.add('active');
        } else if (action === 'login') {
          container.classList.remove('active');
        } else {
          // fallback toggle
          container.classList.toggle('active');
        }
      });

      // Accessibility: allow Enter key on focused toggle links
      document.addEventListener('keydown', function (evt) {
        const activeEl = document.activeElement;
        if (!activeEl) return;
        if (activeEl.classList && activeEl.classList.contains('toggle-link') && (evt.key === 'Enter' || evt.key === ' ')) {
          evt.preventDefault();
          activeEl.click();
        }
      });

    })();