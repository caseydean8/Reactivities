using API.Extensions;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline. Manipulate the HTTP requests on the way in or out, AKA MIDDLEWARE. The word pipeline is used because at each stage of the requests journey we can do something with that request.
// Exception-handling delegates should be called early in the pipeline, so they can catch exceptions that occur in later stages of the pipeline.
app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    // This is running in the background handling exceptions, hidden behavior after .Net 5.
    // app.UseDeveloperExceptionPage();
}

// order is important in middleware, The browser is going to send a pre flight request to see if Cors is available.
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// using statement automatically cleans up after itself. This scope is going to be destroyed as soon as the following code is executed.
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    // Applies any pending migrations for the context to the database.Will create the database if it does not already exist.
    // Since we're using asynchronous code with SeedData, we should use it with Migrate() also
    await context.Database.MigrateAsync();
    // SeedData is an async class
    await Seed.SeedData(context, userManager);
}
catch (System.Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();
