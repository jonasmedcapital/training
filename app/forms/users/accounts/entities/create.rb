class Users::Accounts::Entities::Create

  def initialize(params)
    @account_params = params.require(:account).permit(:name, :cpf)

    @account = account
  end

  def account
    ::Users::Accounts::EntityRepository.build(@account_params)
  end
  
  def save
    ActiveRecord::Base.transaction do
      if @account.save
        @data = true
        @status = true
        @process = true
        @type = true
        @message = true
        true
      else
        @data = false
        @status = false
        @process = false
        @type = false
        @message = false
        false
      end
    end
  end
  
  def data
    if @data
      cln = ::Users::Accounts::EntityRepository.read(@account)
    else
      cln = []
    end
    
    return {:cln => cln.compact}.as_json
  end

  def status
    if @status
      return :created
    else
      return :bad_request
    end
  end
  
  def type
    if @type
      return "success"
    else
      return "danger"
    end
  end
  
  def message
    if @message
      return "Conta criada com sucesso"
    else
      return "Tivemos problemas para criar a conta"
    end
  end
  
  

end
