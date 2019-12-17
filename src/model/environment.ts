import Device from './device'

interface Environment {
    name: string,
    color: string,
    type: string,
    ips: [],
    devices?: Device[],
    virtualActuators?: any,
    icon?: string,
    iconSize?: number,
    iconColor?: string,
    inside?: boolean
}

export default Environment;