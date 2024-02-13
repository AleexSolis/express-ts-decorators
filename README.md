# express-ts-decorators

Este proyecto es una base de código desarrollada utilizando TypeScript y Express con el objetivo de facilitar el uso de Express de una manera más limpia y clara a través del uso de decoradores.

## Decoradores principales

### @Controller
Este decorador se utiliza para indicar que una clase será utilizada como un controlador en la aplicación Express. La clase decorada con @Controller será agregada al enrutador de Express mediante un generador de rutas.

### Decoradores para operaciones básicas de una API REST
El proyecto también proporciona decoradores para las operaciones básicas de una API REST:

- @Get: se utiliza para decorar los métodos que manejan las solicitudes GET HTTP.
- @Post: se utiliza para decorar los métodos que manejan las solicitudes POST HTTP.
- @Put: se utiliza para decorar los métodos que manejan las solicitudes PUT HTTP.
- @Delete: se utiliza para decorar los métodos que manejan las solicitudes DELETE HTTP.

Estos decoradores ayudan a definir fácilmente las rutas y los controladores asociados a cada operación en una API REST.

### Decorador adicional

#### @Catch
El decorador @Catch se utiliza para absorber y manejar los errores que puedan ocurrir en las funciones de los controladores. Ayuda a centralizar y simplificar la gestión de errores en la aplicación.

## Uso

1. Clona el repositorio utilizando el comando `git clone https://github.com/AleexSolis/express-ts-decorators.git`
2. Instala las dependencias utilizando `npm install` o `yarn install`
3. Ejecuta el proyecto utilizando `npm start` o `yarn start`

## Contribución

Si quieres contribuir a este proyecto, asegúrate de seguir las mejores prácticas y los estándares de código establecidos. Si encuentras errores o tienes ideas para mejorar el proyecto, no dudes en crear una issue o enviar una pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de utilizar, modificar y distribuir este software según sea necesario.
