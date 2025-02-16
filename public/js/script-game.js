// ######################################################################
// Game Assets
// ######################################################################

const asset_path = '../assets/img_futureCity/';

const sprite_animationSequence_paths = {

	idle:[
		'sprite-soilder-idle_armsDown.png',
		'sprite-soilder-idle_armsUp.png',
		'sprite-soilder-idle_shooting_right.png',
		'sprite-soilder-idle_shooting_left.png',
		'sprite-soilder-idle_crouch_right.png',
		'sprite-soilder-idle_crouch_left.png',
		'sprite-soilder-idle_dead_right.png',
		'sprite-soilder-idle_dead_left.png',
	],
	walkLeft:[
		'sprite-soilder-walk_left_1.png',
		'sprite-soilder-walk_left_2.png',
		'sprite-soilder-walk_left_3.png',
		'sprite-soilder-walk_left_4.png',
		'sprite-soilder-walk_left_5.png'
	],
	walkRight:[
		'sprite-soilder-walk_right_1.png',
		'sprite-soilder-walk_right_2.png',
		'sprite-soilder-walk_right_3.png',
		'sprite-soilder-walk_right_4.png',
		'sprite-soilder-walk_right_5.png'
	]
};

const sprite_background_path = 'sprite-background-future_city_skyline.png';

// ######################################################################
// Engine
// ######################################################################

class game_background{
	// Sprite File Data
	sprite_path;
	BackgroundSprite;
	// Sprite Game Data
	sprite_img = new Image();
	sprite_pos_x;
	sprite_pos_y;
	sprite_width;
	sprite_height;

	constructor( path, sprite, pos_x, pos_y, width, height){
		// Sprite Data
		this.sprite_path = path;
		this.backgroundSprite = sprite;
		// Sprite Game Data
		this.sprite_img.src = this.sprite_path + this.backgroundSprite;
		this.sprite_pos_x = pos_x;
		this.sprite_pos_y = pos_y;
		this.sprite_width = width;
		this.sprite_height = height;
	}
}

class game_character{
	// Sprite File Data
	sprite_path;
	sprite_animations;
	// Sprite Game Data
	sprite_img = new Image();
	sprite_pos_x;
	sprite_pos_y;
	sprite_width;
	sprite_height;

	sequence = 0;

	constructor( path, animations, pos_x, pos_y, width, height) {
		// Sprite File Data
		this.sprite_path = path;
		this.sprite_animations = animations;

		// Sprite Game Data
		this.sprite_img.src = this.sprite_path + this.sprite_animations.idle[0];
		this.sprite_pos_x = pos_x;
		this.sprite_pos_y = pos_y;
		this.sprite_width = width;
		this.sprite_height = height;

		// Animation Sequence
		this.sequence = 0
	}
	
	update_pos( x, y) {
		this.sprite_pos_x = x;
		this.sprite_pos_y = y;
	}

	update_animation(seq) {
		if(seq == 0){
			if(this.sequence >= this.sprite_animations.walkRight.length-1 )
				this.sequence = 0;
			else
				this.sequence += 1;
			this.sprite_img.src = this.sprite_path + this.sprite_animations.walkRight[ this.sequence ];
		} else if(seq == 1){
			if(this.sequence >= this.sprite_animations.walkLeft.length-1 )
				this.sequence = 0;
			else
				this.sequence += 1;
			this.sprite_img.src = this.sprite_path + this.sprite_animations.walkLeft[ this.sequence ];
		}
	}
}

// ######################################################################
// Mainloop
// ######################################################################

// HTML Document Variables
var page_section = document.getElementById("section_game");
var page_section_padding;
var canvas = document.getElementById("gameboard");
var ctx = canvas.getContext("2d");

// canvas.width = page_section.offsetWidth-page_section_padding;
if( page_section.offsetWidth-page_section_padding <= 800 ){
	canvas.width = 800;
}else{
	canvas.width = page_section.offsetWidth-page_section_padding;
}
page_section_padding = canvas.width*.10;
canvas.height = 300;

// Actions
var player_xPos_1 = canvas.width/2;
var player_xPos_2 = 0;
var player_yPos = 237;
var player_speed = .02;
var player_distance = canvas.width/2.25;
var player_action = 0;

var game_time = 0;

const gameBackground = new game_background( asset_path, sprite_background_path, 0, 0, canvas.width, canvas.height);
const player = new game_character( asset_path, sprite_animationSequence_paths, player_xPos_1, player_yPos, 50, 50);

function game_loop(){
	if( page_section.offsetWidth-page_section_padding <= 750 && page_section.offsetWidth-page_section_padding > 700){
		canvas.width = 600;
		player_distance = canvas.width/2.25;
	}
	else if( page_section.offsetWidth-page_section_padding <= 800 && page_section.offsetWidth-page_section_padding > 750){
		canvas.width = 800;
		player_distance = canvas.width/2.25;
	}else{
		canvas.width = page_section.offsetWidth-page_section_padding;
		player_distance = canvas.width/2.25;
	}

	page_section_padding = canvas.width*.10;
	gameBackground.sprite_width = canvas.width;

	game_time += 1;
	// Clear Frame
	ctx.clearRect( 0, 0, canvas.width, canvas.height);

	// PLayer Movement
	player_xPos_1 = player_xPos_2;
	player_xPos_2 = Math.round( (Math.sin(game_time*player_speed)*player_distance) + (canvas.width/2) );
	
	// Player Animation
	if( ( (player_xPos_2 - player_xPos_1) / game_time ) > 0) {
		player_action = 0;
	} else {
		player_action = 1;
	}

	// Player Update
	player.update_pos( player_xPos_2, player_yPos);
	player.update_animation(player_action);

	// Render
	ctx.drawImage( gameBackground.sprite_img, gameBackground.sprite_pos_x, gameBackground.sprite_pos_y, gameBackground.sprite_width, gameBackground.sprite_height);
	ctx.drawImage( player.sprite_img, player.sprite_pos_x, player.sprite_pos_y, player.sprite_width, player.sprite_height);
}

setInterval(game_loop, 100);

window.onresize = (()=>{
	canvas.width = page_section.offsetWidth-page_section_padding;
	gameBackground.width = canvas.width;
});