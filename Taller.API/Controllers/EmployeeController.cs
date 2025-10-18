using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Taller.Models.DataToObject;
using Taller.Services;

namespace Taller.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("{id:int}", Name = "GetEmployeeByIdRoute")]
        public async Task<IActionResult> ReadEmployeeAsync(int id)
        {
            var result = await _employeeService.ReadAsync(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> ReadEmployees()
        {
            var result = await _employeeService.ReadAsync();

            if (!result.Any())
            {
                return NoContent();
            }

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeeDto employee)
        {
            if (employee == null)
                return BadRequest("Employee data is required.");

            var newId = await _employeeService.CreateAsync(employee);
            return CreatedAtRoute(
                     "GetEmployeeByIdRoute",
                     new { id = newId },
                     employee
                 );
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] EmployeeDto employee)
        {
            if (employee == null || employee.Id != id)
                return BadRequest("Employee ID mismatch.");

            await _employeeService.UpdateAsync(employee);
            return Ok(employee);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            await _employeeService.DeleteAsync(id);
            return Accepted();
        }
    }
}
