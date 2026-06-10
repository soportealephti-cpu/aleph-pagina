Despliegue de WEB

Dominio objetivo:
- `https://alephsac.com`

Variables de produccion:
- usa `.env.production`

Pasos:
1. `npm install`
2. `npm run build`
3. subir el contenido de `dist/` al host de `alephsac.com`

Dependencias externas:
- la web publica llama a `https://api.alephsac.com`
- el boton de aula virtual apunta a `https://aula.alephsac.com`
