// Validar que se haya solicitado un código antes
const email = localStorage.getItem("emailRecuperacion");

if (!email) {
    // Si el usuario intenta abrir nuevapassword.html directamente → lo mandamos a recuperar
    window.location.href = "./recuperar.html";
}

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const codigo = document.getElementById("code").value.trim();
    const nuevaPassword = document.getElementById("new_pass").value.trim();
    const confirmarPassword = document.getElementById("confirm_pass").value.trim();

    const codeError = document.getElementById("code-error");
    const passError = document.getElementById("pass-error");
    const confirmError = document.getElementById("confirm-error");

    const btn = document.getElementById("login-btn");

    codeError.classList.add("hidden");
    passError.classList.add("hidden");
    confirmError.classList.add("hidden");

    if (nuevaPassword !== confirmarPassword) {
        confirmError.textContent = "Las contraseñas no coinciden";
        confirmError.classList.remove("hidden");
        return;
    }

    // ⬇️ TEXTO QUE PEDISTE
    btn.textContent = "Verificando código…";
    btn.disabled = true;

    try {
        const response = await fetch("https://ecomerce-1-1jpe.onrender.com/api/Recuperar/cambiar-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                codigo,
                nuevaPassword
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            btn.textContent = "Cambiar Contraseña";
            btn.disabled = false;

            codeError.textContent = data.message || "Código incorrecto";
            codeError.classList.remove("hidden");
            return;
        }

        // TEXTO QUE PEDISTE AL CAMBIAR CONTRASEÑA
        btn.textContent = "Contraseña actualizada. Redirigiendo…";

        // Esperar un poco antes de redirigir
        setTimeout(() => {
            localStorage.removeItem("emailRecuperacion");
            window.location.href = "./login.html";
        }, 1500);

    } catch (error) {
        console.error("Error:", error);

        btn.textContent = "Cambiar Contraseña";
        btn.disabled = false;

        codeError.textContent = "Error de servidor";
        codeError.classList.remove("hidden");
    }
});
