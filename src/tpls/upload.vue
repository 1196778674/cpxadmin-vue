<template>
  <div class="{{ class }}">
    <label for="{{ name }}"><input type="file" name="{{ name }}" id="{{ id || name }}" accept="{{ accept }}" @click="fileInputClick" @change="fileInputChange" multiple="{{ multiple }}">
      <slot></slot>
    </label>
    <button type="button" v-on:click="fileUpload">{{ buttonText }}</button>
  </div>
</template>

<script>
export default {

  name: 'upload',

  props: {
    class: String,
    name: {
      type: String,
      required: true
    },
    exceltype: {
      type: String
    },
    id: String,
    action: {
      type: String,
      required: true
    },
    accept: String,
    multiple: String,
    headers: Object,
    method: String,
    buttonText: {
      type: String,
      default: 'Upload'
    }
  },

  data () {
    return {
      myFiles: [] // a container for the files in our field
    };
  },

  methods: {
    fileInputClick: function() {
      // click actually triggers after the file dialog opens
      this.$dispatch('onFileClick', this.myFiles);
    },
    fileInputChange: function() {
      // get the group of files assigned to this field
      var ident = this.id || this.name
      this.myFiles = document.getElementById(ident).files;
      this.$dispatch('onFileChange', this.myFiles);
      this.fileUpload();
      var propressBodyHtm = '<div class="propressBody">'+
                            '<div class="progressDiv">'+
                            '<div class="propressTitel">上传中...'+
                            '</div>'+
                            '<div class="propressLoding">'+
                            '<div class="loadingImg">'+
                            '</div>'+
                            '<span></span>'+
                            '</div>'+
                            '<div class="propressContent">'+
                            '</div>'+
                            '</div>'+
                            '</div>';
      $('.close').trigger('click');
      $('body').append(propressBodyHtm);
    },
    _onProgress: function(e) {
      // this is an internal call in XHR to update the progress
      e.percent = (e.loaded / e.total) * 100;
      var propressHtm = '<div class="progress">'+
                        '<div class="progress-bar" role="progressbar" aria-valuenow="'+e.percent+'" aria-valuemin="0" aria-valuemax="100" style="width: '+e.percent+'%;">'+
                          '<span class="sr-only">'+e.percent+'</span>'+
                        '</div>'+
                        '</div>';
      $('.propressContent').html('').append(propressHtm);
      if (e.percent == 100) {
        $('.propressLoding').show().find('span').text('处理中...');
        $('.propressContent, .propressTitel').remove();
      };
      // this.$dispatch('onFileProgress', e);
    },
    _handleUpload: function(file) {
      this.$dispatch('beforeFileUpload', file);
      var form = new FormData();
      var xhr = new XMLHttpRequest();
      try {
        form.append('Content-Type', file.type || 'application/octet-stream');
        // our request will have the file in the ['file'] key
        form.append('file', file);
      } catch (err) {
        this.$dispatch('onFileError', file, err);
        return;
      }

      return new Promise(function(resolve, reject) {

        xhr.upload.addEventListener('progress', this._onProgress, false);

        xhr.onreadystatechange = function() {
          if (xhr.readyState < 4) {
            return;
          }
          if (xhr.status < 400) {
            var res = JSON.parse(xhr.responseText);
            this.$dispatch('onFileUpload', file, res);
            resolve(file);
            var res = JSON.parse(xhr.responseText);
            this.$dispatch('onFileAfter', res);
            // 清空file
            var ident = this.id || this.name;
            document.getElementById(ident).value = '';
          } else {
            var err = JSON.parse(xhr.responseText);
            err.status = xhr.status;
            err.statusText = xhr.statusText;
            this.$dispatch('onFileError', file, err);
            reject(err);
          }
        }.bind(this);

        xhr.onerror = function() {
          var err = JSON.parse(xhr.responseText);
          err.status = xhr.status;
          err.statusText = xhr.statusText;
          this.$dispatch('onFileError', file, err);
          reject(err);
        }.bind(this);
        var shopId= $cookie('shopId'),
            token = $cookie('token');
        var action = window.domain() + this.action + '?shopId=' + shopId + '&excelType=' + this.exceltype + '&token=' + token;
        xhr.open(this.method || "POST", action, true);
        if (this.headers) {
          for(var header in this.headers) {
            xhr.setRequestHeader(header, this.headers[header]);
          }
        }
        xhr.send(form);
        this.$dispatch('afterFileUpload', file);
      }.bind(this));
    },
    fileUpload: function() {
      if(this.myFiles.length > 0) {
        // a hack to push all the Promises into a new array
        var arrayOfPromises = Array.prototype.slice.call(this.myFiles, 0).map(function(file) {
          return this._handleUpload(file);
        }.bind(this));
        // wait for everything to finish
        Promise.all(arrayOfPromises).then(function(allFiles) {
          this.$dispatch('onAllFilesUploaded', allFiles);
        }.bind(this)).catch(function(err) {
          this.$dispatch('onFileError', this.myFiles, err);
        }.bind(this));
      } else {
        // someone tried to upload without adding files
        var err = new Error("No files to upload for this field");
        this.$dispatch('onFileError', this.myFiles, err);
      }
    }
  }
};
</script>