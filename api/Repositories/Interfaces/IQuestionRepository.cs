using QuizAPI.Data;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace QuizAPI.Repositories.Interfaces
{
  public interface IQuestionRepository : IRepository<QuestionEntity>
  {
    public Task<int> CountAsync();

    public Task<List<QuestionEntity>>
        GetByPageAsync(int limit, int page, string sortField, int sortOrder,
            CancellationToken cancellationToken);

    public Task<QuestionEntity> RandomAsync();
  }
}
