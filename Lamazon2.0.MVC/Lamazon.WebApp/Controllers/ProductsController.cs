using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lamazon.Services.Interfaces;
using Lamazon.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lamazon.WebApp.Controllers
{
    [Authorize]
    public class ProductsController : Controller
    {
        private readonly IProductService _productService;
        private readonly IOrderService _orderService;
        private readonly IUserService _userService;

        public ProductsController(IProductService productService, IOrderService orderService, IUserService userService)
        {
            _productService = productService;
            _orderService = orderService;
            _userService = userService;
        }

        [Authorize(Roles = "customer, admin")]
        public IActionResult ListProducts()
        {
            return View("Index", _productService.GetAllProducts());
        }

        [Authorize(Roles ="customer")]
        public IActionResult AddToCart(int productId)
        {
            UserViewModel user = _userService.GetCurrentUser(User.Identity.Name);
            OrderViewModel order = _orderService.GetCurrentOrder(user.Id);

            try
            {
                _orderService.AddProduct(order.Id, productId);
            }
            catch
            {

            }
            return RedirectToAction("ListProducts");
        }





    }
}