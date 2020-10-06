class Users::Accounts::Entities::Read

  def initialize(params)
    @account_params = params.require(:account).permit(:id, :cpf)

    @account = account
  end

  def account
    if @account_params[:id].present?
      ::Users::Accounts::EntityRepository.find_by_id(@account_params[:id])
    elsif @account_params[:cpf].present?
      ::Users::Accounts::EntityRepository.find_by_cpf(@account_params[:cpf])
    end
  end

  def status
    @status
  end

  def process?
    @process
  end

  def type
    @type
  end

  def message
    @message
  end

  def data
    cln = ::Users::Accounts::EntityRepository.read(@account)
    
    if cln.empty?
      @status = :ok
      @process = false
      @message = "Não conseguimos carregar os dados"
      @type = "danger"
    else
      @status = :ok
      @process = true
      @message = ""
      @type = "success"
    end
    
    return {:cln => cln.compact}.as_json
  end
  
end
