using AutoMapper;
using Lamazon.DataAccess.Interfaces;
using Lamazon.Domain.Enums;
using Lamazon.Domain.Models;
using Lamazon.Services.Interfaces;
using Lamazon.ViewModels;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Lamazon.Services.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository<User> _userRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserService(IUserRepository<User> userRepository, IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
        }




        public void Register(RegisterViewModel registerModel)
        {
            
          if(_userRepository.GetByUsername(registerModel.Username) != null)
            {
                throw new Exception("The username already exists!");
            }
          if(registerModel.Password != registerModel.ConfirmPassword)
            {
                throw new Exception("Password does not match");
            }

            User user = _mapper.Map<User>(registerModel);
            user.Orders = new List<Order>() { new Order() { Status = StatusType.Init } };

            IdentityResult identityResult = _userManager.CreateAsync(user, registerModel.Password).Result;

            if (identityResult.Succeeded)
            {
                User currentUser = _userManager.FindByNameAsync(user.UserName).Result;
                _userManager.AddToRoleAsync(currentUser, "customer");
            }
            else
                throw new Exception(identityResult.Errors.ToString());

        }
        public void Login(LoginViewModel loginModel)
        {
            SignInResult signInResult = _signInManager.PasswordSignInAsync(loginModel.Username, loginModel.Password, false, false).Result;

            if(signInResult.IsNotAllowed)
            {
                throw new Exception("Username or password is wrong!");
            }
        }

        public void Logout()
        {
            _signInManager.SignOutAsync();
        }

        public UserViewModel GetCurrentUser(string username)
        {
            User user = _userRepository.GetByUsername(username);
            if(user == null)
            {
                throw new Exception("The user does not exist");
            }
            return _mapper.Map<UserViewModel>(user);
        }


        public string GetUserRole(string username)
        {
            User user = _userRepository.GetByUsername(username);
            string role = _userManager.GetRolesAsync(user).Result.FirstOrDefault();

            return role;
        }
    }
}
