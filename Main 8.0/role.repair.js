var roleUpgrade = require('role.upgrade');

//repariert alles
var roleRepair =
{
    run: function (creep)
    {
        if(creep.pos != STRUCTURE_ROAD)
        
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
                            structure.structureType === STRUCTURE_STORAGE //|| structure.structureType === STRUCTURE_SPAWN
                        ) && structure.store[RESOURCE_ENERGY] >= 50;
                    }});
                var source = creep.pos.findClosestByPath(container);
                    
                if(container.length > 0)
                {
                    if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                    {
                        creep.say('🔄withdraw');
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                    }
                }
                else
                {
                    var source = creep.pos.findClosestByPath(FIND_SOURCES);
                    if (creep.harvest(source) === ERR_NOT_IN_RANGE)
                    {
                        creep.say('🔄harvest');
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                    }
                }

                break;
            }
            case "working":
            {
                var structures  = creep.pos.findClosestByPath(FIND_STRUCTURES,
                    {
                        filter: (structure) =>
                        {
                            return(structure.hits < structure.hitsMax) && structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_RAMPART;
                        }
                    }
                );

                if(structures === undefined)
                {
                    roleUpgrade.run(creep);
                }
                else if(creep.repair(structures) === ERR_NOT_IN_RANGE)
                {
                    creep.say('🚧repair');
                    creep.moveTo(structures,{visualizePathStyle: {stroke: '#cc6600'}, reusePath: 10});
                }
                break;
            }
        }
    }
    
};
module.exports = roleRepair;