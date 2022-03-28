var turma = {
    GetTurmaCommand: undefined,
    CreateTurmaCommand: undefined,

    buscarTurmas: function () {
        $('#tableTurmas').DataTable({
            autoWidth: false,
            ordering: false,
            bFilter: false,
            bInfo: false,
            pageLength: 5,
            ajax: {
                method: "GET",
                url: rootPath + "Turma/Get",
                dataType: "json"
            },
            columns: [
                { data: 'Id', visible: false },
                { data: 'Nome' },
                { data: 'Descricao' },
                { data: 'Botao' },
                { data: 'Botao' },
            ],
            columnsDefs: [{
                "targets": 0,
                render: function (data, type, row) {
                    idTurma = row.Id
                    return '<center><a href="#" ><span class="fa fa-search fa-lg-m-r-xs" data-toggle="tooltip" data-placement="left" id="btnEditarTurma" onclick="turma.editarTurma(' + row.Id + ')" title="Editar Turma"></spam>'
                }
            }],        
        });
    },


    buscarDados: function () {
        $.ajax({
            cache: false,
            method: "POST",
            url: rootPath + "Turma/Get",
            data: JSON.stringify(turma.GetTurmaCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.success == true) {
                    turma.retornoIndex();
                }
            },
            error: function (error) {
                toastr.error("Erro ao logar no sistema!", "turma");
                location.reload();
            }
        });
    },

    getDados: function () {
        turma.GetTurmaCommand = {
            Email: $('#inputEmail').val(),
            Senha: $('#inputPassword').val()
        }
        turma.buscarDados();
    },

    postDados: function () {
        turma.CreateTurmaCommand = {
            Nome: $('#inputNome').val(),
            Descricao: $('#inputDescricao').val()
        }
        turma.salvarTurma();
    },

    salvarTurma: function () {
        $.ajax({
            method: "POST",
            url: rootPath + "Turma/Post",
            data: JSON.stringify(turma.CreateTurmaCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                    turma.retornoIndex();
            },
            error: function (error) {
                toastr.error("Erro ao salvar dados!", "turma");
                location.reload();
            }
        });
    },

    retornoIndex: function () {
        window.open(rootPath + 'Turma/IndexTurma');
    }
};


$(document).ready(function () {
    turma.buscarTurmas();

    $("#btnSalvar").click(function () {
        turma.postDados();
    });

    //$("#btnCadastrar").click(function () {
    //    turma.postDados();
    //});
});