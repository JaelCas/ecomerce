//script de login -techstore pro 

//verificar que toda la pagina este cargada con los elementos 
//html 
document.addEventListener('DOMContentLoaded', function(){
    console.log('✅ Pagina cargada correctamente');

    //creamos constante de la Api

    const API_URL="https://ecomerce-1-1jpe.onrender.com/api/login";

    //enviar los datos del formulario 
    document.getElementById('login-form').addEventListener('submit', async function(e){
        e.preventDefault();

        //preparamos los elementos de la pagina
        const btn = document.getElementById('login-btn');
        const errorDiv = document.getElementById('login-error');
        const errorMsg = document.getElementById('login-error-message');
        
        errorDiv.classList.add('hidden');

        //recoger los datos del formulario

        const datos ={
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value
        };

        //validamos que los campos no esten vacios
        if(!datos.email || !datos.password){
            errorMsg.textContent='Por favor, complete los datos';
            errorDiv.classList.remove('hidden');
            return;
        }
        //cambia el boton mientras procesa 

        btn.disable=true;
        btn.textContent='Iniciando sesión...';

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
                console.log('201- Inicio de sesion exitoso');

                // guardar informacion

                localStorage.setItem("sesionActiva", "tue");
                localStorage.setItem("Usuario", JSON.stringify({
                    id:resultado.usuario.id,
                    nombre: resultado.usuario.nombre,
                    telefono: resultado.usuario.telefono,
                    email: resultado.usuario.email,
                }));

                // mensaje de exito

                errorDiv.className='bg-green-50 border-green-200 text-green-800 px-4 py-3 rounded-lg';
                errorMsg.textContent='Inicio de sesion exitoso, Redirigiendo...';
                errorDiv.classList.remove('hidden');

                // redirigir a productos

                setTimeout(()=> window.location.href ='productos.html', 3000);

                // credenciales incorrectas
            } else {
                errorMsg.textContent=resultado.message || 'Credenciales incorrectas';
                errorDiv.classList.remove('hidden');
                btn.disabled=false;
                btn.innerHTML='Iniciar Sesion';
            }


            // si no hay conexion al servidor
        } catch (error) {
            console.error('Error 404 - Error de conexion con el servidor');
            errorMsg.textContent='Error conexion de servidor';
            errorDiv.classList.remove('hidden');
            btn.disabled=false;
            btn.innerHTML='Iniciar Sesion';
        }
    });
});