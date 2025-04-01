import State_data_instance from './state_data_instance';

export default class AdvancedControl {
    constructor() {
        this.stateInstance = State_data_instance.stateInstancePack;
        this.schedules = new Map();
        this.scenes = new Map();
        this.energyData = new Map();
        this.statusMonitors = new Map();
        this.faultDiagnoses = new Map();
    }

    // 定时控制
    async scheduleControl(deviceId, schedule) {
        const { time, action, repeat } = schedule;
        const scheduleId = `${deviceId}_${Date.now()}`;

        this.schedules.set(scheduleId, {
            deviceId,
            time,
            action,
            repeat,
            nextExecution: this.calculateNextExecution(time, repeat)
        });

        return scheduleId;
    }

    // 场景联动
    async createScene(sceneName, devices) {
        this.scenes.set(sceneName, {
            name: sceneName,
            devices,
            createdAt: Date.now()
        });
        return sceneName;
    }

    async triggerScene(sceneName) {
        const scene = this.scenes.get(sceneName);
        if (!scene) return false;

        for (const device of scene.devices) {
            const stateInstance = this.stateInstance.getInstance(device.type, device.dataApiName);
            await stateInstance.setState(device.state);
        }

        return true;
    }

    // 能耗统计
    async recordEnergyConsumption(deviceId, consumption) {
        const now = new Date();
        const dateKey = now.toISOString().split('T')[0];

        if (!this.energyData.has(deviceId)) {
            this.energyData.set(deviceId, new Map());
        }

        const deviceData = this.energyData.get(deviceId);
        if (!deviceData.has(dateKey)) {
            deviceData.set(dateKey, 0);
        }

        deviceData.set(dateKey, deviceData.get(dateKey) + consumption);
    }

    async getEnergyConsumption(deviceId, startDate, endDate) {
        const deviceData = this.energyData.get(deviceId);
        if (!deviceData) return null;

        const result = [];
        for (const [date, consumption] of deviceData) {
            if (date >= startDate && date <= endDate) {
                result.push({ date, consumption });
            }
        }

        return result;
    }

    // 设备状态监控
    async startStatusMonitor(deviceId, callback, interval = 5000) {
        if (this.statusMonitors.has(deviceId)) {
            return false;
        }

        const stateInstance = this.stateInstance.getInstance(deviceId);
        const monitor = setInterval(async () => {
            const status = await stateInstance.getState();
            callback(status);
        }, interval);

        this.statusMonitors.set(deviceId, monitor);
        return true;
    }

    async stopStatusMonitor(deviceId) {
        const monitor = this.statusMonitors.get(deviceId);
        if (monitor) {
            clearInterval(monitor);
            this.statusMonitors.delete(deviceId);
            return true;
        }
        return false;
    }

    // 故障诊断
    async diagnoseFault(deviceId) {
        const stateInstance = this.stateInstance.getInstance(deviceId);
        const status = await stateInstance.getState();

        const diagnosis = {
            deviceId,
            timestamp: Date.now(),
            status,
            issues: []
        };

        // 根据设备类型和状态进行故障诊断
        if (status.error) {
            diagnosis.issues.push({
                type: 'error',
                message: status.error,
                severity: 'high'
            });
        }

        if (status.warning) {
            diagnosis.issues.push({
                type: 'warning',
                message: status.warning,
                severity: 'medium'
            });
        }

        this.faultDiagnoses.set(deviceId, diagnosis);
        return diagnosis;
    }

    // 辅助方法
    calculateNextExecution(time, repeat) {
        const now = new Date();
        const [hours, minutes] = time.split(':').map(Number);
        const next = new Date(now);
        next.setHours(hours, minutes, 0, 0);

        if (next <= now) {
            next.setDate(next.getDate() + 1);
        }

        return next;
    }
} 