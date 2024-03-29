﻿using Lamazon.DataAccess.Interfaces;
using Lamazon.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Lamazon.DataAccess.Repositories
{
   public class OrderProductRepository : BaseRepository<LamazonDbContext>, IRepository<OrderProduct>
    {
        public OrderProductRepository(LamazonDbContext context) : base(context) { }

       
        public IEnumerable<OrderProduct> GetAll()
        {
            return _db.OrderProducts.ToList();
        }

        public OrderProduct GetById(int id)
        {
            return _db.OrderProducts.FirstOrDefault(op => int.Parse($"{op.OrderId} {op.ProductId }") == id);
        }

        public int Insert(OrderProduct entity)
        {
            _db.OrderProducts.Add(entity);
            return _db.SaveChanges();
        }

        public int Update(OrderProduct entity)
        {
            return -1;
        }

        public int Delete(int id)
        {
            OrderProduct orderProduct = _db.OrderProducts.FirstOrDefault(op => int.Parse($"{op.OrderId}{op.ProductId}") == id);
            if (orderProduct == null) return -1;
            _db.OrderProducts.Remove(orderProduct);
            return _db.SaveChanges();

        }

    }
}
