namespace QuizAPI.DTOs
{
  public class GetQuizQuestionsDto
  {
    public int Limit { get; set; }

    public int Page { get; set; }

    public string SortField { get; set; }

    public int SortOrder { get; set; }
  }
}
