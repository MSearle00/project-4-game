class Room {
    constructor(name, description) {
        this._name = name;
        this._description = description;
        this._linkedRooms = {};
        this._character = "";
        this._roomItem = "";
    }

    get character() {
        return this._character;
    }
    set character(value){
        this._character = value;
    }
    get roomItem(){
        return this._roomItem;
    }
    set roomItem(value){
        this._roomItem = value;
    }
    get name() {
        return this._name;
    }
    get descripion() {
        return this._descripion
    }
    set name(value) {
        this._name = value;
    }
    describe() {
        return "Looking around the " + this._name + " you can see " + this._description;
    }
    linkRoom(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink
    }
    
    move(direction) {
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        } else {
            alert("You can't go that way!");
            return this;
        }
    }
}

class Character {
    constructor(name, description, conversation) {
        this._name = name;
        this._description = description;
        this._conversation = conversation;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get conversation() {
        return this._conversation;
    }
    set name(value) {
        if (value.length < 3) {
            alert("Name is too short.");
            return;
        }
        this._name = value
    }
    set description(value) {
        this._description = value
    }
    set conversation(value) {
        this._conversation = value
    }

    describe() {
        return "You have met " + this._name + ", " +  this._name + " is " + this._description;
    }

    talk() {
        return this._name + " says " + "'" + this._conversation + "'";
    }
}

class Item {
    constructor(name, description) {
        this._name = name;
        this._description = description;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    set name(value) {
        this._name = value;
    }
    set description(value) {
        this.description = value;
    }

    describe() {
        return "You can see " + this._description;
    }
}

class Enemy extends Character {
    constructor(name, description, conversation, weakness) {
      super(name, description, conversation)
      this._weakness = weakness;
    }
    fight(item) {
        if (item = this._weakness) {
            return true;
        } else {
            return false;
        }
    }
}

function addItem(item) {
    backpack.push(item);
}

function checkInventory(item){
    for (let i = 0; i < item.length; i++) {
        if (item[i] == "Torch") {
            document.getElementById("demo").innerHTML = "Congratulations! You have defeated the zombie";
            return;
        }else{
            document.getElementById("demo").innerHTML = "You have died by the hands of the zombie!";
        }
    } 
}

// --------------- ROOMS ---------------
const Kitchen = new Room("Kitchen", "a modern sleek new kitchen, it seems out of place. A cold breeze brushes against you.")
const Bathroom = new Room("Bathroom", "a large free standing bathtub filled with green tinged water sitting in the middle of the room. The toilet and sink are cracked, the mirror is clean and new placed behind the bathtub.")
const Bedroom = new Room("Bedroom", "a bright pink bedroom, pretty and cute. There's floral curtains around the bed.")
const LivingRoom = new Room("Living Room", "a large fireplace warms the room. It's cozy and bright.")
const Office = new Room("Office, a desk sits in the corner with an old monitor in the center. The computer chair is a hard metal frame. There is no lamp shade, just a bulb hanging from the ceiling emitting an orange glow.")

// Kitchen is center, living room above & Office below, bathroom to the east, bedroom to the west
Kitchen.linkRoom("north", LivingRoom);
LivingRoom.linkRoom("south", Kitchen);
Kitchen.linkRoom("east", Bathroom);
Bathroom.linkRoom("west", Kitchen)
Bathroom.linkRoom("west", Bedroom);
Bedroom.linkRoom("east", Bathroom);
Office.linkRoom("north", Kitchen);
Kitchen.linkRoom("south", Office);

// --------------- CHARACTERS ---------------
const SallySkeleton = new Character("Sally Skeleton", "a sewn together girl, with large eyes and blue skin", "Hi there, I believe the zombie is weak in the light")
const RemyRat = new Character("Remy", "a large rat with a chefs hat", "Hello, do you have any cheese? I can give you this torch as a trade.")
const Coraline = new Character("Coraline", "a quiet girl in a yellow raincoat with blue hair", "He's behind the door")


// --------------- ITEMS ---------------
// based on the constructor(name, description)
const Torch = new Item("Torch", "a small flashlight with a broken glass front, it still works.")

Kitchen.roomItem = Torch;

// --------------- ENEMY ---------------
const Zombie = new Enemy("Zombie", "A foul smelling half rotten man who murmurs and grunts", "bRaIns, yOu... bRAiN", "he", "torch")

// Add characters to rooms
Kitchen.character = RemyRat;
Bedroom.character = SallySkeleton;
LivingRoom.character = Coraline;
Bathroom.character = Zombie;



function displayRoomInfo(room) {
    let charDisplay = "";
    let itemDisplay = "";
    charDisplay = room.character.describe() + ".";
    if(room.roomItem!=""){
        itemDisplay = room.roomItem.describe() + ".";
        addItem(room.roomItem.name);
    }
    if (room._name =="Bedroom"){
        checkInventory(backpack);
    }
    textContent = room.describe() + "<p>" + charDisplay + "</p>" + "<p>" + itemDisplay + "</p>";
    document.getElementById("textarea").innerHTML = textContent
}

var backpack = [];

console.log(backpack)

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        command = document.getElementById("usertext").value;
        const directions = ["north", "south", "east", "west"]
        if (directions.includes(command.toLowerCase())) {
            currentRoom = currentRoom.move(command)
            displayRoomInfo(currentRoom);
        } else {
            document.getElementById("usertext").value = ""
            alert("That is not a valid command, please try again.")
        }
    }
});

function startGame() {
    currentRoom = Kitchen;
    displayRoomInfo(currentRoom);
}

startGame()
