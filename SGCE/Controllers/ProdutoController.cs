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
    public class ProdutoController : Controller
    {
        WebApiSGCE webApi = new WebApiSGCE();
        public ActionResult IndexProduto()
        {
            return View();
        }

        public ActionResult FormProduto()
        {
            return View();
        }

        public ActionResult UpdateProduto(string id)
        {
            ViewBag.Id = id;

            return View();
        }

        [HttpGet]
        public JsonResult Get()
        {
            try
            {
                var data = webApi.GetProduto();
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
                var data = webApi.GetProdutoById(id);
                return Json(new { data = data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }

        [HttpGet]
        public JsonResult GetProdutosCategoriaById(string id)
        {
            try
            {
                var data = webApi.GetProdutosCategoriaById(id);
                return Json(new { data = data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Post(CreateProdutoCommand command)
        {
            try
            {
                return Json(new { success = webApi.SaveProduto(command) });
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
                return Json(new { success = webApi.DeleteProduto(id) });
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Update(UpdateProdutoCommand command)
        {
            try
            {
                return Json(new { success = webApi.UpdateProduto(command) });
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }
    }
}