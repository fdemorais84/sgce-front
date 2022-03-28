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
        $("#inputNome").html(data.data.Nome);
        $("#inputValor").val(data.data.Saldo);
    },

    postDadosAdd: function () {
        cliente.UpdateClienteCommand = {
            Id: $('#id').val(),
            Nome: $('#inputNome').val(),
            Saldo: $('#inputSaldo').val().replace(".", ",")
        }
        cliente.atualizarSaldoAddCliente();
    },

    postDadosDec: function () {
        cliente.UpdateClienteCommand = {
            Id: $('#id').val(),
            Nome: $('#inputNome').val(),
            Saldo: $('#inputSaldo').val().replace(".", ",")
        }
        cliente.atualizarSaldoDecCliente();
    },

    toDecimalValores: function (data) {
        return parseFloat(parseFloat(data.replace(/\./g, "").replace(",", "")).toFixed(2));
    },    

    atualizarSaldoAddCliente: function () {
        $.ajax({
            method: "POST",
            url: rootPath + "Cliente/UpdateAddSaldo",
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

    atualizarSaldoDecCliente: function () {
        $.ajax({
            method: "POST",
            url: rootPath + "Cliente/UpdateDecSaldo",
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

    retornoIndex: function () {
        window.location.href = rootPath + 'Cliente/SaldoCliente';
    }
};




$(document).ready(function () {
    cliente.buscarDados();

    $("#btnAdd").click(function () {        
        cliente.postDadosAdd();
    });

    $("#btnDec").click(function () {
        cliente.postDadosDec();
    });

});