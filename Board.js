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

var Point;

var pt = function (x, y) {
  return new Point(x, y);
};

var LengthToXY = function (boardSize) {
  function inversionY(y) {
    return boardSize - 1 - y;
  }

  function inversionX(x) {
    return x;
  }

  return {
    getXY: function (length) {
      if (length == -1) {
        return null;
      }
      var x = inversionX(length % boardSize);
      var y = inversionY(Math.trunc(length / boardSize));
      return new Point(x, y);
    },
    getXYExtended: function (length, element) {
      if (length == -1) {
        return null;
      }
      var x = inversionX(length % boardSize);
      var y = inversionY(Math.trunc(length / boardSize));
      return new Point(x, y, element);
    },

    getLength: function (x, y) {
      var xx = inversionX(x);
      var yy = inversionY(y);
      return yy * boardSize + xx;
    },
  };
};

var Board = function (board, Element, pointClass) {
  Point = pointClass;

  var contains = function (a, obj) {
    var i = a.length;
    while (i--) {
      if (a[i].equals(obj)) {
        return true;
      }
    }
    return false;
  };

  var isAt = function (x, y, element) {
    if (pt(x, y).isOutOf(size)) {
      return false;
    }
    for (var i = 2; i < arguments.length; i++) if (getAt(x, y) == arguments[i]) return true;
    return false;
  };

  var getAt = function (x, y) {
    if (pt(x, y).isOutOf(size)) {
      return Element.BORDER;
    }
    return board.layers[0].charAt(xyl.getLength(x, y));
  };

  var isNear = function (x, y, element) {
    if (pt(x, y).isOutOf(size)) {
      return false;
    }
    return (
      isAt(x + 1, y, element) ||
      isAt(x - 1, y, element) ||
      isAt(x, y + 1, element) ||
      isAt(x, y - 1, element)
    );
  };

  var boardSize = function () {
    return Math.sqrt(board.layers[0].length);
  };

  var size = boardSize();
  var xyl = new LengthToXY(size);

  var findAll = function (element) {
    var result = [];
    for (var i = 0; i < size * size; i++) {
      var point = xyl.getXY(i);
      var elements = [point.getX(), point.getY()];
      elements.push.apply(elements, arguments);
      if (isAt.apply(null, elements)) {
        result.push(point);
      }
    }
    return result;
  };

  var findAllExtended = function () {
    var result = [];
    for (var i = 0; i < size * size; i++) {
      var point = xyl.getXYExtended(i, board.layers[0].charAt(i));
      result.push(point);
    }
    return result;
  };

  var getFigures = function (rotation = 0, shiftX = 0, shiftY = 0, initRun = true) {
    var currentFigureLayout = [],
      curFigureCoords = [],
      curX = 0,
      curY = 0,
      curXYL = 0;

    currentFigureLayout = Tetro[getCurrentFigureType()][rotation].layout;
    curX = getCurrentFigurePosition().getX() + shiftX;
    curY =
      getCurrentFigurePosition().getY() + Tetro[getCurrentFigureType()][rotation].yShift + shiftY;

    for (var y = 0; y < currentFigureLayout.length; y++) {
      for (var x = 0; x < currentFigureLayout[y].length; x++) {
        var tArr = [];

        if (!Number.isInteger(currentFigureLayout[y][x])) {
          continue;
        }

        if (initRun) {
          curXYL = xyl.getLength(curX + currentFigureLayout[y][x], curY - y);
          removeCurFigureFromField(curXYL);
          Tetro[getCurrentFigureType()].currentCoords = curFigureCoords;
        }

        tArr.push(curX + currentFigureLayout[y][x]);
        tArr.push(curY - y);
        curFigureCoords.push(tArr);
      }
    }

    return {
      figureCoords: curFigureCoords,
      hasColiision: !mapFildUnderFigure(curFigureCoords).every(hasCollision),
    };
  };

  var hasCollision = function (element, index, array) {
    return element == '.';
  };

  var removeCurFigureFromField = function (curXYL) {
    board.layers[0] = replaceAt(board.layers[0], curXYL, '.'); // remove current figure from field
    return true;
  };

  var mapFildUnderFigure = function (curFigureCoords) {
    var mArr = curFigureCoords,
      tArr = [];
    for (var i = 0; i < mArr.length; i++) {
      tArr.push(getAt(mArr[i][0], mArr[i][1]));
    }
    //console.log(tArr);
    return tArr;
  };

  var replaceAt = function (str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
  };

  var getFreeSpace = function () {
    return findAll(Element.NONE);
  };

  var getCurrentFigureType = function () {
    return board.currentFigureType;
  };

  var getCurrentFigurePosition = function () {
    var x = board.currentFigurePoint.x;
    var y = board.currentFigurePoint.y;
    return new Point(x, y, getAt(x, y));
  };

  var getFutureFigures = function () {
    return board.futureFigures;
  };

  var toString = function () {
    var currentFigurePoint = board.currentFigurePoint;
    var result =
      'Current Figure Point: [' + currentFigurePoint.x + ';' + currentFigurePoint.y + ']\n';
    result += 'Current Figure Type:' + board.currentFigureType + '\n';
    result += 'Future Figures:' + board.futureFigures + '\n';

    for (var i = 0; i < size; i++) {
      result += board.layers[0].substring(i * size, (i + 1) * size);
      result += '\n';
    }
    return result;
  };

  return {
    size: boardSize, // public int size();

    get: findAll, // public List<Point> get(Element... elements);
    getAllExtended: findAllExtended,
    isAt: isAt, // public boolean isAt(int x, int y, Element ... elements);
    getAt: getAt, // public Element getAt(int x, int y);
    isNear: isNear, //public boolean isNear(int x, int y, Element element);

    getFigures: getFigures,
    getFreeSpace: getFreeSpace,
    getCurrentFigureType: getCurrentFigureType,
    getCurrentFigurePosition: getCurrentFigurePosition,
    getFutureFigures: getFutureFigures,

    toString: toString,
  };
};

if (module) module.exports = Board;
