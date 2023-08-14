using System.ComponentModel.DataAnnotations;

namespace CarsAPI
{
    public class User
    {
        public User()
        {
            this.Cars = new HashSet<Car>();
        }
        [Key]
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime TokenCreated { get; set; }
        public DateTime TokenExpires { get; set; }
        public ICollection<Car> Cars { get; set; }
    }
}
