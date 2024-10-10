using ingymAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

//API - Funcionando
app.MapGet("/", () => "API funcionando!"); 

//Cadastro Plano 
//POST: /api/plano/cadastrar
app.MapPost("/api/plano/cadastrar", ([FromBody] Plano plano,
    [FromServices] AppDataContext bdd) =>
{
    bdd.Planos.Add(plano);
    bdd.SaveChanges();
    return Results.Created("", plano);
});

//POST: /api/aluno/cadastrar
app.MapPost("/api/aluno/cadastrar", ([FromBody] Aluno aluno,
    [FromServices] AppDataContext bdd) =>
{
    bdd.Alunos.Add(aluno);
    bdd.SaveChanges();
    return Results.Created("", aluno);
});

app.Run();