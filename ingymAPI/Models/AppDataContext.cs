using Microsoft.EntityFrameworkCore;

namespace ingymAPI.Models;

//Implementar a herança da classe DbContext
public class AppDataContext : DbContext
{
    //Informar quais as classes serão tabelas no banco de dados
    public DbSet<Aluno> Alunos { get; set; }
    public DbSet<Plano> Planos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=gym.db");
    }

}