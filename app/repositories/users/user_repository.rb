module Users
  class UserRepository < Base
    
    def self.build(account)
      entity.new(name: account.name,
                  cpf: account.cpf,
                  sex: account.sex,
                  email: account._email.address,
                  account_kind: account.kind.first,
                  token: account.token.upcase,
                  blocked: false)
    end
  
    #   def all
    #     all_base
    #   end
  
    #   def find_by_id(id)
    #     all.find_by(id: id)
    #   end
  
    #   def self.find_by_id(id)
    #     entity.find_by(id: id)
    #   end
  
    #   def self.find_by_token(token)
    #     entity.find_by(token: token)
    #   end
  
    #   def find_by_email(email)
    #     all.where(email: email).first
    #   end
  
    #   def find_by_cpf(cpf)
    #     all.where(cpf: cpf).first
    #   end
  
    #   def find_by_name(name)
    #     all.where("name LIKE ?", "%#{name}%").first
    #   end
  
    #   def self.all_active_by_account(account_kind)
    #     entity.where(active: true, account_kind: account_kind)
    #   end
  
    #   def self.all_active_team
    #     users = entity.where(active: true, account_kind: "team") + entity.where(active: true, account_kind: "admin")
    #     return users
    #   end
  
    #   def self.list_users_by_nickname(users)
    #     mapper.map_collection_by_nickname(users)
    #   end
      
  
    #   def list_all(all)
    #     ::Users::UserMapper.new.map_all_active(all)
    #   end
  
    #   def read(user)
    #     ::Users::UserMapper.new.map(user)
    #   end
  
    #   def self.nickname(user)
    #     nickname = user.email.split("@").first.titleize.split(".").join(" ")
    #     return nickname
    #   end
  
    #   def count
    #     all.count
    #   end
  
    #   def first
    #     all.first
    #   end
  
    #   def second
    #     all.second
    #   end
      
    #   def last
    #     all.last
    #   end
  
    #   private
  
    #   def self.set_token
    #       token = ::Base.generate_token
    #       set_token if valid_token token
    #       token
    #     end
  
    #   def entity
    #     "User".constantize
    #   end
  
    #   def self.entity
    #     "User".constantize
    #   end
      
    #   def self.mapper
    #     "Users::UserMapper".constantize
    #   end
  
    #   ENUM_SEX = {
    #               "male" => "Masculino",
    #               "female" => "Feminino",
    #             }
    
    
    end
  end