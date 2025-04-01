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
    return { min: this.range[0], max: this.range[1] };
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

class ColorState {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.data_api_name = data.data_api_name;
    this.state = { r: 0, g: 0, b: 0 };
    this.parent = parent;
    allStates.set(this.data_api_name, this);
  }

  setState(value) {
    if (value.r >= 0 && value.r <= 255 &&
      value.g >= 0 && value.g <= 255 &&
      value.b >= 0 && value.b <= 255) {
      this.state = value;
    }
  }

  getState() {
    return this.state;
  }
}

class PositionState {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.data_api_name = data.data_api_name;
    this.state = { x: 0, y: 0, z: 0 };
    this.parent = parent;
    allStates.set(this.data_api_name, this);
  }

  setState(value) {
    if (value.x >= 0 && value.x <= 100 &&
      value.y >= 0 && value.y <= 100 &&
      value.z >= 0 && value.z <= 100) {
      this.state = value;
    }
  }

  getState() {
    return this.state;
  }
}

class DirectionState {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.data_api_name = data.data_api_name;
    this.state = { horizontal: 0, vertical: 0 };
    this.parent = parent;
    allStates.set(this.data_api_name, this);
  }

  setState(value) {
    if (value.horizontal >= 0 && value.horizontal <= 360 &&
      value.vertical >= 0 && value.vertical <= 180) {
      this.state = value;
    }
  }

  getState() {
    return this.state;
  }
}

class ComplexState {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.data_api_name = data.data_api_name;
    this.state = data.defaultState || {};
    this.parent = parent;
    allStates.set(this.data_api_name, this);
  }

  setState(value) {
    // 根据设备类型验证状态值
    if (this.validateState(value)) {
      this.state = value;
    }
  }

  getState() {
    return this.state;
  }

  validateState(value) {
    // 根据设备类型实现具体的验证逻辑
    return true;
  }
}

class TimerState {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.data_api_name = data.data_api_name;
    this.state = {
      enabled: false,
      schedule: [], // [{time: "HH:mm", action: "on/off", days: [1,2,3,4,5,6,7]}]
    };
    this.parent = parent;
    allStates.set(this.data_api_name, this);
  }

  setState(value) {
    if (this.validateSchedule(value.schedule)) {
      this.state = value;
    }
  }

  getState() {
    return this.state;
  }

  validateSchedule(schedule) {
    return schedule.every(item => {
      const timeValid = /^([01]\d|2[0-3]):([0-5]\d)$/.test(item.time);
      const actionValid = ["on", "off"].includes(item.action);
      const daysValid = item.days.every(d => d >= 1 && d <= 7);
      return timeValid && actionValid && daysValid;
    });
  }
}

class SceneState {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.data_api_name = data.data_api_name;
    this.state = {
      activeScene: "default",
      scenes: {} // {sceneName: {deviceStates: [{deviceId, state}]}}
    };
    this.parent = parent;
    allStates.set(this.data_api_name, this);
  }

  setState(value) {
    if (value.activeScene && value.scenes) {
      this.state = value;
    }
  }

  getState() {
    return this.state;
  }
}

class MonitorState {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.data_api_name = data.data_api_name;
    this.state = {
      status: "normal", // normal, warning, error
      metrics: {
        runtime: 0,
        energy: 0,
        maintenance: null,
        lastCheck: null
      },
      alerts: []
    };
    this.parent = parent;
    allStates.set(this.data_api_name, this);
  }

  setState(value) {
    if (["normal", "warning", "error"].includes(value.status)) {
      this.state = value;
    }
  }

  getState() {
    return this.state;
  }
}

class SecurityState {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.data_api_name = data.data_api_name;
    this.state = {
      armed: false,
      mode: "home", // home, away, night, vacation
      sensors: {}, // {sensorId: {type, status, battery}}
      alerts: [],
      lastEvent: null
    };
    this.parent = parent;
    allStates.set(this.data_api_name, this);
  }

  setState(value) {
    if (["home", "away", "night", "vacation"].includes(value.mode)) {
      this.state = value;
    }
  }

  getState() {
    return this.state;
  }
}

class WeatherState {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.data_api_name = data.data_api_name;
    this.state = {
      temperature: 0,
      humidity: 0,
      pressure: 0,
      windSpeed: 0,
      windDirection: 0,
      rainfall: 0,
      light: 0
    };
    this.parent = parent;
    allStates.set(this.data_api_name, this);
  }

  setState(value) {
    // 验证所有数值在合理范围内
    if (this.validateWeatherData(value)) {
      this.state = value;
    }
  }

  getState() {
    return this.state;
  }

  validateWeatherData(data) {
    return (
      data.temperature >= -50 && data.temperature <= 100 &&
      data.humidity >= 0 && data.humidity <= 100 &&
      data.pressure >= 800 && data.pressure <= 1200 &&
      data.windSpeed >= 0 && data.windSpeed <= 200 &&
      data.windDirection >= 0 && data.windDirection <= 360 &&
      data.rainfall >= 0 &&
      data.light >= 0
    );
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
        case 'color':
          return new ColorState(status, this, allStates);
        case 'position':
          return new PositionState(status, this, allStates);
        case 'direction':
          return new DirectionState(status, this, allStates);
        case 'timer':
          return new TimerState(status, this, allStates);
        case 'scene':
          return new SceneState(status, this, allStates);
        case 'monitor':
          return new MonitorState(status, this, allStates);
        case 'security':
          return new SecurityState(status, this, allStates);
        case 'weather':
          return new WeatherState(status, this, allStates);
        case 'complex':
          return new ComplexState(status, this, allStates);
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
  async init() {
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
