var roleBuild = require('role.build');

var roleRepair =
{
    run: function (creep)
    {

        
        //ENERGIE abfragen
        switch(creep.carry.energy)
        {
            case creep.carryCapacity:
            {
                creep.memory.work = 'working';
                break;
            }
            case 0:
            {
                creep.memory.work = 'harvesting';
                break;
            }
        }


        switch(creep.memory.work)
        {
            case "harvesting":
            {
                //ENERGY SOURCES
                var container = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType === STRUCTURE_CONTAINER //|| structure.structureType === STRUCTURE_SPAWN
                        ) && structure.store[RESOURCE_ENERGY] >= 50;
                    }});

                    if(container.length > 0)
                    {
                        var source = creep.pos.findClosestByPath(container);
                        if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                        {
                            creep.say('🔄withdraw');
                            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 5});
                        }
                    }
                    else
                    {
                        var source = creep.pos.findClosestByPath(container);
                        if (creep.harvest(source) === ERR_NOT_IN_RANGE)
                        {
                            creep.say('🔄harvest');
                            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 5});
                        }
                    }

                break;
            }
            case "working":
            {
                var walls = creep.room.find(FIND_STRUCTURES, {
                    filter: (s) => s.structureType === STRUCTURE_WALL
                });

                var target = undefined;

                // loop with increasing percentages
                for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
                    // find a wall with less than percentage hits
                    for (let wall of walls) {
                        if (wall.hits / wall.hitsMax < percentage) {
                            target = wall;
                            break;
                        }
                    }

                    // if there is one
                    if (target !== undefined) {
                        // break the loop
                        break;
                    }
                }

                if(target !== undefined)
                {
                    if(creep.repair(target) === ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#cc6600'}, reusePath: 10});
                    }
                }
                else
                {
                    roleBuild.run(creep);
                }
                break;
            }
        }
    }
    
};
module.exports = roleRepair;