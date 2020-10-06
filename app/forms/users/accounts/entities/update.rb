class Users::Accounts::Entities::Update
  def initialize(params)
    @account_params = params.require(:account).permit(:id, :active, :name, :cpf)
    
    account.attributes = @account_params
    @account = account
    # @valid = @account.valid?
  end

  def account
    @account ||= ::Users::Accounts::EntityRepository.find_by_id(@account_params[:id])
  end

  def save
    ActiveRecord::Base.transaction do
      # @data = true
      # @status = true
      # @process = true
      # @type = true
      # @message = true
      # true
      
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
      return "Conta atualizada com sucesso"
    else
      return "Tivemos problemas para atualizar a conta"
    end
  end

end
