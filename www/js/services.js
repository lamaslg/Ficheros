angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */


    .factory('Ficheros',function(){


      var usuario={login:'luis',password: 'Gil'};

      function manejoFSEscritura(fileSystem) {
        fileSystem.root.getFile("datos.json", {create:true,exclusive:false}, gotFileEntryEscritura, fail);
      }

      function gotFileEntryEscritura(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
      }

      function gotFileWriter(writer) {
        writer.onwrite = function(evt) {
          alert("write success \n now click that read button.");
          alert(JSON.stringify(evt));
        };
        writer.write(JSON.stringify(usuario));
      }
      function manejoLectura() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSLectura, fail);
      }

      function gotFSLectura(fileSystem) {
        fileSystem.root.getFile("datos.json", {create: true, exclusive: false}, gotFileEntryLectura, fail);
      }

      function gotFileEntryLectura(fileEntry) {
        fileEntry.file(gotFileLectura, fail);
      }

      function gotFileLectura(file){
        readDataUrl(file);
        readAsText(file);
      }

      function readDataUrl(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
          alert("Read as data URL : " + evt.target.result);
        };
        reader.readAsDataURL(file);
      }

      function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
          alert("Read as text : " + evt.target.result);
        };
        reader.readAsText(file);
      }
      function fail(error) {
        alert(error.code);
      }


return{
  leer:function(){
    manejoLectura();

  },
  escribir: function(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, manejoFSEscritura, fail);

  }

}


    })
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
