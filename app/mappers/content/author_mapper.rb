module Contents
  class AuthorMapper

    def self.map model
      model_class = model.class
      model_attributes = model.attributes
      model_attributes = model_attributes.merge({"posts" => model.posts.count})
      model_attributes = model_attributes.merge({"has_avatar" => model.avatar.attached?})
      model_attributes
    end

    def self.map_with_permissions model, current_user, feature
      collection = map model
      permissions = {"current_user_permissions" => ::Users::PermissionRepository.find_by_feature_name(current_user, feature)}
      {:collection => collection, :permissions => permissions}
    end    

    def self.map_all_with_permissions model_collection, current_user, feature
      collection = model_collection.map{ |model| map(model) }
      permissions = {"current_user_permissions" => ::Users::PermissionRepository.find_by_feature_name(current_user, feature)}
      {:collection => collection, :permissions => permissions}
    end

  end
end