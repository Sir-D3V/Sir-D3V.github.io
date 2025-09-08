# Portafolio Profesional - Francisco Simon

Un portafolio web moderno y elegante creado para mostrar habilidades, experiencia y proyectos de desarrollo de software.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- **Modo Oscuro/Claro**: Toggle entre temas con persistencia en localStorage
- **Animaciones Suaves**: Transiciones y efectos visuales profesionales
- **Navegación Inteligente**: Scroll suave y resaltado de sección activa
- **Formulario de Contacto**: Sistema de notificaciones integrado
- **SEO Optimizado**: Estructura semántica y meta tags
- **Performance**: Código optimizado y carga rápida

## 📁 Estructura del Proyecto

```
portafolio-hackhades/
├── index.html          # Página principal
├── styles.css          # Estilos CSS con variables CSS y diseño responsivo
├── script.js           # JavaScript para interactividad
└── README.md           # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Flexbox, Grid, Variables CSS, Animaciones
- **JavaScript**: Vanilla JS para máximo rendimiento
- **Font Awesome**: Iconos profesionales
- **Google Fonts**: Tipografía Inter

## 📋 Instrucciones de Despliegue en GitHub Pages

### Paso 1: Crear el Repositorio

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Crea un nuevo repositorio con el nombre: `dev616.github.io`
3. Marca como público y NO inicialices con README

### Paso 2: Subir los Archivos

Opción A - Usando Git (Recomendado):
```bash
cd /home/franciscosimon/portafolio-hackhades
git init
git add .
git commit -m "Initial commit: Professional portfolio"
git branch -M main
git remote add origin https://github.com/dev616/dev616.github.io.git
git push -u origin main
```

Opción B - Usando la Interfaz Web:
1. En tu repositorio, haz clic en "uploading an existing file"
2. Arrastra y suelta todos los archivos del portafolio
3. Escribe el mensaje de commit: "Add professional portfolio"
4. Haz clic en "Commit changes"

### Paso 3: Configurar GitHub Pages

1. Ve a Settings → Pages en tu repositorio
2. En "Source", selecciona "Deploy from a branch"
3. Selecciona "main" branch y "/ (root)"
4. Haz clic en "Save"

### Paso 4: Acceder a tu Portafolio

Tu portafolio estará disponible en: `https://dev616.github.io`

⚠️ **Nota**: Puede tomar hasta 10 minutos para que GitHub Pages procese y publique tu sitio.

## 🎨 Personalización

### Colores y Temas
Los colores se definen en variables CSS en `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #3b82f6;
    /* ... más variables */
}
```

### Contenido Personal
Edita `index.html` para personalizar:
- Información personal en la sección hero
- Habilidades y porcentajes en la sección skills
- Experiencia laboral en la timeline
- Proyectos destacados
- Información de contacto

### Animaciones
Las animaciones se controlan en `script.js` y pueden ajustarse modificando:
- Velocidades de transición
- Efectos de scroll
- Animaciones de typing

## 📱 Características Técnicas

- **Mobile First**: Diseño optimizado para móviles
- **Accesibilidad**: Navegación por teclado y lectores de pantalla
- **Performance**: Lazy loading y optimización de recursos
- **Cross-browser**: Compatible con navegadores modernos
- **Progressive Enhancement**: Funciona sin JavaScript

## 🔧 Desarrollo Local

Para trabajar localmente:

1. Abre el archivo `index.html` en tu navegador
2. O usa un servidor local:
```bash
# Python 3
python -m http.server 8000

# Node.js (si tienes http-server instalado)
npx http-server

# Live Server en VS Code
# Instala la extensión Live Server y haz clic derecho → "Open with Live Server"
```

## 📞 Soporte

Si necesitas ayuda o tienes preguntas sobre el portafolio, puedes:
- Crear un issue en el repositorio
- Contactar directamente a través del formulario del portafolio

## 📄 Licencia

Este proyecto es de uso personal. Siéntete libre de usarlo como base para tu propio portafolio.

---

**¡Tu portafolio profesional está listo para impresionar! 🚀**
