using Newtonsoft.Json;
using RestSharp;
using SGCE.Commands;
using SGCE.Queries;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Web;

namespace SGCE.WebApi
{
    public class WebApiSGCE
    {
        public bool Login(GetLoginCommand command)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/login", Method.POST);


            var Model = JsonConvert.SerializeObject(command);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var acesso = false;
            if (content.Contains("true")) acesso = true;

            return acesso;

        }

        public object SaveLogin(CreateLoginCommand command)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/login-cadastro", Method.POST);


            var Model = JsonConvert.SerializeObject(command);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                success = dados["success"].ToString(),
                mensagem = dados["message"].ToString()
            };

            return retorno;
        }

        public List<ListTurmaQueryResult> GetTurma()
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/turmas", Method.GET);

            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<List<ListTurmaQueryResult>>(content);            

            return dados;

        }

        public object GetTurmaById(string id)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/turmas-get", Method.POST);

            var Model = JsonConvert.SerializeObject(id);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                Nome = dados["nome"].ToString(),
                Descricao = dados["descricao"].ToString()
            };

            return retorno;

        }


        public object SaveTurma(CreateTurmaCommand command)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/turmas-save", Method.POST);


            var Model = JsonConvert.SerializeObject(command);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                success = dados["success"].ToString(),
                mensagem = dados["message"].ToString()
            };

            return retorno;
        }

        public object UpdateTurma(UpdateTurmaCommand command)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/turmas-update", Method.POST);


            var Model = JsonConvert.SerializeObject(command);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                success = dados["success"].ToString(),
                mensagem = dados["message"].ToString()
            };

            return retorno;
        }


        public bool DeleteTurma(DeleteTurmaCommand command)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/turmas-delete", Method.POST);


            var Model = JsonConvert.SerializeObject(command.Id);
            RemoveBom(Model);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var success = false;
            if (content.Contains("true")) success = true;

            return success;

        }

        public List<ListCategoriaQueryResult> GetCategoria()
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/categorias", Method.GET);

            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<List<ListCategoriaQueryResult>>(content);

            return dados;

        }

        public object GetCategoriaById(string id)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/categorias-get", Method.POST);

            var Model = JsonConvert.SerializeObject(id);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                Nome = dados["nome"].ToString(),
                Descricao = dados["descricao"].ToString()
            };

            return retorno;

        }

        public object SaveCategoria(CreateCategoriaCommand command)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/categorias-save", Method.POST);


            var Model = JsonConvert.SerializeObject(command);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                success = dados["success"].ToString(),
                mensagem = dados["message"].ToString()
            };

            return retorno;
        }

        public object UpdateCategoria(UpdateCategoriaCommand command)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/categorias-update", Method.POST);


            var Model = JsonConvert.SerializeObject(command);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                success = dados["success"].ToString(),
                mensagem = dados["message"].ToString()
            };

            return retorno;
        }


        public bool DeleteCategoria(string id)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/categorias-delete", Method.POST);


            var Model = JsonConvert.SerializeObject(id);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var success = false;
            if (content.Contains("true")) success = true;

            return success;

        }

        public List<ListProdutoQueryResult> GetProduto()
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/produtos", Method.GET);

            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<List<ListProdutoQueryResult>>(content);

            return dados;
        }

        public object GetProdutoById(string id)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/produtos-get", Method.POST);

            var Model = JsonConvert.SerializeObject(id);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                Titulo = dados["titulo"].ToString(),
                Valor = dados["valor"].ToString(),
                CategoriaId = dados["categoriaId"].ToString(),
                Nome = dados["nome"].ToString()
            };

            return retorno;

        }

        public List<ListProdutosCategoriaQueryResult> GetProdutosCategoriaById(string id)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/produtos-venda", Method.POST);

            var Model = JsonConvert.SerializeObject(id);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<List<ListProdutosCategoriaQueryResult>>(content);

            return dados;

        }

        public object SaveProduto(CreateProdutoCommand command)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/produtos-save", Method.POST);


            var Model = JsonConvert.SerializeObject(command);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                success = dados["success"].ToString(),
                mensagem = dados["message"].ToString()
            };

            return retorno;
        }

        public object UpdateProduto(UpdateProdutoCommand command)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/produtos-update", Method.POST);


            var Model = JsonConvert.SerializeObject(command);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                success = dados["success"].ToString(),
                mensagem = dados["message"].ToString()
            };

            return retorno;
        }

        public bool DeleteProduto(string id)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/produtos-delete", Method.POST);


            var Model = JsonConvert.SerializeObject(id);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var success = false;
            if (content.Contains("true")) success = true;

            return success;
        }

        public List<ListClienteQueryResult> GetCliente()
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/clientes", Method.GET);

            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<List<ListClienteQueryResult>>(content);

            return dados;
        }

        public object GetClienteById(string id)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/clientes-get", Method.POST);

            var Model = JsonConvert.SerializeObject(id);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                Nome = dados["nome"].ToString(),
                Observacao = dados["observacao"].ToString(),
                Saldo = dados["saldo"].ToString(),
                TurmaId = dados["turmaId"].ToString(),
                Sigla = dados["sigla"].ToString()
            };

            return retorno;

        }

        public List<ListClientesTurmaQueryResult> GetClientesTurmaById(string id)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/clientes-venda", Method.POST);

            var Model = JsonConvert.SerializeObject(id);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<List<ListClientesTurmaQueryResult>>(content);            

            return dados;

        }

        public object SaveCliente(CreateClienteCommand command)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/clientes-save", Method.POST);


            var Model = JsonConvert.SerializeObject(command);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                success = dados["success"].ToString(),
                mensagem = dados["message"].ToString()
            };

            return retorno;
        }

        public object UpdateCliente(UpdateClienteCommand command)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/clientes-update", Method.POST);


            var Model = JsonConvert.SerializeObject(command);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                success = dados["success"].ToString(),
                mensagem = dados["message"].ToString()
            };

            return retorno;
        }

        public bool DeleteCliente(string id)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/clientes-delete", Method.POST);


            var Model = JsonConvert.SerializeObject(id);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var success = false;
            if (content.Contains("true")) success = true;

            return success;
        }

        public object UpdateAddSaldoCliente(UpdateClienteCommand command)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/clientes-aumentar-saldo", Method.POST);


            var Model = JsonConvert.SerializeObject(command);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                success = dados["success"].ToString(),
                mensagem = dados["message"].ToString()
            };

            return retorno;
        }

        public object UpdateDecSaldoCliente(UpdateClienteCommand command)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/clientes-diminuir-saldo", Method.POST);


            var Model = JsonConvert.SerializeObject(command);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                success = dados["success"].ToString(),
                mensagem = dados["message"].ToString()
            };

            return retorno;
        }

        public object SaveVenda(CreateVendaCommand command)
        {
            RestClient client = new RestClient(ConfigurationManager.AppSettings["UrlWebApiSGCE"].ToString());
            RestRequest request = new RestRequest("v1/venda-save", Method.POST);


            var Model = JsonConvert.SerializeObject(command);
            request.AddParameter("application/json", Model, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            var dados = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            if (!response.IsSuccessful)
            {
                throw new Exception(dados["mensagem"].ToString());
            }

            object retorno = new
            {
                success = dados["success"].ToString(),
                mensagem = dados["message"].ToString()
            };

            return retorno;
        }

        public static string RemoveBom(string p)
        {
            string BOMMarkUtf8 = Encoding.UTF8.GetString(Encoding.UTF8.GetPreamble());
            if (p.StartsWith(BOMMarkUtf8))
                p = p.Remove(0, BOMMarkUtf8.Length);
            return p.Replace("\0", "");
        }



    }
}