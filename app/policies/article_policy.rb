class ArticlePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user and user.has_role? :admin
        scope.all
      else
        scope.published
      end
    end
  end

  def create?
    super or user.has_role? :editor, record
  end

  def update?
    super or record.author == user or user.has_role :editor, record
  end

  def destroy?
    update?
  end
end
