# Development

Pasos para levantar la App en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```
2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ```npm install ```
5. Ejecutar el comando ```npm run dev ```
6. En caso de que no exista la base de datos, generar la base de datos con los comandos
```
npx prisma migrate dev
npx prisma generate
```
7. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)

## Nota: usuario por defecto
__usuario:__ test1@google.com
__password:__ nuevo


# Prisma commands

npx prisma init
npx prisma migrate dev
npx prisma generate

# Producción

# Stage
