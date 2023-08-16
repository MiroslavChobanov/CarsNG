using CarsAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CarsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly DataContext _context;
        public CarController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Car>>> GetCars()
        {
            var cars = await _context.Cars.ToListAsync();
            return Ok(cars);
        }


        [HttpPost]
        public async Task<ActionResult<List<Car>>> CreateCar(Car car)
        {
            //var userId = GetLoggedInUserId(); // change this
            //car.UserId = userId;
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return Ok(await _context.Cars.ToListAsync());
        }

        private int GetLoggedInUserId()
        {
            var userIdClaim = HttpContext.User.FindFirst("UserId"); // Use your custom claim type here

            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
            {
                return userId;
            }

            throw new ApplicationException("User ID not found or user not authenticated.");
        }


        [HttpPut]
        public async Task<ActionResult<List<Car>>> UpdateCar(Car car)
        {
            var dbCar = await _context.Cars.FindAsync(car.Id);

            if (dbCar == null)
            {
                return BadRequest("Car not found.");
            }

            dbCar.Make = car.Make;
            dbCar.Model = car.Model;
            dbCar.Price = car.Price;
            dbCar.Mileage = car.Mileage;
            dbCar.Category = car.Category;
            dbCar.NumberOfDoors = car.NumberOfDoors;
            dbCar.FuelType = car.FuelType;
            dbCar.YearOfCreation = car.YearOfCreation;
            dbCar.Color = car.Color;
            dbCar.Horsepower = car.Horsepower;
            dbCar.Place = car.Place;
            dbCar.Phone = car.Phone;
            dbCar.Description= car.Description;


            await _context.SaveChangesAsync();
            return Ok(await _context.Cars.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Car>>> DeleteCar(int id)
        {
            var dbCar = await _context.Cars.FindAsync(id);

            if (dbCar == null)
            {
                return BadRequest("Car not found.");
            }

            _context.Cars.Remove(dbCar);

            await _context.SaveChangesAsync();

            return Ok(await _context.Cars.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }
    }
}
