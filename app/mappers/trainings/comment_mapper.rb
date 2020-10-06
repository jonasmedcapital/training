class Trainings::CommentMapper

  def self.map model
    model_attributes = model.attributes
    model_attributes
  end

  def self.map_collection model_collection
    collection = model_collection.map{ |model| map(model) }
    return {:collection => collection}
  end

  def self.map_mailer comment
    training = comment.training

    model_attributes = {}
    model_attributes = model_attributes.merge({ "training_name" => training.name })
    model_attributes = model_attributes.merge({ "training_path" => "#{ENV['DEFAULT_URL_HOST']}/a/cursos/#{training.slug}" })
    model_attributes = model_attributes.merge({ "training_public_path" => "#{ENV['DEFAULT_URL_HOST']}/medschool/#{training.slug}" })
    model_attributes = model_attributes.merge({ "training_kind_pretty" => ::Trainings::EntityRepository::ENUM_KIND[training.kind]})
    model_attributes = model_attributes.merge({ "comment_name" => comment.name })
    model_attributes = model_attributes.merge({ "comment_email" => comment.email })
    model_attributes = model_attributes.merge({ "comment_body" => comment.body })
    model_attributes = model_attributes.merge({ "date_pretty" => "#{comment.date.day}/#{I18n.t("date.abbr_month_names")[comment.date.month]}" })
    if comment.reply
      model_attributes = model_attributes.merge({ "reply_name" => comment.reply_name })
      model_attributes = model_attributes.merge({ "reply_body" => comment.reply_body })
      model_attributes = model_attributes.merge({ "reply_date_pretty" => "#{comment.reply_date.day}/#{I18n.t("date.abbr_month_names")[comment.reply_date.month]}" })
    end
    
    model_attributes
  end

end