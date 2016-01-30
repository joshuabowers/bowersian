module ArticlesHelper
  def self.toolbar_button( title, icon_name, value = nil )
    {
      title: title,
      icon_name: icon_name,
      value: value
    }
  end

  EMBIGGENEDS = [nil] + %w{ double triple quad }

  # nil's represent a separator between elements
  # the first element of a pair is the human title to display in a hint.
  # the second element of a pair is the Material Icons icon name.
  EDITOR_TOOLBAR_BUTTONS = [
    toolbar_button( :bold, :format_bold, '**^^**' ),
    toolbar_button( :italic, :format_italic, '*^^*' ),
    nil,
    toolbar_button( :bullet_list, :format_list_bulleted, "* ^item^\n* item\n* item" ),
    toolbar_button( :number_list, :format_list_numbered, "1. ^item^\n2. item\n3. item" ),
    toolbar_button( :table, :grid_on, "| ^Header^ | Header |\n| --- | --- |\n| text | more |\n" ),
    nil,
    toolbar_button( :insert_link, :insert_link, '[^description^](url)' ),
    toolbar_button( :insert_image, :insert_photo, '![Alt text](^url^)' ),
    nil,
    toolbar_button( :quote, :format_quote, "> ^Quoted text^" ),
    toolbar_button( :horizontal_rule, :border_horizontal, "\n* * *\n^^" ),
    toolbar_button( :code_block, :code, "\n```\n^code^\n```\n" ),
    toolbar_button( :code_inline, :settings_ethernet, '`^code^`' )
  ]

  def randomly_embiggen
    EMBIGGENEDS.sample
  end

  def editor_toolbar_buttons
    EDITOR_TOOLBAR_BUTTONS
  end

  def toolbar_button_class_name( button_spec )
    'toolbar-button toolbar-' + button_spec.to_s.parameterize.gsub( /_/, '-' )
  end
end
