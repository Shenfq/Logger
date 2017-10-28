import {version, name} from '../package.json';
export default {
    version,
    name,
    "switch": true,
    "level": 0,
    "action": ['time', 'level', 'module'],
    "styles": {
        level: {
            '0': '#58B7FF',
            '1': '#2a75ed',
            '2': '#F7BA2A',
            '3': '#f06d6b'
        },
        time: '#324057',
        module: '#324057',
        content: '#1F2D3D',
    },
    "levelArray": {
        'LOG': 0,
        'INFO': 1,
        'WARN': 2,
        'ERROR': 3
    },
    "modules": [],
    "filteModules": []
};