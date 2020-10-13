class Trainings::LessonMapper

  def self.map model
    # video = model.video

    model_attributes = model.attributes
    # if video.attached?
    #   model_attributes = model_attributes.merge({"video_url" => video.blob.service_url})
    # end
    model_attributes
  end
  

  def self.map_collection model_collection
    collection = model_collection.map{ |model| map(model) }
    return {:collection => collection}
  end

  def self.map_search lesson
    session = lesson.session
    training = session.training
    cover = training.cover

    model_attributes = {}
    model_attributes = model_attributes.merge({ "obj_id" => lesson.id })
    model_attributes = model_attributes.merge({ "obj_class" => lesson.class.name })
    model_attributes = model_attributes.merge({ "title" => lesson.name })
    model_attributes = model_attributes.merge({ "subtitle" => lesson.name })
    model_attributes = model_attributes.merge({ "copy" => lesson.description })
    model_attributes = model_attributes.merge({ "slug" => training.slug })
    if cover.attached?
      model_attributes = model_attributes.merge({ "cover_url" => cover.blob.service_url})
    else
      model_attributes = model_attributes.merge({ "cover_url" => 'https://medcapital-site-main.s3-sa-east-1.amazonaws.com/logoMedcapital.png'})
    end
    model_attributes = model_attributes.merge({ "kind" => "lessons" })
    model_attributes = model_attributes.merge({ "kind_pretty" => ::Contents::Posts::EntityRepository::ENUM_KIND["lessons"] })
    model_attributes = model_attributes.merge({ "sharing" => training.sharing })
    model_attributes = model_attributes.merge({ "updated_at_pretty" => DateDecorator.abbr_month_date(lesson.updated_at) })
    model_attributes = model_attributes.merge({ "updated_at" => lesson.updated_at })
    model_attributes = model_attributes.merge({ "published_at?" => training.published_at? })
    model_attributes
    
  end
  

end