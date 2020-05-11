var automatedBuilding =
    {
        run: function (spawn)
        {
            console.log(spawn.name+": Auto-BUild enabled");

            var centerPos = spawn.pos;

            console.log("CenterPos: "+centerPos);

            const visualShow = false;
            const roomName = spawn.room.name;
            const terrain = new Room.Terrain(roomName);
            const matrix = new PathFinder.CostMatrix;
            const visual = new RoomVisual(roomName);

// Fill CostMatrix with default terrain costs for future analysis:

            if (!matrix)
            {
                console.log("Test")
                for(let y = 0; y < 50; y++) {
                    for(let x = 0; x < 50; x++) {
                        const tile = terrain.get(x, y);
                        const weight =
                            tile === TERRAIN_MASK_WALL  ? 255 : // wall  => unwalkable
                                tile === TERRAIN_MASK_SWAMP ?   5 : // swamp => weight:  5
                                    1 ; // plain => weight:  1
                        matrix.set(x, y, weight);
                        if (visualShow)
                        {
                            switch (weight)
                            {
                                case 1:
                                {
                                    visual.circle(x, y, {fill: 'transparent', radius: 0.55, stroke: 'green'});
                                    break;
                                }
                                case 5:
                                {
                                    visual.circle(x, y, {fill: 'transparent', radius: 0.55, stroke: 'orange'});
                                    break;
                                }
                                case 255:
                                {
                                    visual.circle(x, y, {fill: 'transparent', radius: 0.55, stroke: 'red'});
                                    break;
                                }
                            }
                        }


                    }
                }
            }







        }

    };
module.exports = automatedBuilding;