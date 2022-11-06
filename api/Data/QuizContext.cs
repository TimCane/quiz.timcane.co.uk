using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Data
{
  public class QuizContext : DbContext
  {
    public QuizContext()
    {
    }

    public QuizContext(DbContextOptions<QuizContext> options)
        : base(options)
    {
    }

    public virtual DbSet<QuestionEntity> Questions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");
      modelBuilder.WithQuestionEntity();
    }
  }
}
