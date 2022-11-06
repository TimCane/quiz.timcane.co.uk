using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Data
{
  public static class QuestionEntityExtensions
  {
    public static ModelBuilder WithQuestionEntity(this ModelBuilder builder)
    {
      return builder.Entity<QuestionEntity>(entity =>
      {
        entity.HasNoKey();

        entity.ToTable("Question");

        entity.Property(e => e.AErrors)
                  .HasColumnName("AErrors")
                  .HasComputedColumnSql("(len([Answer])-len(replace([Answer],'@','')))", false);

        entity.Property(e => e.Answer).IsRequired();

        entity.Property(e => e.QErrors)
                  .HasColumnName("QErrors")
                  .HasComputedColumnSql("(len([Text])-len(replace([Text],'@','')))", false);

        entity.Property(e => e.Text).IsRequired();
      });
    }
  }

  public class QuestionEntity
  {
    public long AErrors { get; set; }
    public string Answer { get; set; }
    public long QErrors { get; set; }
    public string Text { get; set; }
  }
}
