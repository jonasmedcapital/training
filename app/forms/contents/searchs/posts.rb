module Contents
  module Searchs
      class Posts     
      include ActiveModel::Model

      attr_accessor :status, :type, :message, :permitted

      def initialize(params)
        @query_params = params.require(:query).permit(:search, :time_started)
        @current_visit_params = params.require(:current_visit).permit(:current_visit_id)
        @current_user_params = params.require(:current_user).permit(:current_user_id)

        @query = @query_params[:search].downcase
        @time_started = @query_params[:time_started].to_i
        
        @valid = permitted_query
        @search = search
        @search.permitted = @valid
        @search.searched_at = Time.current
        @current_visit = current_visit
        @current_user = current_user
        
        #return false unless @valid
        
      end

      def permitted_query
        ::Contents::Searchs::PermittedQuery.check @query
      end

      def search
        @search ||= ::Contents::Searchs::EntityRepository.build
      end
      
      def current_visit
        @current_visit ||= ::Leads::VisitRepository.new.find_by_id(@current_visit_params[:current_visit_id])
      end

      def current_user
        @current_user ||= ::Users::UserRepository.new.find_by_id(@current_user_params[:current_user_id])
      end

      def data
        # return cln = [] unless @valid
        # cln = ::Contents::Searchs::Results.posts @query, @time_started, @current_visit, @current_user, @search
        # return {:cln => cln}.as_json

        if @valid
          cln = ::Contents::Searchs::Results.posts @query, @time_started, @current_visit, @current_user, @search
        else
          cln = []
          words = ::Contents::Searchs::StringUnaccent.unaccent(@query).split(" ").select{|word| word.length > 2}
          @search.keywords = words
          @search.keywords_length = words.count
          @search.visit_id = @current_visit ? @current_visit.id : nil
          @search.user_id = @current_user ? @current_user.id : nil
          @search.save
        end
        return {:cln => cln}.as_json
      end
      
      def status
        return :forbidden unless @valid
        if @valid
          return :ok
        else
          return :bad_request
        end
      end

      def persisted?
        false
      end

      def unprocess?
        return true unless @valid
      end

      def message
        return message = "A ação não é permitida" unless @valid
        if @valid
          message = "Pesquisa com sucesso!"
          return message
        else
          message = "Tivemos seguinte(s) problema(s):"
          i = 0
          @post.errors.messages.each do |key, value|
            i += 1
            message += " (#{i}) #{value.first}"
          end
          return message
        end
      end

      def type
        return "danger" unless @valid
        if @valid
          return "success"
        else
          return "danger"
        end
      end

      private


    end
  end
end