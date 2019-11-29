using Lamazon.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Lamazon.Services.Interfaces
{
   public interface IUserService
    {
        void Register(RegisterViewModel registerModel);
        void Login(LoginViewModel loginModel);
        void Logout();
        UserViewModel GetCurrentUser(string username);
        string GetUserRole(string username);
    }
}
