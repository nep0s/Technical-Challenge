# Technical-Challenge

# Descripción

Aplicación intermediaria de pagos para la API de General Payments

# Consideraciones
- Se asume que el código de transferencia se mantiene constante, por lo que no se agregó a las variables de entorno.
- Al intentar enviar una transferencia a la url de General Payments, se recibe un error 500 de Internal Error, por lo que el testeo y la refactorización en algunas partes de mi código es limitada.
- Alcance: 
  - Proyecto en github y contenerizado.
  - No se pudo comprobar el comportamiento de algunos endpoints (punto 2).
  - No se logró que la instancia de AWS aceptara conexiones externas.


## Requerimientos
 - Docker Instalado
 - Servicio de Docker corriendo.
 - Definicion de variables de entorno en './env'

# Ejemplo de variables de entorno


/.env
```yaml
DB_USERNAME=user
DB_PASSWORD=admin
DB_DATABASE=postgres_db

NODE_ENV=development  # development | production
```


# Deploy 

```bash
$ docker compose build
```

```bash
$ docker compose up
```

# Endpoints

## GET /token

Para fines ilustartivos, devuelve el token de General Payments en formato de string.

## GET /payment

Devuelve la información otorgada por la API de General Payments sobre la transferencia asignada.

## POST /payment

Crea un objeto de transferencia y maneja la interacción con la API de General Payments.

Ejemplo de body:

```
{
  transferCode: smitjans@uc.cl,
  amount: 5000
}
```

## GET /local-payment

Devuelve un objeto con la instancia de transferencia local de la base de datos. Incluye el número de transferencias repetidas no enviadas a General Payments.