/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Inject Blockly's CSS synchronously.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Css');

goog.require('goog.cssom');

/**
 * Inject the CSS into the DOM. This is preferable over using a regular CSS file
 * since: a) It loads synchronously and doesn't force a redraw later. b) It
 * speeds up loading by not blocking on a separate HTTP transfer. c) The CSS
 * content may be made dynamic depending on init options.
 */
Blockly.Css.inject = function() {
    var text = Blockly.Css.CONTENT.join('\n');
    // Strip off any trailing slash (either Unix or Windows).
    var path = Blockly.pathToBlockly.replace(/[\\\/]$/, '');
    text = text.replace(/<<<PATH>>>/g, path);
    goog.cssom.addCssText(text);
};

/**
 * Array making up the CSS content for Blockly.
 */
Blockly.Css.CONTENT = [ '.blocklyButtonPath {', 'fill: #333;', 'stroke: #333;', 'stroke-linecap: round;', '}',

'.blocklyButtonHoverPath {', 'fill: #333;', 'stroke: #333;', 'stroke-linecap: round;', '}',

'.blocklyButtonHoverBack {', 'fill:  #B7D032;', '}',

'.blocklyButtonBack {', 'fill: #fff;', '}',

'.blocklyButtonTrashBack {', 'fill: #fff;', '}',

'.blocklyWidgetDiv {', '  position: absolute;', '  display: none;', '  z-index: 999;', '}',

'.blocklyDraggable {',
/*
 * Hotspot coordinates are baked into the CUR file, but they are still required
 * in the CSS due to a Chrome bug.
 * http://code.google.com/p/chromium/issues/detail?id=1446
 */
'  cursor: url(<<<PATH>>>/media/handopen.cur) 8 5, auto;', '}',

'.blocklyResizeSE {', '  fill: #aaa;', '  cursor: se-resize;', '}',

'.blocklyResizeSW {', '  fill: #aaa;', '  cursor: sw-resize;', '}',

'.blocklyResizeLine {', '  stroke-width: 1;', '  stroke: #888;', '}',

'.blocklyHighlightedConnectionPath {', '  stroke-width: 4px;', '  stroke: #FFDC00;', '  fill: #FFDC00;', '}',

//'.blocklyPathBorder {',
//'  fill: none;',
//'  stroke-width: 2;',
//'}',

'.blocklyPathBorder {', '  display: none;', '}',

'.blocklySelected>.blocklyPath {', '  stroke-width: 3px;', '  stroke: #FFDC00;', '}',

'.blocklySelected>.blocklyPathBorder {', '  display: none;', '}',

'.blocklyDragging>.blocklyPath,', '.blocklyDragging>.blocklyPathLight {', '  fill-opacity: .8;', '  stroke-opacity: .8;', '}',

'.blocklyDragging>.blocklyPathDark {', '  display: none;', '}',

'.blocklyDisabled>.blocklyPath {', '  fill-opacity: .5;', '  stroke-opacity: .5;', '}',

'.blocklyDisabled>.blocklyPathLight,', '.blocklyDisabled>.blocklyPathDark {', '  display: none;', '}',

'.blocklyText {', '  cursor: default;', '  font-family: "Roboto", sans-serif;', '  font-size: 11pt;', '  fill: #fff;', '}',

'.blocklyNonEditableText>text {', '  pointer-events: none;', '}',

'.blocklyNonEditableText>rect,', '.blocklyEditableText>rect {', '  fill: #fff;', '  fill-opacity: .6;', '}',

'.blocklyNonEditableText>text,', '.blocklyEditableText>text {', '  fill: #000;', '}',

'.blocklyEditableText:hover>rect {', '  stroke-width: 2;', '  stroke: #fff;', '}',

'.blocklyBubbleText {', '  fill: #000;', '}',

/*
 * Don't allow users to select text. It gets annoying when trying to drag a
 * block and selected text moves instead.
 */
'.blocklySvg text {', '  -moz-user-select: none;', '  -webkit-user-select: none;', '  user-select: none;', '  cursor: inherit;',
        '  font-family: "Roboto", sans-serif;', '}',

        '.blocklyHidden {', '  display: none;', '}',

        '.blocklyFieldDropdown:not(.blocklyHidden) {', '  display: block;', '}',

        '.blocklyTooltipBackground {', '  fill: #ffffc7;', '  stroke-width: 1px;', '  stroke: #d8d8d8;', '}',

        '.blocklyTooltipShadow,', '.blocklyDropdownMenuShadow {', '  fill: #bbb;', '  filter: url(#blocklyShadowFilter);', '}',

        '.blocklyTooltipText {', '  font-family: sans-serif;', '  font-size: 9pt;', '  fill: #000;', '}',

        '.blocklyIconShield {', '  cursor: default;', '  fill: #006E92;',
        //'  stroke-width: 1px;',
        //'  stroke: #ccc;',
        '}',

        '.blocklyIconShieldWarning {', '  cursor: default;', '  fill: #FFDC00;',
        //'  stroke-width: 1px;',
        //'  stroke: #ccc;',
        '}',

        '.blocklyIconShieldError {', '  cursor: default;', '  fill: #E2001A;',
        //'  stroke-width: 1px;',
        //'  stroke: #ccc;',
        '}',

        '.blocklyIconGroup:hover>.blocklyIconShield {', '  fill: #007da6;',
        //'  stroke: #fff;',
        '}',

        '.blocklyIconGroup:hover>.blocklyIconShieldWarning {', '  fill: #FFDC00;',
        //'  stroke: #fff;',
        '}',

        '.blocklyIconGroup:hover>.blocklyIconShieldError {', '  fill: #E2001A;',
        //'  stroke: #fff;',
        '}',

        '.blocklyIconGroup:hover>.blocklyIconMark {', '  fill: #fff;', '}',

        '.blocklyIconMark {', '  cursor: default !important;', '  font-family: sans-serif;', '  font-size: 9pt;', '  font-weight: bold;', '  fill: #ccc;',
        '  text-anchor: middle;', '}',

        '.blocklyIconMarkWarningError {', '  fill: #000;', '}',

        '.blocklyWarningBody {', '}',

        '.blocklyMinimalBody {', '  margin: 0;', '  padding: 0;', '}',

        '.blocklyCommentTextarea {', '  margin: 0;', '  padding: 2px;', '  border: 0;', '  resize: none;',
        //'  background-color: #ffc;',
        '}',
        '.blocklyHelpDiv {', '  padding: 2px;', '  border: 0;', '  resize: none;', 'font-size: 11pt;',
        //'  background-color: #ffc;',
        '}',
        'textarea {', '  border: none;', ' margin: 0;', '  padding: 2px;', '  border: 0;', '  resize: none;',
        //'  background-color: #ffc;',
        '}',
        'textarea:focus {', '  border: none;', ' margin: 0;', '  padding: 2px;', '  border: 0;', '  resize: none;',
        //'  background-color: #ffc;',
        '}',

        '.blocklyHtmlInput {', '  font-family: sans-serif;', '  font-size: 10pt;', '  border: none;', '  outline: none;', '  width: 100%', '}',

        '.blocklyMutatorBackground {', '  fill: #fff;', '  stroke-width: 1;', '  stroke: #ddd;', '}',

        '.blocklyFlyoutBackground  {', '  fill: #fff;', '  fill-opacity: 0', '}',
       // Changed by DavidKad:
        '.blocklyFlyoutBackgroundSelected {', '  fill-opacity: .45;'/*Changed by DavidKad: was 0.35 */, '}',

        '.blocklyScrollbarBackground {', '  fill: #fff;', '  stroke-width: 1;', '  stroke: #e4e4e4;', '}',

        '.blocklyScrollbarKnob {', '  fill: #ccc;', '}',

        '.blocklyScrollbarBackground:hover+.blocklyScrollbarKnob,', '.blocklyScrollbarKnob:hover {', '  fill: #bbb;', '}',

        '.blocklyInvalidInput {', '  background: #faa;', '}',

        '.blocklyAngleCircle {', '  stroke: #444;', '  stroke-width: 1;', '  fill: #ddd;', '  fill-opacity: .8;', '}',

        '.blocklyAngleMarks {', '  stroke: #444;', '  stroke-width: 1;', '}',

        '.blocklyAngleGauge {', '  fill: #f88;', '  fill-opacity: .8;  ', '}',

        '.blocklyAngleLine {', '  stroke: #f00;', '  stroke-width: 2;', '  stroke-linecap: round;', '}',

        '.blocklyContextMenu {', '  border-radius: 4px;', '}',

        '.blocklyDropdownMenu {', '  padding: 0 !important;', '}',

        /* Override the default Closure URL. */
        '.goog-option-selected .goog-menuitem-checkbox,', '.goog-option-selected .goog-menuitem-icon {',
        '  background: url(<<<PATH>>>/media/sprites.png) no-repeat 0 0 !important;', '}',

        /* Category tree in Toolbox. */
        '.blocklyToolboxDiv {', '  background-color: #e6e6e6;', '  display: none;', '  position: absolute;', '  font-size: 16pt;', '  overflow-x: hidden;',
        //'  font-weight: bold;',
        '}',

        '.blocklyToolboxBackground {', '  stroke: #e6e6e6;', '  stroke-width: 2', '}',

        '.blocklyTreeSub {', '  font-size: 10pt;', '}',

        '.blocklyTreeRoot {', '  padding: 4px 0;', '}',

        '.blocklyTreeRow {', '  line-height: 40px;', '  height: 40px;', '  padding-right: 0px;', '  white-space: nowrap;', '  margin-top: 6px;',
        '  fill: #fff;', '}',

        '.blocklyTreeRow:hover {', '  fill: #333;', '}',

        // throw away the arrow icons in the toolbox:
        '.blocklyTreeIcon {',
        //'  height: 16px;',
        //'  width: 16px;',
        //'  width: 13px;',
        //'  vertical-align: middle;',
        //'  background-image: url(<<<PATH>>>/media/tree.png);',
        //'  margin-top: -30px;',
        //'  margin-left: 10px;',
        '}',

        '.blocklyTreeIconClosedLtr {', '  background-position: -32px -1px;', '}',

        '.blocklyTreeIconClosedRtl {', '  background-position: 0px -1px;', '}',

        '.blocklyTreeIconOpen {', '  background-position: -16px -1px;', '}',

        '.blocklyTreeIconNone {', '  background-position: -48px -1px;', '}',

        '.blocklyTreeSelected>.blocklyTreeIconClosedLtr {', '  background-position: -32px -17px;', '}',

        '.blocklyTreeSelected>.blocklyTreeIconClosedRtl {', '  background-position: 0px -17px;', '}',

        '.blocklyTreeSelected>.blocklyTreeIconOpen {', '  background-position: -16px -17px;', '}',

        '.blocklyTreeSelected>.blocklyTreeIconNone {', '  background-position: -48px -17px;', '}',

        '.blocklyTreeLabel {', '  cursor: default;',
        // '  font-family: sans-serif;',
        // '  font-size: 16px;',
        '  padding: 0 0px;', '  vertical-align: middle;', '  margin-left: 0px;', '}',

        '.blocklyTreeSelected .blocklyTreeLabel {', '  fill: #333;', '}',

        /* Copied from: goog/css/colorpicker-simplegrid.css */
        /*
         * Copyright 2007 The Closure Library Authors. All Rights Reserved.
         * 
         * Use of this source code is governed by the Apache License, Version
         * 2.0. See the COPYING file for details.
         */

        /* Author: pupius@google.com (Daniel Pupius) */

        /*
         * Styles to make the colorpicker look like the old gmail color picker
         * NOTE: without CSS scoping this will override styles defined in
         * palette.css
         */
        '.goog-palette {', '  outline: none;', '  cursor: default;', '}',

        '.goog-palette-table {', '  border: 1px solid #666;', '  border-collapse: collapse;', '}',

        '.goog-palette-cell {', '  height: 13px;', '  width: 15px;', '  margin: 0;', '  border: 0;', '  text-align: center;', '  vertical-align: middle;',
        '  border-right: 1px solid #666;', '  font-size: 1px;', '}',

        '.goog-palette-colorswatch {', '  position: relative;', '  height: 13px;', '  width: 15px;', '  border: 1px solid #666;', '}',

        '.goog-palette-cell-hover .goog-palette-colorswatch {', '  border: 1px solid #FFF;', '}',

        '.goog-palette-cell-selected .goog-palette-colorswatch {', '  border: 1px solid #000;', '  color: #fff;', '}',

        /* Copied from: goog/css/menu.css */
        /*
         * Copyright 2009 The Closure Library Authors. All Rights Reserved.
         * 
         * Use of this source code is governed by the Apache License, Version
         * 2.0. See the COPYING file for details.
         */

        /**
         * Standard styling for menus created by goog.ui.MenuRenderer.
         * 
         * @author attila@google.com (Attila Bodis)
         */

        '.goog-menu {', '  background: #fff;', '  border-color: #ccc #666 #666 #ccc;', '  border-style: solid;', '  border-width: 1px;', '  cursor: default;',
        '  font: normal 13px Arial, sans-serif;', '  margin: 0;', '  outline: none;', '  padding: 4px 0;', '  position: absolute;', '  z-index: 20000;', /*
                                                                                                                                                             * Arbitrary,
                                                                                                                                                             * but
                                                                                                                                                             * some
                                                                                                                                                             * apps
                                                                                                                                                             * depend
                                                                                                                                                             * on
                                                                                                                                                             * it...
                                                                                                                                                             */
        '}',

        /* Copied from: goog/css/menuitem.css */
        /*
         * Copyright 2009 The Closure Library Authors. All Rights Reserved.
         * 
         * Use of this source code is governed by the Apache License, Version
         * 2.0. See the COPYING file for details.
         */

        /**
         * Standard styling for menus created by goog.ui.MenuItemRenderer.
         * 
         * @author attila@google.com (Attila Bodis)
         */

        /**
         * State: resting.
         * 
         * NOTE(mleibman,chrishenry): The RTL support in Closure is provided via
         * two mechanisms -- "rtl" CSS classes and BiDi flipping done by the CSS
         * compiler. Closure supports RTL with or without the use of the CSS
         * compiler. In order for them not to conflict with each other, the
         * "rtl" CSS classes need to have the #noflip annotation. The non-rtl
         * counterparts should ideally have them as well, but, since
         * .goog-menuitem existed without .goog-menuitem-rtl for so long before
         * being added, there is a risk of people having templates where they
         * are not rendering the .goog-menuitem-rtl class when in RTL and
         * instead rely solely on the BiDi flipping by the CSS compiler. That's
         * why we're not adding the #noflip to .goog-menuitem.
         */
        '.goog-menuitem {', '  color: #000;', '  font: normal 13px Arial, sans-serif;', '  list-style: none;', '  margin: 0;',
        /* 28px on the left for icon or checkbox; 7em on the right for shortcut. */
        '  padding: 4px 7em 4px 28px;', '  white-space: nowrap;', '}',

        /* BiDi override for the resting state. */
        /* #noflip */
        '.goog-menuitem.goog-menuitem-rtl {',
        /* Flip left/right padding for BiDi. */
        '  padding-left: 7em;', '  padding-right: 28px;', '}',

        /*
         * If a menu doesn't have checkable items or items with icons, remove
         * padding.
         */
        '.goog-menu-nocheckbox .goog-menuitem,', '.goog-menu-noicon .goog-menuitem {', '  padding-left: 12px;', '}',

        /*
         * If a menu doesn't have items with shortcuts, leave just enough room
         * for submenu arrows, if they are rendered.
         */
        '.goog-menu-noaccel .goog-menuitem {', '  padding-right: 20px;', '}',

        '.goog-menuitem-content {', '  color: #000;', '  font: normal 13px Arial, sans-serif;', '}',

        /* State: disabled. */
        '.goog-menuitem-disabled .goog-menuitem-accel,', '.goog-menuitem-disabled .goog-menuitem-content {', '  color: #ccc !important;', '}',

        '.goog-menuitem-disabled .goog-menuitem-icon {', '  opacity: 0.3;', '  -moz-opacity: 0.3;', '  filter: alpha(opacity=30);', '}',

        /* State: hover. */
        '.goog-menuitem-highlight,', '.goog-menuitem-hover {', '  background-color: #d6e9f8;',
        /*
         * Use an explicit top and bottom border so that the selection is
         * visible', in high contrast mode.
         */
        '  border-color: #d6e9f8;', '  border-style: dotted;', '  border-width: 1px 0;', '  padding-bottom: 3px;', '  padding-top: 3px;', '}',

        /* State: selected/checked. */
        '.goog-menuitem-checkbox,', '.goog-menuitem-icon {', '  background-repeat: no-repeat;', '  height: 16px;', '  left: 6px;', '  position: absolute;',
        '  right: auto;', '  vertical-align: middle;', '  width: 16px;', '}',

        /* BiDi override for the selected/checked state. */
        /* #noflip */
        '.goog-menuitem-rtl .goog-menuitem-checkbox,', '.goog-menuitem-rtl .goog-menuitem-icon {',
        /* Flip left/right positioning. */
        '  left: auto;', '  right: 6px;', '}',

        '.goog-option-selected .goog-menuitem-checkbox,', '.goog-option-selected .goog-menuitem-icon {',
        /* Client apps may override the URL at which they serve the sprite. */
        '  background: url(//ssl.gstatic.com/editor/editortoolbar.png) no-repeat -512px 0;', '}',

        /* Keyboard shortcut ("accelerator") style. */
        '.goog-menuitem-accel {', '  color: #999;',
        /* Keyboard shortcuts are untranslated; always left-to-right. */
        /* #noflip */
        '  direction: ltr;', '  left: auto;', '  padding: 0 6px;', '  position: absolute;', '  right: 0;', '  text-align: right;', '}',

        /* BiDi override for shortcut style. */
        /* #noflip */
        '.goog-menuitem-rtl .goog-menuitem-accel {',
        /* Flip left/right positioning and text alignment. */
        '  left: 0;', '  right: auto;', '  text-align: left;', '}',

        /* Mnemonic styles. */
        '.goog-menuitem-mnemonic-hint {', '  text-decoration: underline;', '}',

        '.goog-menuitem-mnemonic-separator {', '  color: #999;', '  font-size: 12px;', '  padding-left: 4px;', '}',

        /* Copied from: goog/css/menuseparator.css */
        /*
         * Copyright 2009 The Closure Library Authors. All Rights Reserved.
         * 
         * Use of this source code is governed by the Apache License, Version
         * 2.0. See the COPYING file for details.
         */

        /**
         * Standard styling for menus created by goog.ui.MenuSeparatorRenderer.
         * 
         * @author attila@google.com (Attila Bodis)
         */

        '.goog-menuseparator {', '  border-top: 1px solid #ccc;', '  margin: 4px 0;', '  padding: 0;', '}',

        '' ];
