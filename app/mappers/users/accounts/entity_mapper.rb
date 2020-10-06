class Users::Accounts::EntityMapper < BaseMapper

  def self.map(model)
    obj = model.attributes
    obj = obj.merge({"cpf_pretty" => ::AccountDecorator.cpf_pretty(model.cpf)})
    return obj
  end

end