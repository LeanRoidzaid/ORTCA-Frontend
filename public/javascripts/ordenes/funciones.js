function getBooleanCkecked(staus){
    if(staus=='on'){
        return true;
    }
    return false;
}
    
function actualizar(){
var id = $('#id').val();    
var nombre = $('#nombre').val();
var apellido = $('#apellido').val();
var dni = $('#dni').val();
var mail = $('#mail').val();
var usuario = $('#usuario').val();


var administrativo = $('#administrativo').prop('checked') ;
var medico = $('#medico').prop('checked') ;
var administrador = $('#administrador').prop('checked') ;
var auditor = $('#auditor').prop('checked') ;



    $.ajax({

            url : 'http://localhost:3000/usuarios/actualizar',
            type : 'POST',
            data : {
                'id' : id,
                'nombre' : nombre,
                'apellido' : apellido,
                'usuario' : usuario,
                'dni' : dni,
                'mail' : mail,
                'administrativo' : administrativo,
                'medico': medico,
                'administrador': administrador,
                'auditor' : auditor
            },
            dataType:'json',
            success : function(data){
                $.ajax({

                        url : 'http://localhost:3000/usuarios/all',
                        type : 'GET',
                        data : {
                            'numberOfWords' : 10
                        },
                        dataType:'json',
                        success : bindData,
                        error : function(request,error)
                        {
                            alert("Error: "+JSON.stringify(request));
                        }
                });
            },
            error : function(request,error)
            {
                alert("Request: "+JSON.stringify(request.responseText));
            }
            });

            $('#RolesModal').modal('hide')

return;


}




function insertarUsuario(datos){
    
    $.ajax({

        url : 'http://localhost:3000/usuarios/insertar',
        type : 'POST',
        data : {
            'nombre' : datos.item.nombre,
            'apellido' : datos.item.apellido,
            'usuario' : datos.item.usuario,
            'dni' : datos.item.dni,
            'mail' : datos.item.mail,
        },
        dataType:'json',
        success : function(data){
            $.ajax({

                    url : 'http://localhost:3000/usuarios/all',
                    type : 'GET',
                    data : {
                        'numberOfWords' : 10
                    },
                    dataType:'json',
                    success : bindData,
                    error : function(request,error)
                    {
                        alert("Error: "+JSON.stringify(request));
                    }
            });
        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request.responseText));
        }
    });
    
    
    
    return;
}
    
function limpiarModal(){
    $('#id').val('');
    $('#nombre').val('');
    $('#apellido').val('');
    $('#dni').val('');
    $('#mail').val('');
    $('#usuario').val('');


    $('#medico').attr('checked',false);

    $('#administrativo').attr('checked',false);

    $('#auditor').attr('checked',false);

    $('#administrador').attr('checked',false);


}




