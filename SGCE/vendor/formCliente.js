var id = $('#id').val();

var cliente = {
    GetClienteCommand: undefined,
    CreateClienteCommand: undefined,
    UpdateClienteCommand: undefined,

    buscarDados: function () {
        $.get(rootPath + "Cliente/GetById?id=" + $('#id').val(), function (resultado) {
            console.log(resultado);
            cliente.carregarDadosCliente(resultado);
        })
    },

    carregarDadosCliente: function (data) {
        $("#inputNome").val(data.data.Nome);
        $("#inputObservacao").val(data.data.Observacao);
        cliente.buscarTurmas();
    },

    buscarTurmas: function () {
        $.ajax({
            cache: false,
            method: "GET",
            url: rootPath + "Turma/Get",
            data: JSON.stringify(cliente.GetClienteCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                var select = $("#ddlTurma");
                select.append('<option value="0">Selecione</option>')
                $.each(data.data, function (i, d) {
                    $('<option>').val(d.Id).text(d.Nome).appendTo(select);
                });
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

    postDados: function () {
        if ($('#id').val()) {
            cliente.UpdateClienteCommand = {
                Id: $('#id').val(),
                Nome: $('#inputNome').val(),
                Observacao: $('#inputObservacao').val(),
                TurmaId: $('#ddlTurma').val()
            }
            cliente.atualizarCliente();
        }
        else {
            cliente.CreateClienteCommand = {
                Nome: $('#inputNome').val(),
                Observacao: $('#inputObservacao').val(),
                TurmaId: $('#ddlTurma').val()
            }
            cliente.salvarCliente();
        }
    },

    toDecimalValores: function (data) {
        return parseFloat(parseFloat(data.replace(/\./g, "").replace(",", "")).toFixed(2));
    },

    atualizarCliente: function () {
        $.ajax({
            method: "POST",
            url: rootPath + "Cliente/Update",
            data: JSON.stringify(cliente.UpdateClienteCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#myModal").modal('show');                
            },
            error: function (error) {
                toastr.error("Erro ao atualizar dados!", "Cliente");
                location.reload();
            }
        });
    },

    salvarCliente: function () {
        $.ajax({
            method: "POST",
            url: rootPath + "Cliente/Post",
            data: JSON.stringify(cliente.CreateClienteCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#myModal").modal('show');                
            },
            error: function (error) {
                toastr.error("Erro ao salvar dados!", "Cliente");
                location.reload();
            }
        });
    },

    retornoIndex: function () {
        window.location.href = rootPath + 'Cliente/IndexCliente';
    }
};




$(document).ready(function () {
    if ($('#id').val()) {
        cliente.buscarDados();
    }
    else {
        cliente.buscarTurmas();
    }

    $("#btnSalvar").click(function () {
        cliente.postDados();
    });
});