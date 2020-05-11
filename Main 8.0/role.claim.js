var roleClaim =
    {
        run: function (creep)
        {
            if (creep.room.name !== creep.memory.targetRoom.name)
            {
                creep.memory.state = "moveToRoom";
            }
            else
            {
                creep.memory.state = "claiming";
            }

            switch(creep.memory.state)
            {
                case "moveToRoom":
                {
                    if (creep.room.name !== creep.memory.targetRoom.name)
                    {
                        let exitDir = creep.room.findExitTo(creep.memory.targetRoom);
                        let exit = creep.pos.findClosestByRange(exitDir);
                        creep.moveTo(exit, {visualizePathStyle: {stroke: '#ffff00', reusePath: 10}});
                        creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD)

                    }
                    else
                    {
                        creep.memory.state = "claiming";
                    }
                    break;
                }

                case "claiming":
                {
                    if (creep.signController(creep.room.controller, "Someone said: 'This belongs to Dracacula!'")=== ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                        creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD)
                    }

                    if(creep.claimController(creep.room.controller) !== ERR_GCL_NOT_ENOUGH)
                    {
                        if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE)
                        {
                            creep.say('⚡ claim');
                            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                            creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD)
                        }
                    }
                    else
                    {


                        if(creep.reserveController(creep.room.controller) === ERR_NOT_IN_RANGE)
                        {
                            creep.say('⚡ reserve');
                            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                            creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD)
                        }
                    }
                    break;
                }
            }
        }
    };
module.exports = roleClaim;