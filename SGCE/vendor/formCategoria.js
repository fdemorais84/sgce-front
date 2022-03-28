var id = $('#id').val();

var categoria = {
    GetCategoriaCommand: undefined,
    CreateCategoriaCommand: undefined,
    UpdateCategoriaCommand: undefined,

    buscarDados: function () {
        $.get(rootPath + "Categoria/GetById?id=" + $('#id').val(), function (resultado) {
            console.log(resultado);
            categoria.carregarDadosCategoria(resultado);
        })
    },

    carregarDadosCategoria: function (data) {
        $("#inputNome").val(data.data.Nome);
        $("#inputDescricao").val(data.data.Descricao);
    },

    postDados: function () {
        if ($('#id').val()) {
            categoria.UpdateCategoriaCommand = {
                Id: $('#id').val(),
                Nome: $('#inputNome').val(),
                Descricao: $('#inputDescricao').val()
            }
            categoria.atualizarCategoria();
        }
        else {
            categoria.CreateCategoriaCommand = {
                Nome: $('#inputNome').val(),
                Descricao: $('#inputDescricao').val()
            }
            categoria.salvarCategoria();
        }
    },

    atualizarCategoria: function () {
        $.ajax({
            method: "POST",
            url: rootPath + "Categoria/Update",
            data: JSON.stringify(categoria.UpdateCategoriaCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#myModal").modal('show');                
            },
            error: function (error) {
                toastr.error("Erro ao atualizar dados!", "Categoria");
                location.reload();
            }
        });
    },

    salvarCategoria: function () {
        $.ajax({
            method: "POST",
            url: rootPath + "Categoria/Post",
            data: JSON.stringify(categoria.CreateCategoriaCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#myModal").modal('show');                
            },
            error: function (error) {
                toastr.error("Erro ao salvar dados!", "Categoria");
                location.reload();
            }
        });
    },

    retornoIndex: function () {
        window.location.href = rootPath + 'Categoria/IndexCategoria';
    },
};




$(document).ready(function () {
    if ($('#id').val()) {
        categoria.buscarDados();
    }

    $("#btnSalvar").click(function () {
        categoria.postDados();
    });
});