/*-
 * #%L
 * Codenjoy - it's a dojo-like platform from developers to developers.
 * %%
 * Copyright (C) 2018 - 2020 Codenjoy
 * %%
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public
 * License along with this program.  If not, see
 * <http://www.gnu.org/licenses/gpl-3.0.html>.
 * #L%
 */
var Solver = function (Direction, Element, Board) {
  return {
    /**
     * @return next hero action
     */
    get: function (board) {
      // TODO your code here

      board.getFigures();

      var tryAction = function (action) {
        switch (action.toString()) {
          case 'right':
            return board.getFigures(0, 1, 0, false);
          case 'left':
            return board.getFigures(0, -1, 0, false);
          case 'act':
            return board.getFigures(1, 0, 0, false);
          case 'act(2)':
            return board.getFigures(2, 0, 0, false);
          case 'act(3)':
            return board.getFigures(3, 0, 0, false);
          default:
            return board.getFigures(0, 0, 0, false);
        }
      };

      tryAction(Direction.RIGHT);

      return Direction.RIGHT;
    },
  };
};

if (module) module.exports = Solver;
