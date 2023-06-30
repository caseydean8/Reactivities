using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline. Manipulate the HTTP requests on the way in or out, AKA MIDDLEWARE. The word pipeline is used because at each stage of the requests journey we can do something with that request.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// order is important in middleware, The browser is going to send a pre flight request to see if Cors is available.
app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

// using statement automatically cleans up after itself. This scope is going to be destroyed as soon as the following code is executed.
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    // Applies any pending migrations for the context to the database.Will create the database if it does not already exist.
    // Since we're using asynchronous code with SeedData, we should use it with Migrate() also
    await context.Database.MigrateAsync();
    // SeedData is an async class
    await Seed.SeedData(context);
}
catch (System.Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();
