var produto = {
    GetProdutoCommand: undefined,
    CreateProdutoCommand: undefined,

    buscarProdutos: function () {
        $('#tableProdutos').DataTable({
            autoWidth: false,
            ordering: false,
            bFilter: false,
            bInfo: false,
            pageLength: 5,
            ajax: {
                method: "GET",
                url: rootPath + "Produto/Get",
                dataType: "json"
            },
            columns: [
                { data: 'Id', visible: false },
                { data: 'Nome' },
                { data: 'Valor' },
                { data: 'Botao' },
                { data: 'Botao' },
            ],
            columnsDefs: [{
                "targets": 0,
                render: function (data, type, row) {
                    idcategoria = row.Id
                    return '<center><a href="#" ><span class="fa fa-search fa-lg-m-r-xs" data-toggle="tooltip" data-placement="left" id="btnEditarProduto" onclick="produto.editarProduto(' + row.Id + ')" title="Editar Produto"></spam>'
                }
            }],
        });
    },


    buscarDados: function () {
        $.ajax({
            cache: false,
            method: "POST",
            url: rootPath + "Produto/Get",
            data: JSON.stringify(produto.GetProdutoCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.success == true) {
                    produto.retornoIndex();
                }
            },
            error: function (error) {
                toastr.error("Erro ao logar no sistema!", "Produto");
                location.reload();
            }
        });
    },

    getDados: function () {
        produto.GetProdutoCommand = {
            Nome: $('#inputNome').val(),
            Valor: $('#inputValor').val()
        }
        produto.buscarDados();
    },

    postDados: function () {
        produto.CreateProdutoCommand = {
            Nome: $('#inputNome').val(),
            Valor: $('#inputValor').val()
        }
        produto.salvarProduto();
    },

    salvarProduto: function () {
        $.ajax({
            method: "POST",
            url: rootPath + "Produto/Post",
            data: JSON.stringify(produto.CreateProdutoCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                produto.retornoIndex();
            },
            error: function (error) {
                toastr.error("Erro ao salvar dados!", "Produto");
                location.reload();
            }
        });
    },

    retornoIndex: function () {
        window.open(rootPath + 'Produto/IndexProduto');
    }
};


$(document).ready(function () {
    //categoria.buscarcategorias();

    $("#btnSalvar").click(function () {
        produto.postDados();
    });

    //$("#btnCadastrar").click(function () {
    //    categoria.postDados();
    //});
});