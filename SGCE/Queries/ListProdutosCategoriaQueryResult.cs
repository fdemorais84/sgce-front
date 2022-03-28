using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SGCE.Queries
{
    public class ListProdutosCategoriaQueryResult
    {
        public System.Guid Id { get; set; }
        public string Titulo { get; set; }
        public decimal Valor { get; set; }
    }
}