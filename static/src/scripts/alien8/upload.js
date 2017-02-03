/*
  Example file drop & upload
*/

var upload = function () {

  /* mine old */
  var holder = document.getElementById('drop-zone'),
      tests = {
        filereader: typeof FileReader != 'undefined',
        dnd: 'draggable' in document.createElement('span'),
        formdata: !!window.FormData,
        progress: "upload" in new XMLHttpRequest
      },
      support = {
        filereader: document.getElementById('filereader'),
        formdata: document.getElementById('formdata'),
        progress: document.getElementById('progress')
      },
      acceptedTypes = {
        'image/png': true,
        'image/jpeg': true,
        'image/gif': true
      },
      progress = document.getElementById('uploadprogress'),
      fileupload = document.getElementById('upload');

  "filereader formdata progress".split(' ').forEach(function (api) {
    if (tests[api] === false) {
      support[api].className = 'fail';
    } else {
      // FFS. I could have done el.hidden = true, but IE doesn't support
      // hidden, so I tried to create a polyfill that would extend the
      // Element.prototype, but then IE10 doesn't even give me access
      // to the Element object. Brilliant.
      support[api].className = 'hidden';
    }
  });

  function previewfile(file) {
    if (tests.filereader === true && acceptedTypes[file.type] === true) {
      var reader = new FileReader();
      reader.onload = function (event) {
        var image = new Image();
        image.src = event.target.result;  // result contains the data as a URL representing the
                                          // file's data as a base64 encoded string
        image.width = 250;                // a fake resize
        holder.appendChild(image);        // place uploaded img inside holder
      };

      reader.readAsDataURL(file);
    }  else {
      // uploaded file is not one of the acceptedTypes ['image/png','image/jpeg','image/gif']
      holder.innerHTML += '<p>Uploaded ' + file.name + ' ' + (file.size ? (file.size/1024|0) + 'K' : '');
      console.log(file);
    }
  }

  function readfiles(files) {

      // if FormData isn't supported, don't use it (= null)
      var formData = tests.formdata ? new FormData() : null;
      for (var i = 0; i < files.length; i++) {
        if (tests.formdata) formData.append('file', files[i]);
        // preview files
        previewfile(files[i]);
      }

      // now post a new XHR request
      if (tests.formdata) {
        var xhr = new XMLHttpRequest();
        //xhr.withCredentials = true;
        //xhr.open('POST', '/devnull.php');
        xhr.open('POST', '/upload');
        xhr.onload = function() {
          console.log('response: '+this.responseText);
          progress.value = progress.innerHTML = 100;  // file loaded 100%
        };

        if (tests.progress) {
          xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
              var complete = (event.loaded / event.total * 100 | 0);
              progress.value = progress.innerHTML = complete;
            }
          }
        }
        // send uploaded data to server
        xhr.send(formData);
      }
  }

  if (tests.dnd) {
    holder.ondragover = function () { this.className = 'hover'; return false; };
    holder.ondragend = function () { this.className = ''; return false; };
    holder.ondrop = function (e) {
      this.className = '';
      e.preventDefault();
      readfiles(e.dataTransfer.files);
    }
  } else {
    fileupload.className = 'hidden';
    fileupload.querySelector('input').onchange = function () {
      readfiles(this.files);
    };
  }
}


module.exports = upload;
