using AutoMapper;
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
  public class GetRandomQuestion
  {
    private readonly IMapper _mapper;
    private readonly IQuestionRepository _questionRepository;

    public GetRandomQuestion(IQuestionRepository questionRepository, IMapper mapper)
    {
      _questionRepository = questionRepository;
      _mapper = mapper;
    }

    [Function("GetRandomQuestion")]
    [OpenApiOperation("GetRandomQuestion", "Questions")]
    [OpenApiResponseWithBody(HttpStatusCode.OK, "application/json", typeof(QuestionDto),
        Description = "The OK response")]
    [OpenApiResponseWithBody(HttpStatusCode.NoContent, "text/plain", typeof(string),
        Description = "No Content was returned.")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]
            HttpRequestData req,
        FunctionContext context)
    {
      var log = context.GetLogger<GetRandomQuestion>();
      log.LogInformation("C# HTTP trigger function processed a request.");

      var entity = await _questionRepository.RandomAsync();
      if (entity == null) return req.CreateResponse(HttpStatusCode.NoContent);

      var response = _mapper.Map<QuestionDto>(entity);

      var okResponse = req.CreateResponse(HttpStatusCode.OK);
      await okResponse.WriteAsJsonAsync(response);

      return okResponse;
    }
  }
}
