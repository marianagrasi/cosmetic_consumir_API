 
//al desplegar en el servidor colocar la base de datos del servidor 
 const url = 'http://localhost:8082/api/usuario'

const listarDatos= async()=>{
    let respuesta=''
    let body = document.getElementById('contenido')
    //url de donde se tiene la api
    //consultar/ trabajar apis desde javascript
    fetch (url, {
        method:'GET',
        mode:'cors',
        headers:{"Content-type": "application/json; charset=UTF-8"}
    })

    //obtener la respuesta y convertirla a json 

    .then((resp)=> resp.json())
    //data contiene la informacion
    .then(function(data){
        //devuelve los datos
        let listaUsuarios = data.usuarios
        //manera de llevar  rapido la lista
        return listaUsuarios.map(function(usuario){
            
            respuesta+=`<tr><td>${usuario.nombre}</td>`+
            `<td>${usuario.rol}</td>`+
            `<td>${usuario.estado}</td>`+
            `<td> <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar( ${JSON.stringify(usuario)})'>Editar</a><td><a class="waves-effect waves-light btn modal-danger red" href='#' onclick='eliminar(${JSON.stringify(usuario)})'>Eliminar</a></td></tr>`   
            body.innerHTML= respuesta 
            
        })
    })
}

const registrar = async() =>{

    let _nombre = document.getElementById('nombre').value
    let _rol = document.getElementById('rol').value
    let _estado = document.getElementById('estado').value

    let _password = document.getElementById('pass').value
    let _confirmarPassword = document.getElementById('confirmPass').value

    if ((_password.length>0 && _confirmarPassword.length>0)&& _password == _confirmarPassword){
        let _usuario = {
            nombre : _nombre,
            password : _password,
            rol : _rol,
            estado : _estado
        }
        fetch (url,{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(_usuario),//Convertir el objeto _usuario a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
         //   alert(json.msg)// mensaje que retorna la api
         Swal.fire(
            json.msg,
            '',
            'success'
          )
    })
        
    }else{
       // alert('La contraseña y la confirmación de contraseña no coinciden')
       Swal.fire(
        'La contraseña y la confirmación de contraseña no coinciden, por favor corregir',
        '',
        'error'
      )
    }   
}


const editar=(usuario)=>{
    document.getElementById('nombre').value= ''
    document.getElementById('pass').value=''
    document.getElementById('rol').value= ''
    document.getElementById('estado').value= ''

    document.getElementById('nombre').value= usuario.nombre
    document.getElementById('pass').value= usuario.pass
    document.getElementById('rol').value= usuario.rol
    document.getElementById('estado').value= usuario.estado
    
}


//Actualizar editar
const actualizar = async() =>{

    let _nombre = document.getElementById('nombre').value
    let _rol = document.getElementById('rol').value
    let _estado = document.getElementById('estado').value

    let _password = document.getElementById('pass').value
    let _confirmarPassword = document.getElementById('confirmPass').value

    if ((_password.length>0 && _confirmarPassword.length>0)&& _password == _confirmarPassword){
        let _usuario = {
            nombre : _nombre,
            password : _password,
            rol : _rol,
            estado : _estado
        }
        fetch (url,{
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(_usuario),//Convertir el objeto _usuario a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            alert(json.msg)
    })
        
    }else{
        alert('La contraseña y la confirmación de contraseña no coinciden')
    }   
}


const eliminar = (id)=>{
    if(confirm('Esta seguro de realizar la eliminacion?')== true){
  
    
            let usuario = {
                _id: id
            }
            fetch (url,{
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(usuario),//Convertir el objeto _usuario a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then((resp)=> resp.json())
            .then(json => {
                alert(json.msg)
        })
       
    }
    
}

if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click',registrar)

}

if(document.querySelector('#btnActualizar')){
   document.querySelector('#btnActualizar')
   .addEventListener('click',actualizar)
}




