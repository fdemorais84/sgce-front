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
    public class LoginController : Controller
    {
        WebApiSGCE webApi = new WebApiSGCE();
        public ViewResult IndexLogin()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Get(GetLoginCommand command)
        {
            try
            {
                return Json(new { success = webApi.Login(command) });            
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });                
            }            
        }

        [HttpPost]
        public JsonResult Post(CreateLoginCommand command)
        {
            try
            {
                return Json(new { success = webApi.SaveLogin(command) });
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { mensagem = ex.Message });
            }
        }
    }
}