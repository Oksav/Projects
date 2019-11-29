using Lamazon.Domain.Enums;
using Lamazon.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Lamazon.Domain.ModelBuilderExtensions
{
    public static class UsersEx
    {
        
        public static void SeedUsers(this ModelBuilder modelBuilder, RolesIds roles, UserIds users)
        {
            var haser = new PasswordHasher<User>();


            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole { Id = roles.adminRoleId, Name = "admin", NormalizedName = "ADMIN"},
                new IdentityRole { Id = roles.supplierRoleId, Name = "supplier", NormalizedName = "SUPPLIER"},
                new IdentityRole { Id = roles.customerRoleId, Name = "customer", NormalizedName = "CUSTOMER"}
                );

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string> { RoleId = roles.adminRoleId, UserId = users.saUserId },
                new IdentityUserRole<string> { RoleId = roles.supplierRoleId, UserId = users.stojancheUserId },
                new IdentityUserRole<string> { RoleId = roles.customerRoleId, UserId = users.dejanBlazheskiUserId },
                new IdentityUserRole<string> { RoleId = roles.customerRoleId, UserId = users.dejanJovanovskiUserId }
                );



            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = users.saUserId,
                    FullName = "System Admin",
                    UserName = "sa",
                    NormalizedUserName ="SA",
                    Email = "sa@sa.com",
                    NormalizedEmail = "SA@SA.COM",
                    EmailConfirmed = true,
                    PasswordHash = haser.HashPassword(null, "admin123"),
                    SecurityStamp = string.Empty

                },
                new User
                {
                    Id = users.stojancheUserId,
                    FullName = "Stojanche Mitrevski",
                    UserName = "stojanche.m",
                    NormalizedUserName = "STOJANCHE.M",
                    Email = "stojanche.m@mail.com",
                    NormalizedEmail = "STOJANCHE.M@MAIL.COm",
                    EmailConfirmed = true,
                    PasswordHash = haser.HashPassword(null, "supplier123"),
                    SecurityStamp = string.Empty    
                },
                new User
                {
                    Id = users.dejanBlazheskiUserId,
                    FullName = "Dejan Blazheski",
                    UserName = "dejan.blazheski",
                    NormalizedUserName = "DEJAN.BLAZHESKI",
                    Email = "dejan.blazheski@mail.com",
                    NormalizedEmail = "DEJAN.BLAZHESKI@MAIL.COM",
                    EmailConfirmed = true,
                    PasswordHash = haser.HashPassword(null, "customer123"),
                    SecurityStamp = string.Empty
                },
                new User
                {
                    Id = users.dejanJovanovskiUserId,
                    FullName = "Dejan Jovanov",
                    UserName = "dejan.jovanov",
                    NormalizedUserName = "DEJAN.JOVANOV",
                    Email = "dejan.jovanov@mail.com",
                    NormalizedEmail = "DEJAN.JOVANOV@EMAIL.COM",
                    EmailConfirmed = true,
                    PasswordHash = haser.HashPassword(null, "customer123"),
                    SecurityStamp = string.Empty    
                }
                );


            

            

           

           




        }
    }
}
