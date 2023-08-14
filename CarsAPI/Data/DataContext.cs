using Microsoft.EntityFrameworkCore;

namespace CarsAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){ }

        public DbSet<Car> Cars => Set<Car>();
        public DbSet<User> Users => Set<User>();
    }
}
