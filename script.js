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
});
