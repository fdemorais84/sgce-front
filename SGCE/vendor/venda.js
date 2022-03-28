var total;

var venda = {
    CreateVendaCommand: undefined,

    buscarTurmas: function () {
        $.ajax({
            cache: false,
            method: "GET",
            url: rootPath + "Turma/Get",
            data: JSON.stringify(venda.GetVendaCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var select = $("#ddlTurma");
                $.each(data.data, function (i, d) {
                    $('<option>').val(d.Id).text(d.Nome).appendTo(select);
                });

                venda.buscarClientes($('#ddlTurma option:selected').val());
            },
            error: function (error) {
                swal({
                    title: "Desculpe, erro ao buscar dados da turma",
                    text: error.responseJSON.mensagem,
                    type: "error",
                    closeOnConfirm: true,
                }, function () {
                    close();
                });
            }
        });
    },

    buscarClientes: function (id) {
        $.ajax({
            cache: false,
            method: "GET",
            url: rootPath + "Cliente/GetClientesTurmaById",
            data: { id: id },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var select = $("#ddlCliente");
                $.each(data.data, function (i, d) {
                    $('<option>').val(d.Id).text(d.Nome).appendTo(select);
                    $("#cliente").html(d.Nome);
                });
                venda.buscarCategorias();
            },
            error: function (error) {
                swal({
                    title: "Desculpe, erro ao buscar dados do cliente",
                    text: error.responseJSON.mensagem,
                    type: "error",
                    closeOnConfirm: true,
                }, function () {
                    close();
                });
            }
        });
    },

    buscarCategorias: function () {
        $.ajax({
            cache: false,
            method: "GET",
            url: rootPath + "Categoria/Get",
            data: JSON.stringify(venda.GetVendaCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var select = $("#ddlCategoria");
                $.each(data.data, function (i, d) {
                    $('<option>').val(d.Id).text(d.Nome).appendTo(select);
                });

                venda.buscarProdutos($('#ddlCategoria option:selected').val());
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

    buscarProdutos: function (id) {
        $.ajax({
            cache: false,
            method: "GET",
            url: rootPath + "Produto/GetProdutosCategoriaById",
            data: { id: id },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var select = $("#ddlProduto");
                $.each(data.data, function (i, d) {
                    $('<option>').val(d.Id).text(d.Titulo).appendTo(select);
                });
                var select = $("#ddlValor");
                $.each(data.data, function (i, d) {
                    $('<option>').val(d.Valor).text(d.Valor).appendTo(select);
                });
            },
            error: function (error) {
                swal({
                    title: "Desculpe, erro ao buscar dados do produto",
                    text: error.responseJSON.mensagem,
                    type: "error",
                    closeOnConfirm: true,
                }, function () {
                    close();
                });
            }
        });
    },

    toDecimal: function (data) {
        return parseFloat(parseFloat(data.replace(".", "").replace(",", "")).toFixed(2));
    },

    formatDecimal: function (data) {
        if (data != null) {
            var myObj = {
                style: "currency",
                currency: "BRL"
            }
            return data.toLocaleString("pt-BR", myObj);
        }
        return data;
    },

    postDados: function () {
        venda.CreateVendaCommand = {
            ClienteId: $('#ddlCliente').val(),
            ProdutoId: $('#ddlProduto').val(),
            Quantidade: $('#inputQuantidade').val(),
            Valor: $("#inputValorTotal").val().replace(".", ",")
        }
        venda.salvarVenda();
    },

    salvarVenda: function (data) {
        $.ajax({
            cache: false,
            method: "POST",
            url: rootPath + "Venda/Post",
            data: JSON.stringify(venda.CreateVendaCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#myModal").modal('show');                
            },
            error: function (error) {
                toastr.error("Erro ao salvar a venda!", "Venda");
                location.reload();
            }
        });
    },

    calcularValorTotal: function () {
        var valor = $("#ddlValor").val();
        var quantidade = $("#inputQuantidade").val();
        var total = valor * quantidade;

        $("#valorTotal").val(total);
        $("#inputValorTotal").val(total);
        $("#total").html(total);

        return total;
    },

    carregarMascaras: function () {
        $('.money').mask("#.##0,00", { reverse: true });
    }

};


$(document).ready(function () {
    venda.buscarTurmas();

    $('#ddlTurma').on('change', function (e) {
        $('#ddlCliente').empty();
        $('#cliente').empty();
        venda.buscarClientes($('#ddlTurma option:selected').val());
    });

    $('#ddlCategoria').on('change', function (e) {
        $('#ddlProduto').empty();
        $('#ddlValor').empty();
        venda.buscarClientes($('#ddlCategoria option:selected').val());
    });

    $('#inputQuantidade').change(function () {
        if (this.value != "") {
            venda.calcularValorTotal();
        }
        else {
            $("#inputQuantidade").val('');
        }
    });

    $("#btnFinalizar").click(function () {
        venda.postDados();
    });

    $("#btnCancelar").click(function () {
        $('#ddlTurma').empty();
        $('#ddlCategoria').empty();
        $('#ddlCliente').empty();
        $('#ddlProduto').empty();
        $('#cliente').empty();
        $('#total').empty();
        $('#ddlValor').empty();
        $('#inputQuantidade').empty();
        venda.buscarTurmas();
    });
});