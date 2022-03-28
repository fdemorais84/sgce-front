var turma = {
    GetTurmaCommand: undefined,
    CreateTurmaCommand: undefined,

    buscarTurmas: function () {
        $('#tableTurmas').DataTable({
            autoWidth: false,
            ordering: false,
            bFilter: false,
            bInfo: false,
            pageLength: 10,
            ajax: {
                method: "GET",
                url: rootPath + "Turma/Get",
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
                    return '<center><a href="#"><span class="fa fa-search" data-toggle="tooltip" id="btnBuscarEditarTurma" title="Editar Turma"></spam></a></center>'
                }
            },
                {"targets": 4,
                    render: function (data, type, row) {
                    console.log(row.Id);
                    return '<center><a href="#"><span class="fa fa-trash" data-toggle="tooltip" id="btnBuscarLinhaTurma" title="Excluir Turma"></spam></a></center>'
                }
            }],        
        });
    },

    botaoExcluir: function () {
        $('#tableTurmas').on('click', '#btnBuscarLinhaTurma', function (e) {
            e.preventDefault();
            var linhaAtual = $(this).closest("tr");
            var data = $('#tableTurmas').DataTable().row(linhaAtual).data();
            turma.excluirTurma(data);
        });
    },

    botaoEditar: function () {
        $('#tableTurmas').on('click', '#btnBuscarEditarTurma', function (e) {
            e.preventDefault();
            var linhaAtual = $(this).closest("tr");
            var data = $('#tableTurmas').DataTable().row(linhaAtual).data();
            turma.editarTurma(data);
        });
    },

    editarTurma: function (data) {
        window.location.href = rootPath + 'Turma/UpdateTurma?id=' + data.Id;
    },

    excluirTurma: function (data) {
        $.ajax({
            cache: false,
            method: "POST",
            url: rootPath + "Turma/Delete",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#myModal").modal('show');                
            },
            error: function (error) {
                toastr.error("Erro ao logar no sistema!", "Turma");
                location.reload();
            }
        });
    },
};


$(document).ready(function () {
    turma.buscarTurmas();
    turma.botaoEditar();
    turma.botaoExcluir();
});