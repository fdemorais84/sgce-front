﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SGCE.Commands
{
    public class UpdateProdutoCommand
    {
        public string Id { get; set; }
        public string Titulo { get; set; }
        public decimal Valor { get; set; }
        public string CategoriaId { get; set; }
    }
}