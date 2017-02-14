
let initialState = {
  sponsors : [
  { name: "Aircel", pic: require("@images/sponsors/aircel.jpg") },
  { name: "Anchor by Panasonic", pic: require("@images/sponsors/anchor.png") },
  { name: "Axis Bank", pic: require("@images/sponsors/axis_bank.jpg") },
  { name: "BooksBeka.com", pic: require("@images/sponsors/booksbeka.jpg") },
  { name: "Cito Infotech", pic: require("@images/sponsors/cito.jpg") },
  { name: "Buggy", pic: require("@images/sponsors/buddy.jpg") },
  { name: "Intex", pic: require("@images/sponsors/intex.jpg") },
  { name: "My Faktory", pic: require("@images/sponsors/my_faktory.jpg") },
  { name: "Red FM", pic: require("@images/sponsors/red_fm.jpg") },
  { name: "Resonance Studio", pic: require("@images/sponsors/resonance_studios.jpg") },
  { name: "Shiamak Devar", pic: require("@images/sponsors/shiamak_davar.jpg") },
]
}

export default function (state = initialState, action = {}) {
  
  switch (action.type) {
    case 'SAVE':
      let {sponsors} = action.data
      return {
        ...state,
        sponsors
      }

    default: return state
  }
}