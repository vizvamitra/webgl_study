#!/usr/bin/env ruby

class ObjToMeshConverter

  attr_accessor :input_filename, :outout_filename, :mesh_classname, :vertices, :indices

  def initialize input_filename, output_filename, mesh_classname
    @input_filename = input_filename
    @output_filename = output_filename
    @mesh_classname = mesh_classname
    @vertices = []
    @indices = []
  end

  def parse
    File.open(@input_filename, 'r') do |file|
      file.each_line do |line|
        if line =~ /\Av ([-\d.]+) ([-\d.]+) ([-\d.]+)\n\z/
          @vertices << $1 << $2 << $3
        elsif line =~ /\Af (\d+) (\d+) (\d+)\n\z/
          @indices += line.strip.split(' ')[1..3].map{|i| i.to_i-1}
        end
      end
    end
  end

  def save
    File.open(@output_filename, 'w') do |file|
      file << "window.#{@mesh_classname} = function(){\n"
      file << "  this.vBufferId = undefined;\n"
      file << "  this.iBufferId = undefined;\n\n"
      file << "  this.points = [\n"
      @vertices.each_slice(3) do |vec|
        file << "    vec3(#{vec[0]}, #{vec[1]}, #{vec[2]}),\n"
      end
      file << "  ];\n\n"
      file << "  this.indices = [\n"
      @indices.each_slice(3) do |inds|
        file << "    #{inds[0]}, #{inds[1]}, #{inds[2]},\n"
      end
      file << "  ];\n\n"
      file << "  this.numVertices = this.indices.length\n"
      file << "}"
    end
  end

end

converter = ObjToMeshConverter.new(ARGV[0], ARGV[1], ARGV[2])
converter.parse
converter.save