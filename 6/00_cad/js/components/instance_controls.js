window.InstanceControls = React.createClass({
  handleNameChange: function(){
    newName = React.findDOMNode(this.refs.name).value;
    this.props.onInstanceRename(newName);
  },

  handleColorChange: function(){
    var colorHashcode = React.findDOMNode(this.refs.color).value;
    var newColor = vec4(
      parseInt(colorHashcode[1] + colorHashcode[2], 16) / 255,
      parseInt(colorHashcode[3] + colorHashcode[4], 16) / 255,
      parseInt(colorHashcode[5] + colorHashcode[6], 16) / 255,
      1.0
    );
    this.props.onColorChange(newColor);
  },

  render: function() {
    if (!this.props.instance){
      return <p>Please select an instance to edit</p>
    }

    var color = '#' +
      ('0' + Math.round(this.props.instance.color[0]*255).toString(16)).slice(-2) +
      ('0' + Math.round(this.props.instance.color[1]*255).toString(16)).slice(-2) +
      ('0' + Math.round(this.props.instance.color[2]*255).toString(16)).slice(-2)

    return <form id='instance-controls'>
      <label htmlFor='name'>Name: </label>
      <input type='text' name='name' id='name' ref='name' value={this.props.instance.name} onChange={this.handleNameChange}/><br />

      <fieldset id='color'>
        <label htmlFor='color'>Color: </label>
        <input type='color' value={color} id='color' ref='color' onChange={this.handleColorChange}/>
      </fieldset>

      <Ranges instance={this.props.instance}
        property='position'
        onPropertyChange={this.props.onPropertyChange}
        maxX='3' minX='-3'
        maxY='3' minY='0'
        maxZ='3' minZ='-3'
        step='0.1' />

      <Ranges instance={this.props.instance}
        property='scale'
        onPropertyChange={this.props.onPropertyChange}
        maxX='2' minX='0.1'
        maxY='2' minY='0.1'
        maxZ='2' minZ='0.1'
        step='0.1' />

      <Ranges instance={this.props.instance}
        property='angles'
        onPropertyChange={this.props.onPropertyChange}
        maxX='360' minX='0'
        maxY='360' minY='0'
        maxZ='360' minZ='0'
        step='10' />
    </form>;
  }
});