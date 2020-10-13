class Trainings::SpeakerMapper

  def self.map model
    author = model.author
    # avatar = author.avatar

    model_attributes = model.attributes
    model_attributes = model_attributes.merge({"speaker_name" =>  author.name})
    model_attributes = model_attributes.merge({"speaker_bio" =>  author.bio.html_safe})
    # if avatar.attached?
    #   model_attributes = model_attributes.merge({"speaker_avatar_url" => avatar.blob.service_url})
    # end
    model_attributes
  end
  

  def self.map_collection model_collection
    collection = model_collection.map{ |model| map(model) }
    return {:collection => collection}
  end

end