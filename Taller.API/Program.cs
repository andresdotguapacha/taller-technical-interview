using AutoMapper;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Taller.Context;
using Taller.Models.Profiles;
using Taller.Models.Validators;
using Taller.Repositories;
using Taller.Repository;
using Taller.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication;
using Taller.API.Common;

var ReactAppOrigins = "_ReactAppOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<EmployeeContext>(options =>
    options.UseInMemoryDatabase("TallerInMemoryDB"));

builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();

var mapperConfig = new MapperConfiguration(cfg =>
{
    cfg.AddProfile<EmployeeProfile>();
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<EmployeeValidator>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: ReactAppOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000",
                                             "http://localhost:8000",
                                             "http://127.0.0.1:8000")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = false,
            ValidateIssuerSigningKey = false,
            RequireExpirationTime = false,
            RequireSignedTokens = false,

            SignatureValidator = (token, parameters) =>
            {
                try
                {
                    var jwt = new JwtSecurityToken(token);
                    return jwt;
                }
                catch
                {
                    return new JwtSecurityToken();
                }
            },

            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("dummy-key-that-is-not-used")),
        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var token = context.Request.Headers["Authorization"].FirstOrDefault();
                Console.WriteLine($"Token received: {token}");
                return Task.CompletedTask;
            },
            OnAuthenticationFailed = context =>
            {
                Console.WriteLine($"Authentication failed but ignoring: {context.Exception.Message}");
                context.NoResult();
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                Console.WriteLine("Token validation completed successfully (bypassed)");
                return Task.CompletedTask;
            },
            OnForbidden = context =>
            {
                Console.WriteLine("Forbidden access attempted");
                return Task.CompletedTask;
            }
        };

        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
    });

builder.Services.AddAuthentication("SimpleBearer")
    .AddScheme<AuthenticationSchemeOptions, BearerAuthenticationHandler>(
        "SimpleBearer", options => { });

builder.Services.AddAuthorization(options =>
{
    options.DefaultPolicy = new AuthorizationPolicyBuilder("SimpleBearer")
        .RequireAuthenticatedUser()
        .Build();
});

builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header using the Bearer scheme. 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      Example: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(ReactAppOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
