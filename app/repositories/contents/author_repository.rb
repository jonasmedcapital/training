module Contents
  class AuthorRepository < Base
    
    def self.build
      entity.new
    end

    def self.all_active
      entity.all.where(active: true)
    end

    def self.list_all_with_permissions(collection, current_user, feature)
      mapper.map_all_with_permissions(collection, current_user, feature)
    end

    def self.find_by_id(id)
      entity.find_by(id: id)
    end

    def self.read_with_permissions(author, current_user, feature)
      mapper.map_with_permissions(author, current_user, feature)
    end

    def read_by_id(id)
      mapper.new.map(all.find_by(id: id))
    end

    def self.find_or_initialize(id)
      lead = entity.where(id: id).first
      if lead
        return lead
      else
        return entity.new
      end
    end

    def find_by_id(id)
      all.find_by(id: id)
    end

    def count
      all.count
    end

    def first
      all.first
    end

    def second
      all.second
    end
    
    def last
      all.last
    end

    def most_recently_created
      all.reorder(created_at: :desc)[0]
    end

    def most_recently_updated
      all.reorder(updated_at: :desc)[0]
    end  

    private

    def entity
      "::Content::Author".constantize
    end

    def self.entity
      "::Content::Author".constantize
    end

    def mapper
      "::Contents::AuthorMapper".constantize
    end

    def self.mapper
      "::Contents::AuthorMapper".constantize
    end
    
    
  
  end
end
