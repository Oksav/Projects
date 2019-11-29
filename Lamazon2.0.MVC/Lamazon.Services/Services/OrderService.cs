using AutoMapper;
using Lamazon.DataAccess.Interfaces;
using Lamazon.Domain.Enums;
using Lamazon.Domain.Models;
using Lamazon.Services.Interfaces;
using Lamazon.ViewModels;
using Lamazon.ViewModels.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Lamazon.Services.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<Order> _orderRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository<User> _userRepository;
        private readonly IRepository<OrderProduct> _orderProductRepository; 

        public OrderService(IRepository<Order> orderRepository, IMapper mapper, IUserRepository<User> userRepository, IRepository<OrderProduct> orderProductRepository)
        {
            _orderRepository = orderRepository;
            _userRepository = userRepository;
            _orderProductRepository = orderProductRepository;
            _mapper = mapper;
        }



        public IEnumerable<OrderViewModel> GetAllOrders()
        {
            return _mapper.Map<IEnumerable<OrderViewModel>>(_orderRepository.GetAll());
        }

        public OrderViewModel GetCurrentOrder(string userId)
        {
            Order order = _orderRepository.GetAll().LastOrDefault(x => x.UserId == userId);
            if(order == null || order.Status == StatusType.Init)
            {
                CreateOrder(new OrderViewModel { User = new UserViewModel { Id = userId } });
                return GetCurrentOrder(userId);
            }

            return _mapper.Map<OrderViewModel>(order);
        }

        public OrderViewModel GetOrderById(int id)
        {
            Order order = _orderRepository.GetById(id);

            if(order == null)
            {
                throw new Exception("Order does not exist");
            }

            return _mapper.Map<OrderViewModel>(order);
        }

        public IEnumerable<OrderViewModel> GetUserOrders(string userId)
        {
            return _mapper.Map<IEnumerable<OrderViewModel>>(_orderRepository.GetAll().Where(x => x.UserId == userId));
        }
        
        public void AddProduct(int orderId, int productId)
        {
            _orderProductRepository.Insert(new OrderProduct
            {
                OrderId = orderId,
                ProductId = productId
            });
              
        }

        public void ChangeStatus(int orderId, StatusTypeViewModel status)
        {
            _orderRepository.Update(new Order
            {
                Id = orderId,
                Status = (StatusType)status
            });
        }

        public void CreateOrder(OrderViewModel order)
        {
            _orderRepository.Insert(_mapper.Map<Order>(order));
        }

        public void RemoveProduct(int orderId, int productId)
        {
            _orderProductRepository.Delete(int.Parse($"{orderId}{productId}"));
        }
    }
}
