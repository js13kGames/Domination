import { $ } from './src/utils';
import Board from './src/board';
import Player from './src/player';
import Gameplay from './src/gameplay';
// import Connection from './src/connection';

const board = new Board();
const p1 = new Player($('p1'), $('s1'));
const p2 = new Player($('p2'), $('s2'));
const game = new Gameplay(board, p1, p2);
// const connection = new Connection();
