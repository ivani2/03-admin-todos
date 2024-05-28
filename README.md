# Development

Pasos para levantar la App en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```
2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el SEED para [crear la base de datos locales](localhost:3000/api/seed)

# Prisma commands

npx prisma init
npx prisma migrate dev
npx prisma generate

# Producción

# Stage
