var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", context =>
{
    context.Response.Redirect("/html/login.html");
    return Task.CompletedTask;
});

app.UseStaticFiles();

app.Run();
