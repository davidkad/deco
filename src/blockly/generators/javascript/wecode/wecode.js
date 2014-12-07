
Blockly.JavaScript['wecode_start_project'] = function(block) {
  code = '"event": "onstart", "code":';
  return code;
};


Blockly.JavaScript['with_sprite'] = function(block) {
  var statements = Blockly.JavaScript.statementToCode(block, 'with_statements');
  var sprite_name = Blockly.JavaScript.valueToCode(block, 'sprite_name', Blockly.JavaScript.ORDER_ATOMIC);
  if(sprite_name.length == 0) {
      sprite_name = "DummySprite";
  }
  sprite_name = sprite_name.replace(/'/g, '');
  code = 'var ' + sprite_name + ' = stage.createOrGetSprite(\'' + sprite_name + '\');\n';
  code += statements.replace(/__SPRITE__/g, sprite_name);
  return code;
};

Blockly.JavaScript['with_cat'] = function(block) {
  var statements = Blockly.JavaScript.statementToCode(block, 'with_statements');
  code = statements.replace(/__SPRITE__/g, 'Cat');
  return code;
};



Blockly.JavaScript['with_chat_message'] = function(block) {
  var statements = Blockly.JavaScript.statementToCode(block, 'with_statements');
  var code = statements.replace(/__SPRITE__/g, 'ChatMessage');
  return code;
};


Blockly.JavaScript['set_text_message'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'text_message', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '__SPRITE__.setText(' + value_text + ');\n'; // DK: value text is already quoted
  return code;
};


Blockly.JavaScript['set_effect'] = function(block) {
  var value_effect = block.getFieldValue('effect');
  var code = '__SPRITE__.setTextEffect(\'' + value_effect + '\');\n';
  return code;
};

