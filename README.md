# Gestor de Cursos React

Aplicación web SPA desarrollada en React que permite consultar cursos desde una API externa, buscar cursos, filtrar por docente y administrar cursos favoritos.

## Funcionalidades

- Consumo de una API externa con Axios.
- Versión alternativa del servicio utilizando Fetch.
- Manejo de datos en formato JSON.
- Carga asíncrona utilizando `async/await`.
- Búsqueda de cursos por título.
- Filtro de cursos por docente.
- Cursos favoritos almacenados en `localStorage`.
- Contador general de favoritos.
- Contador de favoritos por docente.
- Modo oscuro almacenado en `localStorage`.
- Manejo de estados de carga y error.
- Validación y sanitización básica de textos.
- Análisis de calidad y seguridad mediante SonarQube.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- Axios
- Fetch API
- CSS
- LocalStorage
- ESLint
- SonarQube
- Docker
- Git y GitHub

## API utilizada

La aplicación consume la API pública:

`https://jsonplaceholder.typicode.com/posts`

La API entrega publicaciones con la siguiente estructura:

```json
{
  "userId": 1,
  "id": 1,
  "title": "Título",
  "body": "Descripción"
}
```

Los datos se transforman internamente en cursos:

```json
{
  "id": 1,
  "title": "Título del curso",
  "description": "Descripción del curso",
  "teacherId": 1
}
```

## Estructura del proyecto

```text
src/
├── components/
│   ├── CourseCard.jsx
│   ├── CourseList.jsx
│   ├── FavoriteStats.jsx
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── TeacherFilter.jsx
│   └── ThemeToggle.jsx
├── hooks/
│   └── useLocalStorage.js
├── services/
│   └── courseService.js
├── utils/
│   └── sanitize.js
├── App.jsx
├── App.css
└── main.jsx
```

## Componentes creados

### Header

Muestra el título y la descripción principal de la aplicación.

### SearchBar

Permite buscar cursos por título. El campo está limitado a 50 caracteres.

### TeacherFilter

Permite filtrar los cursos según el identificador del docente.

### CourseList

Recibe el listado de cursos y genera una tarjeta reutilizable para cada elemento.

### CourseCard

Muestra el título, descripción, docente y botón para agregar o quitar un curso de favoritos.

### FavoriteStats

Cuenta y muestra la cantidad de cursos favoritos correspondiente a cada docente.

### ThemeToggle

Permite alternar entre modo claro y modo oscuro.

## Hook personalizado

### useLocalStorage

Permite recuperar y guardar datos no sensibles en `localStorage`.

Se utiliza para almacenar:

- Cursos favoritos.
- Preferencia de modo oscuro.

## Buenas prácticas de seguridad

- No se almacenan contraseñas, tokens ni información sensible en `localStorage`.
- Se valida que los textos recibidos sean cadenas.
- Se sanitizan los símbolos `<` y `>`.
- No se utiliza `dangerouslySetInnerHTML`.
- Se limita el buscador a 50 caracteres.
- Se manejan los errores producidos durante el consumo de la API.
- Se separan las responsabilidades en componentes, servicios, hooks y utilidades.

## Ejecución del proyecto

Instalar dependencias:

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Revisar el código con ESLint:

```bash
npm run lint
```

Generar la compilación:

```bash
npm run build
```

## Análisis con SonarQube

El proyecto fue analizado mediante SonarQube Community ejecutado localmente con Docker.

Resultado final:

- Quality Gate aprobado.
- 0 problemas de seguridad.
- 0 issues abiertos.
- 0 Security Hotspots.
- 0 % de código duplicado.

Las observaciones iniciales relacionadas con la función `replace()` fueron corregidas utilizando `replaceAll()`.

## Uso responsable de inteligencia artificial

La inteligencia artificial fue utilizada como apoyo durante el desarrollo para interpretar la guía, organizar la estructura del proyecto, revisar errores y proponer mejoras.

Cada sugerencia fue revisada antes de ser incorporada. También se validó el proyecto mediante ESLint, compilación con Vite y análisis con SonarQube.

No se incorporaron credenciales ni datos sensibles al código, y la IA no reemplazó la comprensión ni la validación manual de la solución.

## Evidencias

Las capturas del funcionamiento, `localStorage`, compilación y análisis con SonarQube se encuentran en la carpeta:

```text
evidencias/
```
