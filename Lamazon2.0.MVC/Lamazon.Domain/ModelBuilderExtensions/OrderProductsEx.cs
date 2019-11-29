using Lamazon.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Lamazon.Domain.ModelBuilderExtensions
{
   public static class OrderProductsEx
    {
        public static void SeedOrderProducts(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderProduct>().HasData(

               new OrderProduct { OrderId = 1, ProductId = 1 },
               new OrderProduct { OrderId = 1, ProductId = 3 },
               new OrderProduct { OrderId = 1, ProductId = 5 },

               new OrderProduct { OrderId = 2, ProductId = 1 },
               new OrderProduct { OrderId = 2, ProductId = 2 },

               new OrderProduct { OrderId = 3, ProductId = 4 },
               new OrderProduct { OrderId = 3, ProductId = 5 },
               new OrderProduct { OrderId = 3, ProductId = 6 }

               );
        }
    }
}
