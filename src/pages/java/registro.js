document.addEventListener('DOMContentLoaded', function(){
    console.log('✅ Pagina cargada correctamente');

    //creamos constante de la Api

    const API_URL="http://localhost:8081/api/usuario/register";

    //enviar los datos del formulario 
    document.getElementById('register-form').addEventListener('submit', async function(e){
        e.preventDefault();

        //preparamos los elementos de la pagina
        const btn = document.getElementById('register-btn');
        const errorDiv = document.getElementById('register-error');
        const errorMsg = document.getElementById('register-error-message');
        
        errorDiv.classList.add('hidden');

        //recoger los datos del formulario

        const datos ={
            nombre: document.getElementById('nombre').value.trim(),
            apellido: document.getElementById('apellido').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            password: document.getElementById('password').value,
            passwordConfirm: document.getElementById('passwordConfirm').value
        };

        //validamos que los campos no esten vacios
        if(!datos.nombre || !datos.apellido ||!datos.email || !datos.telefono || !datos.password){
            errorMsg.textContent='Por favor, complete los datos';
            errorDiv.classList.remove('hidden');
            return;
        }
        //cambia el boton mientras procesa 

        btn.disabled=true;
        btn.textContent='Registrando usuario...';

        //enviar los datos al servidor 

        try {
            const response=await fetch(API_URL,{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(datos)
            });

            // Recibir respuesta del servidor

            const resultado = await response.json();
            if (response.ok){
                console.log('201- Registro exitoso');

                // guardar informacion

                localStorage.setItem("sesionActiva", "tue");
                localStorage.setItem("Usuario", JSON.stringify({
                    id:resultado.usuario?._id || resultado.id,
                    nombre: resultado.usuario?.nombre || datos.nombre,
                    apellido: resultado.usuario?.apellido || datos.apellido,
                    telefono: resultado.usuario?.telefono || datos.telefono,
                    email: resultado.usuario?.email || datos.email
                }));

                // mensaje de exito

                errorDiv.className='bg-green-50 border-green-200 text-green-800 px-4 py-3 rounded-lg';
                errorMsg.textContent='Registro de sesion exitoso, Redirigiendo...';
                errorDiv.classList.remove('hidden');

                // redirigir a productos

                setTimeout(()=> window.location.href ='productos.html', 3000);

                // credenciales incorrectas
            } else {
                errorMsg.textContent=resultado.message || 'Credenciales incorrectas';
                errorDiv.classList.remove('hidden');
                btn.disabled=false;
                btn.innerHTML='Registrar usuario';
            }


            // si no hay conexion al servidor
        } catch (error) {
            console.error('Error 404 - Error de conexion con el servidor');
            errorMsg.textContent='Error conexion de servidor';
            errorDiv.classList.remove('hidden');
            btn.disabled=false;
            btn.innerHTML='Registar Usuario';
        }
    });
});