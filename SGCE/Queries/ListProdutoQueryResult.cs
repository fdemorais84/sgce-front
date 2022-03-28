using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SGCE.Queries
{
    public class ListProdutoQueryResult
    {
        public System.Guid Id { get; set; }
        public string Titulo { get; set; }
        public decimal Valor { get; set; }
        public System.Guid CategoriaId { get; set; }
        public string Nome { get; set; }

    }
}