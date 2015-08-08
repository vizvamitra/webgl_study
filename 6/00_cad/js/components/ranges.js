window.Ranges = React.createClass({
  handleChange: function(event){
    input = event.target;
    property = this.props.property;
    index = parseInt(input.id[input.id.length-1])

    output = document.getElementById(property + index + 'Output');
    output.innerHTML = input.value;

    this.props.onPropertyChange(property, index, parseFloat(input.value));
  },

  render: function() {
    property = this.props.property;
    legendText = property.charAt(0).toUpperCase() +  property.slice(1);
    maxX = this.props.maxX;
    maxY = this.props.maxY;
    maxZ = this.props.maxZ;
    minX = this.props.minX;
    minY = this.props.minY;
    minZ = this.props.minZ;
    step = this.props.step;

    return <fieldset id={this.props.property} className='ranges'>
      <legend>{legendText}</legend>

      <label htmlFor={property+'0'}>x</label>
      <output id={property + '0Output'}>{this.props.instance[property][0]}</output>
      <input type='range' id={property+'0'} name={property+'0'} max={maxX} min={minX} step={step} value={this.props.instance[property][0]} onChange={this.handleChange}/><br />

      <label htmlFor={property+'1'}>y</label>
      <output id={property + '1Output'}>{this.props.instance[property][1]}</output>
      <input type='range' id={property+'1'} name={property+'1'} max={maxY} min={minY} step={step} value={this.props.instance[property][1]} onChange={this.handleChange}/><br />

      <label htmlFor={property+'2'}>z</label>
      <output id={property + '2Output'}>{this.props.instance[property][2]}</output>
      <input type='range' id={property+'2'} name={property+'2'} max={maxZ} min={minZ} step={step} value={this.props.instance[property][2]} onChange={this.handleChange}/>
    </fieldset>;
  }
});