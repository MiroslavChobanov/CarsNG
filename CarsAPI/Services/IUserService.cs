namespace CarsAPI.Services.UserService
{
    public interface IUserService
    {
        string GetMyName();
        Task<User> CreateAsync(User user);
        public User GetUserByUsername(string username);
    }
}