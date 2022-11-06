using Microsoft.EntityFrameworkCore;
using QuizAPI.Data;
using QuizAPI.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace QuizAPI.Repositories
{
  public class QuestionRepository : Repository<QuestionEntity>, IQuestionRepository
  {
    public QuestionRepository(QuizContext context) : base(context)
    {
    }

    public async Task<int> CountAsync()
    {
      return await Table
          .Where(t => t.QErrors == 0 && t.AErrors == 0)
          .CountAsync();
    }

    public async Task<List<QuestionEntity>> GetByPageAsync(int size, int page, string sortField, int sortOrder,
        CancellationToken cancellationToken)
    {
      var pagedData = Table.Where(t => t.QErrors == 0 && t.AErrors == 0);

      pagedData = sortField switch
      {
        "text" when sortOrder is 1 => pagedData.OrderBy(q => q.Text),
        "text" when sortOrder is -1 => pagedData.OrderByDescending(q => q.Text),
        "answer" when sortOrder is 1 => pagedData.OrderBy(q => q.Answer),
        "answer" when sortOrder is -1 => pagedData.OrderByDescending(q => q.Answer),
        _ => pagedData
      };

      return await pagedData.Skip((page - 1) * size)
          .Take(size)
          .ToListAsync(cancellationToken);
    }

    public Task<QuestionEntity> RandomAsync()
    {
      return Table
          .Where(t => t.QErrors == 0 && t.AErrors == 0)
          .OrderBy(o => Guid.NewGuid())
          .FirstAsync();
    }
  }
}