function verRetiro(args){}
function DetalleOrden(args){
    limpiarModal();
    $('#id').val(args.item.id);
    $('#nombre').val(args.item.nombre);
    $('#apellido').val(args.item.apellido);
    $('#dni').val(args.item.dni);
    $('#mail').val(args.item.mail);
    $('#usuario').val(args.item.usuario);




    var Entregas = [
            { "producto": "Anticonceptivo Marca x", "fecha":"10/11/2019" , "fechaRetiro": "10/11/2019"},
            { "producto": "Anticonceptivo Marca x", "fecha":"10/11/2019" , "fechaRetiro": "10/11/2019"},
            { "producto": "Anticonceptivo Marca x", "fecha":"10/11/2019" , "fechaRetiro": "10/11/2019"},
            { "producto": "Anticonceptivo Marca x", "fecha":"10/11/2019" , "fechaRetiro": "10/11/2019"}           ];
     



        $("#jsGridEntregas").jsGrid({
        width: "1000",
        height: "1000",
        autoload: true,
        pageLoading: true,
        inserting: true,
        //editing: true,
        rowDoubleClick: verRetiro,
        sorting: true,
        paging: true,
        selecting: true,
        deleteItem: function(item) {
            alert("eliminando");

        },
        onItemInserting: function(args) {
            insertarUsuario(args);

        },
        onItemUpdating: function(args) {
        // cancel insertion of the item with empty 'name' field
        alert("Specify the name of the item!");
            if(args.item.Edad === "") {
                args.cancel = true;
                alert("Specify the name of the item!");
            }
        },
        data: Entregas ,
        controller: {
            loadData: function(filter) {
                var startIndex = (filter.pageIndex - 1) * filter.pageSize;
                //alert("asdas"+filter.usuario_roles);
                return ;//{
                    //data: db.clients.slice(startIndex, startIndex + filter.pageSize),
                    //itemsCount: db.clients.length
                //};
            }
        } ,

        fields: [
            //{ name: "id", title:"Id" , visible:false, type: "number", width: 5, validate: "required" },
            { name: "producto", title:"Producto" , type: "text", width: 40, validate: "required" },
            { name: "fecha", title: "Fecha de Entega" ,type: "text", width: 30, validate: "required" },
            { name: "fechaRetiro",title:"Fecha de Retiro" ,type: "text", width: 30, validate: "required" },
          


            { type: "control",editButton: false, }
        ]
    });

    
    $('#DetalleModal').modal();

    //alert("Specify asdaad name of the item!");

}

    
function bindData(json){

    var usuario_roles = [
        
        { Name: "Medico", idRol: 1 },
        { Name: "Administrativo", idRol: 2 },
        { Name: "Auditor", idRol: 3 },
        { Name: "Administrador", idRol: 4 }
    ];
    
    $("#jsGrid").jsGrid({
        width: "1600",
        height: "1200",
        autoload: true,
        pageLoading: true,
        //inserting: true,
        //editing: true,
        rowDoubleClick: DetalleOrden,
        sorting: true,
        paging: true,
        selecting: true,
        deleteItem: function(item) {
            alert("eliminando");
        //return $.ajax({
        //    type: "DELETE",
        //    url: "/items",
        //    data: item
        //});
        },
        onItemInserting: function(args) {
            insertarUsuario(args);
            // cancel insertion of the item with empty 'name' field
            // alert("Specify the name of the item!");
            // if(args.item.Edad === "") {
            //    args.cancel = true;
            //    alert("Specify the name of the item!");
            //}
        },
        onItemUpdating: function(args) {
        // cancel insertion of the item with empty 'name' field
        alert("Specify the name of the item!");
            if(args.item.Edad === "") {
                args.cancel = true;
                alert("Specify the name of the item!");
            }
        },
        data: json ,
        controller: {
            loadData: function(filter) {
                var startIndex = (filter.pageIndex - 1) * filter.pageSize;
                //alert("asdas"+filter.usuario_roles);
                return ;//{
                    //data: db.clients.slice(startIndex, startIndex + filter.pageSize),
                    //itemsCount: db.clients.length
                //};
            }
        } ,
        /*
        fields: [
            { name: "Usuario", type: "text", width: 150, validate: "required" },
            { name: "Edad", type: "number", width: 50 },
            { name: "Dir", type: "text", width: 200 },
            { name: "CAS", type: "select", items: countries, valueField: "Id", textField: "Name" },
            { name: "Activo", type: "checkbox", title: "Esta activo", sorting: false },
            { type: "control" }
        ]
       
       
        { "Beneficiario": "Ruiz Pablo", "medico": "Otto Clay", "Estado": "Activa" , "Producto": "Leche la Serenisima", "Fecha de Vigencia": "10/09/2019 al 10/03/2020"},
    
        */

        fields: [
            { name: "Beneficiario", title:"Id" , type: "number", width: 5, validate: "required" },
            { name: "Beneficiario", title:"Beneficiario" , type: "text", width: 5, validate: "required" },
            { name: "medico", title:"Medico" , type: "text", width: 40, validate: "required" },
            { name: "Estado", title: "Estado" ,type: "text", width: 30, validate: "required" },
            { name: "Producto",title:"Producto" ,type: "text", width: 30, validate: "required" },
            { name: "FVigencia", title:"Fecha de Vigencia", type: "text", width: 60, validate: "required" },
            //{ name: "usuario",visible:false,title:"Usuario", type: "text", width: 25, validate: "required" },
            //{ name: "usuario_roles",visible:true, type: "select", items: usuario_roles, valueField: "idRol", textField: "Name" },
         //   { name: "fh_alta",title:"Fecha Alta" ,visible:false ,type: "text", width: 50, validate: "required" },
           // { name: "fh_baja", visible:false, type: "text", width: 150},

            //{ name: "esMedico", title: "Medico",  type: "checkbox", width: 20},
            //{ name: "esAdministrativo", title: "Administrativo",  type: "checkbox", width: 40},
            //{ name: "esAuditor", title: "Auditor",  type: "checkbox", width: 20},
            //{ name: "esAdministrador", title: "Administrador",  type: "checkbox", width: 40}
            //,
            { type: "control",editButton: false, }
        ]
    });

}


