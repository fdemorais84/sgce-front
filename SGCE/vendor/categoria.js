var categoria = {

    buscarCategorias: function () {
        $('#tableCategorias').DataTable({
            autoWidth: false,
            ordering: false,
            bFilter: false,
            bInfo: false,
            pageLength: 10,
            ajax: {
                method: "GET",
                url: rootPath + "Categoria/Get",
                dataType: "json"
            },
            columns: [
                { data: 'Id', visible: false },
                { data: 'Nome' },
                { data: 'Descricao' },
                { data: 'BOTAO' },
                { data: 'BOTAO' },
            ],
            columnDefs: [
                {
                    "targets": 3,
                    render: function (data, type, row) {
                        return '<center><a href="#"><span class="fa fa-search" data-toggle="tooltip" id="btnBuscarEditarCategoria" title="Editar Categoria"></spam></a></center>'
                    }
                },
                {
                    "targets": 4,
                    render: function (data, type, row) {
                        console.log(row.Id);
                        return '<center><a href="#"><span class="fa fa-trash" data-toggle="tooltip" id="btnBuscarLinhaCategoria" title="Excluir Categoria"></spam></a></center>'
                    }
                }],
        });
    },

    botaoExcluir: function () {
        $('#tableCategorias').on('click', '#btnBuscarLinhaCategoria', function (e) {
            e.preventDefault();
            var linhaAtual = $(this).closest("tr");
            var data = $('#tableCategorias').DataTable().row(linhaAtual).data();
            categoria.excluirCategoria(data);
        });
    },

    botaoEditar: function () {
        $('#tableCategorias').on('click', '#btnBuscarEditarCategoria', function (e) {
            e.preventDefault();
            var linhaAtual = $(this).closest("tr");
            var data = $('#tableCategorias').DataTable().row(linhaAtual).data();
            categoria.editarCategoria(data);
        });
    },

    editarCategoria: function (data) {
        window.location.href = rootPath + 'Categoria/UpdateCategoria?id=' + data.Id;
    },

    excluirCategoria: function (data) {
        $.ajax({
            cache: false,
            method: "POST",
            url: rootPath + "Categoria/Delete",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#myModal").modal('show');                
            },
            error: function (error) {
                toastr.error("Erro ao logar no sistema!", "Categoria");
                location.reload();
            }
        });
    },
};


$(document).ready(function () {
    categoria.buscarCategorias();
    categoria.botaoEditar();
    categoria.botaoExcluir();
});