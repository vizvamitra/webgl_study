window.SceneControls = React.createClass({
  handleCreate: function(event){
    event.preventDefault();
    mesh = React.findDOMNode(this.refs.mesh).value;
    this.props.onInstanceCreate(mesh);
    false;
  },

  handleInstanceSelect: function(event){
    event.preventDefault();
    instanceId = React.findDOMNode(this.refs.currentInstance).value;
    this.props.onCurrentInstanceSelect(instanceId);
    false;
  },

  handleDelete: function(event){
    event.preventDefault();
    this.props.onInstanceDelete();
    false;
  },

  handleClear: function(event){
    event.preventDefault();
    this.props.onClearScene();
    false;
  },

  render: function() {
    instancesOptions = this.props.instances.map(function(instance, i){
      return <option key={"instance-"+i} value={i}>{instance.name}</option>
    });
    instanceSelectValue = scene.instances.indexOf(this.props.currentInstance);
    if (instanceSelectValue === -1){instanceSelectValue=''}

    return <form id='scene-controls'>
      <select id='instanceSelect' name='instanceSelect' value={instanceSelectValue} size='22' ref='currentInstance' onChange={this.handleInstanceSelect}>
        {instancesOptions}
      </select><br /><br />

      <select id='meshSelect' name='meshSelect' ref='mesh'>
        <option value='cube'>cube</option>
        <option value='cone'>cone</option>
        <option value='cylinder'>cylinder</option>
        <option value='sphere'>sphere</option>
      </select>
      <button id='createBtn' onClick={this.handleCreate}>Add</button><br />

      <button id='deleteBtn' onClick={this.handleDelete}>Delete</button><br />
      <button id='clearBtn' onClick={this.handleClear}>Clear</button><br />
      <button id='exportBtn' disabled>Export</button>
    </form>;
  }
});