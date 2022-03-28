using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SGCE.Commands
{
    public class UpdateClienteCommand
    {
        public string Id { get; set; }
        public string Nome { get; set; }
        public string Observacao { get; set; }
        public decimal Saldo { get; set; }
        public string TurmaId { get; set; }
        public bool Pagamento { get; set; }

    }
}