# AccedoTest2018

Este proyecto fue desarrollado en respuesta al test de selección de Accedo.tv del año 2018.
Es un selector y visor de películas obtenidas desde un servicio web y controlable a través del teclado y mouse.
Utiliza las teclas flecha derecha, flecha izquierda, enter y escape para la navegación en el home.
El proyecto fue desarrollado con el framework Angular 6 y almacena los datos del usuario anónimo y historial de películas vistas en Firebase Database.

## Instrucciones de Instalación

### 0. Pre requisitos

Debes tener instalado Node y NPM, este proyecto fue desarrollado con las siguientes versiones.

```
{
  "node": "9.10.1",
  "npm": "6.0.1"
}
```

### 1. Descarga:
Ejecuta `git clone https://github.com/chaskas/accedotv-test-2018.git` para descargar el proyecto en tu local.

### 2. Instala:
Ejecuta `npm install` para descargar los paquetes necesarios para el funcionamiento correcto de la aplicación:

### 3. Corre:
Si todo lo anterior salió bien ya puedes ejecutar la aplicación en tu local, para esto debes ejecutar `ng serve --proxy-config proxy.config.json`

La opción `--proxy-config` permite levantar un proxy local para evitar errores del tipo **CORS**.

### 4. Diviértete:

Puedes hacer `fork` y modificar el proyecto a tu antojo.

### 5. Otros:

Puedes ver una demo del proyecto en heroku:
http://accedo-test-2018.herokuapp.com

Se ha integrado Travis-CI para hacer deploys a heroku con cada actualización en la rama master.

Cualquier duda escríbeme al mail: *rodrigo [at] wdev [dot] cl*