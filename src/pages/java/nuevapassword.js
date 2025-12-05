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

    codeError.classList.add("hidden");
    passError.classList.add("hidden");
    confirmError.classList.add("hidden");

    if (nuevaPassword !== confirmarPassword) {
        confirmError.textContent = "Las contraseñas no coinciden";
        confirmError.classList.remove("hidden");
        return;
    }

    try {
        const response = await fetch("http://localhost:8081/api/Recuperar/cambiar-password", {
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
            codeError.textContent = data.message || "Código incorrecto";
            codeError.classList.remove("hidden");
            return;
        }

        // Limpiar datos
        localStorage.removeItem("emailRecuperacion");

        // Redirigir al login
        window.location.href = "./login.html";

    } catch (error) {
        console.error("Error:", error);
        codeError.textContent = "Error de servidor";
        codeError.classList.remove("hidden");
    }
});
