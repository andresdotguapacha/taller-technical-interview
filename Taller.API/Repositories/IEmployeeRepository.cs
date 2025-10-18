using Taller.Models;

namespace Taller.Repositories
{
    public interface IEmployeeRepository
    {
        Task<Employee> CreateAsync(Employee employee);
        Task<IList<Employee>> ReadAsync();
        Task<Employee?> ReadAsync(int id);
        Task UpdateAsync(Employee employee);
        Task DeleteAsync(int id);
    }
}
