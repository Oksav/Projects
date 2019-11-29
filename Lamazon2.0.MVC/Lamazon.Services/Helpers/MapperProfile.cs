using AutoMapper;
using Lamazon.Domain.Models;
using Lamazon.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Lamazon.Services.Helpers
{
   public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<User, UserViewModel>();

            CreateMap<RegisterViewModel, User>()
               .ForMember(u => u.FullName, src => src.ResolveUsing(rm => $"{rm.FirstName} {rm.LastName}"))
                .ForMember(u => u.EmailConfirmed, src => src.UseValue(true));

            CreateMap<Product, ProductViewModel>()
                .ReverseMap()
                .ForMember(p => p.OrderProducts, src => src.Ignore());

            CreateMap<Order, OrderViewModel>()
                .ForMember(ov => ov.Price, src => src.Ignore())
                .ForMember(ov => ov.Products, src => src.MapFrom(o => o.OrderProducts))
                .ReverseMap()
                .ForMember(o => o.DateCreated, src => src.ResolveUsing(ov => DateTime.UtcNow))
                .ForMember(o => o.UserId, src => src.MapFrom(o => o.User.Id))
                .ForMember(o => o.User, src => src.Ignore())
                .ForMember(O => O.OrderProducts, src => src.Ignore());

            CreateMap<OrderProduct, ProductViewModel>()
                .ForMember(pv => pv.Id, src => src.MapFrom(op => op.ProductId))
                .ForMember(pv => pv.Name, src => src.MapFrom(op => op.Product.Name))
                .ForMember(pv => pv.Description, src => src.MapFrom(op => op.Product.Description))
                .ForMember(pv => pv.Category, src => src.MapFrom(op => op.Product.Category))
                .ForMember(pv => pv.Price, src => src.MapFrom(op => op.Product.Price));

            CreateMap<Invoice, InvoiceViewModel>()
                .ForMember(iv => iv.Price, src => src.ResolveUsing(i => i.Order.OrderProducts.Sum(op => op.Product.Price)))
                .ReverseMap()
                .ForMember(i => i.Id, src => src.Ignore())
                .ForMember(i => i.DateOfPay, src => src.ResolveUsing(iv => DateTime.Now))
                .ForMember(i => i.Order, src => src.Ignore());
        }
    }
}
