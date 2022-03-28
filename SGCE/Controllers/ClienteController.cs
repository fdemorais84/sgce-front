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
    public class ClienteController : Controller
    {
        WebApiSGCE webApi = new WebApiSGCE();
        public ActionResult IndexCliente()
        {
            return View();
        }

        public ActionResult FormCliente()
        {
            return View();
        }

        public ActionResult UpdateCliente(string id)
        {
            ViewBag.Id = id;

            return View();
        }

        public ActionResult SaldoCliente()
        {
            return View();
        }

        public ActionResult FormSaldoCliente(string id)
        {
            ViewBag.Id = id;

            return View();
        }

        [HttpGet]
        public JsonResult Get()
        {
            try
            {
                var data = webApi.GetCliente();
                return Json(new { data = data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }

        [HttpGet]
        public JsonResult GetbyId(string id)
        {
            try
            {
                var data = webApi.GetClienteById(id);
                return Json(new { data = data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }

        [HttpGet]
        public JsonResult GetClientesTurmaById(string id)
        {
            try
            {
                var data = webApi.GetClientesTurmaById(id);
                return Json(new { data = data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Post(CreateClienteCommand command)
        {
            try
            {
                return Json(new { success = webApi.SaveCliente(command) });
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Delete(string id)
        {
            try
            {
                return Json(new { success = webApi.DeleteCliente(id) });
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Update(UpdateClienteCommand command)
        {
            try
            {
                return Json(new { success = webApi.UpdateCliente(command) });
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult UpdateAddSaldo(UpdateClienteCommand command)
        {
            try
            {
                return Json(new { success = webApi.UpdateAddSaldoCliente(command) });
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult UpdateDecSaldo(UpdateClienteCommand command)
        {
            try
            {
                return Json(new { success = webApi.UpdateDecSaldoCliente(command) });
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }
    }
}