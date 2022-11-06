using System.Collections.Generic;

namespace QuizAPI.Repositories.Interfaces
{
  public interface IRepository<T> where T : class
  {
    void Delete(object id);

    IEnumerable<T> GetAll();

    T GetById(object id);

    void Insert(T obj);

    void Save();

    void Update(T obj);
  }
}
