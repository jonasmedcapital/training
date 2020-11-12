class Dropzones::UploadRepository < Base

  def self.build(attrs)
    entity.new(
      name: attrs["name"],
      title: attrs["title"],
      description: attrs["description"],
      copy: attrs["copy"],
      meta_title: attrs["title"],
      meta_description: attrs["description"],
      meta_keywords: "repellat accusamus qui quo",
      question_one: "Maiores nostrum aut et eveniet voluptatem autem neque sint aut a in quia vero dolores.",
      answer_one: "Velit quasi numquam aliquid quod minima ea voluptas.",
      question_two: "At repellat accusamus qui quo corrupti enim excepturi est a et omnis eius eum omnis.",
      answer_two: "Maiores nostrum aut et eveniet voluptatem autem neque sint aut a in quia vero dolores.",
      question_three: "Velit quasi numquam aliquid quod minima ea voluptas.",
      answer_three: "At repellat accusamus qui quo corrupti enim excepturi est a et omnis eius eum omnis.",
      material_name: "Nome do material do treinamento",
      material_description: "Breve descrição do material do treinamento",
      path: attrs["path"],
      notes: attrs["notes"],
      sharing: attrs["sharing"],
      content: attrs["content"],
      format: "free", # always free
      kind: "training", # always training
    )
  end

  def self.find_by_id(id)
    entity.find_by(id: id)
  end

  def self.find_by_slug(slug)
    entity.find_by(slug: slug)
  end

  def self.all_active
    entity.where(active: true)
  end
    
  def self.read(training)
    mapper.map(training)
  end

  def self.read_show(training)
    mapper.map_show(training)
  end

  def self.list(trainings)
    mapper.map_collection(trainings)
  end

  private

  def self.entity
    "Dropzone::Entity".constantize
  end

  def self.mapper
    "Dropzones::EntityMapper".constantize
  end

  ENUM_SHARING = {
                "public" => "Público",
                "client" => "Cliente",
                "intern" => "Interno",
              }

  ENUM_FORMAT = {
                  "paid" => "Pago",
                  "free" => "Gratuito",
                }

  ENUM_KIND = {
                "course" => "Curso",
                "lesson" => "Aula",
                "talk" => "Talk Show",
                "training" => "Treinamento"
              }

  ENUM_CONTENT = {
                "clinic" => "PJ Médica",
                "booking" => "Livro-Caixa",
                "taxes" => "Imposto de Renda",
                "billing" => "Recebimento",
                "insurance" => "Seguros",
                "education" => "Educação",
                "development" => "Desenvolvimento",
                "operation" => "Operação",
                "financial" => "Financeiro"
              }

end