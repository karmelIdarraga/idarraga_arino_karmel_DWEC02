// ------------------- DEFINICION OBJETOS ------------------------

class socio {
    nombre;
    apellido;
    id;
    // constructor
    constructor (nombre, apellido, id){
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
    }
  
    //metodos
    setId (id){
        this.id = id;
    }

    getNombreCompleto(){
      return this.nombre + ' ' + this.apellido;
    }

    esIgual (nombre, apellido){
      return (nombre == this.nombre) && (apellido == this.apellido);
    }
  }