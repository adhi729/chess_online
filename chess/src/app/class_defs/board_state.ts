import {board_square} from './board_square_item';

let temp_board: board_square[] = [];

let  temp_state_white :board_square[] = [
	{
		id: {
			x: 1,
			y: 1
		},
		piece: "rook_white_01",
		status: ""
	},{
		id: {
			x: 1,
			y: 2
		},
		piece: "horse_white_01",
		status: ""
	},{
		id: {
			x: 1,
			y: 3
		},
		piece: "bishop_white_01",
		status: ""
	},{
		id: {
			x: 1,
			y: 4
		},
		piece: "queen_white_00",
		status: ""
	},{
		id: {
			x: 1,
			y: 5
		},
		piece: "king_white_00",
		status: ""
	},{
		id: {
			x: 1,
			y: 6
		},
		piece: "bishop_white_02",
		status: ""
	},{
		id: {
			x: 1,
			y: 7
		},
		piece: "horse_white_02",
		status: ""
	},{
		id: {
			x: 1,
			y: 8
		},
		piece: "rook_white_02",
		status: ""
	},{
		id: {
			x: 2,
			y: 1
		},
		piece: "pawn_white_01",
		status: ""
	},{
		id: {
			x: 2,
			y: 2
		},
		piece: "pawn_white_02",
		status: ""
	},{
		id: {
			x: 2,
			y: 3
		},
		piece: "pawn_white_03",
		status: ""
	},{
		id: {
			x: 2,
			y: 4
		},
		piece: "pawn_white_04",
		status: ""
	},{
		id: {
			x: 2,
			y: 5
		},
		piece: "pawn_white_05",
		status: ""
	},{
		id: {
			x: 2,
			y: 6
		},
		piece: "pawn_white_06",
		status: ""
	},{
		id: {
			x: 2,
			y: 7
		},
		piece: "pawn_white_07",
		status: ""
	},{
		id: {
			x: 2,
			y: 8
		},
		piece: "pawn_white_08",
		status: ""
	}
] ;
for (let i = 0; i < temp_state_white.length; i++) {
	temp_board.push(temp_state_white[i]);
}
for (let i = 3; i <7 ; i++) {
		for (let j = 1; j < 9; j++) {
			let new_square: board_square = {
				id: {x:i,y:j},
				piece: "",
				status: ""
			}
			temp_board.push(new_square);
		}
	}

let  temp_state_black :board_square[] = [
	{
		id: {
			x: 7,
			y: 1
		},
		piece: "pawn_black_01",
		status: ""
	},{
		id: {
			x: 7,
			y: 2
		},
		piece: "pawn_black_02",
		status: ""
	},{
		id: {
			x: 7,
			y: 3
		},
		piece: "pawn_black_03",
		status: ""
	},{
		id: {
			x: 7,
			y: 4
		},
		piece: "pawn_black_04",
		status: ""
	},{
		id: {
			x: 7,
			y: 5
		},
		piece: "pawn_black_05",
		status: ""
	},{
		id: {
			x: 7,
			y: 6
		},
		piece: "pawn_black_06",
		status: ""
	},{
		id: {
			x: 7,
			y: 7
		},
		piece: "pawn_black_07",
		status: ""
	},{
		id: {
			x: 7,
			y: 8
		},
		piece: "pawn_black_08",
		status: ""
	},{
		id: {
			x: 8,
			y: 1
		},
		piece: "rook_black_01",
		status: ""
	},{
		id: {
			x: 8,
			y: 2
		},
		piece: "horse_black_01",
		status: ""
	},{
		id: {
			x: 8,
			y: 3
		},
		piece: "bishop_black_01",
		status: ""
	},{
		id: {
			x: 8,
			y: 4
		},
		piece: "queen_black_00",
		status: ""
	},{
		id: {
			x: 8,
			y: 5
		},
		piece: "king_black_00",
		status: ""
	},{
		id: {
			x: 8,
			y: 6
		},
		piece: "bishop_black_02",
		status: ""
	},{
		id: {
			x: 8,
			y: 7
		},
		piece: "horse_black_02",
		status: ""
	},{
		id: {
			x: 8,
			y: 8
		},
		piece: "rook_black_02",
		status: ""
	}
];
for (let i = 0; i < temp_state_black.length; i++) {
	temp_board.push(temp_state_black[i]);
}

export const boardIniState: board_square[] = temp_board;