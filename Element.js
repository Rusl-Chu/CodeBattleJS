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
var Element = {
  BLUE: 'I',
  CYAN: 'J',
  ORANGE: 'L',
  YELLOW: 'O',
  GREEN: 'S',
  PURPLE: 'T',
  RED: 'Z',
  NONE: '.',
  // not in alphabet but saved for further logic
  BORDER: '#',
};

var Tetro = {
  O: {
    0: {
      layout: [
        [0, 1],
        [0, 1],
      ],
      yShift: 0,
    },
    1: {
      layout: [
        [-1, 0],
        [-1, 0],
      ],
      yShift: 0,
    },
    2: {
      layout: [
        [0, 1],
        [0, 1],
      ],
      yShift: 1,
    },
    3: {
      layout: [
        [0, 1],
        [0, 1],
      ],
      yShift: 0,
    },
  },

  I: {
    0: { layout: [[0], [0], [0], [0]], yShift: 1 },
    1: { layout: [[-2, -1, 0, 1]], yShift: 0 },
    2: { layout: [[0], [0], [0], [0]], yShift: 2 },
    3: { layout: [[-1, -0, 1, 2]], yShift: 0 },
  },

  L: {
    0: {
      layout: [
        [0, '.'],
        [0, '.'],
        [0, 1],
      ],
      yShift: 1,
    },
    1: {
      layout: [
        [-1, 0, 1],
        [-1, '.', '.'],
      ],
      yShift: 0,
    },
    2: {
      layout: [
        [-1, 0],
        ['.', 0],
        ['.', 0],
      ],
      yShift: 1,
    },
    3: {
      layout: [
        ['.', '.', 1],
        [-1, 0, 1],
      ],
      yShift: 1,
    },
  },
  J: {
    0: {
      layout: [
        ['.', 0],
        ['.', 0],
        [-1, 0],
      ],
      yShift: 1,
    },
    1: {
      layout: [
        [-1, '.', '.'],
        [-1, 0, 1],
      ],
      yShift: 1,
    },
    2: {
      layout: [
        [0, 1],
        [0, '.'],
        [0, '.'],
      ],
      yShift: 1,
    },
    3: {
      layout: [
        [-1, 0, 1],
        ['.', '.', 1],
      ],
      yShift: 0,
    },
  },
  S: {
    0: {
      layout: [
        ['.', 0, 1],
        [-1, 0, '.'],
      ],
      yShift: 1,
    },
    1: {
      layout: [
        [0, '.'],
        [0, 1],
        ['.', 1],
      ],
      yShift: 1,
    },
    2: {
      layout: [
        ['.', 0, 1],
        [-1, 0, '.'],
      ],
      yShift: 0,
    },
    3: {
      layout: [
        [0, '.'],
        [0, 1],
        ['.', 1],
      ],
      yShift: 1,
    },
  },
  Z: {
    0: {
      layout: [
        [-1, 0, '.'],
        ['.', 0, 1],
      ],
      yShift: 1,
    },
    1: {
      layout: [
        ['.', 0],
        [-1, 0],
        [-1, '.'],
      ],
      yShift: 1,
    },
    2: {
      layout: [
        [-1, 0, '.'],
        ['.', 0, 1],
      ],
      yShift: 0,
    },
    3: {
      layout: [
        ['.', 1],
        [0, 1],
        [0, '.'],
      ],
      yShift: 1,
    },
  },
  T: {
    0: {
      layout: [
        ['.', 0, '.'],
        [-1, 0, 1],
      ],
      yShift: 1,
    },
    1: {
      layout: [
        [0, '.'],
        [0, 1],
        [0, '.'],
      ],
      yShift: 1,
    },
    2: {
      layout: [
        [-1, 0, 1],
        ['.', 0, '.'],
      ],
      yShift: 0,
    },
    3: {
      layout: [
        ['.', 0],
        [-1, 0],
        ['.', 0],
      ],
      yShift: 1,
    },
  },
};

if (module) (module.exports = Element), Tetro;
