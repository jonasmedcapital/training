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
      material_name: "Nome do material do curso",
      material_description: "Breve descrição do material do curso",
      path: attrs["path"],
      notes: attrs["notes"],
      sharing: attrs["sharing"],
      content: attrs["content"],
      format: attrs["format"],
      kind: attrs["kind"],
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

  def self.active_sessions(course)
    sessions = []
    course.sessions.where(active: true).each do |session|
      sessions << ::Trainings::SessionRepository.read(session)
    end

    return sessions
  end

  def self.active_speakers(course)
    speakers = []
    course.course_speakers.where(active: true).each do |speaker|
      speakers << ::Trainings::SpeakerRepository.read(speaker)
    end

    return speakers
  end
  
  def self.active_comments(course)
    comments = []
    course.comments.where(active: true).each do |comment|
      comments << ::Trainings::CommentRepository.read(comment)
    end

    return comments
  end
    
  def self.read(course)
    mapper.map(course)
  end

  def self.read_show(course)
    mapper.map_show(course)
  end

  def self.list(courses)
    mapper.map_collection(courses)
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
              }

end