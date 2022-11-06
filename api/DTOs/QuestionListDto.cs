using System.Collections.Generic;

namespace QuizAPI.DTOs
{
  public class QuestionListDto
  {
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public List<QuestionDto> Questions { get; init; }
    public string SortField { get; set; }
    public int SortOrder { get; set; }
    public int TotalPages { get; set; }
    public int TotalRecords { get; set; }
  }
}
