using System;
using System.ComponentModel.DataAnnotations;

namespace CarsAPI
{
    public class Car
    {
        public int Id { get; set; }

        public string Make { get; set; } = string.Empty;

        public string Model { get; set; } = string.Empty;
        public string PlateNumber { get; set; } = string.Empty;

        public int Price { get; set; }
        public int Mileage { get; set; }
        public string Category { get; set; } = string.Empty;
        public int NumberOfDoors { get; set; }
        public string FuelType { get; set; } = string.Empty;
        public int YearOfCreation { get; set; }
        public string Color { get; set; } = string.Empty;
        public int Horsepower { get; set; }
        public string Place { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
