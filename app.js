const API = "https://script.google.com/macros/s/AKfycby96Y8nY_-eJ3pUaTrOA0sscLWSkmGFP5hN-rOjPopjavm16ni7tSfbzfjk3X2-PXwi/exec";

let bloqueado = false;

const qr = new Html5Qrcode("reader");

// 🔥 INICIAR CÁMARA
qr.start(
  { facingMode: "environment" },
  { fps: 10, qrbox: 200 },

  async (texto) => {

    if (bloqueado) return;
    bloqueado = true;

    try {

      // 📳 vibración
      if (navigator.vibrate) navigator.vibrate(200);

      const res = await fetch(API + "?codigo=" + texto);
      const data = await res.json();

      document.getElementById("nombre").innerText = data.nombre || "";
      document.getElementById("contador").innerText =
        "Veces hoy: " + (data.contador || 0);

      document.getElementById("alerta").innerText =
        data.alerta || "";

    } catch (error) {
      alert("Error conectando con el servidor");
      console.error(error);
    }

    setTimeout(() => bloqueado = false, 3000);
  },

  (error) => {
    // errores de lectura (normal)
  }
);