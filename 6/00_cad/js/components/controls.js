window.Controls = React.createClass({
  getInitialState: function(){
    return {
      instances: scene.instances,
      currentInstance: undefined
    }
  },

  onInstanceCreate: function(mesh){
    scene.createInstance(mesh);
    newCurrent = this.setCurrentInstance(scene.instances.length-1);

    this.setState({
      instances: scene.instances,
      currentInstance: newCurrent
    });
  },

  onInstanceRename: function(name){
    this.state.currentInstance.name = name;
    this.setState({instances: scene.instances});
  },

  onInstanceDelete: function(){
    var index = scene.instances.indexOf(this.state.currentInstance)
    if (index > -1){ scene.instances.splice(index, 1); }
    if(scene.instances.length > 0){
      var newCurrent = this.setCurrentInstance(scene.instances.length-1);
    } else {
      var nueCurrent = undefined;
    }
    this.setState({
      instances: scene.instances,
      currentInstance: newCurrent
    });
  },

  onInstancePropertyChange: function(property, index, value){
    this.state.currentInstance[property][index] = value;
    this.setState({currentInstance: this.state.currentInstance});
  },

  onColorChange: function(color){
    this.state.currentInstance.color = color;
    this.setState({currentInstance: this.state.currentInstance});
  },

  onCurrentInstanceSelect: function(index){
    var newCurrent = this.setCurrentInstance(index);
    this.setState({currentInstance: newCurrent});
  },

  onClearScene: function(){
    scene.instances = [];
    this.setState({
      instances: scene.instances,
      currentInstance: undefined
    });
  },

  setCurrentInstance: function(index){
    if(this.state.currentInstance){
      this.state.currentInstance.wireframeColor = vec4(1.0, 1.0, 1.0, 1.0);
    }

    newCurrent = scene.instances[index];
    newCurrent.wireframeColor = vec4(1.0, 0.0, 0.0, 1.0);
    return newCurrent
  },

  render: function() {
    return <div id='controls'>
      <SceneControls
        instances={this.state.instances}
        currentInstance={this.state.currentInstance}
        onInstanceCreate={this.onInstanceCreate}
        onInstanceDelete={this.onInstanceDelete}
        onClearScene={this.onClearScene}
        onCurrentInstanceSelect={this.onCurrentInstanceSelect} />

      <InstanceControls
        instance={this.state.currentInstance}
        onInstanceRename={this.onInstanceRename}
        onColorChange={this.onColorChange}
        onPropertyChange={this.onInstancePropertyChange}/>
    </div>;
  }
});