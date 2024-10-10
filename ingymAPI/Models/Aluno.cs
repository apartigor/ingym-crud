namespace ingymAPI.Models;
public class Aluno
{
    public int AlunoId { get; set; }
    public string? Nome { get; set; }
    public string? Email { get; set; }
    public int PlanoId { get; set; } // Foreign Key
    public Plano? Plano { get; set; } // Nav
}

