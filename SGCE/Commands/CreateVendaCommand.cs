using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SGCE.Commands
{
    public class CreateVendaCommand
    {
        public string ClienteId { get; set; }
        public string ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public decimal Valor { get; set; }

    }
}