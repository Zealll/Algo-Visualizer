class Cell {
    constructor(lon, lat, maxLon, maxLat) {
        this.lon = lon
        this.lat = lat
        this.maxLon = maxLon
        this.maxLat = maxLat
        this.distance = Infinity
        this.visited = false
        this.north = this.lon === 0 ? false : true
        this.east = this.lat === this.maxLat ? false : true
        this.south = this.lon === this.maxLon ? false : true
        this.west = this.lat === 0 ? false : true
        this.weight = 0
    }

    visit() {
        this.visited = true
    }

    coor() {
        // console.log(this.lon, this.lat, this.maxLon, this.maxLat)
        // console.log('north', this.north)
        // console.log('east', this.east)
        // console.log('south', this.south)
        // console.log('west', this.west)
    }
}

export default Cell