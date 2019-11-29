using Lamazon.Domain.Enums;
using Lamazon.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Lamazon.Domain.ModelBuilderExtensions
{
   public static class OrdersEx
    {
        public static void SeedOrders(this ModelBuilder modelBuilder, UserIds users)
        {
            modelBuilder.Entity<Order>().HasData(
                new Order { Id = 1, DateCreated = DateTime.UtcNow, Status = StatusType.Init, UserId = users.dejanBlazheskiUserId },
                new Order { Id = 2, DateCreated = DateTime.UtcNow, Status = StatusType.Confirmed, UserId = users.dejanBlazheskiUserId },
                new Order { Id = 3, DateCreated = DateTime.UtcNow, Status = StatusType.Processing, UserId = users.dejanJovanovskiUserId }
                );
        }
    }
}
