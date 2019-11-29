using Lamazon.ViewModels.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Lamazon.ViewModels
{
    public class InvoiceViewModel
    {
        public int Id { get; set; }
        public PaymentTypeViewModel PaymentMethod { get; set; }
        public string  Adress { get; set; }
        public double Price { get; set; }
        public int OrderId { get; set; }
    }
}
