using AutoMapper;
using Taller.Models;
using Taller.Models.DataToObject;
using Taller.Repositories;

namespace Taller.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;

        public EmployeeService(IEmployeeRepository employeeRepository, IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }

        public async Task<int> CreateAsync(EmployeeDto employee)
        {
            var newEmployee = _mapper.Map<Employee>(employee);
            var createdEmployee = await _employeeRepository.CreateAsync(newEmployee);
            return createdEmployee.Id;
        }

        public async Task DeleteAsync(int id)
        {
            await _employeeRepository.DeleteAsync(id);
        }

        public async Task<IList<EmployeeDto>> ReadAsync()
        {
            var employees = await _employeeRepository.ReadAsync();
            return _mapper.Map<IList<EmployeeDto>>(employees);
        }

        public async Task<EmployeeDto?> ReadAsync(int id)
        {
            var employee = await _employeeRepository.ReadAsync(id);
            return _mapper.Map<EmployeeDto?>(employee);
        }

        public async Task UpdateAsync(EmployeeDto employee)
        {
            var updatedEmployee = _mapper.Map<Employee>(employee);
            await _employeeRepository.UpdateAsync(updatedEmployee);
        }
    }
}
