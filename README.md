# Hicapps - Tomás Díaz Toro

Technical test for full stack developer. The requirements for the development can be found in https://github.com/HICAPPS/technical-test-firebase.

## Prerequisites
You will need
- npm on your machine
- The Firebase proyect RTDB url, copied from the Firebase dashboard
- The Firebase service accounts file, exported from the Firebase dashboard
  
## Getting Started

These instructions will get you a copy of the project running on your local machine
- Execute **npm install** in the root folder
- go to the /functions folder and run **npm install** again
- Create a .env file and create a RTDB_URL constant with your Firebase RTDB URL
- Create a service-accounts.json file and paste your service accounts data
- (Optional) Execute **npm run test** to check all is ok
- (Optional) Execute **node populateDB.js** to create 3 dummy patients
- Execute **npm run serve**

## Available endpoints
The project is deployed, so you can test the endpoints in https://api-6pzedqghtq-uc.a.run.app/pacientes. This is how they look locally:

GET localhost/hicapps-tomas-diaz-toro/us-central1/api/pacientes/${patientUUID}

**Response**
```
{
    "Accesible": false,
    "Apellido Materno": "Toro",
    "Apellido Paterno": "Díaz",
    "Nombre": "Joseph",
    "Número de seguridad social": "052340"
}
```
  
GET localhost/hicapps-tomas-diaz-toro/us-central1/api/pacientes

**Response**
```
[
  {
      "Accesible": false,
      "Apellido Materno": "Toro",
      "Apellido Paterno": "Díaz",
      "Nombre": "Joseph",
      "Número de seguridad social": "052340"
  },
  {
      "Accesible": true,
      "Apellido Materno": "Pérez",
      "Apellido Paterno": "Sanhueza",
      "Nombre": "Rocío",
      "Número de seguridad social": "023401"
  },
  {
      "Accesible": true,
      "Apellido Materno": "Toro",
      "Apellido Paterno": "Díaz",
      "Nombre": "Tomás",
      "Número de seguridad social": "012340"
  },...
]
```

POST localhost/hicapps-tomas-diaz-toro/us-central1/api/pacientes

**Parameters**
|Name|Required|Type|                                                                                                                                                      
| :----------|:--------|:-------|
|`name` | required | string  |
|`fatherLastName` | required | string  | 
|`motherLastName` | required | string |
|`socialSecurityNumber` | required | string  |
|`accessible` | required | boolean  |

**Response**
```
${patientUUID}
```
