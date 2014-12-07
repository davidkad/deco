Blockly.Blocks['wecode_start_project'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColourRGB(Blockly.CAT_EVENTS_RGB);
    this.appendDummyInput()
        .appendField("When");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/wecode-play-button.png", 16, 26, "*"));
    this.appendDummyInput()
        .appendField("is clicked");
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


//Cat Sprite
Blockly.Blocks['with_sprite'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColourRGB(Blockly.CAT_SPRITES_RGB);
    this.appendDummyInput()
        .appendField("With Sprite");
    this.appendValueInput("sprite_name")
        .setCheck("String");
    this.appendStatementInput("with_statements")
        .setCheck("null");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['with_cat'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColourRGB(Blockly.CAT_SPRITES_RGB);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("http://cdn.scratch.mit.edu/scratchr2/static/__28c7a6503864d2c9a9ba5f8f682872c0__//images/cat-b.png", 30, 30, "*"));
    this.appendStatementInput("with_statements")
        .setCheck("null");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};



//Chat message sprite
Blockly.Blocks['with_chat_message'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColourRGB(Blockly.CAT_SPRITES_RGB);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("http://images.ds.wigflip.com/default.gif", 75, 40, "*"));
    this.appendStatementInput("with_statements")
        .setCheck("null");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};





//Set Text + with
Blockly.Blocks['set_text_message'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColourRGB(Blockly.CAT_ANIM_RGB);
    this.appendDummyInput()
        .appendField("  Set Text Message");
    this.appendValueInput("text_message")
        .setCheck("String");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};



//Set Effectm+ With
Blockly.Blocks['set_effect'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColourRGB(Blockly.CAT_ANIM_RGB);
    this.appendDummyInput()
        .appendField("  Set Effect");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Pink Neon", "pinkNeon"], ["fire", "fire"], ["shimmer", "shimmer"]]), "effect");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};




/* Previous trials by David

//Set Text + sprite
Blockly.Blocks['set_text1'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Sprite:");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["message", "message"], ["cat", "cat"]]), "sprite");
    this.appendDummyInput()
        .appendField("  Set Text");
    this.appendValueInput("text_message")
        .setCheck("String");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['set_text1'] = function(block) {
  var value_sprite = block.getFieldValue('sprite');
  var value_text = Blockly.JavaScript.valueToCode(block, 'text_message', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_sprite + '.SetText(' + value_text + ');\n';
  return code;
};

//Set Effect + Sprite
Blockly.Blocks['set_effect1'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Sprite:");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["message", "message"], ["cat", "cat"]]), "sprite");
    this.appendDummyInput()
        .appendField("  Set Effect");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["neon", "neon"], ["fire", "fire"], ["shimmer", "shimmer"]]), "effect");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['set_effect1'] = function(block) {
  var value_sprite = block.getFieldValue('sprite');
  var value_effect = block.getFieldValue('effect');
  // TODO: Assemble JavaScript into code variable.
  var code = value_sprite + '.SetEffect(' + value_effect + ');\n';
  return code;
};


Blockly.Blocks['move'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(65);
    this.appendDummyInput()
        .appendField("move");
    this.appendValueInput("NAME")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendDummyInput()
        .appendField("steps");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['if'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(160);
    this.appendValueInput("condition")
        .setCheck("Boolean")
        .appendField("if");
    this.appendDummyInput()
        .appendField("is true");
    this.appendStatementInput("do")
        .setCheck("null")
        .appendField("      do");
    this.appendDummyInput()
        .appendField("else");
    this.appendStatementInput("else")
        .setCheck("null")
        .appendField("      do");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setTooltip('');
  }
};

*/

