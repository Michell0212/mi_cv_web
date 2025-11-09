// js/app.js
document.addEventListener('DOMContentLoaded', () => {
  // 1) Año en footer (si existe)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2) Acordeón / toggles accesibles
  const toggles = Array.from(document.querySelectorAll('.toggle-btn'));
  toggles.forEach(btn => {
    // Soporte para data-target o aria-controls (fallback)
    let targetSelector = btn.dataset.target || (`#${btn.getAttribute('aria-controls')}` || null);
    if (!targetSelector) {
      // nada que hacer si no hay target
      return;
    }

    const panel = document.querySelector(targetSelector);
    if (!panel) return;

    // Asegurar estado inicial coherente: si aria-expanded es "true", panel visible; si no, hidden.
    const expandedInit = btn.getAttribute('aria-expanded') === 'true';
    panel.hidden = !expandedInit;

    // Click para alternar
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isExpanded));
      panel.hidden = isExpanded; // si estaba expandido -> ahora hidden = true
    });

    // Soporte teclado (Enter / Space)
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // 3) Resaltado de habilidades usando JS (agrega/quita clase .is-highlight)
  const skillItems = Array.from(document.querySelectorAll('.skill-item'));
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => item.classList.add('is-highlight'));
    item.addEventListener('mouseleave', () => item.classList.remove('is-highlight'));

    // Accesibilidad: focus/blur para teclado
    item.addEventListener('focus', () => item.classList.add('is-highlight'));
    item.addEventListener('blur', () => item.classList.remove('is-highlight'));

    // Permitir activar con Enter (si quieres comportamiento adicional)
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        // ejemplo: togglear la clase al presionar Enter
        item.classList.toggle('is-highlight');
      }
    });
  });

  // 4) Botón "Mostrar contacto" opcional si existe (ejemplo en versiones previas)
  const mostrarContactoBtn = document.getElementById('mostrarContactoBtn');
  if (mostrarContactoBtn) {
    mostrarContactoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Ajusta el texto con tus datos reales
      alert('Correo: mmibarrad2@espe.edu.ec\nTeléfono: +593 98 359 475');
    });
  }

  const modoBtn = document.getElementById('modoBtn');
if (modoBtn) {
  modoBtn.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');
    const activo = document.body.classList.contains('modo-oscuro');
    modoBtn.textContent = activo ? ' Modo claro' : ' Modo oscuro';
  });
}

});
