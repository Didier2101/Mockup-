// Función para mostrar una vista específica y ocultar las demás
function showView(viewId) {
  // Ocultar todas las vistas
  const views = document.querySelectorAll(".view");
  views.forEach((view) => {
    view.classList.remove("active");
  });

  // Mostrar la vista seleccionada
  document.getElementById(viewId).classList.add("active");

  // Actualizar navegación activa
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("data-view") === viewId) {
      item.classList.add("active");
    }
  });

  // En móviles, cerrar el menú después de seleccionar una vista
  if (window.innerWidth <= 768) {
    closeMobileMenu();
  }
}

// Función para seleccionar tipo de usuario en la vista 1
function selectUserType(type) {
  const options = document.querySelectorAll(".user-option");
  options.forEach((option) => {
    option.classList.remove("selected");
  });

  event.currentTarget.classList.add("selected");
}

// Función para mostrar/ocultar campos de experto
function toggleCamposExperto() {
  const userType = document.getElementById("userType").value;
  const camposExperto = document.getElementById("camposExperto");

  if (userType === "experto") {
    camposExperto.style.display = "block";
  } else {
    camposExperto.style.display = "none";
  }
}

// Función para mostrar/ocultar los temas de expertise
function toggleTemasExpertise() {
  const grid = document.getElementById("gridTemasExpertise");
  const btn = document.getElementById("btnTemasExpertise");

  if (grid.classList.contains("show")) {
    grid.classList.remove("show");
    btn.innerHTML =
      '<i class="fas fa-plus"></i> Seleccionar Temas de Expertise';
    // Ocultar después de la animación
    setTimeout(() => {
      grid.style.display = "none";
    }, 300);
  } else {
    grid.style.display = "block";
    setTimeout(() => {
      grid.classList.add("show");
    }, 10);
    btn.innerHTML = '<i class="fas fa-minus"></i> Ocultar Temas';
  }

  // Actualizar la lista de temas seleccionados
  actualizarTemasSeleccionados();
}

// Función para actualizar la lista de temas seleccionados
function actualizarTemasSeleccionados() {
  const checkboxes = document.querySelectorAll(
    'input[name="temasExpertise"]:checked'
  );
  const temasContainer = document.getElementById("temasSeleccionados");
  const listaTemas = document.getElementById("listaTemas");

  if (checkboxes.length > 0) {
    const temas = Array.from(checkboxes).map((cb) => {
      const label = document.querySelector(`label[for="${cb.id}"]`);
      return label ? label.textContent : cb.value;
    });

    listaTemas.textContent = temas.join(", ");
    temasContainer.style.display = "block";
  } else {
    listaTemas.textContent = "Ninguno";
    temasContainer.style.display = "none";
  }
}

// Funciones para el menú móvil
function openMobileMenu() {
  document.getElementById("navPanel").classList.add("active");
  document.getElementById("navOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  document.getElementById("navPanel").classList.remove("active");
  document.getElementById("navOverlay").classList.remove("active");
  document.body.style.overflow = "auto";
}

// Sistema de calificación con estrellas
function initializeRatingSystem() {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const rating = parseInt(this.getAttribute("data-rating"));
      setStarRating(rating);
    });

    star.addEventListener("mouseover", function () {
      const rating = parseInt(this.getAttribute("data-rating"));
      highlightStars(rating);
    });
  });

  // Restablecer estrellas al quitar el mouse
  document
    .querySelector(".rating-stars")
    .addEventListener("mouseleave", function () {
      const currentRating = getCurrentRating();
      if (currentRating > 0) {
        highlightStars(currentRating);
      } else {
        resetStars();
      }
    });
}

function setStarRating(rating) {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    const starRating = parseInt(star.getAttribute("data-rating"));
    if (starRating <= rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
  // Guardar la calificación seleccionada
  document
    .getElementById("ratingGeneral")
    .setAttribute("data-selected", rating);
}

function highlightStars(rating) {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    const starRating = parseInt(star.getAttribute("data-rating"));
    if (starRating <= rating) {
      star.style.color = "#ffc107";
    } else {
      star.style.color = "#ddd";
    }
  });
}

function resetStars() {
  const stars = document.querySelectorAll(".star");
  const currentRating = getCurrentRating();
  stars.forEach((star) => {
    const starRating = parseInt(star.getAttribute("data-rating"));
    if (currentRating === 0 || starRating > currentRating) {
      star.style.color = "#ddd";
    }
  });
}

function getCurrentRating() {
  const selected = document
    .getElementById("ratingGeneral")
    .getAttribute("data-selected");
  return selected ? parseInt(selected) : 0;
}

// Función para enviar calificación
function enviarCalificacion() {
  const rating = getCurrentRating();
  const satisfaccion = document.querySelector(
    'input[name="satisfaccion"]:checked'
  );
  const comentario = document.getElementById("comentario").value;
  const recomendaria = document.getElementById("recomendaria").checked;

  if (rating === 0) {
    alert("Por favor selecciona una calificación con estrellas");
    return;
  }

  if (!satisfaccion) {
    alert("Por favor califica tu nivel de satisfacción");
    return;
  }

  // Simular envío de calificación
  console.log("Calificación enviada:", {
    rating,
    satisfaccion: satisfaccion.value,
    comentario,
    recomendaria,
  });

  alert(
    "¡Gracias por tu calificación! Tu opinión ayuda a mejorar nuestro servicio."
  );
  showView("vista1");
}

// Configurar eventos
document.addEventListener("DOMContentLoaded", function () {
  // Crear overlay para el menú móvil
  const overlay = document.createElement("div");
  overlay.id = "navOverlay";
  overlay.className = "nav-overlay";
  overlay.addEventListener("click", closeMobileMenu);
  document.body.appendChild(overlay);

  // Navegación
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const viewId = this.getAttribute("data-view");
      showView(viewId);
    });
  });

  // Menú móvil
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navPanel = document.getElementById("navPanel");

  mobileMenuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (navPanel.classList.contains("active")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Métodos de pago
  const paymentMethods = document.querySelectorAll(".payment-method");
  paymentMethods.forEach((method) => {
    method.addEventListener("click", function () {
      paymentMethods.forEach((m) => m.classList.remove("selected"));
      this.classList.add("selected");
    });
  });

  // Opciones de precio
  const priceOptions = document.querySelectorAll(".price-option");
  priceOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const parent = this.parentElement;
      parent.querySelectorAll(".price-option").forEach((opt) => {
        opt.classList.remove("selected");
      });
      this.classList.add("selected");
    });
  });

  // Toggle campos de experto
  const userTypeSelect = document.getElementById("userType");
  if (userTypeSelect) {
    userTypeSelect.addEventListener("change", toggleCamposExperto);
  }

  // Event listeners para los checkboxes de temas
  const checkboxesTemas = document.querySelectorAll(
    'input[name="temasExpertise"]'
  );
  checkboxesTemas.forEach((checkbox) => {
    checkbox.addEventListener("change", actualizarTemasSeleccionados);
  });

  // Inicializar sistema de calificación
  initializeRatingSystem();

  // Cerrar menú con tecla Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMobileMenu();
    }
  });
});
