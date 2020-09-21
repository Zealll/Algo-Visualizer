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
        this.prevNode = null
    }

    visit() {
        this.visited = !this.visited
        return this.visited
    }

    setDistance(len) {
        this.distance = len
    }

    findNeighbors(grid) {
        const arr = []
        if (this.north) arr.push(grid[this.lon - 1][this.lat])
        if (this.east) arr.push(grid[this.lon][this.lat + 1])
        if (this.south) arr.push(grid[this.lon + 1][this.lat])
        if (this.west) arr.push(grid[this.lon][this.lat - 1])

        return arr.filter(each => !each.visited)
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