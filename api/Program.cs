using System;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker.Extensions.OpenApi.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using QuizAPI.Data;
using QuizAPI.Repositories;
using QuizAPI.Repositories.Interfaces;

namespace QuizAPI
{
  public class Program
  {
    private static readonly string SQLConnectionString =
      Environment.GetEnvironmentVariable("SqlConnectionString") ?? string.Empty;

    private static Task Main(string[] args)
    {
      var host = new HostBuilder()
        .ConfigureAppConfiguration(configurationBuilder => { configurationBuilder.AddCommandLine(args); })
        .ConfigureFunctionsWorkerDefaults(worker => worker.UseNewtonsoftJson())
        .ConfigureOpenApi()
        .ConfigureServices(services =>
        {
          // Add Logging
          services.AddLogging();

          // Add HttpClient
          services.AddHttpClient();

          // Add AutoMapper
          services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

          // Add Custom Services

          // Transient objects are always different; a new instance is provided to every controller and every service.
          // Scoped objects are the same within a request, but different across different requests.
          // Singleton objects are the same for every object and every request.

          services.AddScoped<IQuestionRepository, QuestionRepository>();

          services.AddDbContext<QuizContext>(
            o => o.UseSqlServer(SQLConnectionString));
        })
        .Build();

      return host.RunAsync();
    }
  }
}
