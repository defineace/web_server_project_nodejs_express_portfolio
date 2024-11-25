// ######################################################################
// Game Assets
// ######################################################################

const asset_path = '../assets/img_futureCity/';

const animations_player = [
	asset_path + 'sprite-soilder-idle_armsDown.png',
	asset_path + 'sprite-soilder-idle_armsUp.png',
	asset_path + 'sprite-soilder-idle-shooting_right.png',
	asset_path + 'sprite-soilder-idle-shooting_left.png',
	asset_path + 'sprite-soilder-idle-crouch_right.png',
	asset_path + 'sprite-soilder-idle-crouch_left.png',
	asset_path + 'sprite-soilder-idle_dead_right.png',
	asset_path + 'sprite-soilder-idle_dead_left.png',
	asset_path + 'sprite-soilder-walk_right_1.png',
	asset_path + 'sprite-soilder-walk_right_2.png',
	asset_path + 'sprite-soilder-walk_right_3.png',
	asset_path + 'sprite-soilder-walk_right_4.png',
	asset_path + 'sprite-soilder-walk_right_5.png',
	asset_path + 'sprite-soilder-walk_left_1.png',
	asset_path + 'sprite-soilder-walk_left_2.png',
	asset_path + 'sprite-soilder-walk_left_3.png',
	asset_path + 'sprite-soilder-walk_left_4.png',
	asset_path + 'sprite-soilder-walk_left_5.png'
];

const sprite_background_path = 'sprite-background-future_city_skyline.png';

// ######################################################################
// Engine
// ######################################################################

class background{
	img = new Image();

	pos_x;
	pos_y;
	width;
	height;
	constructor(path,pos_x,pos_y,width,height){
		this.img.src = path;
		this.pos_x = pos_x;
		this.pos_y = pos_y;
		this.width = width;
		this.height = height;
	}
}


class game_object{
	img = new Image();
	animation = 0;
	action = 0;
	bullets = [];

	animation_paths;
	pos_x;
	pos_y;
	width;
	height;

	constructor(paths,pos_x,pos_y,width,height){
		this.animation_paths = paths;
		this.img.src = this.animation_paths[0];

		this.pos_x = pos_x;
		this.pos_y = pos_y;
		this.width = width;
		this.height = height;
	}
	update_action(status){
		this.action = status;
	}
	update_animation(status){
		this.img.src = this.animation_paths[status];
	}
	update_pos(x,y){
		this.pos_x = x;
		this.pos_y = y;
	}
	walking(){
		if(this.action==0)
			this.img.src = this.animation_paths[this.animation+8];
			if(this.animation+8<13){
				this.animation += 1;
			}else{
				this.animation = 0;
			}
		if(this.action==1)
			this.img.src = this.animation_paths[this.animation+13];
			if(this.animation+13<16){
				this.animation += 1;
			}else{
				this.animation = 0;
			}
		
	}
}

// ######################################################################
// Mainloop
// ######################################################################


// Page Section
var page_section = document.getElementById("section_game");
var page_section_padding = 1000;
var canvas = document.getElementById("gameboard");
var ctx = canvas.getContext("2d");


canvas.width = page_section.offsetWidth-page_section_padding;
canvas.height = 300;

const gameBackground = new  background( asset_path + sprite_background_path , 0, 0, canvas.width, canvas.height);
const player = new game_object(animations_player,50,237,50,50);

function game_loop(){
	// Render
	ctx.clearRect( 0, 0, canvas.width, canvas.height);
	ctx.drawImage( gameBackground.img, gameBackground.pos_x, gameBackground.pos_y, gameBackground.width, gameBackground.height);
	ctx.drawImage( player.img, player.pos_x, player.pos_y, player.width, player.height);

	// Update Positions
	switch(player.action){
		case 0:
			player.update_pos(player.pos_x+5,player.pos_y);
			break;
		case 1:
			player.update_pos(player.pos_x-5,player.pos_y);
			break;
	}

	// Update Collision Detection
	if(player.pos_x>canvas.width-player.width)
		player.update_action(1);
	if(player.pos_x<0)
		player.update_action(0);

	// Update Animations
	switch(player.action){
		case 0:
			player.walking();
			break;
		case 1:
			player.walking();
			break;
	}

}

setInterval(game_loop, 100);

window.onresize = (()=>{
	canvas.width = page_section.offsetWidth-page_section_padding;
	gameBackground.width = canvas.width;
});