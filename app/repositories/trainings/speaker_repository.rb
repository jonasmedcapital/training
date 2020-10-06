class Trainings::SpeakerRepository < Base

  def self.build(attrs)
    entity.new(
      course_id: attrs["course_id"],
      speaker_id: attrs["speaker_id"],
    )
  end

  def self.find_by_id(id)
    entity.find_by(id: id)
  end

  def self.all_active
    entity.where(active: true)
  end
    
  def self.read(speaker)
    mapper.map(speaker)
  end

  def self.list(speakers)
    mapper.map_collection(speakers)
  end

  private

  def self.entity
    "Training::Speaker".constantize
  end

  def self.mapper
    "Trainings::SpeakerMapper".constantize
  end

end