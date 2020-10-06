module Contents
  module Authors
    class Update
      include ActiveModel::Model

      attr_accessor :status, :type, :message

      def initialize(params)
        @author_params = params.require(:author).permit(:active, :id, :name, :title, :bio, :linkedin, :email)
        @current_user_params = params.require(:current_user).permit(:current_user_id)

        # return false unless can_current_user_update_author?
        author.attributes = @author_params
        @author = author
        @valid = @author.valid?
      end

      def author
        @author ||= ::Contents::AuthorRepository.find_by_id(@author_params[:id])
      end

      def current_user
        @current_user ||= ::Users::UserRepository.new.find_by_id(@current_user_params[:current_user_id])
      end
      
      def unprocess?
        # return true unless can_current_user_update_author?
      end

      def status
        # return :forbidden unless can_current_user_update_author?
        if @valid
          return :ok
        else
          return :bad_request
        end
      end

      def message
        # return message = "A ação não é permitida" unless can_current_user_update_author?
        if @valid
          message = "Autor atualizado com sucesso!"
          return message
        else
          message = "Tivemos seguinte(s) problema(s):"
          i = 0
          @author.errors.messages.each do |key, value|
            i += 1
            message += " (#{i}) #{value.first}"
          end
          return message
        end
      end

      def type
        # return "danger" unless can_current_user_update_author?
        if @valid
          return "success"
        else
          return "danger"
        end
      end

      def save
        # return false unless can_current_user_update_author?
        ActiveRecord::Base.transaction do
          if @valid
            @author.save
            true
          else
            false
            raise ActiveRecord::Rollback
          end
        end
      end

      # private

      # def can_current_user_update_author?
      #   @can_current_user_update_author ||= ::UserPolicies.new(current_user.id, "update", "authors").can_current_user?
      # end

    end
  end
end