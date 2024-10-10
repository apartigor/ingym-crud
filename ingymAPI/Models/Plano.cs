using System;

namespace ingymAPI.Models;

// Models/Plano.cs
public class Plano
{
    public int PlanoId { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public decimal Preco { get; set; }
}
