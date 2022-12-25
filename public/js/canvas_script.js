
var goo = document.getElementById("goo");
var c = document.getElementById("_gameboard");
var ctx = c.getContext("2d");

c.width = goo.offsetWidth-3;
c.height = 200;

const asset_path = '../assets/img_futureCity/';

const animations_player = [
	asset_path + 'sprite soilder idle-armsDown.png',
	asset_path + 'sprite soilder idle-armsUp.png',
	asset_path + 'sprite soilder shooting-right.png',
	asset_path + 'sprite soilder shooting-left.png',
	asset_path + 'sprite soilder crouch-right.png',
	asset_path + 'sprite soilder crouch-left.png',
	asset_path + 'sprite soilder idle-dead-right.png',
	asset_path + 'sprite soilder idle-dead-left.png',
	asset_path + 'sprite soilder walk-right-1.png',
	asset_path + 'sprite soilder walk-right-2.png',
	asset_path + 'sprite soilder walk-right-3.png',
	asset_path + 'sprite soilder walk-right-4.png',
	asset_path + 'sprite soilder walk-right-5.png',
	asset_path + 'sprite soilder walk-left-1.png',
	asset_path + 'sprite soilder walk-left-2.png',
	asset_path + 'sprite soilder walk-left-3.png',
	asset_path + 'sprite soilder walk-left-4.png',
	asset_path + 'sprite soilder walk-left-5.png'
];

const tnimations_turret = [
	asset_path + 'sprite turret-intact-right.png',
	asset_path + 'sprite turret-intact-left.png',
	asset_path + 'sprite turret-explosion-1.png',
	asset_path + 'sprite turret-explosion-2.png',
	asset_path + 'sprite turret-explosion-destroyed.png'
];

const tnimations_bullet = [
	asset_path + 'sprite bullet-right.png',
	asset_path + 'sprite bullet-left.png'
];

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

class bullet{
	img = new Image();
	animation = 0;

	animation_paths;
	pos_x;
	pos_y;
	width;
	height;

	constructor(paths,pos_x,pos_y,width,height){
		this.animation_paths = paths; 
		this.img.src = this.animation_paths[this.animation];

		this.pos_x = pos_x;
		this.pos_y = pos_y;
		this.width = width;
		this.height = height;
	}
	update_animation(status){
		this.img.src = this.animation_paths[status];
	}
	update_pos(pos_x,pos_y){
		this.pos_x = pos_x;
		this.pos_y = pos_y;
	}
}

// ######################################################################

const bg = new  background(asset_path + 'sprite future city skyline-3.png',0,0, c.width,c.height);
const player = new game_object(animations_player,50,137,50,50);

function game_loop(){
	// Render
	ctx.clearRect(0,0,c.width,c.height);
	ctx.drawImage(bg.img,bg.pos_x,bg.pos_y,bg.width,bg.height);
	ctx.drawImage(player.img,player.pos_x,player.pos_y,player.width,player.height);

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
	if(player.pos_x>c.width-player.width)
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
	c.width = goo.offsetWidth-3;
	bg.width = c.width;
});