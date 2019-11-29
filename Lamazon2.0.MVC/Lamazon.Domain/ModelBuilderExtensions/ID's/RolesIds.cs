using System;
using System.Collections.Generic;
using System.Text;

namespace Lamazon.Domain.ModelBuilderExtensions
{
    public class RolesIds
    {
        private readonly string admin = Guid.NewGuid().ToString();
        private readonly string supplier = Guid.NewGuid().ToString();
        private readonly string customer = Guid.NewGuid().ToString();


        public string adminRoleId { get => admin; }
        public string supplierRoleId { get => supplier; }
        public string customerRoleId { get => customer; }
    }
}
