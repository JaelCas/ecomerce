// Esperar a que cargue la página
document.addEventListener('DOMContentLoaded', function () {

    console.log("🔵 Perfil cargado correctamente");

    const form = document.getElementById("formulario-perfil");

    // Cuando se envíen los datos
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Capturamos los valores
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const direccion = document.getElementById("direccion").value.trim();

        // ======== Validación mínima ========
        if (!nombre || !apellido || !telefono || !correo || !direccion) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor llena todos los campos.",
                confirmButtonColor: "#2563eb"
            });
            return;
        }

        // ======== Confirmación elegante ========
        const result = await Swal.fire({
            title: "¿Guardar cambios?",
            text: "Tu información personal será actualizada.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, guardar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#dc2626"
        });

        if (!result.isConfirmed) {
            console.log("🔸 Usuario canceló la edición");
            return;
        }

        // ======== Envío al servidor ========
        try {
            const respuesta = await fetch("http://localhost:8081/api/actualizar-perfil", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    telefono,
                    correo,
                    direccion
                })
            });

            if (!respuesta.ok) {
                throw new Error("Error al actualizar perfil");
            }

            // ======== Toast bonito de éxito ========
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Perfil actualizado",
                showConfirmButton: false,
                timer: 2000
            });

        } catch (error) {
            console.error("❌ Error:", error);

            Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: "No se pudo actualizar tu perfil. Intenta nuevamente.",
                confirmButtonColor: "#2563eb"
            });
        }

    });

});
