#!/usr/bin/env ruby

class ObjToMeshConverter

  attr_accessor :input_filename, :outout_filename, :mesh_classname
  attr_reader :vertices, :normals

  def initialize input_filename, output_filename, mesh_classname
    @input_filename = input_filename
    @output_filename = output_filename
    @mesh_classname = mesh_classname
    @vertices = []
    @normals = []
    @material = Struct.new(:ns, :ka, :kd, :ks).new
  end

  def parse
    temp_vertices, temp_normals = [], []
    File.open(@input_filename, 'r') do |file|
      file.each_line do |line|
        if line =~ /\Av ([-\d.]+) ([-\d.]+) ([-\d.]+)\n\z/
          temp_vertices << [$1, $2, $3]
        elsif line =~ /\Avn ([-\d.]+) ([-\d.]+) ([-\d.]+)\n\z/
          temp_normals << [$1, $2, $3]
        elsif line =~ /\Amtllib (.*)\n\z/
          parse_material($1);
        elsif line =~ /\Af [\d\/\s]+\n\z/
          line.strip.split(' ')[1..3].map do |index|
            vi = index[/\A\d+/].to_i - 1
            ni = index[/(?<=\/)\d+\z/].to_i - 1
            @vertices << temp_vertices[vi]
            @normals << temp_normals[ni]
          end
        end
      end
    end
  end

  def save
    File.open(@output_filename, 'w') do |file|
      file << "window.#{@mesh_classname} = function(){\n"
      file << "  this.vBufferId = undefined;\n"
      file << "  this.nBufferId = undefined;\n\n"

      file << "  this.material = {\n"
      file << "    Ka: vec3(#{@material.ka.join(', ')}),\n"
      file << "    Kd: vec3(#{@material.kd.join(', ')}),\n"
      file << "    Ks: vec3(#{@material.ks.join(', ')}),\n"
      file << "    Ns: #{@material.ns}\n"
      file << "  };\n\n"

      file << "  this.vertices = [\n"
      @vertices.each do |vec|
        file << "    vec3(#{vec[0]}, #{vec[1]}, #{vec[2]}),\n"
      end
      file << "  ];\n\n"

      file << "  this.normals = [\n"
      @normals.each do |vec|
        file << "    vec3(#{vec[0]}, #{vec[1]}, #{vec[2]}),\n"
      end
      file << "  ];\n\n"

      file << "  this.numVertices = this.vertices.length;\n"
      file << "}"
    end
  end

  private

    def parse_material filename
      full_filename = File.join(File.dirname(@input_filename), filename)
      File.open(full_filename, 'r') do |file|
        file.each_line do |line|
          if line =~ /\ANs ([-\d.]+)\n\z/
            @material.ns = $1.to_f
          elsif line =~ /\AKa ([-\d.]+) ([-\d.]+) ([-\d.]+)\n\z/
            @material.ka = [$1.to_f, $2.to_f, $3.to_f]
          elsif line =~ /\AKd ([-\d.]+) ([-\d.]+) ([-\d.]+)\n\z/
            @material.kd = [$1.to_f, $2.to_f, $3.to_f]
          elsif line =~ /\AKs ([-\d.]+) ([-\d.]+) ([-\d.]+)\n\z/
            @material.ks = [$1.to_f, $2.to_f, $3.to_f]
          end
        end
      end

      @material.ns = 1 if @material.ns.nil?
      @material.ka = [1,1,1] if @material.ka.nil?
      @material.kd = [1,1,1] if @material.kd.nil?
      @material.ks = [1,1,1] if @material.ks.nil?
    end

end

converter = ObjToMeshConverter.new(ARGV[0], ARGV[1], ARGV[2])
converter.parse
converter.save