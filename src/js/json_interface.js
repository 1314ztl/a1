class BoolState {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.data_api_name = data.data_api_name;
    this.state = false;
    this.parent = parent;
    allStates.set(this.data_api_name, this);
  }

  setState(value) {
    this.state = value;
  }

  getState() {
    return this.state;
  }
}

class IntState {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.data_api_name = data.data_api_name;
    this.range = data.range;
    this.state = this.range[0];
    this.parent = parent;
    allStates.set(this.data_api_name, this);
  }

  setState(value) {
    if (value >= this.range[0] && value <= this.range[1]) {
      this.state = value;
    }
  }

  getState() {
    return this.state;
  }

  getRange() {
    return {min: this.range[0], max: this.range[1]};
  }
}

class EnumState {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.data_api_name = data.data_api_name;
    this.options = data.options;
    this.state = this.options[0];
    this.stateIndex = 0;
    this.parent = parent;
    allStates.set(this.data_api_name, this);
  }

  setState(value) {
    if (this.options.includes(value)) {
      this.state = value;
      this.stateIndex = this.options.indexOf(value);
    }
  }

  getState() {
    return this.state;
  }

  getOptions() {
    return this.options;
  }
}

class Furniture {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.status = data.status.map(status => {
      switch (status.type) {
        case 'bool':
          return new BoolState(status, this, allStates);
        case 'int':
          return new IntState(status, this, allStates);
        case 'enum':
          return new EnumState(status, this, allStates);
        default:
          throw new Error(`Unknown status type: ${status.type}`);
      }
    });
    this.parent = parent;
  }
  getAllStateName() {
    return this.status.map(state => state.name).join(', ');
  }
}

class Room {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.furniture = data.furniture.map(furniture => new Furniture(furniture, this, allStates));
    this.parent = parent;
  }
  getAllFurnitureName() {
    return this.furniture.map(furniture => furniture.name).join(', ');
  }
}

class House {
  constructor(data, allStates) {
    this.room_list = data.room_list.map(room => new Room(room, this, allStates));
  }
  getAllRoomNames() {
    return this.room_list.map(room => room.name).join(', ');
  }
  getFurnitureDescribeInEveryRoom() {
    return this.room_list.map(room => {
      const furnitureNames = room.furniture.map(furniture => furniture.name).join(', ');
      return `在 "${room.name}" 房间,我们有 "${furnitureNames}" `;
    }).join('\n');
  }
}

export default class Sense {

  constructor() {
    this.house = null;
    this.allStates = new Map();
  }
  async init(){
    await this.loadHouseData();
  }
  async loadHouseData() {
    try {
      const response = await fetch("http://localhost:5173/data/sense.json");
      const data = await response.json();
      this.createHouseFromJson(data);
    } catch (error) {
      console.error('Failed to load house data:', error);
    }
  }

  createHouseFromJson(json) {
    this.house = new House(json, this.allStates);
    return this.house;
  }

  getStateInterface(data_api_name) {
    return this.allStates.get(data_api_name);
  }
  static furnitureToString(obj) {
    if (!(obj instanceof Furniture)) {
      throw new Error('Object is not an instance of Furniture');
    }

    const statesDescription = obj.status.map(state => {
      return `State API Name: ${state.data_api_name}, Description: ${state.description}, Type: ${state.type} \n`;
    }).join('\n');

    return `Furniture Name: ${obj.name}\nDescription: ${obj.description}\nStates:\n${statesDescription}`;
  }
  //s should like {r:string,f?:string,d?:string}
  find(s) {
    if (!this.house) return null;

    for (const room of this.house.room_list) {
      if (room.name === s.r) {
        if (!s.f) return room;

        for (const furniture of room.furniture) {
          if (furniture.name === s.f) {
            if (!s.d) return furniture;

            for (const state of furniture.status) {
              if (state.data_api_name === s.d) {
                return state;
              }
            }
          }
        }
      }
    }
    return null;
  }

}
