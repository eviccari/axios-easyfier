# AxiosEasyfier

> ### OBJECTIVES

To help developers to create http requests easily with axios using a Object Builder Pattern, and learn basics javascript concepts (i'm from Java world :)).

> ### REPOSITORY

```https
https://bitbucket.org/eviccari/wms-order-api/src/master/
```

> #### ENVOLVED TECHNOLOGIES

- Java 11
- Maven
- Spring Boot
- Docker
- PostgreSQL
- Amazon ECS

> #### MASTER DEPENDENCIES

- Java OpenJDK 11
- Maven 3.6.3
- Spring Boot 2.3.1

> #### SUPPORTED CONTRACTS

For the all request that returns and receives orders data, the JSON schema have look likes the sample below

```json
{
  "orderPayload": {
    "id": 123456789,
    "type": "leader_type",
    "external_id": "12346569797",
    "facility_id": 100,
    "status": "pickuped",
    "estimated_time_departure": "2020-07-22T09:30:10+0100",
    "leader_id": 1003131,
    "customer_id": 2013146,
    "created_at": "2020-07-22T07:30:10+0100",
    "updated_at": "2020-07-22T11:30:10+0100",
    "deleted_at": "2020-07-22T18:30:10+0100",
    "created_by": 50015454,
    "updated_by": 50015454,
    "deleted_by": 50099545,
    "details": [
      {
        "id": 700152454545,
        "order_id": 123456789,
        "item_id": 88856464,
        "status": "integrated",
        "ordered_qty": 10.5,
        "shipped_qty": 10.5,
        "created_at": "2020-07-22T07:30:10+0100",
        "updated_at": "2020-07-22T11:30:10+0100",
        "deleted_at": "2020-07-22T18:30:10+0100",
        "created_by": 50015454,
        "updated_by": 50015454,
        "deleted_by": 50099545
      },
      {
        "id": 900777564897,
        "order_id": 123456789,
        "item_id": 88810005,
        "status": "integrated",
        "ordered_qty": 7,
        "shipped_qty": 7,
        "created_at": "2020-07-22T07:30:10+0100",
        "updated_at": "2020-07-22T11:30:10+0100",
        "deleted_at": "2020-07-22T18:30:10+0100",
        "created_by": 50015454,
        "updated_by": 50015454,
        "deleted_by": 50099545
      }
    ]
  }
}
```

- **orders/{id} : GET method->** Gets the order data by internal wms id.

- **orders/external_id/{external_id} : GET method->** Gets the order data by external order id (ex: ERP order id).

- **orders/ : POST->** To send order's data and insert that on wms-orders database.

- **orders/ : PUT->** To send order's data and update that on wms-orders database.

- **orders/cancelDetailsBySku : PUT->** Set order detail(s) to CANCELED:

```json
{
  "orderId": 266,
  "externalId": "TESTE_ETD_2020_09_21_22",
  "facilityId": 1,
  "sku": "19",
  "qtyToCancel": 12
}
```

The **qtyToCancel** attribute indicate how much details must be canceled.

- **orders/detail/canceled : PATCH->** To set order status to CANCELED.

> #### SCHEMA MIGRATIONS

### _Entities_

- **s_order.order**
- **s_order.order_detail**

> #### GETING THE SOURCE CODE

Open a UNIX terminal and create a root directory for the project:

```sh
$ cd ~
$ mkdir wms-order-api
$ cd wms-order-api
```

Then clone the project from bitbucket by git clone command line (https version):

```sh
$ git clone https://bitbucket.org/eviccari/wms-order-api.git
```

> #### BUILDING THE PROJECT

On the root of project use maven plugin to generate the executable jar file:

```sh
$ mvn package
```

> #### SETTING THE ENVIRONMENT VARIABLES

The environment must be resolved by spring boot profiles feature. The supported profiles are:

```json
{
  "develop": {
    "spring.database.driverClassName": "org.postgresql.Driver",
    "spring.datasource.url": "jdbc:postgresql://localhost:5432/order",
    "spring.datasource.username": "postgres",
    "spring.datasource.password": "postgres"
  },
  "qa": {
    "spring.database.driverClassName": "org.postgresql.Driver",
    "spring.datasource.url": "jdbc:postgresql://localhost:5432/order",
    "spring.datasource.username": "postgres",
    "spring.datasource.password": "postgres"
  },
  "production": {
    "spring.database.driverClassName": "org.postgresql.Driver",
    "spring.datasource.url": "jdbc:postgresql://localhost:5432/order",
    "spring.datasource.username": "postgres",
    "spring.datasource.password": "postgres"
  }
}
```

> #### BUILDING A IMAGE FROM Dockerfile

Enter on the root of project and execute docker build command line:

```sh
$ cd ~
$ cd wms-order-api
$ docker build -t wms-order-api .
```

Startup the container:

```sh
$ docker run -it --rm -p 8080:8080 wms-order-api  .
```

Check the availability of service:

```
http://localhost:8080/wms-order-api/healthz
```

> #### Maintainers: Favo WMS Squad
