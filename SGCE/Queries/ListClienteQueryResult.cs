using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SGCE.Queries
{
    public class ListClienteQueryResult
    {
        public System.Guid Id { get; set; }
        public string Nome { get; set; }
        public string Observacao { get; set; }
        public decimal Saldo { get; set; }
        public System.Guid TurmaId { get; set; }
        public string Sigla { get; set; }

    }
}