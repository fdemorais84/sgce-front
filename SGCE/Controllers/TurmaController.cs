using Newtonsoft.Json;
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
    public class TurmaController : Controller
    {
        WebApiSGCE webApi = new WebApiSGCE();
        public ActionResult IndexTurma()
        {
            return View();
        }

        public ActionResult FormTurma()
        {
            return View();
        }

        public ActionResult UpdateTurma(string id)
        {
            ViewBag.Id = id;

            return View();
        }

        [HttpGet]
        public JsonResult Get()
        {
            try
            {
                var data = webApi.GetTurma();
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
                var data = webApi.GetTurmaById(id);
                return Json(new { data = data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }


        [HttpPost]
        public JsonResult Post(CreateTurmaCommand command)
        {
            try
            {
                return Json(new { success = webApi.SaveTurma(command) });
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Delete(DeleteTurmaCommand command)
        {
            try
            {
                return Json(new { success = webApi.DeleteTurma(command) });
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Update(UpdateTurmaCommand command)
        {
            try
            {
                return Json(new { success = webApi.UpdateTurma(command) });
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }
    }
}