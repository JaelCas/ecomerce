document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const errorEmail = document.getElementById("email-error");

    // limpiar mensaje
    errorEmail.classList.add("hidden");

    try {
        const response = await fetch("http://localhost:8081/api/Recuperar/solicitar-codigo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            errorEmail.textContent = data.message || "Error en la solicitud";
            errorEmail.classList.remove("hidden");
            return;
        }

        // Guardamos el email para usarlo en nuevapassword
        localStorage.setItem("emailRecuperacion", email);

        // REDIRIGIR A nueva contraseña
        window.location.href = "./nuevapassword.html";

    } catch (error) {
        console.error("Error:", error);
        errorEmail.textContent = "Error de servidor";
        errorEmail.classList.remove("hidden");
    }
});
