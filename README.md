# Taller Technical Interview - Full Stack Employee Management [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/andresdotguapacha/taller-technical-interview)

A full-stack application built with .NET Core 8 Web API and React frontend for employee management operations.

## Features

### Backend (.NET Core 8 API)
- **RESTful API** with full CRUD operations
- **JWT Bearer Authentication** (pass-through for demonstration)
- **Entity Framework Core** with In-Memory Database
- **Swagger/OpenAPI** documentation
- **FluentValidation** for request validation
- **AutoMapper** for object mapping
- **CORS** enabled for frontend integration

### Frontend (React + TypeScript)
- **React** with functional components and hooks
- **TypeScript** for type safety
- **Employee management** (Create, Read, Update, Delete)
- **API integration** with authentication headers

## Technology Stack

### Backend
- .NET Core 8
- Entity Framework Core
- Swagger/OpenAPI
- FluentValidation
- AutoMapper
- JWT Bearer Authentication

### Frontend
- React 18
- TypeScript
- CSS3
- Fetch API

## Project Structure

```bash
Taller.API/
├── 📁 Common/                       # Shared utilities
│   └── BearerAuthenticationHandler.cs
├── 📁 Context/                      # Database context
│   └── EmployeeContext.cs
├── 📁 Controllers/                  # API Controllers
│   └── EmployeeController.cs
├── 📁 Models/                       # Data models
│   ├── 📁 DTO/                      # Data Transfer Objects
│   │   └── EmployeeDto.cs
│   ├── 📁 Profiles/                 # AutoMapper profiles
│   │   └── EmployeeProfile.cs
│   ├── 📁 Validators/               # FluentValidation rules
│   │   └── EmployeeValidator.cs
│   └── Employee.cs                   # Entity model
├── 📁 Repositories/                 # Data access layer
│   └── EmployeeRepository.cs
├── 📁 Services/                     # Business logic layer
│   └── EmployeeService.cs
├── appsettings.json                 # Configuration
├── appsettings.Development.json     # Development configuration
├── Program.cs                       # Application entry point
├── Taller.API.csproj                # Project file
└── Taller.http                      # HTTP test files
````

```bash
Taller.ReactApp/
├── 📁 dist/                         # Build output
├── 📁 src/                          # Source code
│   ├── 📁 components/               # React components
│   │   ├── EmployeeForm.tsx
│   │   ├── EmployeeList.tsx
│   │   └── ErrorMessage.tsx
│   ├── 📁 hooks/                    # Custom React hooks
│   │   ├── useEmployees.ts
│   │   └── useForm.ts
│   ├── 📁 services/                 # API services
│   │   └── employeeService.ts
│   ├── 📁 types/                    # TypeScript definitions
│   │   └── employee.ts
│   ├── App.tsx                      # Main app component
│   └── index.tsx                    # App entry point
└── index.html                       # Static files
├── package.json                     # Dependencies and scripts
├── package-lock.json                # Lock file
└── tsconfig.json                    # TypeScript configuration
````

## Quick Start

### Prerequisites
- .NET 8 SDK
- Node.js 16+ and npm

### Backend Setup
```bash
# Navigate to API project
cd Taller.API

# Restore dependencies
dotnet restore

# Run the application
dotnet run
```
API will be available at: https://localhost:7150
Swagger UI: https://localhost:7150/swagger

# Navigate to React app
cd Taller.ReactApp

```bash
# Install dependencies
npm install

# Start development server
npm run build
npm run dev

#Serve application
npm run serve
```

## Authentication
The API uses Bearer token authentication (pass-through for demo purposes):

http
Authorization: Bearer any-token-here
Any token following "Bearer " will be accepted, making it easy to test without complex JWT setup.


## Key Features Implemented

### Backend

✅ In-memory database for quick setup

✅ Comprehensive input validation

✅ Proper error handling

✅ Clean architecture (Controllers → Services → Repositories)

✅ CORS configured for frontend integration

✅ Automated API documentation

### Frontend

✅ Type-safe API calls

✅ Employee list display

✅ Add/edit employee forms

✅ Error handling

✅ Responsive design

## Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

## License
This project is open source and available under the General Public License.

## Author
Andres Guapacha | GitHub: @andresdotguapacha
