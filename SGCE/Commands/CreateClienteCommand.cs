using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SGCE.Commands
{
    public class CreateClienteCommand
    {
        public string Nome { get; set; }
        public string Observacao { get; set; }
        public string TurmaId { get; set; }
    }
}