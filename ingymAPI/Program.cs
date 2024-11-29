using ingymAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
builder.Services.AddCors(options =>
options.AddPolicy("Acesso Total",
configs => configs
.AllowAnyOrigin()
.AllowAnyHeader()
.AllowAnyMethod())
);
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

// Aplicar desconto por desempenho
// POST: /api/aluno/desempenho/{id}/{meses}
app.MapPost("/api/aluno/desempenho/{id}/{meses}", ([FromRoute] int id, [FromRoute] int meses, [FromServices] AppDataContext bdd) =>
{
    if (meses < 0)
    {
        return Results.BadRequest("A quantidade de meses deve ser maior que 0!");
    }

    var aluno = bdd.Alunos
        .Include(a => a.Plano)
        .FirstOrDefault(a => a.AlunoId == id);

    if (aluno == null)
    {
        return Results.NotFound("Aluno não encontrado!");
    }

    var plano = aluno.Plano;
    if (plano == null)
    {
        return Results.NotFound("Plano do aluno não encontrado!");
    }

    decimal desconto = 0;

    switch (plano.PlanoId)
    {
        case 12: // Vip
            if (meses >= 3 && meses < 6) desconto = 0.05m;
            else if (meses >= 6 && meses <= 10) desconto = 0.10m;
            else if (meses > 10) desconto = 0.15m;
            break;

        case 13: // Vip Plus
            if (meses >= 2 && meses < 6) desconto = 0.08m;
            else if (meses >= 6 && meses <= 10) desconto = 0.14m;
            else if (meses > 10) desconto = 0.20m;
            break;

        case 11:
            desconto = 0;
            break;

        default:
            return Results.BadRequest("Plano não elegível para desconto.");
    }

    decimal valorOriginal = plano.Preco;
    decimal valorComDesconto = valorOriginal * (1 - desconto);

    return Results.Ok(new
    {
        Aluno = aluno.Nome,
        Plano = plano.Nome,
        Meses = meses,
        ValorOriginal = valorOriginal,
        ValorComDesconto = desconto > 0 ? valorComDesconto : valorOriginal,
        DescontoAplicado = desconto > 0 ? $"{desconto * 100}%" : "Nenhum desconto aplicado"
    });
});


app.UseCors("Acesso Total");

app.Run();