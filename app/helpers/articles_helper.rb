module ArticlesHelper
  EMBIGGENEDS = [nil] + %w{ double triple quad }

  def randomly_embiggen
    EMBIGGENEDS.sample
  end
end
