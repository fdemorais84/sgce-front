var id = $('#id').val();

var turma = {
    GetTurmaCommand: undefined,
    CreateTurmaCommand: undefined,
    UpdateTurmaCommand: undefined,

    buscarDados: function () {
        $.get(rootPath + "Turma/GetById?id=" + $('#id').val(), function (resultado) {
            console.log(resultado);
            turma.carregarDadosTurma(resultado);
        })
    },

    carregarDadosTurma: function (data) {
        $("#inputNome").val(data.data.Nome);
        $("#inputDescricao").val(data.data.Descricao);
    },

    postDados: function () {
        if ($('#id').val()) {
            turma.UpdateTurmaCommand = {
                Id: $('#id').val(),
                Nome: $('#inputNome').val(),
                Descricao: $('#inputDescricao').val()
            }
            turma.atualizarTurma();
        }
        else {
            turma.CreateTurmaCommand = {
                Nome: $('#inputNome').val(),
                Descricao: $('#inputDescricao').val()
            }
            turma.salvarTurma();
        }
    },

    atualizarTurma: function () {
        $.ajax({
            method: "POST",
            url: rootPath + "Turma/Update",
            data: JSON.stringify(turma.UpdateTurmaCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#myModal").modal('show');                
            },
            error: function (error) {
                toastr.error("Erro ao atualizar dados!", "Turma");
                location.reload();
            }
        });
    },

    salvarTurma: function () {
        $.ajax({
            method: "POST",
            url: rootPath + "Turma/Post",
            data: JSON.stringify(turma.CreateTurmaCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#myModal").modal('show');                
            },
            error: function (error) {
                toastr.error("Erro ao salvar dados!", "Turma");
                location.reload();
            }
        });
    },

    retornoIndex: function () {
        window.location.href = rootPath + 'Turma/IndexTurma';
    },
};




$(document).ready(function () {
    if ($('#id').val()) {
        turma.buscarDados();
    }

    $("#btnSalvar").click(function () {
        turma.postDados();
    });
});