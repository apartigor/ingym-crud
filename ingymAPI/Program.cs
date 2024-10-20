using ingymAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

//API - Funcionando
app.MapGet("/", () => "API funcionando!");

//*********************PLANO***********************

//Cadastro de Plano
//POST: /api/plano/cadastrar
app.MapPost("/api/plano/cadastrar", ([FromBody] Plano plano,
    [FromServices] AppDataContext bdd) =>
{
    bdd.Planos.Add(plano);
    bdd.SaveChanges();
    return Results.Created("", plano);
});

// Listar Planos
// GET: /api/plano/listar
app.MapGet("/api/plano/listar", ([FromServices] AppDataContext bdd) =>
{
    if (bdd.Planos.Any())
    {
        return Results.Ok(bdd.Planos.ToList());
    }
    return Results.NotFound("Nenhum plano encontrado!");
});

// Deletar Plano por ID
// DELETE: /api/plano/deletar/{id}
app.MapDelete("/api/plano/deletar/{id}", ([FromRoute] int id,
    [FromServices] AppDataContext bdd) =>
{
    Plano? plano = bdd.Planos.Find(id);
    if (plano == null)
    {
        return Results.NotFound("Nenhum plano encontrado!");
    }
    bdd.Planos.Remove(plano);
    bdd.SaveChanges();
    return Results.Ok("Plano removido com sucesso!");

});

// Buscar Plano por ID
//GET: /api/plano/buscar/id 
app.MapGet("/api/plano/buscar/{id}", ([FromRoute] int id, [FromServices] AppDataContext bdd) =>
{
    // Busca pela chave primária
    Plano? plano = bdd.Planos.Find(id);
    {
        if (plano == null)
        {
            return Results.NotFound("Nenhum plano encontrado!");
        }
    }
    return Results.Ok(plano);
});

// Alterar Plano pelo ID
// PUT: /api/plano/alterar/id
app.MapPut("/api/plano/alterar/{id}", ([FromRoute] int id, [FromBody] Plano planoAlterado, [FromServices] AppDataContext bdd) =>
{
    // Busca pela chave primária
    Plano? plano = bdd.Planos.Find(id);
    if (plano == null)
    {
        return Results.NotFound("Nenhum plano encontrado!");
    }
    plano.Nome = planoAlterado.Nome;
    plano.Descricao = planoAlterado.Descricao;
    plano.Preco = planoAlterado.Preco;
    bdd.SaveChanges();
    return Results.Ok(plano);
});



//*********************ALUNO***********************

// Cadastro de Aluno
// POST: /api/aluno/cadastrar
app.MapPost("/api/aluno/cadastrar", ([FromBody] Aluno aluno,
    [FromServices] AppDataContext bdd) =>
{
    var plano = bdd.Planos.Find(aluno.PlanoId);
    if (plano == null)
    {
        return Results.NotFound("Nenhum plano encontrado!");
    }
    aluno.Plano = plano;
    bdd.Alunos.Add(aluno);
    bdd.SaveChanges();
    return Results.Created("", aluno);
});

// Listar Alunos
// GET: /api/aluno/listar
app.MapGet("/api/aluno/listar", ([FromServices] AppDataContext bdd) =>
{
    if (bdd.Alunos.Any())
    {
        return Results.Ok(bdd.Alunos
        .Include(a => a.Plano)
        .ToList());
    }
    return Results.NotFound("Nenhum aluno encontrado!");
});

// Buscar Aluno por ID
// GET: /api/aluno/buscar/{id}
app.MapGet("/api/aluno/buscar/{id}", ([FromRoute] int id, [FromServices] AppDataContext bdd) =>
{
    var aluno = bdd.Alunos
        .Include(a => a.Plano)
        .FirstOrDefault(a => a.AlunoId == id);

    if (aluno == null)
    {
        return Results.NotFound("Nenhum aluno encontrado!");
    }

    return Results.Ok(aluno);
});


// Deletar Aluno pelo ID
// DELETE: /api/aluno/deletar/{id}
app.MapDelete("/api/aluno/deletar/{id}", ([FromRoute] int id,
    [FromServices] AppDataContext bdd) =>
{
    Aluno? aluno = bdd.Alunos.Find(id);
    if (aluno == null)
    {
        return Results.NotFound("Nenhum aluno encontrado!");
    }
    bdd.Alunos.Remove(aluno);
    bdd.SaveChanges();
    return Results.Ok("Aluno removido com sucesso!");

});

// Alterar Aluno pelo ID
// PUT: /api/aluno/alterar/{id}
app.MapPut("/api/aluno/alterar/{id}", ([FromRoute] int id, [FromBody] Aluno alunoAlterado, [FromServices] AppDataContext bdd) =>
{
    Aluno? aluno = bdd.Alunos.Find(id);
    if (aluno == null)
    {
        return Results.NotFound("Nenhum aluno encontrado!");
    }

    var plano = bdd.Planos.Find(alunoAlterado.PlanoId);
    if (plano == null)
    {
        return Results.NotFound("Plano não encontrado!");
    }

    aluno.Nome = alunoAlterado.Nome;
    aluno.Email = alunoAlterado.Email;
    aluno.PlanoId = alunoAlterado.PlanoId;
    aluno.Plano = plano;

    bdd.SaveChanges();

    return Results.Ok(aluno);
});


app.Run();