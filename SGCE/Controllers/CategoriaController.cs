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
    public class CategoriaController : Controller
    {
        WebApiSGCE webApi = new WebApiSGCE();
        public ActionResult IndexCategoria()
        {
            return View();
        }

        public ActionResult FormCategoria()
        {
            return View();
        }

        public ActionResult UpdateCategoria(string id)
        {
            ViewBag.Id = id;

            return View();
        }

        [HttpGet]
        public JsonResult Get()
        {
            try
            {
                var data = webApi.GetCategoria();
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
                var data = webApi.GetCategoriaById(id);
                return Json(new { data = data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Post(CreateCategoriaCommand command)
        {
            try
            {
                return Json(new { success = webApi.SaveCategoria(command) });
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
                return Json(new { success = webApi.DeleteCategoria(id) });
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Update(UpdateCategoriaCommand command)
        {
            try
            {
                return Json(new { success = webApi.UpdateCategoria(command) });
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }

    }
}