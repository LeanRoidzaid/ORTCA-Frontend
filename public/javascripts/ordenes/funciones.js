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

function entregoOk(data){
    if(!data.err){
        $('#DetalleModal').modal('hide');
        alert("Entrega realizada correctamente!");
        location.reload(); 
      }else{
        alert(data.err);
      }
} 
function Entregar(idEntrega){
          $.ajax({
              url : '/home/Entregar/?id='+idEntrega,
              type : 'GET',
             // dataType:'json',
              success : entregoOk,
              error : function(request,error)
              {
                  alert("Request: "+JSON.stringify(error));
              }
        });
    
}
function llenarGrillaEntregas(data){
    var Entregas = [] ;
    var estado;
    var enable;

    for(var i =0; i<data.entregas.length;i++){
        if(data.entregas[i].estadoEntrega=='P'){
            estado = 'PENDIENTE';
            enable ="";

        }else
        {
            estado = 'ENTREGADO';
            enable ="disabled";
        }
       
        var fechaEntregaStr="";
        
        var fechaRetiroStr = "";
        if(data.entregas[i].fechaEntrega!=null){
            var fechaEntrega = data.entregas[i].fechaEntrega.split("-");
            fechaEntregaStr = fechaEntrega[2].split("T")[0]+"/"+fechaEntrega[1]+"/"+fechaEntrega[0];
        }
        if(data.entregas[i].fechaRetiro!= null){
            var fechaRetiro = data.entregas[i].fechaRetiro.split("-");
            fechaRetiroStr = fechaRetiro[2].split("T")[0]+"/"+fechaRetiro[1]+"/"+fechaRetiro[0];
        }

        Entregas.push({ "producto": data.entregas[i].producto.nombre,"cantidad":data.entregas[i].cantidad, "fechaRetiro": fechaRetiroStr,"fechaEntrega":fechaEntregaStr,"Estado":estado,"acciones":"<button type='button' onclick=javascript:Entregar('"+data.entregas[i].id+"') "+enable+">Entregar</button>"});
    }
    


$("#jsGridEntregas").jsGrid({
    width: "1000",
    height: "400",
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
        { name: "cantidad", title:"Cantidad" , type: "text", width: 10, validate: "required" },
        { name: "Estado",title:"Estado" ,type: "text", width: 30, validate: "required" },
        { name: "fechaEntrega", title: "Fecha de Entrega" ,type: "text", width: 30, validate: "required" },
        { name: "fechaRetiro", title: "Fecha de Retiro" ,type: "text", width: 30, validate: "required" },
        { name: "acciones", title:"Acciones",  align :"right",type: "text", width: 20,
                
                itemTemplate: function(value) {
                    //return $("<div>").addClass("rating").append(Array(value + 1).join("&#9733;"));
                       // return $("<button type='button' onclick=javascript:verAutorizados('"+value+"')>Entregar</button>").addClass("btn btn-primary");
                       return $(value).addClass("btn btn-primary");
                }
      
            }

        //{ type: "control" }
    ]
});

}

function llenarAutorizados(data){
    
   // alert( JSON.stringify(data));
    var input = []; 
    for(var i in data){
        input.push(data[i].autorizados[0]);
    }


    $("#jsGridAutorizados").jsGrid({
        width: "1000",
        height: "200",
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
        data: input ,
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
            { name: "nombre", title:"Nombre" , type: "text", width: 20, validate: "required" },
            { name: "apellido", title:"Apellido" , type: "text", width: 20, validate: "required" },
            { name: "dni", title:"DNI" , type: "text", width: 10, validate: "required" },
            { name: "telefono",title:"Telefono" ,type: "text", width: 20, validate: "required" }
        
    
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

        url : 'http://localhost:3000/beneficiarios/autorizadosById/?id='+args.item.idBeneficiario,
        type : 'GET',
        //dataType:'application/json; charset=utf-8',
        dataType:'json',
        success: llenarAutorizados
    });

    
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
        var fechaIni = json[i].fechaInicio.split("-");
        var fechaFin =json[i].fechaFin.split("-");
        ordenes.push({id:json[i].id,nombre: json[i].beneficiario.nombre ,apellido: json[i].beneficiario.apellido,dni:json[i].beneficiario.dni,tratamiento:json[i].descTratamiento,producto:json[i].producto.nombre,vigencia : fechaIni[2]+"/"+fechaIni[1]+"/"+fechaIni[0]+" - "+fechaFin[2]+"/"+fechaFin[1]+"/"+fechaFin[0],"idBeneficiario": json[i].idBeneficiario});    

    }



    

    $("#jsGrid").jsGrid({
        width: "1600",
        height: "600",
        autoload: true,
      //  pageLoading: true,
        //inserting: true,
        //editing: true,
        rowDoubleClick: DetalleOrden,
        selecting: true,
        sorting: true,
        paging: true,
        autoload: true,
 
        pageSize: 10,
        pageButtonCount: 5,
        
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
            { name: "id", title:"Nro Orden" , type: "number", width:4, validate: "required" },
            { name: "vigencia", title:"Fecha de Vigencia", type: "text", width: 15, validate: "required" },
            { name: "nombre", title:"Nombre" , type: "text", width: 20, validate: "required" },
            { name: "apellido", title:"Apellido" , type: "text", width: 20, validate: "required" },
            { name: "dni", title:"DNI" , type: "text", width: 15, validate: "required" },
            { name: "tratamiento",title:"Tratamietno",visible:false ,type: "text", width: 30, validate: "required" },
            { name: "producto",title:"Producto" ,type: "text", width: 30, validate: "required" },
            
            { name: "idBeneficiario", title:"idBeneficiario", type: "text", width: 60, visible:false }
        ]
    });

}


