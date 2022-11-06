using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Extensions.Logging;
using QuizAPI.DTOs;
using QuizAPI.Repositories.Interfaces;
using System.Net;
using System.Threading.Tasks;

namespace QuizAPI.Functions
{
  public class GetCountOfQuestions
  {
    private readonly IQuestionRepository _questionRepository;

    public GetCountOfQuestions(IQuestionRepository questionRepository)
    {
      _questionRepository = questionRepository;
    }

    [Function("QuestionCount")]
    [OpenApiOperation("QuestionCount", "Questions")]
    [OpenApiResponseWithBody(HttpStatusCode.OK, "application/json", typeof(CountOfQuestionsDto),
        Description = "The OK response")]
    [OpenApiResponseWithBody(HttpStatusCode.NoContent, "text/plain", typeof(string),
        Description = "No Content was returned.")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]
            HttpRequestData req,
        FunctionContext context)
    {
      var log = context.GetLogger<GetCountOfQuestions>();
      log.LogInformation("C# HTTP trigger function processed a request.");

      var totalRecords = await _questionRepository.CountAsync();
      if (totalRecords is 0) return req.CreateResponse(HttpStatusCode.NoContent);

      var okResponse = req.CreateResponse(HttpStatusCode.OK);
      await okResponse.WriteAsJsonAsync(new CountOfQuestionsDto
      {
        Count = totalRecords
      });

      return okResponse;
    }
  }
}
