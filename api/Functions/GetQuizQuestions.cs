using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using QuizAPI.DTOs;
using QuizAPI.Repositories.Interfaces;

namespace QuizAPI.Functions
{
  public class GetQuizQuestions
  {
    private readonly IMapper _mapper;
    private readonly IQuestionRepository _questionRepository;

    public GetQuizQuestions(IQuestionRepository questionRepository, IMapper mapper)
    {
      _questionRepository = questionRepository;
      _mapper = mapper;
    }

    [Function("GetQuizQuestions")]
    [OpenApiOperation("GetQuizQuestions", "Questions")]
    [OpenApiParameter("size", In = ParameterLocation.Query, Required = true, Type = typeof(int))]
    [OpenApiParameter("page", In = ParameterLocation.Query, Required = true, Type = typeof(int))]
    [OpenApiParameter("sortField", In = ParameterLocation.Query, Required = true, Type = typeof(string))]
    [OpenApiParameter("sortOrder", In = ParameterLocation.Query, Required = true, Type = typeof(int))]
    [OpenApiResponseWithBody(HttpStatusCode.OK, "application/json", typeof(QuestionListDto),
      Description = "The OK response")]
    [OpenApiResponseWithBody(HttpStatusCode.NoContent, "text/plain", typeof(string),
      Description = "No Content was returned.")]
    public async Task<HttpResponseData> Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]
      HttpRequestData req,
      FunctionContext context,
      CancellationToken cancellationToken
    )
    {
      var log = context.GetLogger<GetQuizQuestions>();

      log.LogInformation("C# HTTP trigger function processed a request.");

      var query = HttpUtility.ParseQueryString(req.Url.Query);
      var sizeQs = query["size"];
      var pageQs = query["page"];
      var sortFieldQs = query["sortField"];
      var sortOrderQs = query["sortOrder"];

      var requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      var data = JsonConvert.DeserializeObject<GetQuizQuestionsDto>(requestBody);

      if (!int.TryParse(sizeQs, out var size) && data is { })
      {
        size = data.Limit;
      }

      if (!int.TryParse(pageQs, out var page) && data is { })
      {
        page = data.Page;
      }

      if (!int.TryParse(sortOrderQs, out var sortOrder) && data is { })
      {
        sortOrder = data.SortOrder;
      }

      var sortField = sortFieldQs;
      if (string.IsNullOrEmpty(sortFieldQs) && data is { })
      {
        sortField = data.SortField;
      }

      if (size is 0 or > 50)
      {
        size = 50;
      }

      if (page is 0)
      {
        page = 1;
      }

      if (sortOrder is not -1)
      {
        sortOrder = 1;
      }

      if (sortField is not "answer")
      {
        sortField = "text";
      }

      var pagedData =
        await _questionRepository.GetByPageAsync(size, page, sortField, sortOrder, cancellationToken);
      if (pagedData == null || !pagedData.Any())
      {
        return req.CreateResponse(HttpStatusCode.NoContent);
      }

      var totalRecords = await _questionRepository.CountAsync();
      if (totalRecords is 0)
      {
        return req.CreateResponse(HttpStatusCode.NoContent);
      }

      var totalPages = totalRecords / (double)size;
      var roundedTotalPages = Convert.ToInt32(Math.Ceiling(totalPages));

      var response = new QuestionListDto
      {
        PageNumber = page,
        PageSize = size,
        Questions = _mapper.Map<List<QuestionDto>>(pagedData),
        TotalRecords = totalRecords,
        TotalPages = roundedTotalPages,
        SortOrder = sortOrder,
        SortField = sortField
      };

      var okResponse = req.CreateResponse(HttpStatusCode.OK);
      await okResponse.WriteAsJsonAsync(response);

      return okResponse;
    }
  }
}
