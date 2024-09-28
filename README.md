# Tasks Management

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

Para el despliegue de la aplicación se utilizó Docker, para la creación de la imagen y el contenedor.

## Pre requisitos
Asegurese de tener instalado Docker, puede instalarlo desde [aqui](https://www.docker.com/products/docker-desktop)

## Despliegue

Para desplegar la aplicación, primero debe clonar el repositorio, luego debe ejecutar el siguiente comando en la raíz del proyecto:

```bash
docker compose up
```

Este comando creará la imagen de la aplicación y el contenedor, luego la aplicación estará disponible en [http://localhost:7700/](http://localhost:7700/tasks)

El puerto `7700` es el puerto por defecto, si desea cambiarlo, puede hacerlo en el archivo `docker-compose.yml` en la raíz del proyecto.

## Desarrollo

Para ejecutar la aplicación en modo desarrollo, ejecute el siguiente comando en la raíz del proyecto:

```bash
ng serve
```


>**Nota:** Esta opcion no es recomendada debido posibles problemas de versiones de Node y Angular dependiendo de la configuración de su máquina. Por lo que se recomienda el uso de Docker.