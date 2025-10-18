using Taller.Models.DataToObject;

namespace Taller.Services
{
    public interface IEmployeeService
    {
        Task<int> CreateAsync(EmployeeDto employee);
        Task<IList<EmployeeDto>> ReadAsync();
        Task<EmployeeDto?> ReadAsync(int id);
        Task UpdateAsync(EmployeeDto employee);
        Task DeleteAsync(int id);
    }
}
