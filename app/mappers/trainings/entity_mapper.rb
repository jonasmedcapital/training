class Trainings::EntityMapper

  def self.map_show model
    # material = model.material
    # cover = model.cover

    model_attributes = model.attributes
    # if cover.attached?
    #   model_attributes = model_attributes.merge({"cover_url" => cover.blob.service_url})
    # end
    # if material.attached?
    #   model_attributes = model_attributes.merge({"material_url" => material.blob.service_url})
    # end
    model_attributes = model_attributes.merge({"public_path" => "#{ENV['DEFAULT_URL_HOST']}/medschool/#{model.slug}"})
    model_attributes = model_attributes.merge({"sharing_pretty" => ::Trainings::EntityRepository::ENUM_SHARING[model.sharing]})
    model_attributes = model_attributes.merge({"format_pretty" => ::Trainings::EntityRepository::ENUM_FORMAT[model.format]})
    model_attributes = model_attributes.merge({"content_pretty" => ::Trainings::EntityRepository::ENUM_CONTENT[model.content]})
    model_attributes = model_attributes.merge({"kind_pretty" => ::Trainings::EntityRepository::ENUM_KIND[model.kind]})
    model_attributes = model_attributes.merge({"training_counter_pretty" => 0})
    model_attributes = model_attributes.merge({"sessions_list" =>  ::Trainings::EntityRepository.active_sessions(model)})
    model_attributes = model_attributes.merge({"speakers_list" =>  ::Trainings::EntityRepository.active_speakers(model)})
    model_attributes = model_attributes.merge({"comments_list" =>  ::Trainings::EntityRepository.active_comments(model)})
    model_attributes = model_attributes.merge({"is_published" => model.published_at ? true : false})
    model_attributes
  end

  def self.map model
    model_attributes = model.attributes
    model_attributes = model_attributes.merge({"is_published" => model.published_at ? true : false})
    model_attributes = model_attributes.merge({"public_path" => "#{ENV['DEFAULT_URL_HOST']}/medschool/#{model.slug}"})
    model_attributes = model_attributes.merge({"sharing_pretty" => ::Trainings::EntityRepository::ENUM_SHARING[model.sharing]})
    model_attributes = model_attributes.merge({"format_pretty" => ::Trainings::EntityRepository::ENUM_FORMAT[model.format]})
    model_attributes = model_attributes.merge({"content_pretty" => ::Trainings::EntityRepository::ENUM_CONTENT[model.content]})
    model_attributes = model_attributes.merge({"kind_pretty" => ::Trainings::EntityRepository::ENUM_KIND[model.kind]})
    model_attributes = model_attributes.merge({"training_counter_pretty" => 0})
    model_attributes = model_attributes.merge({"rating" => model.total_voting == 0 ? 0 : (model.total_rating.to_d / model.total_voting.to_d)})
    model_attributes
  end
  

  def self.map_collection model_collection
    collection = model_collection.map{ |model| map(model) }
    return {:collection => collection}
  end
  
  def map_all_active model_collection
    model_collection.where(active: true).map{ |model| map(model) }
  end

  def self.map_all model_collection
    collection = map_collection model_collection
    {:collection => collection}
  end


end