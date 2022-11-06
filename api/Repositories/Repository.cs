using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Data;
using QuizAPI.Repositories.Interfaces;

namespace QuizAPI.Repositories
{
  public class Repository<T> : IRepository<T> where T : class
  {
    internal readonly DbSet<T> Table;
    private readonly QuizContext _context;

    public Repository(QuizContext context)
    {
      _context = context;
      Table = context.Set<T>();
    }

    public void Delete(object id)
    {
      var existing = Table.Find(id);
      Table.Remove(existing);
    }

    public IEnumerable<T> GetAll()
    {
      return Table.ToList();
    }

    public T GetById(object id)
    {
      return Table.Find(id);
    }

    public void Insert(T obj)
    {
      Table.Add(obj);
    }

    public void Save()
    {
      _context.SaveChanges();
    }

    public void Update(T obj)
    {
      Table.Attach(obj);
      _context.Entry(obj).State = EntityState.Modified;
    }
  }
}
