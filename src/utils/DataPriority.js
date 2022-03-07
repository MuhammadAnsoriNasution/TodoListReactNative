import { ac, blue, danger, green, yellow } from "./color";

export const datapriority = [
    { priority: 'Very High', color: danger, active: false, value: 'very-high' },
    { priority: 'High', color: yellow, active: false, value: 'high' },
    { priority: 'Medium', color: green, active: false, value: 'normal' },
    { priority: 'Low', color: blue, active: false, value: 'low' },
    { priority: 'Very Low', color: ac, active: false, value: 'very-low' },
];

export const getColorPriorityByValue = (value) => {
    return datapriority.find((item) => item.value == value).color
}