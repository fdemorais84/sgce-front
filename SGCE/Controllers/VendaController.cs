using SGCE.Commands;
using SGCE.WebApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace SGCE.Controllers
{
    public class VendaController : Controller
    {
        WebApiSGCE webApi = new WebApiSGCE();

        public ActionResult IndexVenda()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Post(CreateVendaCommand command)
        {
            try
            {
                return Json(new { success = webApi.SaveVenda(command) });
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }
    }
}