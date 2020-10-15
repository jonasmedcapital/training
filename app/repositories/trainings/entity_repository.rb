class Trainings::EntityRepository < Base

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

  def self.active_sessions(training)
    sessions = []
    training.sessions.where(active: true).each do |session|
      sessions << ::Trainings::SessionRepository.read(session)
    end

    return sessions
  end

  def self.active_speakers(training)
    speakers = []
    training.training_speakers.where(active: true).each do |speaker|
      speakers << ::Trainings::SpeakerRepository.read(speaker)
    end

    return speakers
  end
  
  def self.active_comments(training)
    comments = []
    training.comments.where(active: true).each do |comment|
      comments << ::Trainings::CommentRepository.read(comment)
    end

    return comments
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
    "Training::Entity".constantize
  end

  def self.mapper
    "Trainings::EntityMapper".constantize
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