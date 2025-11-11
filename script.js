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
    document.getElementById("navPanel").classList.remove("active");
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

// Función para seleccionar opción de precio
function selectPriceOption(option) {
  const options = option.parentElement.querySelectorAll(".price-option");
  options.forEach((opt) => {
    opt.classList.remove("selected");
  });
  option.classList.add("selected");
}

// Configurar eventos
document.addEventListener("DOMContentLoaded", function () {
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

  mobileMenuBtn.addEventListener("click", function () {
    navPanel.classList.toggle("active");
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

  // Cerrar menú al hacer clic fuera de él (solo en móviles)
  document.addEventListener("click", function (event) {
    if (
      window.innerWidth <= 768 &&
      !navPanel.contains(event.target) &&
      !mobileMenuBtn.contains(event.target)
    ) {
      navPanel.classList.remove("active");
    }
  });

  // Validación de formularios
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Aquí iría la validación real
      alert("Formulario enviado correctamente");
    });
  });
});

// Función para validar LinkedIn (simulada)
function validarLinkedIn(url) {
  // En una implementación real, aquí se haría una validación real del perfil
  return url.includes("linkedin.com/in/");
}

// Función para calcular costo basado en duración
function calcularCosto(duracion) {
  const precios = {
    30: 50000,
    60: 90000,
    90: 120000,
  };
  return precios[duracion] || 0;
}

// Función para programar recordatorio
function programarRecordatorio(fechaHora) {
  // En una implementación real, aquí se conectaría con un servicio de notificaciones
  console.log(`Recordatorio programado para 15 minutos antes de ${fechaHora}`);
}
