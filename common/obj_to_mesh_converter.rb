#!/usr/bin/env ruby

require 'matrix'

class ObjToMeshConverter

  attr_accessor :input_filename, :outout_filename, :mesh_classname
  attr_reader :vertices, :normals

  def initialize input_filename, output_filename, mesh_classname
    @input_filename = input_filename
    @output_filename = output_filename
    @mesh_classname = mesh_classname
    @vertices, @normals, @uvs, @tangents, @bitangents = [], [], [], [], []
    @vertex_indices, @normal_indices, @uv_indices = [], [], []
    @material = Struct.new(:ns, :ka, :kd, :ks).new
  end

  def parse
    temp_vertices, temp_normals, temp_uvs = [], [], []
    File.open(@input_filename, 'r') do |file|
      file.each_line do |line|
        if line =~ /\Av ([-\d.]+) ([-\d.]+) ([-\d.]+)\n\z/
          @vertices << [$1.to_f, $2.to_f, $3.to_f]
        elsif line =~ /\Avn ([-\d.]+) ([-\d.]+) ([-\d.]+)\n\z/
          @normals << [$1.to_f, $2.to_f, $3.to_f]
        elsif line =~ /\Avt ([-\d.]+) ([-\d.]+)\n\z/
          @uvs << [$1.to_f, $2.to_f]
        elsif line =~ /\Amtllib (.*)\n\z/
          parse_material($1);
        elsif line =~ /\Af [\d\/\s]+\n\z/
          line.strip.split(' ')[1..3].map do |index|
            vi = index[/\A\d+/].to_i - 1
            uvi = index[/(?<=\/)\d+(?=\/)/].to_i - 1
            ni = index[/(?<=\/)\d+\z/].to_i - 1
            @vertex_indices << vi unless vi.nil?
            @normal_indices << ni unless ni.nil?
            @uv_indices << uvi unless uvi.nil?
          end
        end
      end
    end

    generate_tangents unless @uvs.empty?
  end

  def save
    out_vertices, out_normals, out_uvs = [], [], []
    out_tangents, out_bitangents = [], []
    @vertex_indices.each do |vi|
      out_vertices << @vertices[vi]
      out_tangents << @tangents[vi] unless @tangents.empty?
      out_bitangents << @bitangents[vi] unless @bitangents.empty?
    end
    @normal_indices.each{|ni| out_normals << @normals[ni]}
    @uv_indices.each{|uvi| out_uvs << @uvs[uvi]}

    File.open(@output_filename, 'w') do |file|
      file << "window.#{@mesh_classname} = function(){\n"
      file << "  this.vBufferId = undefined;\n"
      file << "  this.nBufferId = undefined;\n\n"

      file << "  this.material = {\n"
      file << "    ambient: vec4(#{@material.ka.join(', ')}#{@material.ka.size == 3 ? ", 1.0" : ""}),\n"
      file << "    diffuse: vec4(#{@material.kd.join(', ')}#{@material.kd.size == 3 ? ", 1.0" : ""}),\n"
      file << "    specular: vec4(#{@material.ks.join(', ')}#{@material.ks.size == 3 ? ", 1.0" : ""}),\n"
      file << "    shininess: #{@material.ns}\n"
      file << "  };\n\n"

      file << "  this.vertices = [\n"
      out_vertices.each do |vec|
        file << "    vec3(#{'%06f' % vec[0]}, #{'%06f' % vec[1]}, #{'%06f' % vec[2]}),\n"
      end
      file << "  ];\n\n"

      file << "  this.normals = [\n"
      out_normals.each do |vec|
        file << "    vec3(#{'%06f' % vec[0]}, #{'%06f' % vec[1]}, #{'%06f' % vec[2]}),\n"
      end
      file << "  ];\n\n"

      file << "  this.texCoords = [\n"
      out_uvs.each do |vec|
        file << "    vec2(#{vec[0]}, #{vec[1]}),\n"
      end
      file << "  ];\n\n"

      file << "  this.tangents = [\n"
      out_tangents.each do |vec|
        file << "    vec3(#{'%06f' % vec[0]}, #{'%06f' % vec[1]}, #{'%06f' % vec[2]}),\n"
      end
      file << "  ];\n\n"

       file << "  this.bitangents = [\n"
      out_bitangents.each do |vec|
        file << "    vec3(#{'%06f' % vec[0]}, #{'%06f' % vec[1]}, #{'%06f' % vec[2]}),\n"
      end
      file << "  ];\n\n"

      file << "  this.numVertices = this.vertices.length;\n"
      file << "}"
    end
  end

  private

    def generate_tangents
      @vertex_indices.each_slice(3).with_index do |vis, i|
        triangle = vis.map{|vi| Vector[*@vertices[vi]] }
        uvs = @uv_indices[i*3..i*3+2].map{|uvi| Vector[*@uvs[uvi]] }

        e1 = triangle[1] - triangle[0]
        e2 = triangle[2] - triangle[0]
        dUV1 = uvs[1] - uvs[0]
        dUV2 = uvs[2] - uvs[0]

        r = 1/(dUV1[0]*dUV2[1] - dUV2[0]*dUV1[1])

        tangent = (e1 * dUV2[1] - e2 * dUV1[1])*r
        bitangent = (e2 * dUV1[0] - e1 * dUV2[0])*r

        vis.each do |vi|
          @tangents[vi] ||= Vector[0, 0, 0]
          @tangents[vi] += tangent
          @bitangents[vi] ||= Vector[0, 0, 0]
          @bitangents[vi] += bitangent
        end
      end

      @tangents.map!{|tangent| tangent.normalize }
      @bitangents.map!{|bitangent| bitangent.normalize }
    end

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