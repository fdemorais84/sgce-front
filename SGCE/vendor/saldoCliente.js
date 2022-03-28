var cliente = {

    buscarClientes: function () {
        $('#tableSaldos').DataTable({
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
                { data: 'Saldo', 'render': function (data) { return cliente.formatDecimal(data) } },
                { data: 'BOTAO' },
            ],
            columnDefs: [
                {
                    "targets": 3,
                    render: function (data, type, row) {
                        return '<center><a href="#"><span class="fa fa-search" data-toggle="tooltip" id="btnBuscarSaldoCliente" title="Editar Saldo"></spam></a></center>'
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

    botaoEditar: function () {
        $('#tableSaldos').on('click', '#btnBuscarSaldoCliente', function (e) {
            e.preventDefault();
            var linhaAtual = $(this).closest("tr");
            var data = $('#tableSaldos').DataTable().row(linhaAtual).data();
            cliente.editarCliente(data);
        });
    },

    editarCliente: function (data) {
        window.location.href = rootPath + 'Cliente/FormSaldoCliente?id=' + data.Id;
    },    
};


$(document).ready(function () {
    cliente.buscarClientes();
    cliente.botaoEditar();
});