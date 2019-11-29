using System;
using System.Collections.Generic;
using System.Text;

namespace Lamazon.Domain.ModelBuilderExtensions
{
    public class UserIds
    {
       private readonly string saUser = Guid.NewGuid().ToString();
       private readonly string stojancheUser = Guid.NewGuid().ToString();
       private readonly string dejanBlazheskiUser = Guid.NewGuid().ToString();
       private readonly string dejanJovanovskiUser = Guid.NewGuid().ToString();

        public string saUserId { get => saUser; }
        public string stojancheUserId { get => stojancheUser; }
        public string dejanBlazheskiUserId { get => dejanBlazheskiUser; }
        public string dejanJovanovskiUserId { get => dejanJovanovskiUser; }
    }
}
