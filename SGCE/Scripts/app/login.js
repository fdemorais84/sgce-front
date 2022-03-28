var login = {
    GetLoginCommand: undefined,
    CreateLoginCommand: undefined,

    buscarDados: function () {
        $.ajax({
            cache: false,
            method: "POST",
            url: rootPath + "Login/Get",
            data: JSON.stringify(login.GetLoginCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.success == true) {
                    login.retornoIndex();
                }
            },
            error: function (error) {
                toastr.error("Erro ao logar no sistema!", "Login");
                location.reload();
            }
        });
    },

    getDados: function () {
        login.GetLoginCommand = {
            Email: $('#inputEmail').val(),
            Senha: $('#inputPassword').val()
        }
        login.buscarDados();
    },

    postDados: function () {
        login.CreateLoginCommand = {
            Email: $('#inputEmail').val(),
            Senha: $('#inputPassword').val()
        }
        login.salvarUser();
    },

    salvarUser: function () {
        $.ajax({
            method: "POST",
            url: rootPath + "Login/Post",
            data: JSON.stringify(login.CreateLoginCommand),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                login.retornoIndex();
            },
            error: function (error) {
                toastr.error("Erro ao salvar dados!", "Login");
                location.reload();
            }
        });
    },

    retornoIndex: function () {
        window.location.href = rootPath + 'Venda/IndexVenda';
    }
};


$(document).ready(function () {
    //$("#btnLogar").click(function () {
    //    login.getDados();
    //});

    $("#btnLogar").click(function () {
        login.postDados();
    });
});