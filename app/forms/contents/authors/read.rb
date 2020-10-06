module Contents
  module Authors
    class Read
      include ActiveModel::Model

      attr_accessor :status, :type, :message

      def initialize(params)
        @author_params = params.require(:author).permit(:id)
        @current_user_params = params.require(:current_user).permit(:current_user_id)

        # return false unless can_current_user_read_author?
        @author = author
      end

      def author
        @author ||= ::Contents::AuthorRepository.find_by_id(@author_params[:id])
      end

      def current_user
        @current_user ||= ::Users::UserRepository.new.find_by_id(@current_user_params[:current_user_id])
      end
      
      def persisted?
        false
      end

      def unprocess?
        # return true unless can_current_user_read_author?
      end

      def status
        # return :forbidden unless can_current_user_read_author?
        :ok
      end

      def data
        # return cln = [] unless can_current_user_read_author?
        cln = ::Contents::AuthorRepository.read_with_permissions @author, current_user, "authors"
        return {:cln => cln}.as_json
      end

      def message
        # return message = "A ação não é permitida" unless can_current_user_read_author?
      end

      def type
        # return "danger" unless can_current_user_read_author?
      end

      # private

      # def can_current_user_read_author?
      #   @can_current_user_read_author ||= ::UserPolicies.new(current_user.id, "read", "authors").can_current_user?
      # end

    end
  end
end