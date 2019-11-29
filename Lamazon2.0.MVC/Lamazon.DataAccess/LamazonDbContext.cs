using Lamazon.Domain.ModelBuilderExtensions;
using Lamazon.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Lamazon.DataAccess
{
    public class LamazonDbContext : IdentityDbContext<User>
    {
        public LamazonDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Order> Orders { get; set; }
        public DbSet <Product> Products { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            UserIds users = new UserIds();
            RolesIds roles = new RolesIds();

            modelBuilder.Entity<OrderProduct>()
                .HasKey(op => new { op.OrderId, op.ProductId});

            modelBuilder.Entity<User>()
                .HasMany(u => u.Orders)
                .WithOne(u => u.User)
                .HasForeignKey(u => u.UserId);

            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderProducts)
                .WithOne(o => o.Order)
                .HasForeignKey(o => o.OrderId);

            modelBuilder.Entity<Product>()
                .HasMany(p => p.OrderProducts)
                .WithOne(p => p.Product)
                .HasForeignKey(p => p.ProductId);

            modelBuilder.Entity<Invoice>()
                .HasOne(i => i.Order)
                .WithMany();

            modelBuilder.SeedUsers(roles, users);
            modelBuilder.SeedProducts();
            modelBuilder.SeedOrders(users);
            modelBuilder.SeedOrderProducts();

        }


    }
}
