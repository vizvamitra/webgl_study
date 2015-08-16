window.SceneControls = React.createClass({
  handleCreate: function(event){
    event.preventDefault();
    mesh = React.findDOMNode(this.refs.mesh).value;
    this.props.onInstanceCreate(mesh);
  },

  handleInstanceSelect: function(event){
    event.preventDefault();
    instanceId = React.findDOMNode(this.refs.currentInstance).value;
    this.props.onCurrentInstanceSelect(instanceId);
  },

  handleDelete: function(event){
    event.preventDefault();
    this.props.onInstanceDelete();
  },

  handleClear: function(event){
    event.preventDefault();
    this.props.onClearScene();
  },

  handleExport: function(event){
    event.preventDefault();

    var currentInstanceId = scene.instances.indexOf(this.props.currentInstance);
    var data = {
      instances: scene.instances,
      currentId: (currentInstanceId > 0) ? currentInstanceId : undefined
    };
    var blob = new Blob([JSON.stringify(data)], {type: "application/json;charset=utf-8"});
    saveAs(blob, "cad_scene_"+Date.now()+".json");
  },

  handleImportBtnClick: function(event){
    event.preventDefault();
    var importFile = document.querySelector('#importFile');
    importFile.click();
  },

  handleImport: function(event){
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (function(event){
      try{
        data = JSON.parse(event.target.result);
        this.props.onImport(data);
      } catch (e){
        alertify.log( "import failed", "error" );
      }
    }).bind(this);
    reader.readAsText(file);
  },

  render: function() {
    instancesOptions = this.props.instances.map(function(instance, i){
      return <option key={"instance-"+i} value={i}>{instance.name}</option>
    });
    instanceSelectValue = scene.instances.indexOf(this.props.currentInstance);
    if (instanceSelectValue === -1){instanceSelectValue=''}

    var isDeleteDisabled = !this.props.currentInstance;

    try {
      var isExportSupported = !!new Blob;
      var isExportDisabled = !isExportSupported || (scene.instances.length === 0)
    } catch (e) {}

    return <form id='scene-controls'>
      <select id='instanceSelect' name='instanceSelect' value={instanceSelectValue} size='20' ref='currentInstance' onChange={this.handleInstanceSelect}>
        {instancesOptions}
      </select><br /><br />

      <select id='meshSelect' name='meshSelect' ref='mesh'>
        <option value='cube'>cube</option>
        <option value='cone'>cone</option>
        <option value='cylinder'>cylinder</option>
        <option value='sphere'>sphere</option>
      </select>
      <button id='createBtn' onClick={this.handleCreate}>Add</button><br />

      <button id='deleteBtn' onClick={this.handleDelete} disabled={isDeleteDisabled}>Delete selected</button><br />
      <button id='clearBtn' onClick={this.handleClear}>Clear</button><br />
      <button id='exportBtn' onClick={this.handleExport} disabled={isExportDisabled}>Export</button>
      <button id='importBtn' onClick={this.handleImportBtnClick}>Import</button>
      <input type='file' id='importFile' onChange={this.handleImport} />
    </form>;
  }
});