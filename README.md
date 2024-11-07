# Proyecto de Seguimiento de Gastos Personales

Este es un proyecto de una aplicación web para el seguimiento de gastos personales, desarrollado con **React**, **Redux**, **TypeScript**, y utilizando principios de **Clean Architecture** para organizar el código en capas. La aplicación permite agregar, editar y eliminar gastos, ver un resumen por categorías y aplicar filtros.

## Estructura de Carpetas

La aplicación sigue una estructura basada en **Clean Architecture**. Aquí está la organización de cada carpeta y su propósito:

src/
├── application/ # Capa de Aplicación
│ ├── hooks/ # Hooks relacionados con la lógica de aplicación (ej. autenticación, Redux dispatch)
│ ├── redux/ # Configuración de Redux
│ │ ├── slices/ # Slices de Redux para manejar el estado global (ej. expensesSlice)
│ │ └── useCases/ # Casos de uso, donde se coloca la lógica de negocio específica
├── domain/ # Capa de Dominio
│ ├── constants/ # Constantes globales (ej. categorías de gasto, mensajes de error)
│ ├── models/ # Modelos de datos que representan las entidades del dominio (ej. Expense)
│ └── types/ # Tipos de TypeScript globales para la aplicación
├── infrastructure/ # Capa de Infraestructura
│ ├── api/ # Configuración del cliente de API (ej. Axios)
│ └── services/ # Servicios que interactúan con la API (ej. expenseService para CRUD de gastos)
├── presentation/ # Capa de Presentación
│ ├──components/ # Componentes de presentación reutilizables
│ │ └── tests/ # Pruebas de los componentes de presentación
│ ├── layout/ # Componentes de disposición y estructura general de la UI
│ ├── hooks/ # Hooks específicos para la UI
│ └── pages/ # Páginas principales de la aplicación
└── App.tsx # Componente principal de la aplicación

### Explicación de las Carpetas Principales

1. **application**: Esta capa contiene la lógica de aplicación. Aquí se incluyen los hooks personalizados para la lógica de la aplicación (ej. autenticación, hooks para Redux), los slices de Redux para el manejo del estado global, y los casos de uso específicos de la aplicación.

2. **domain**: Define la estructura de los datos del dominio y contiene los tipos y constantes globales que se usan en toda la aplicación, como el modelo `Expense` y las categorías de gasto permitidas.

3. **infrastructure**: Esta capa maneja la comunicación con la API y el acceso a datos. La configuración de cliente de API (usando Axios) y los servicios para interactuar con los endpoints de gastos (`expenseService`) se encuentran aquí.

4. **presentation**: Esta es la capa de interfaz de usuario y contiene todos los componentes y páginas de React que representan la UI. Aquí encontrarás:
   - **components**: Componentes reutilizables como `ExpenseFilters`, `ExpenseList`, etc.
   - **layout**: Componentes que definen la disposición general de la UI, como el `Layout`, `Header`, y `Sidebar`.
   - **hooks**: Hooks personalizados que están más relacionados con la UI.
   - **pages**: Páginas de la aplicación, como `HomePage`, `AddExpensePage`, y `EditExpensePage`.

## Cómo Ejecutar la Aplicación Localmente

Para ejecutar la aplicación en tu entorno local, sigue estos pasos:

### Prerrequisitos

- **Node.js** y **npm** instalados en tu sistema.
- Asegúrate de que estás usando una versión compatible de Node.js y que has instalado todas las dependencias.

### Pasos de Instalación

1. **Clona el repositorio** en tu máquina local:
   ```bash
   git clone https://github.com/kevin-lo-al-98/pt_gastos_personales.git
   cd pt_gastos_personales
   ```
2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Inicia el servidor JSON Server (si estás usando json-server para simular una API):
   ```bash
   npm run server
   ```
4. Ejecuta la aplicación en modo de desarrollo:
   ```bash
   npm run dev
   ```

### Comandos Adicionales

- **Compilar para producción:**
  ```bash
  npm run build
  ```
- **Previsualizar el build de producción:**
  ```bash
  npm run preview
  ```

### Variables de Entorno

Si la aplicación necesita configurar variables de entorno para el cliente de API u otras configuraciones, crea un archivo .env en la raíz del proyecto con las siguientes variables (ejemplo):

REACT_APP_API_URL=http://localhost:5000

### Ejecución de las Pruebas

- Asegúrate de tener instaladas todas las dependencias del proyecto:
 ```bash
  npm install
  ```

- Ejecuta todas las pruebas unitarias con el siguiente comando:
 ```bash
  npm test
  ```
  Esto correrá Jest, el framework de pruebas, y buscará automáticamente todos los archivos con la extensión .test.tsx o .test.ts en el proyecto.

# Pasos opcionales para la configuración de React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
