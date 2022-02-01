
import { units } from "lib/values/units"

const convertUnitNames = (unit) => {
    if (!unit) return ''
    const values = units.find(element => element.id === unit)
    return values ? values.name : ''
}

export { convertUnitNames }