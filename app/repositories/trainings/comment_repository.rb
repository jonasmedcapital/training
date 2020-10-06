class Trainings::CommentRepository < Base

  def self.build(attrs)
    entity.new(
      course_id: attrs["course_id"],
      name: attrs["name"],
      email: attrs["email"],
      body: attrs["body"],
      date: Time.current
    )
  end

  def self.find_by_id(id)
    entity.find_by(id: id)
  end

  def self.all_active
    entity.where(active: true)
  end
    
  def self.read(comment)
    mapper.map(comment)
  end

  def self.read_mailer(comment)
    # comment = find_by_id(comment_id)
    mapper.map_mailer(comment)
  end

  def self.list(comments)
    mapper.map_collection(comments)
  end

  private

  def self.entity
    "Training::Comment".constantize
  end

  def self.mapper
    "Trainings::CommentMapper".constantize
  end

end