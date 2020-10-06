module Contents
  module Authors
    class List
      include ActiveModel::Model

      attr_accessor :status, :type, :message

      def initialize(params)
        @author_params = params.require(:author).permit(:active)
        @current_user_params = params.require(:current_user).permit(:current_user_id)
        
        # return false unless can_current_user_list_author?
        @authors = authors
      end

      def authors
        @authors ||= ::Contents::AuthorRepository.all_active
      end
      
      def current_user
        @current_user ||= ::Users::UserRepository.new.find_by_id(@current_user_params[:current_user_id])
      end

      def unprocess?
        # return true unless can_current_user_list_author?
      end

      def status
        # return :forbidden unless can_current_user_list_author?
        :ok
      end
      

      def data
        # return cln = [] unless can_current_user_list_author?
        # cln = ::Contents::AuthorRepository.list_all_with_permissions @authors, current_user, "authors"
        cln = ::Contents::AuthorRepository.all_active
        return {:cln => cln.compact}.as_json
      end

      def message
        # return message = "A ação não é permitida" unless can_current_user_list_author?
      end

      def type
        # return "danger" unless can_current_user_list_author?
      end

      # private

      # def can_current_user_list_author?
      #   @can_current_user_list_author ||= ::UserPolicies.new(current_user.id, "list", "authors").can_current_user?
      # end
      


    end
  end
end