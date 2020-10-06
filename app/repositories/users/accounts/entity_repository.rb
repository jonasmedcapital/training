class Users::Accounts::EntityRepository < Base

  def self.build(attrs)
    obj = entity.new
    obj.name = attrs["name"]
    obj.cpf = attrs["cpf"]

    return obj
  end
  

  def self.all_active
    entity.where(active: true)
  end

  def self.list_all(accounts)
    mapper.map_all(accounts)
  end

  def self.read(account)
    mapper.map(account)
  end

  def self.find_by_id(id)
    entity.find_by(id: id)
  end

  def self.find_by_cpf(cpf)
    entity.find_by(cpf: cpf)
  end
  
  private

  def self.entity
    "User::Account::Entity".constantize
  end

  def self.mapper
    "Users::Accounts::EntityMapper".constantize
  end
  

end