var id = $('#id').val();

var produto = {
    GetProdutoCommand: undefined,
    CreateProdutoCommand: undefined,
    UpdateProdutoCommand: undefined,

    buscarDados: function () {
        $.get(rootPath + "Produto/GetById?id=" + $('#id').val(), function (resultado) {
            console.log(resultado);
            produto.carregarDadosProduto(resultado);
        })
    },

    carregarDadosProduto: function (data) {
        $("#inputNome").val(data.data.Titulo);
        $("#inputValor").val(data.data.Valor);
        produto.buscarCategorias();
    },

    buscarCategorias: function () {
        $.ajax({
            cache: false,
            method: "GET",
            url: rootPath + "Categoria/Get",
            data: JSON.stringify(produto.GetProdutoCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                var select = $("#ddlCategoria");
                select.append('<option value="0">Selecione</option>')
                $.each(data.data, function (i, d) {
                    $('<option>').val(d.Id).text(d.Nome).appendTo(select);
                });
            },
            error: function (error) {
                swal({
                    title: "Desculpe, erro ao buscar dados da categoria",
                    text: error.responseJSON.mensagem,
                    type: "error",
                    closeOnConfirm: true,
                }, function () {
                    close();
                });
            }
        });
    },

    postDados: function () {
        if ($('#id').val()) {
            produto.UpdateProdutoCommand = {
                Id: $('#id').val(),
                Titulo: $('#inputNome').val(),
                Valor: $('#inputValor').val().replace(".", ","),
                CategoriaId: $('#ddlCategoria').val()
            }
            produto.atualizarProduto();
        }
        else {
            produto.CreateProdutoCommand = {
                Titulo: $('#inputNome').val(),
                Valor: $('#inputValor').val().replace(".", ","),
                CategoriaId: $('#ddlCategoria').val()
            }
            produto.salvarProduto();
        }
    },

    toDecimalValores: function (data) {
        return parseFloat(parseFloat(data.replace(/\./g, "").replace(",", "")).toFixed(2));
    },

    atualizarProduto: function () {
        $.ajax({
            method: "POST",
            url: rootPath + "Produto/Update",
            data: JSON.stringify(produto.UpdateProdutoCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#myModal").modal('show');                
            },
            error: function (error) {
                toastr.error("Erro ao atualizar dados!", "Produto");
                location.reload();
            }
        });
    },

    salvarProduto: function () {
        $.ajax({
            method: "POST",
            url: rootPath + "Produto/Post",
            data: JSON.stringify(produto.CreateProdutoCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#myModal").modal('show');                
            },
            error: function (error) {
                toastr.error("Erro ao salvar dados!", "Produto");
                location.reload();
            }
        });
    },

    retornoIndex: function () {
        window.location.href = rootPath + 'Produto/IndexProduto';
    }
};




$(document).ready(function () {
    if ($('#id').val()) {
        produto.buscarDados();
    }
    else {
        produto.buscarCategorias();
    }

    $("#btnSalvar").click(function () {
        produto.postDados();
    });
});