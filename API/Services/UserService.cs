using DATA.Models;
using DATA.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Services
{
    public class UserService
    {
        private readonly UserRepository _userRepository;

        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        public void CreateNewUser(User u)
        {
            IsValidUser(u);
            _userRepository.CreateNewUser(u);
        }

        public User GetUser(int id)
        {
            return _userRepository.GetUser(id); // Corrected method name to match the signature in UserRepository
        }






        private void IsValidUser(User u)
        {
            if (u == null)
            {
                throw new ArgumentNullException(nameof(u), "user cannot be null.");
            }
            else if (string.IsNullOrEmpty(u.Name))
            {
                throw new ArgumentNullException(nameof(u.Name), "Name cannot be null or empty.");
            }
            else if (u.DateOfBirth == default)
            {
                throw new ArgumentException("DateOfBirth must be a valid date.", nameof(u.DateOfBirth));
            }
        }
    }
}
