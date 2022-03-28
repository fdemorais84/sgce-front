var cliente = {

    buscarClientes: function () {
        $('#tableClientes').DataTable({
            autoWidth: false,
            ordering: false,
            bFilter: false,
            bInfo: false,
            pageLength: 10,
            ajax: {
                method: "GET",
                url: rootPath + "Cliente/Get",
                dataType: "json"
            },
            columns: [
                { data: 'Id', visible: false },
                { data: 'Nome' },
                { data: 'TurmaId', visible: false },
                { data: 'Sigla' },
                { data: 'Observacao' },
                { data: 'BOTAO' },
                { data: 'BOTAO' },
            ],
            columnDefs: [
                {
                    "targets": 5,
                    render: function (data, type, row) {
                        return '<center><a href="#"><span class="fa fa-search" data-toggle="tooltip" id="btnBuscarEditarCliente" title="Editar Cliente"></spam></a></center>'
                    }
                },
                {
                    "targets": 6,
                    render: function (data, type, row) {
                        console.log(row.Id);
                        return '<center><a href="#"><span class="fa fa-trash" data-toggle="tooltip" id="btnBuscarLinhaCliente" title="Excluir Cliente"></spam></a></center>'
                    }
                }],
        });
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

    botaoExcluir: function () {
        $('#tableClientes').on('click', '#btnBuscarLinhaCliente', function (e) {
            e.preventDefault();
            var linhaAtual = $(this).closest("tr");
            var data = $('#tableClientes').DataTable().row(linhaAtual).data();
            cliente.excluirCliente(data);
        });
    },

    botaoEditar: function () {
        $('#tableClientes').on('click', '#btnBuscarEditarCliente', function (e) {
            e.preventDefault();
            var linhaAtual = $(this).closest("tr");
            var data = $('#tableClientes').DataTable().row(linhaAtual).data();
            cliente.editarCliente(data);
        });
    },

    editarCliente: function (data) {
        window.location.href = rootPath + 'Cliente/UpdateCliente?id=' + data.Id;
    },

    excluirCliente: function (data) {
        $.ajax({
            cache: false,
            method: "POST",
            url: rootPath + "Cliente/Delete",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#myModal").modal('show');                
            },
            error: function (error) {
                toastr.error("Erro ao logar no sistema!", "Cliente");
                location.reload();
            }
        });
    },
};


$(document).ready(function () {
    cliente.buscarClientes();
    cliente.botaoEditar();
    cliente.botaoExcluir();
});