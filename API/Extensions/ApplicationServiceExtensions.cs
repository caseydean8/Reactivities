
using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        // In the case of extension methods, keyword this refers to the thing we are extending, in this case the IServiceCollection WebApplicationBuilder.Services in Program. Also due to keyword this it recognizes that the parameter actually being called is config.
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            // Cors policy to allow 3000 and 5000 to talk to each other
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(List.Handler)); // Tell AddMediatR where handlers are located
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}