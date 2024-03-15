import {name} from './properties'
import View from './view.vue'

export default {
    shape: name,
    width: 40,
    type: name,
    component: View,
    ports: {
      groups: {
        top: {
          position: "top",
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "#C2C8D5",
              strokeWidth: 1,
              fill: "#fff",
            },
          },
        },
        bottom: {
          position: "bottom",
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "#C2C8D5",
              strokeWidth: 1,
              fill: "#fff",
            },
          },
        },
      },
    }
  }