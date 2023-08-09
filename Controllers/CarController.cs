﻿using CarsAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            return Ok(await _context.Cars.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<Car>>> CreateCar(Car car)
        {
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return Ok(await _context.Cars.ToListAsync());
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
            dbCar.PlateNumber = car.PlateNumber;

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

            return Ok(await _context.Cars.ToListAsync());jjjj
        }
    }
}