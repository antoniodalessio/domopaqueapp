import { createIconSet } from 'react-native-vector-icons'
const glyphMap = require("./../config/customIcon.json");
const IconFont = createIconSet(glyphMap.icons, 'customIcon');

export default IconFont;