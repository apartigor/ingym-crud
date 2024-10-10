using System;

namespace ingymAPI.Models;

// Models/Aluno.cs
public class Aluno
{
    public int AlunoId { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int PlanoId { get; set; } // Foreign Key
    public Plano? Plano { get; set; } // Navigation Property
}

