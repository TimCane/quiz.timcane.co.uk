using AutoMapper;
using QuizAPI.Data;

namespace QuizAPI.DTOs
{
  public class QuestionDto
  {
    public string Answer { get; set; }
    public string Text { get; set; }
  }

  public class QuestionDtoProfile : Profile
  {
    public QuestionDtoProfile()
    {
      CreateMap<QuestionEntity, QuestionDto>();
    }
  }
}
