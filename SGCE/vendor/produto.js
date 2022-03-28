var produto = {

    buscarProdutos: function () {
        $('#tableProdutos').DataTable({
            autoWidth: false,
            ordering: false,
            bFilter: false,
            bInfo: false,
            pageLength: 10,
            ajax: {
                method: "GET",
                url: rootPath + "Produto/Get",
                dataType: "json"
            },
            columns: [
                { data: 'Id', visible: false },
                { data: 'Titulo' },
                { data: 'Valor', 'render': function (data) { return produto.formatDecimal(data) } },
                { data: 'CategoriaId', visible: false },
                { data: 'Nome' },
                { data: 'BOTAO' },
                { data: 'BOTAO' },
            ],
            columnDefs: [
                {
                    "targets": 5,
                    render: function (data, type, row) {
                        return '<center><a href="#"><span class="fa fa-search" data-toggle="tooltip" id="btnBuscarEditarProduto" title="Editar Produto"></spam></a></center>'
                    }
                },
                {
                    "targets": 6,
                    render: function (data, type, row) {
                        console.log(row.Id);
                        return '<center><a href="#"><span class="fa fa-trash" data-toggle="tooltip" id="btnBuscarLinhaProduto" title="Excluir Produto"></spam></a></center>'
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
        $('#tableProdutos').on('click', '#btnBuscarLinhaProduto', function (e) {
            e.preventDefault();
            var linhaAtual = $(this).closest("tr");
            var data = $('#tableProdutos').DataTable().row(linhaAtual).data();
            produto.excluirProduto(data);
        });
    },

    botaoEditar: function () {
        $('#tableProdutos').on('click', '#btnBuscarEditarProduto', function (e) {
            e.preventDefault();
            var linhaAtual = $(this).closest("tr");
            var data = $('#tableProdutos').DataTable().row(linhaAtual).data();
            produto.editarProduto(data);
        });
    },

    editarProduto: function (data) {
        window.location.href = rootPath + 'Produto/UpdateProduto?id=' + data.Id;
    },

    excluirProduto: function (data) {
        $.ajax({
            cache: false,
            method: "POST",
            url: rootPath + "Produto/Delete",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#myModal").modal('show');                
            },
            error: function (error) {
                toastr.error("Erro ao logar no sistema!", "Produto");
                location.reload();
            }
        });
    },
};


$(document).ready(function () {
    produto.buscarProdutos();
    produto.botaoEditar();
    produto.botaoExcluir();
});