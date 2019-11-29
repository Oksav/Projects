using Lamazon.ViewModels.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Lamazon.ViewModels
{
    public class OrderViewModel
    {
        public int Id { get; set; }
        public StatusTypeViewModel Status { get; set; }
        public double Price => Products.Sum(prop => prop.Price);
        public UserViewModel User { get; set; }
        public List<ProductViewModel> Products { get; set; }

    }    
}
