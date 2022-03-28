var categoria = {
    GetCategoriaCommand: undefined,
    CreateCategoriaCommand: undefined,

    buscarCategorias: function () {
        $('#tableCategorias').DataTable({
            autoWidth: false,
            ordering: false,
            bFilter: false,
            bInfo: false,
            pageLength: 5,
            ajax: {
                method: "GET",
                url: rootPath + "Categoria/Get",
                dataType: "json"
            },
            columns: [
                { data: 'Id', visible: false },
                { data: 'Nome' },
                { data: 'Descricao' },
                { data: 'Botao' },
                { data: 'Botao' },
            ],
            columnsDefs: [{
                "targets": 0,
                render: function (data, type, row) {
                    idcategoria = row.Id
                    return '<center><a href="#" ><span class="fa fa-search fa-lg-m-r-xs" data-toggle="tooltip" data-placement="left" id="btnEditarCategoria" onclick="categoria.editarCategoria(' + row.Id + ')" title="Editar Categoria"></spam>'
                }
            }],
        });
    },


    buscarDados: function () {
        $.ajax({
            cache: false,
            method: "POST",
            url: rootPath + "Categoria/Get",
            data: JSON.stringify(categoria.GetCategoriaCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.success == true) {
                    categoria.retornoIndex();
                }
            },
            error: function (error) {
                toastr.error("Erro ao logar no sistema!", "Categoria");
                location.reload();
            }
        });
    },

    getDados: function () {
        categoria.GetCategoriaCommand = {
            Email: $('#inputNome').val(),
            Senha: $('#inputDescricao').val()
        }
        categoria.buscarDados();
    },

    postDados: function () {
        categoria.CreateCategoriaCommand = {
            Nome: $('#inputNome').val(),
            Descricao: $('#inputDescricao').val()
        }
        categoria.salvarCategoria();
    },

    salvarCategoria: function () {
        $.ajax({
            method: "POST",
            url: rootPath + "Categoria/Post",
            data: JSON.stringify(categoria.CreateCategoriaCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                categoria.retornoIndex();
            },
            error: function (error) {
                toastr.error("Erro ao salvar dados!", "Categoria");
                location.reload();
            }
        });
    },

    retornoIndex: function () {
        window.open(rootPath + 'Categoria/IndexCategoria');
    }
};


$(document).ready(function () {
    //categoria.buscarcategorias();

    $("#btnSalvar").click(function () {
        categoria.postDados();
    });

    //$("#btnCadastrar").click(function () {
    //    categoria.postDados();
    //});
});