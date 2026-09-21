// =========================================================
// NEXORA TECH - dinamica.js
// Modo claro/oscuro global + validación del formulario de contacto
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- 1. MODO CLARO / OSCURO ---------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // La clase 'dark-mode' ya se aplicó a <html> en el <script> del <head>
    // (antes de pintar la página, para evitar el parpadeo). Aquí solo
    // sincronizamos el ícono del botón con el estado actual.
    if (themeToggleBtn) {
        themeToggleBtn.textContent = html.classList.contains('dark-mode') ? '☀️' : '🌙';

        themeToggleBtn.addEventListener('click', () => {
            html.classList.toggle('dark-mode');

            const modoOscuro = html.classList.contains('dark-mode');
            themeToggleBtn.textContent = modoOscuro ? '☀️' : '🌙';
            localStorage.setItem('theme', modoOscuro ? 'dark' : 'light');
        });
    }

    /* ---------- 2. VALIDACIÓN DEL FORMULARIO DE CONTACTO ---------- */
    const formulario = document.getElementById('form-contacto');
    if (!formulario) return;

    const mensajeExito = document.getElementById('mensaje-exito');

    const validadores = {
        nombre: valor => valor.trim().length >= 3,
        correo: valor => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()),
        mensaje: valor => valor.trim().length >= 10
    };

    const mostrarError = (campo, esValido) => {
        const grupo = campo.closest('.form-group');
        grupo.classList.toggle('invalido', !esValido);
    };

    Object.keys(validadores).forEach(id => {
        const campo = document.getElementById(id);
        if (!campo) return;
        campo.addEventListener('blur', () => {
            mostrarError(campo, validadores[id](campo.value));
        });
    });

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        let formularioValido = true;

        Object.keys(validadores).forEach(id => {
            const campo = document.getElementById(id);
            if (!campo) return;
            const esValido = validadores[id](campo.value);
            mostrarError(campo, esValido);
            if (!esValido) formularioValido = false;
        });

        if (!formularioValido) {
            mensajeExito.classList.remove('visible');
            return;
        }

        // Aquí normalmente se enviaría el formulario a un servidor.
        // Como es un proyecto de práctica, solo mostramos la confirmación.
        mensajeExito.textContent = '¡Gracias! Tu mensaje fue enviado. Te responderemos dentro de las próximas 24 horas hábiles.';
        mensajeExito.classList.add('visible');
        formulario.reset();
    });
});