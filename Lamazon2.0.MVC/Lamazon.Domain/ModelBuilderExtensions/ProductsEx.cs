using Lamazon.Domain.Enums;
using Lamazon.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Lamazon.Domain.ModelBuilderExtensions
{
    public static class ProductsEx
    {
        public static void SeedProducts(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(

               new Product { Id = 1, Name = "Depilator", Description = "A small tool for removing hair from unwanted places", Category = CategoryType.Electronics, Price = 30 },
               new Product { Id = 2, Name = "Headphones", Description = "For iPhone X", Category = CategoryType.Electronics, Price = 5 },
               new Product { Id = 3, Name = "Exploding Kittens", Description = "A board game", Category = CategoryType.Other, Price = 20 },
               new Product { Id = 4, Name = "Martini", Description = "A cool drink delivered at your door", Category = CategoryType.Drinks, Price = 10 },
               new Product { Id = 5, Name = "Hamburger", Description = "Fast food", Category = CategoryType.Food, Price = 5 },
               new Product { Id = 6, Name = "Enterprise Integration Patters", Description = "by Gregor Hophe and Bobby Wolf", Category = CategoryType.Books, Price = 50 }

               );
        }
    }
}
