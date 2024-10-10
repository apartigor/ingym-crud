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

// GET: /api/plano/listar
app.MapGet("/api/plano/listar", ([FromServices] AppDataContext bdd) =>
{
    if (bdd.Planos.Any())
    {
        return Results.Ok(bdd.Planos.ToList());
    }
    return Results.NotFound();
});

//DELETE: /api/plano/deletar/{id}
app.MapDelete("/api/plano/deletar/{id}", ([FromRoute] int id,
    [FromServices] AppDataContext bdd) =>
{
    Plano? plano = bdd.Planos.Find(id);
    if (plano == null)
    {
        return Results.NotFound();
    }
    bdd.Planos.Remove(plano);
    bdd.SaveChanges();
    return Results.Ok("Plano removido com sucesso!");
    
});

//Cadastro Aluno
//POST: /api/aluno/cadastrar
app.MapPost("/api/aluno/cadastrar", ([FromBody] Aluno aluno,
    [FromServices] AppDataContext bdd) =>
{
    bdd.Alunos.Add(aluno);
    bdd.SaveChanges();
    return Results.Created("", aluno);
});

app.Run();