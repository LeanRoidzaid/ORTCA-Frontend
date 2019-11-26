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




function verRetiro(args){

}
function llenarGrillaEntregas(data){
    var Entregas = [] ;
    var estado;
    if(data.entregas[i].producto.nombre =='null' ){
        producto =" ";
    }else{
        producto =data.entregas[i].producto.nombre ;
    }

    for(var i =0; i<data.entregas.length;i++){
        if(data.entregas[i].estadoEntrega=='P'){
            estado = 'PENDIENTE';

        }else
        {
            estado = 'ENTREGADO';
        }
        Entregas.push({ "producto": data.entregas[i].producto.nombre, "fechaRetiro": data.entregas[i].fechaRetiro,"Estado":estado});
    }
    
/*
    var Entregas = [
        { "producto": "Anticonceptivo Marca x", "fecha":"10/11/2019" , "fechaRetiro": "10/11/2019"},
        { "producto": "Anticonceptivo Marca x", "fecha":"10/11/2019" , "fechaRetiro": "10/11/2019"},
        { "producto": "Anticonceptivo Marca x", "fecha":"10/11/2019" , "fechaRetiro": "10/11/2019"},
        { "producto": "Anticonceptivo Marca x", "fecha":"10/11/2019" , "fechaRetiro": "10/11/2019"}           ];
 */

$("#jsGridEntregas").jsGrid({
    width: "1500",
    height: "1200",
    autoload: true,
    pageLoading: true,
    inserting: false,
    //editing: true,
   // rowDoubleClick: verRetiro,
    sorting: false,
    paging: true,
    selecting: false,

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
        { name: "fechaRetiro", title: "Fecha de Entega" ,type: "text", width: 30, validate: "required" },
        { name: "Estado",title:"Estado" ,type: "text", width: 30, validate: "required" }//,
      


        //{ type: "control" }
    ]
});

}
function CargarOrden(args){



    $('#id').val(args.item.id);
    $('#tratamiento').val(args.item.tratamiento);
    $('#nombre').val(args.item.nombre);
   
    $('#apellido').val(args.item.apellido);
    $('#dni').val(args.item.dni);
    $('#producto').val(args.item.producto);
    $('#vigencia').val(args.item.vigencia);
    //S$('#usuario').val(args.item.usuario);

    $.ajax({

        url : 'http://localhost:3000/ordenes/entregasByIdOrden/?idOrden='+args.item.id,
        type : 'GET',
        //dataType:'application/json; charset=utf-8',
        dataType:'json',
        success: llenarGrillaEntregas
    });





}
function DetalleOrden(args){
    limpiarModal();
    if(args!=0){
    CargarOrden(args);
    
    $('#DetalleModal').modal();
}
else{
    //MODO INSERT
    
    $('#InsertModal').modal();
    return false;
}

    //alert("Specify asdaad name of the item!");

}

    
function bindData(json){
    const ordenes = [];

    for(var i=0;i<json.length;i++){
        ordenes.push({id:json[i].id,nombre: json[i].beneficiario.nombre ,apellido: json[i].beneficiario.apellido,dni:json[i].beneficiario.dni,tratamiento:json[i].descTratamiento,producto:json[i].producto.nombre,vigencia : json[i].fechaInicio+" - "+json[i].fechaFin});    

    }


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
        data: ordenes ,
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
            { name: "id", title:"Nro Orden" , type: "number", width: 5, validate: "required" },
            { name: "tratamiento",title:"Tratamietno" ,type: "text", width: 30, validate: "required" },
            { name: "nombre", title:"Nombre" , type: "text", width: 40, validate: "required" },
            { name: "apellido", title:"Apellido" , type: "text", width: 40, validate: "required" },
            { name: "dni", title:"DNI" , type: "text", width: 15, validate: "required" },
            { name: "producto",title:"Producto" ,type: "text", width: 30, validate: "required" },
            { name: "vigencia", title:"Fecha de Vigencia", type: "text", width: 60, validate: "required" }
        ]
    });

}


