# TpSalaDeJuegos
[Deploy en netlify]( https://sala-de-juegos-landaur.netlify.app/login )

### Sprint 1:

- [x] Armado del proyecto
- [x] Subido a Netlify o firebase.
- [x] Componente de Login.
- [x] Componente Home.
- [x] Componente “Quién Soy”
  - [x] Datos personales del alumno.
  - [x] Imagen del alumno
  - [x] Explicación del juego propio
- [x] Favicon


### Sprint 2:

- [x] Componente Home
  - [x] Tiene que ser el componente principal, el cual tendrá los accesos a los diferentes juegos y listados.
  - [x] Si el usuario está logueado, mostrar información del mismo y botón de Log Out. (No se debe mostrar los botones de Registro y Login una vez que el usuario está logueado).

- [x] Componente Login
  - [x] Tiene que tener la validación de usuario contra firebase
  - [x] Registrar el log de ese usuario en firebase.
  - [x] En caso de que sea exitoso registrar:
    1. Usuario
    2. Fecha de ingreso
  - [x] En caso correcto deber rutear a la home.
  - [x] Debe tener botones de acceso rápido.
  - [x] Estos botones tienen que completar los campos de email y contraseña con un usuario válido que al presionar el botón ingresar acceda a la home.

- [x] Componente Registro
  - [x] Tiene que generar un nuevo usuario y redirigir al home al crearlo exitosamente, es decir, loguear al usuario automáticamente.
  - [x] Emitir mensaje si el usuario ya se encuentra registrado. (NO USAR ALERT)


### Sprint 3

- [x] Incorporar el chat.
  - [x] Solamente usuarios logueados podrán acceder a la sala de chat.
  - [x] Debemos marcar el usuario y hora que envió el mensaje.

- [x] Incorporar módulos y loadchildren.

- [x] Incorporar los juegos.
  - [x] Ahorcado:
    - [x] No se debe ingresar datos desde el teclado. Utilizar botones para el ingreso de las letras.
  - [x] Mayor o Menor:
    - [x] Desde un mazo de carta se va a preguntar si la siguiente es mayor o menor. El jugador sumará un punto ante cada carta que adivine.
