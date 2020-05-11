var roleUpgrade = require('role.upgrade');

var roleBuild =
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
                var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            (structure.structureType === STRUCTURE_STORAGE ||
                            structure.structureType === STRUCTURE_CONTAINER) && //|| structure.structureType === STRUCTURE_SPAWN
                            structure.store[RESOURCE_ENERGY] >= 25);
                    }});

                if (container !== null)
                {
                    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                    {
                        creep.say('🔄withdraw');
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#ffff00', reusePath: 10}});
                    }
                }
                else
                {
                    var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                    var source = creep.pos.findClosestByPath(FIND_SOURCES);
                    if (creep.harvest(source) === ERR_NOT_IN_RANGE)
                    {
                        creep.say('🔄harvest');
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                    }
                    else if (creep.pickup(droppedEnergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                    {

                        creep.say('🔄withdraw');
                        creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                    }
                }
                break;
            }
            case "working":
            {
                var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

                if(!constructionSite)
                {
                    roleUpgrade.run(creep);
                }
                else
                {
                    if(creep.build(constructionSite) === ERR_NOT_IN_RANGE)
                    {
                        creep.say('🚧build');
                        creep.moveTo(constructionSite,{visualizePathStyle: {stroke: '#cc6600'}, reusePath: 10});
                    }
                }
                break;
            }
        }
    }
    
};
module.exports = roleBuild;