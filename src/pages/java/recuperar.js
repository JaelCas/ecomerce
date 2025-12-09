document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const errorEmail = document.getElementById("email-error");
    const btn = document.getElementById("login-btn");

    // Limpia errores
    errorEmail.classList.add("hidden");
    
    // Cambiar texto del botón a "Enviando..."
    btn.textContent = "Enviando código...";
    btn.disabled = true;

    try {
        const response = await fetch("https://ecomerce-1-1jpe.onrender.com/api/Recuperar/solicitar-codigo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            btn.textContent = "Enviar Código"; // restaurar
            btn.disabled = false;

            errorEmail.textContent = data.message || "Error en la solicitud";
            errorEmail.classList.remove("hidden");
            return;
        }

        // Guardamos el email
        localStorage.setItem("emailRecuperacion", email);

        // Texto de redirigiendo
        btn.textContent = "Redirigiendo...";
        
        // Pausa para que el usuario lo vea
        setTimeout(() => {
            window.location.href = "nueva_password.html";
        }, 1500);

    } catch (error) {
        console.error("Error:", error);

        btn.textContent = "Enviar Código"; 
        btn.disabled = false;

        errorEmail.textContent = "Error de servidor";
        errorEmail.classList.remove("hidden");
    }
});

